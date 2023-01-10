import Category from '../Models/Category.js'
import { fetchHeroMovie, fetchMovies } from '../api/api.js'
import Movie from '../Models/Movie.js'
import { IResult } from '../api/apiTypes.js'
import HeroMovie from '../Models/HeroSection.js'

class Controller {
  constructor (
    public categories: Category[] = [],
    public heroMovie: HeroMovie | null = null
  ) {}

  buildMovie (entry: IResult, categoryName: string): Movie {
    return new Movie(
      categoryName,
      entry.id,
      entry.actors,
      entry.directors,
      entry.genres,
      entry.image_url,
      entry.imdb_score,
      entry.imdb_url,
      entry.title,
      entry.url,
      entry.votes,
      entry.writers,
      entry.year
    )
  }

  buildHeroMovie (entry: IResult, categoryName: string): HeroMovie {
    return new HeroMovie(
      categoryName,
      entry.id,
      entry.actors,
      entry.directors,
      entry.genres,
      entry.image_url,
      entry.imdb_score,
      entry.imdb_url,
      entry.title,
      entry.url,
      entry.votes,
      entry.writers,
      entry.year
    )
  }

  async setHeroMovie (): Promise<void> {
    const response = await fetchHeroMovie()
    if (response == null) return
    this.heroMovie = this.buildHeroMovie(response.results[0], 'hero')
  }

  async setMovies (categoryNames: string[]): Promise<void> {
    for (const categoryName of categoryNames) {
      const response = await fetchMovies(categoryName, 10)
      if (response == null) return
      const movies = response.results.map((entry) =>
        this.buildMovie(entry, categoryName)
      )
      const category = new Category(categoryName, categoryName, movies)
      this.categories.push(category)
    }
  }

  getHeroSection (): void {
    if (this.heroMovie == null) return
    this.heroMovie.buildDOM()
  }

  getCategories (): void {
    this.categories.forEach((category) => {
      category.buildDOM()
    })
  }

  getDOM (): void {
    this.getHeroSection()
    this.getCategories()
  }
}

export default Controller
