interface IAPIResponse {
  count: number
  next: string | null
  previous: string | null
  results: IResult[]
}

interface IResult {
  id: number
  url: string
  imdb_url: string
  title: string
  year: number
  imdb_score: string
  votes: number
  image_url: string
  directors: string[]
  actors: string[]
  writers: string[]
  genres: string[]
}

interface IMovieDetails {
  id: number
  url: string
  title: string
  originalTitle: string
  year: number
  datePublished: string
  duration: number
  description: string
  longDescription: string
  avgVote: string
  imdb_score: string
  votes: number
  metascore: string | null
  budget: string | null
  budgetCurrency: string | null
  usaGrossIncome: string | null
  worldwideGrossIncome: string | null
  reviewsFromUsers: number
  reviewsFromCritics: number
  imageUrl: string
  actors: string[]
  directors: string[]
  writers: string[]
  genres: string[]
  countries: string[]
  languages: string[]
  rated: string
  company: string
}

export { IAPIResponse, IResult, IMovieDetails }
