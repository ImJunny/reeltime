import axios from 'axios'
import { Context } from 'hono'

const apiKey = process.env.TMDB_API_KEY
export async function getTopRatedMovies(c: Context) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`,
  )
  return c.json(res.data)
}

export async function getPopularMovies(c: Context) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`,
  )
  return c.json(res.data)
}
