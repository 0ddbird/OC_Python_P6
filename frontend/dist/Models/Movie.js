class Movie {
    constructor(category, id, actors, directors, genres, imageUrl, imdbScore, imdbUrl, title, url, votes, writers, year, duration = null, countries = null, rated = null, longDescription = null, boxOffice = null) {
        this.category = category;
        this.id = id;
        this.actors = actors;
        this.directors = directors;
        this.genres = genres;
        this.imageUrl = imageUrl;
        this.imdbScore = imdbScore;
        this.imdbUrl = imdbUrl;
        this.title = title;
        this.url = url;
        this.votes = votes;
        this.writers = writers;
        this.year = year;
        this.duration = duration;
        this.countries = countries;
        this.rated = rated;
        this.longDescription = longDescription;
        this.boxOffice = boxOffice;
    }
    createThumbnail(root) {
        const template = document.querySelector('#template_movie');
        const clone = template.content.cloneNode(true);
        const articleElement = clone.querySelector('article');
        const imgElement = clone.querySelector('img');
        const btnElement = clone.querySelector('.btn_icon');
        articleElement.setAttribute('id', `movie-${this.id}`);
        imgElement.setAttribute('src', this.imageUrl);
        imgElement.setAttribute('alt', this.title);
        btnElement.setAttribute('data-id', this.id.toString());
        btnElement.addEventListener('click', () => {
            this.handleInfoBtnClick().catch((err) => {
                console.log(err);
            });
        });
        root.appendChild(clone);
    }
    async handleInfoBtnClick() {
        if ([
            this.duration,
            this.countries,
            this.rated,
            this.longDescription,
            this.boxOffice
        ].some((property) => property == null)) {
            await this.fetchDetails();
        }
        this.openModal();
        await Promise.resolve();
    }
    async fetchDetails() {
        const fetchParams = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`http://localhost:8000/api/v1/titles/${this.id}`, fetchParams);
            const result = await response.json();
            const { duration, countries, rated, description, worldwideGrossIncome } = result;
            this.duration = duration ?? 'Inconnu';
            this.countries = countries;
            this.rated = rated ?? 'Inconnu';
            this.longDescription = description ?? 'Inconnue';
            this.boxOffice = worldwideGrossIncome ?? 'Inconnu';
        }
        catch (e) {
            console.log(e);
        }
    }
    openModal() {
        const template = document.querySelector('#template_modal');
        if (template == null)
            return;
        const clone = template.content.cloneNode(true);
        const imgElement = clone.querySelector('#modal_movie_picture');
        const titleElement = clone.querySelector('#modal_movie_title');
        const genreElement = clone.querySelector('#modal_genre_content');
        const releaseElement = clone.querySelector('#modal_release_content');
        const ratingElement = clone.querySelector('#modal_rating_content');
        const imdbElement = clone.querySelector('#modal_imdb_content');
        const directorElement = clone.querySelector('#modal_director_content');
        const castingElement = clone.querySelector('#modal_casting_content');
        const durationElement = clone.querySelector('#modal_duration_content');
        const countryElement = clone.querySelector('#modal_country_content');
        const boxOfficeElement = clone.querySelector('#modal_box-office_content');
        const synopsysElement = clone.querySelector('#modal_synopsis_content');
        imgElement.setAttribute('src', this.imageUrl);
        imgElement.setAttribute('alt', this.title);
        titleElement.textContent = this.title;
        genreElement.textContent = this.genres.join(', ');
        releaseElement.textContent = this.year.toString();
        ratingElement.textContent = this.rated;
        imdbElement.textContent = this.imdbScore;
        directorElement.textContent = this.directors.join(', ');
        castingElement.textContent = this.actors.join(', ');
        durationElement.textContent = this.duration != null ? `${this.duration} mins` : 'Inconnu';
        countryElement.textContent = this.countries?.join(', ') ?? 'Inconnu';
        boxOfficeElement.textContent = this.boxOffice ?? 'Inconnu';
        synopsysElement.textContent = this.longDescription ?? 'Inconnu';
        document.body.appendChild(clone);
        const modalBackground = document.querySelector('#modal-background');
        const modalCloseButton = document.querySelector('#modal_close-btn');
        modalBackground.classList.add('displayed');
        modalBackground.classList.remove('hidden');
        modalCloseButton.addEventListener('click', this.closeModal);
    }
    closeModal() {
        const modalBackground = document.querySelector('#modal-background');
        document.body.removeChild(modalBackground);
    }
}
export default Movie;
