import Movie from './Movie.js'

class Category {
  constructor (
    public name: string,
    public title: string,
    public movies: Movie[],
    public DOMElement: HTMLElement | null = null
  ) {}

  root = document.querySelector('#categories') as HTMLElement

  setMovies (movies: Movie[]): void {
    this.movies = movies
  }

  buildDOM (): void {
    const template = document.querySelector(
      '#template_category'
    ) as HTMLTemplateElement
    if (template?.content == null) return
    const clone = template.content.cloneNode(true) as DocumentFragment
    const titleElement = clone.querySelector(
      '.category_title'
    ) as HTMLTitleElement
    const containerElement = clone.querySelector(
      '.movies_container'
    ) as HTMLElement
    titleElement.innerText = `${this.name
      .charAt(0)
      .toUpperCase()}${this.name.slice(1)}`
    this.DOMElement = clone.querySelector('.category') as HTMLElement

    this.movies.forEach((movie) => {
      movie.createThumbnail(containerElement)
    })

    this.root.appendChild(clone)
  }
}

export default Category
