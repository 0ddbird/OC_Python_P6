import { IMovieDetails } from '../api/apiTypes'

class Movie {
  constructor (
    public category: string,
    public id: number,
    public actors: string[],
    public directors: string[],
    public genres: string[],
    public imageUrl: string,
    public imdbScore: string,
    public imdbUrl: string,
    public title: string,
    public url: string,
    public votes: number,
    public writers: string[],
    public year: number,
    public duration: number | string | null = null,
    public countries: string[] | null = null,
    public rated: string | null = null,
    public longDescription: string | null = null,
    public boxOffice: string | null = null
  ) {}

  createThumbnail (root: HTMLElement): void {
    const template = document.querySelector(
      '#template_movie'
    ) as HTMLTemplateElement

    const clone = template.content.cloneNode(true) as DocumentFragment
    const articleElement = clone.querySelector('article') as HTMLElement
    const imgElement = clone.querySelector('img') as HTMLImageElement
    const btnElement = clone.querySelector('.btn_icon') as HTMLElement

    articleElement.setAttribute('id', `movie-${this.id}`)
    imgElement.setAttribute('src', this.imageUrl)
    imgElement.setAttribute('alt', this.title)
    btnElement.setAttribute('data-id', this.id.toString())

    btnElement.addEventListener('click', () => {
      this.handleInfoBtnClick().catch((err) => {
        console.log(err)
      })
    })
    root.appendChild(clone)
  }

  async handleInfoBtnClick (): Promise<void> {
    if (
      [
        this.duration,
        this.countries,
        this.rated,
        this.longDescription,
        this.boxOffice
      ].some((property) => property == null)
    ) {
      await this.fetchDetails()
    }
    this.openModal()
    await Promise.resolve()
  }

  async fetchDetails (): Promise<void> {
    const fetchParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/titles/${this.id}`,
        fetchParams
      )
      const result: IMovieDetails = await response.json()
      const { duration, countries, rated, description, worldwideGrossIncome } =
        result
      this.duration = duration ?? 'Inconnu'
      this.countries = countries
      this.rated = rated ?? 'Inconnu'
      this.longDescription = description ?? 'Inconnue'
      this.boxOffice = worldwideGrossIncome ?? 'Inconnu'
    } catch (e) {
      console.log(e)
    }
  }

  openModal (): void {
    const template: HTMLTemplateElement | null =
      document.querySelector('#template_modal')

    if (template == null) return
    const clone = template.content.cloneNode(true) as DocumentFragment

    const imgElement = clone.querySelector(
      '#modal_movie_picture'
    ) as HTMLImageElement
    const titleElement = clone.querySelector(
      '#modal_movie_title'
    ) as HTMLHeadingElement
    const genreElement = clone.querySelector(
      '#modal_genre_content'
    ) as HTMLSpanElement
    const releaseElement = clone.querySelector(
      '#modal_release_content'
    ) as HTMLSpanElement
    const ratingElement = clone.querySelector(
      '#modal_rating_content'
    ) as HTMLSpanElement
    const imdbElement = clone.querySelector(
      '#modal_imdb_content'
    ) as HTMLSpanElement
    const directorElement = clone.querySelector(
      '#modal_director_content'
    ) as HTMLSpanElement
    const castingElement = clone.querySelector(
      '#modal_casting_content'
    ) as HTMLSpanElement
    const durationElement = clone.querySelector(
      '#modal_duration_content'
    ) as HTMLSpanElement
    const countryElement = clone.querySelector(
      '#modal_country_content'
    ) as HTMLSpanElement
    const boxOfficeElement = clone.querySelector(
      '#modal_box-office_content'
    ) as HTMLSpanElement
    const synopsysElement = clone.querySelector(
      '#modal_synopsis_content'
    ) as HTMLSpanElement

    imgElement.setAttribute('src', this.imageUrl)
    imgElement.setAttribute('alt', this.title)
    titleElement.textContent = this.title
    genreElement.textContent = this.genres.join(', ')
    releaseElement.textContent = this.year.toString()
    ratingElement.textContent = this.rated
    imdbElement.textContent = this.imdbScore
    directorElement.textContent = this.directors.join(', ')
    castingElement.textContent = this.actors.join(', ')
    durationElement.textContent =
      this.duration != null ? `${this.duration} mins` : 'Inconnu'
    countryElement.textContent = this.countries?.join(', ') ?? 'Inconnu'
    boxOfficeElement.textContent = this.boxOffice ?? 'Inconnu'
    synopsysElement.textContent = this.longDescription ?? 'Inconnu'
    document.body.appendChild(clone)
    const modalBackground = document.querySelector(
      '#modal-background'
    ) as HTMLElement
    const modalCloseButton = document.querySelector(
      '#modal_close-btn'
    ) as HTMLElement
    modalBackground.classList.add('displayed')
    modalBackground.classList.remove('hidden')
    modalCloseButton.addEventListener('click', this.closeModal)
  }

  closeModal (): void {
    const modalBackground = document.querySelector(
      '#modal-background'
    ) as HTMLElement
    document.body.removeChild(modalBackground)
  }
}

export default Movie
