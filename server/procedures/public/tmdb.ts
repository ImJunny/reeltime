import axios from 'axios'
import { Context } from 'hono'

export async function getTopRatedMovies(c: Context) {
  const apiKey = process.env.TMDB_API_KEY
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`,
  )
  return c.json(res.data)
}
