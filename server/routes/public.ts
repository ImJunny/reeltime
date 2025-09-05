import { Hono } from 'hono'
import { getStreamUrl } from '../procedures/public/stream'
import { callback, isAuthenticated, logout } from '../procedures/public/auth'
import { getPopularMovies, getTopRatedMovies } from '../procedures/public/tmdb'

// Public API routes
export const streamRoute = new Hono().get('/url/:id', getStreamUrl)
export const authRoute = new Hono()
  .get('/callback', callback)
  .get('/is-authenticated', isAuthenticated)
  .post('/logout', logout)
export const tmdbRoute = new Hono()
  .get('/top-rated-movies', getTopRatedMovies)
  .get('/popular-movies', getPopularMovies)

export const publicApi = new Hono()
  .route('/stream', streamRoute)
  .route('/auth', authRoute)
  .route('/tmdb', tmdbRoute)
