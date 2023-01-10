import { IAPIResponse } from './apiTypes.js'

export async function fetchMovies (
  categoryName: string,
  pages: number
): Promise<IAPIResponse | null> {
  const fetchParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/titles/?genre=${categoryName}&sort_by=-imdb_score&page_size=${pages}`,
      fetchParams
    )
    return await response.json()
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function fetchHeroMovie (): Promise<IAPIResponse | null> {
  const fetchParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const response = await fetch(
      'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=1',
      fetchParams
    )
    return await response.json()
  } catch (e) {
    console.log(e)
    return null
  }
}
