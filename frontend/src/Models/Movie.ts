import { IMovieDetails } from '../api/apiTypes'

function setElementText (element: HTMLElement | null, text: string | null, fallback: string = 'Inconnu'): void {
  if (element != null) {
    element.textContent = text ?? fallback
  }
}

class Movie {
  constructor (
    public category: string,
    public id: number,
    public actors: string[],
    public directors: string[],
    public genres: string[],
    public imageUrl: string,
    public movieUrl: string,
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
    const template = document.querySelector('#template_movie') as HTMLTemplateElement
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
      const response = await fetch(`http://localhost:8000/api/v1/titles/${this.id}`, fetchParams)
      const result: IMovieDetails = await response.json()
      const { duration, countries, rated, description, worldwideGrossIncome } = result
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
    // Get the HTML template in the DOM
    const template: HTMLTemplateElement | null = document.querySelector('#template_modal')
    if (template == null) return
    const clone = template.content.cloneNode(true) as DocumentFragment

    // Set the movie image in the template clone
    const imgElement = clone.querySelector('#modal_movie_picture')
    if (imgElement != null) {
      imgElement.setAttribute('src', this.imageUrl)
      imgElement.setAttribute('alt', this.title)
    }

    // Set the text contents in the template clone
    const modalDOMMap = [
      { selector: '#modal_movie_title', textContent: this.title },
      { selector: '#modal_genre_content', textContent: this.genres.join(', ') },
      { selector: '#modal_release_content', textContent: this.year?.toString() },
      { selector: '#modal_rating_content', textContent: this.rated },
      { selector: '#modal_imdb_content', textContent: this.imdbScore },
      { selector: '#modal_director_content', textContent: this.directors.join(', ') },
      { selector: '#modal_casting_content', textContent: this.actors.join(', ') },
      { selector: '#modal_duration_content', textContent: this.duration != null ? `${this.duration} mins` : 'Inconnu' },
      { selector: '#modal_country_content', textContent: this.countries?.join(', ') ?? 'Inconnu' },
      { selector: '#modal_box-office_content', textContent: this.boxOffice ?? 'Inconnu' },
      { selector: '#modal_synopsis_content', textContent: this.longDescription ?? 'Inconnu' }
    ]
    modalDOMMap.forEach(element => {
      setElementText(clone.querySelector(element.selector), element.textContent)
    })

    // Append the clone to the document body
    document.body.appendChild(clone)

    // Display the modal
    const modalBackground = document.querySelector('#modal-background')
    const modalCloseButton = document.querySelector('#modal_close-btn')
    if (modalBackground == null || modalCloseButton == null) return
    modalBackground.classList.add('displayed')
    modalBackground.classList.remove('hidden')
    modalCloseButton.addEventListener('click', this.closeModal)
  }

  closeModal (): void {
    const modalBackground = document.querySelector('#modal-background')
    if (modalBackground != null) document.body.removeChild(modalBackground)
  }
}

export default Movie
