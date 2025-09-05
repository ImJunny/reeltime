import { Context } from 'hono'
import { decodeIdToken, exchangeCode } from '../../lib/helpers/google-helpers'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { createUserDB } from '../../lib/db-actions/user-actions'

export async function callback(c: Context) {
  try {
    const { code } = c.req.query()
    const { id_token } = await exchangeCode(code)
    const { user_id, user_email } = await decodeIdToken(id_token)
    setCookie(c, 'rt_user_id', user_id, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 30,
    })

    await createUserDB(user_id, user_email)
    return c.redirect('http://127.0.0.1:5173', 302)
  } catch (error) {
    console.log('Error exchanging code:', error)
    return c.json({ error: 'Error exchanging code!' }, 500)
  }
}

export async function logout(c: Context) {
  try {
    deleteCookie(c, 'rt_user_id')
    return c.json({ success: true }, 200)
  } catch {
    return c.json({ success: false }, 500)
  }
}

export async function isAuthenticated(c: Context) {
  try {
    const user_id = getCookie(c, 'rt_user_id')
    console.log(user_id)
    return c.json({ authenticated: !!user_id })
  } catch {
    return c.json({ authenticated: false })
  }
}
