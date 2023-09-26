function setElementText(element, text, fallback = 'Inconnu') {
    if (element) {
        element.textContent = text ?? fallback;
    }
}
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
        // Get the HTML template in the DOM
        const template = document.querySelector('#template_modal');
        if (template == null)
            return;
        const clone = template.content.cloneNode(true);
        // Set the movie impage in the template clone
        const imgElement = clone.querySelector('#modal_movie_picture');
        if (imgElement) {
            imgElement.setAttribute('src', this.imageUrl);
            imgElement.setAttribute('alt', this.title);
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
        ];
        modalDOMMap.forEach(element => setElementText(clone.querySelector(element.selector), element.textContent));
        // Append the clone to the document body
        document.body.appendChild(clone);
        // Display the modal
        const modalBackground = document.querySelector('#modal-background');
        const modalCloseButton = document.querySelector('#modal_close-btn');
        if (!modalBackground || !modalCloseButton)
            return;
        modalBackground.classList.add('displayed');
        modalBackground.classList.remove('hidden');
        modalCloseButton.addEventListener('click', this.closeModal);
    }
    closeModal() {
        const modalBackground = document.querySelector('#modal-background');
        if (modalBackground)
            document.body.removeChild(modalBackground);
    }
}
export default Movie;
