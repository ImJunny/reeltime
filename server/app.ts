// This is the main entry point for the server. RPC should be prioritized over REST.
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { getStreamUrl } from './procedures/stream.ts'
import { getPopularMovies, getTopRatedMovies } from './procedures/tmdb.ts'

// App uses logger for debugging and CORS for cross-origin requests with 5173
// Mount public and protected APIs
const app = new Hono()
  .use(logger())
  .use(
    cors({
      origin: 'http://127.0.0.1:5173',
      credentials: true,
    }),
  )
  .basePath('/api')

export const streamRoute = new Hono().get('/url/:id', getStreamUrl)
export const tmdbRoute = new Hono()
  .get('/top-rated-movies', getTopRatedMovies)
  .get('/popular-movies', getPopularMovies)

app.route('/stream', streamRoute).route('/tmdb', tmdbRoute)

export default app
export type ApiRoutes = typeof app
