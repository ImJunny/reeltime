import axios from 'axios'
import qs from 'qs'
import jwt from 'jsonwebtoken'

// FUNCTION that exchanges auth code for id_token
export async function exchangeCode(code: string) {
  try {
    const res = await axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    const { id_token } = res.data
    return { id_token }
  } catch (error) {
    return { error: 'Error exchanging code!' }
  }
}

// FUNCTION that decodes jwt id_token to receive user info
export async function decodeIdToken(id_token: string) {
  try {
    const { sub, email } = jwt.decode(id_token)
    if (!sub || !email) {
      throw new Error('User info missing.')
    }
    return { user_id: sub, user_email: email }
  } catch (error) {
    console.log('Error decoding ID token:', error)
    return { error: 'Error decoding ID token!' }
  }
}
