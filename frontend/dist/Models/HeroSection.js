import Movie from './Movie.js';
class HeroMovie extends Movie {
    async buildDOM() {
        await this.fetchDetails();
        const heroCover = document.querySelector('#hero_cover');
        const heroDescription = document.querySelector('#hero_description');
        const heroInfoBtn = document.querySelector('#hero_info_btn');
        heroCover.setAttribute('src', this.imageUrl);
        heroCover.setAttribute('alt', this.title);
        heroDescription.innerText = this.longDescription ?? 'Inconnu';
        heroInfoBtn.addEventListener('click', () => {
            this.handleInfoBtnClick().catch((err) => {
                console.log(err);
            });
        });
    }
}
export default HeroMovie;
