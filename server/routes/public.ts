import { Hono } from 'hono'
import { getStreamUrl } from '../procedures/public/stream'
import { callback } from '../procedures/public/auth'

// Public API routes
export const streamRoute = new Hono().get('/url/:id', getStreamUrl)
export const authRoute = new Hono().get('/callback', callback)

export const publicApi = new Hono().route('/stream', streamRoute).route('/auth', authRoute)
