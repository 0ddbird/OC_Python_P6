import Movie from './Movie.js'

class HeroMovie extends Movie {
  async buildDOM (): Promise<void> {
    await this.fetchDetails()
    const heroCover = document.querySelector('#hero_cover') as HTMLImageElement
    const heroDescription = document.querySelector(
      '#hero_description'
    ) as HTMLParagraphElement
    const heroInfoBtn = document.querySelector(
      '#hero_info_btn'
    ) as HTMLButtonElement
    heroCover.setAttribute('src', this.imageUrl)
    heroCover.setAttribute('alt', this.title)
    heroDescription.innerText = this.longDescription ?? 'Inconnu'
    heroInfoBtn.addEventListener('click', () => {
      this.handleInfoBtnClick().catch((err) => {
        console.log(err)
      })
    })
  }
}

export default HeroMovie
