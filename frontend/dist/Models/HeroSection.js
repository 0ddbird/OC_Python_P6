import Movie from './Movie.js';
class HeroMovie extends Movie {
    async buildDOM() {
        await this.fetchDetails();
        const heroCover = document.querySelector('#hero_cover');
        const heroDescription = document.querySelector('#hero_description');
        const heroInfoBtn = document.querySelector('#hero_info_btn');
        if (heroCover) {
            heroCover.setAttribute('src', this.imageUrl);
            heroCover.setAttribute('alt', this.title);
        }
        if (heroDescription)
            heroDescription.innerText = this.longDescription ?? 'Inconnu';
        if (heroInfoBtn)
            heroInfoBtn.addEventListener('click', this.handleInfoBtnClick.bind(this));
    }
    async handleInfoBtnClick() {
        try {
            await this.handleInfoBtnClick();
        }
        catch (err) {
            console.log(err);
        }
    }
}
export default HeroMovie;
