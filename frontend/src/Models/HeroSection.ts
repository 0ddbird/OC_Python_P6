import Movie from './Movie.js'

class HeroMovie extends Movie {
  async buildDOM (): Promise<void> {
    await this.fetchDetails()

    const heroCoverImgTag = document.querySelector('#hero_cover')
    const heroDescriptionPTag = document.querySelector('#hero_description') as HTMLParagraphElement
    const heroInfoBtn = document.querySelector('#hero_info_btn')

    if (heroCoverImgTag != null) {
      heroCoverImgTag.setAttribute('src', this.imageUrl)
      heroCoverImgTag.setAttribute('alt', this.title)
    }

    if (heroDescriptionPTag != null) heroDescriptionPTag.innerText = this.longDescription ?? 'Inconnu'

    if (heroInfoBtn != null) {
      heroInfoBtn.addEventListener('click', () => {
        this.handleInfoBtnClick().catch((err) => {
          console.error(err)
        })
      })
    }
  }
}

export default HeroMovie
