import { Context, Hono } from 'hono'
import puppeteer from 'puppeteer'

// FUNCTION | checks whether url is m3u8
async function isM3U8(url: string) {
  try {
    const res = await fetch(url, { method: 'GET' })
    const ct = res.headers.get('content-type') || ''

    if (ct.includes('application/vnd.apple.mpegurl')) return true

    const text = await res.text()
    return text.trim().startsWith('#EXTM3U')
  } catch {
    return false
  }
}

// FUNCTION | get stream m3u8 url
export async function getStreamUrl(c: Context) {
  const id = c.req.param('id')

  // Create browser setup
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1280, height: 800 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
    ],
  })

  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
  )

  // ------------DOESNT WORK TO DETECT REQUEST CANCELLATIONS---------------
  c.req.raw.signal.addEventListener('abort', async () => {
    console.log('Client disconnected!')
    await browser.close()
  })
  let timeoutHandle: NodeJS.Timeout
  // Create promise that resolves when valid m3u8 found
  const m3u8Promise = new Promise<string>((resolve, reject) => {
    const handleResponse = async (res) => {
      const url = res.url()
      // reset the timeout every time a response comes
      clearTimeout(timeoutHandle)
      timeoutHandle = setTimeout(() => {
        // no new responses in 4 seconds
        page.off('response', handleResponse)
        reject(new Error('No m3u8 found within 4 seconds'))
      }, 4000)

      if (await isM3U8(url)) {
        page.off('response', handleResponse)
        resolve(url)
      }
    }

    page.on('response', handleResponse)

    // start the initial 4s timer
    timeoutHandle = setTimeout(() => {
      page.off('response', handleResponse)
      reject(new Error('No m3u8 found within 4 seconds'))
    }, 4000)
  })

  // Create promise that rejects if page closed or navigated away
  const abortPromise = new Promise<never>((_, reject) => {
    const onAbort = (reason: string) => {
      reject(new Error(reason))
    }

    page.on('close', () => onAbort('Page closed'))
    page.on('error', (err) => onAbort('Page error: ' + err))
  })

  try {
    // Navigate and interact to initiate network requests
    await page.goto(`https://moviehd.us/movies/${id}/`, { waitUntil: 'networkidle2' })
    await page.evaluate(() => window.scrollBy(0, window.innerHeight))
    await page.mouse.move(100, 100)
    await page.mouse.click(100, 100)

    // Click potential play buttons in all frames
    for (const frame of page.frames()) {
      try {
        const allSelectors = await frame.evaluate(() =>
          Array.from(document.querySelectorAll('*')).map((el) => {
            const tag = el.tagName.toLowerCase()
            const id = el.id ? `#${el.id}` : ''
            const classes = el.className ? `.${el.className.replace(/\s+/g, '.')}` : ''
            return `${tag}${id}${classes}`
          }),
        )
        const playSelectors = allSelectors.filter((sel) => /\..*play/i.test(sel))
        for (const selector of playSelectors) {
          try {
            const playBtn = await frame.$(selector)
            if (playBtn) {
              await playBtn.click()
              console.log('Clicked selector:', selector)
            }
          } catch {
            // console.log('Could not click selector:', selector)
          }
        }
      } catch {}
    }

    // Wait for either m3u8 found or abort event
    const streamUrl = await Promise.race([m3u8Promise, abortPromise])

    return c.json({ streamUrl }, 200)
  } catch (err: any) {
    return c.json({ error: err.message || 'Request interrupted' }, 500)
  } finally {
    await browser.close()
  }
}
