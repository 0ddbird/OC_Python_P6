import Movie from './Movie.js'
import { fetchMovies } from '../api/api.js'
import { IResult } from '../api/apiTypes'

class Category {
  constructor (
    public name: string,
    public title: string,
    public movies: Movie[],
    public next: number | null,
    public DOMElement: HTMLElement | null = null,
    public translateValue: number = 0,
    public range: number = 10,
    public sliceIndex: number = 0
  ) {}

  root = document.querySelector('#categories') as HTMLElement

  async buildDOM (): Promise<void> {
    // Select and clone HTML Template
    const template = document.querySelector('#template_category') as HTMLTemplateElement
    if (template?.content == null) return
    const clone = template.content.cloneNode(true) as DocumentFragment

    // Select clone elements
    const btnPrevious = clone.querySelector('.arrow-button.previous') as HTMLButtonElement
    const btnNext = clone.querySelector('.arrow-button.next') as HTMLButtonElement
    const titleElement = clone.querySelector('.category_title') as HTMLTitleElement
    const containerElement = clone.querySelector('.movies_container') as HTMLElement

    // Set custom id to container
    containerElement.setAttribute('id', `category-${this.name}`)

    // Fill elements content
    titleElement.innerText = `${this.title.charAt(0).toUpperCase()}${this.title.slice(1)}`
    this.DOMElement = clone.querySelector('.category') as HTMLElement

    // Create the thumbnails for the first movies in range
    this.movies.forEach(movie => {
      movie.createThumbnail(containerElement)
    })
    // Add navigation arrows event listeners
    btnPrevious.addEventListener('click', (e) => {
      if (this.translateValue < 0) {
        this.translateValue += 100
        this.sliceIndex -= this.range
        this.slide(e, this.name, this.translateValue)
      }
    })
    btnNext.addEventListener('click', (e) => {
      this.sliceIndex += this.range
      this.translateValue -= 100
      this.slide(e, this.name, this.translateValue)
      if (this.movies.length <= this.sliceIndex) {
        this.fetchNext().catch((err) => {
          console.log(err)
        })
      }
    })

    // Append category to DOM
    this.root.appendChild(clone)
  }

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

  appendNextMovie (movies: Movie[]): void {
    const selector = `#category-${this.name}`
    const container = document.querySelector(selector) as HTMLElement
    movies.forEach(movie => {
      movie.createThumbnail(container)
    })
  }

  async fetchNext (): Promise<void> {
    if (this.next == null) return
    const response = await fetchMovies(this.name, this.range, this.next)
    if (response == null) return

    const { results, next } = response;
    
    const nextMovies = results.map(entry => this.buildMovie(entry, this.name))

    this.next = next ? this.next +1 : null

    this.movies.push(...nextMovies)
    
    this.appendNextMovie(nextMovies)
  }

  slide (e: MouseEvent, categoryName: string, translateValue: number): void {
    const selector = `#category-${categoryName}`
    const container = document.querySelector(selector) as HTMLElement
    container.style.transform = `translateX(${translateValue}%)`
  }
}

export default Category
