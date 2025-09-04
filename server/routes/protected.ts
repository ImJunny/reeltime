// This is the main entry point for the server. RPC should be prioritized over REST.
import { Hono } from 'hono'

// Protected API routes
const usersRoute = new Hono()

// Protected API
export const protectedApi = new Hono().route('/user', usersRoute)
