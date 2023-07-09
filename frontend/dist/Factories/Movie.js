class Movie {
    constructor(category, id, actors, directors, genres, imageUrl, imdbScore, imdbUrl, title, url, votes, writers, year) {
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
    }
    logId() {
        console.log(this.id);
    }
    createThumbnail() {
        const template = document.querySelector('#template_movie');
        const clone = template.content.cloneNode(true);
        const articleElement = clone.querySelector('article');
        const imgElement = clone.querySelector('img');
        const dataIdElement = articleElement.querySelector('[data-id]');
        // Set the attributes of the elements
        articleElement.setAttribute('id', `movie-${this.id}`);
        imgElement.setAttribute('src', this.imageUrl);
        imgElement.setAttribute('alt', this.title);
        dataIdElement.setAttribute('data-id', this.id.toString());
        // Append the cloned template to the DOM
        document.body.appendChild(clone);
    }
    createModal() {
        const template = document.querySelector('#template_movie');
        console.log(template);
        if (template == null)
            return;
        const clone = template.content.cloneNode(true);
        // Get references to the elements in the template
        const titleElement = clone.querySelector('#modal_movie_title');
        const genreElement = clone.querySelector('#modal_genre_content');
        const releaseElement = clone.querySelector('#modal_release_content');
        const ratingElement = clone.querySelector('#modal_rating_content');
        const imdbElement = clone.querySelector('#modal_imdb_content');
        const directorElement = clone.querySelector('#modal_director_content');
        const castingElement = clone.querySelector('#modal_casting_content');
        // Set the text content of the elements
        titleElement.textContent = this.title;
        genreElement.textContent = this.genres.join(', ');
        releaseElement.textContent = this.year.toString();
        ratingElement.textContent = this.imdbScore;
        imdbElement.textContent = this.imdbUrl;
        directorElement.textContent = this.directors.join(', ');
        castingElement.textContent = this.actors.join(', ');
        document.body.appendChild(clone);
    }
}
export default Movie;
