import { Context } from 'hono'
import { decodeIdToken, exchangeCode } from '../../lib/google-helpers'
import { setCookie } from 'hono/cookie'
import { createUserDB } from '../../lib/db-actions/user-actions'

export async function callback(c: Context) {
  try {
    const { code } = c.req.query()
    const { id_token } = await exchangeCode(code)
    const { user_id, user_email } = await decodeIdToken(id_token)
    setCookie(c, 'rt_user_id', user_id)

    await createUserDB(user_id, user_email)
    return c.redirect('http://127.0.0.1:5173', 302)
  } catch (error) {
    console.log('Error exchanging code:', error)
    return c.json({ error: 'Error exchanging code!' }, 500)
  }
}
