import Movie from './Movie.js';
import { fetchMovies } from '../api/api.js';
class Category {
    constructor(name, title, movies, next, DOMElement = null, translateValue = 0, range = 10, sliceIndex = 0) {
        this.name = name;
        this.title = title;
        this.movies = movies;
        this.next = next;
        this.DOMElement = DOMElement;
        this.translateValue = translateValue;
        this.range = range;
        this.sliceIndex = sliceIndex;
        this.root = document.querySelector('#categories');
    }
    async buildDOM() {
        // Select and clone HTML Template
        const template = document.querySelector('#template_category');
        if (template?.content == null)
            return;
        const clone = template.content.cloneNode(true);
        // Select clone elements
        const btnPrevious = clone.querySelector('.arrow-button.previous');
        const btnNext = clone.querySelector('.arrow-button.next');
        const titleElement = clone.querySelector('.category_title');
        const containerElement = clone.querySelector('.movies_container');
        // Set custom id to container
        containerElement.setAttribute('id', `category-${this.name}`);
        // Fill elements content
        titleElement.innerText = `${this.title.charAt(0).toUpperCase()}${this.title.slice(1)}`;
        this.DOMElement = clone.querySelector('.category');
        // Create the thumbnails for the first movies in range
        this.movies.forEach(movie => {
            movie.createThumbnail(containerElement);
        });
        // Add navigation arrows event listeners
        btnPrevious.addEventListener('click', (e) => {
            if (this.translateValue < 0) {
                this.translateValue += 100;
                this.sliceIndex -= this.range;
                this.slide(e, this.name, this.translateValue);
            }
        });
        btnNext.addEventListener('click', (e) => {
            this.sliceIndex += this.range;
            this.translateValue -= 100;
            this.slide(e, this.name, this.translateValue);
            if (this.movies.length <= this.sliceIndex) {
                this.fetchNext().catch((err) => {
                    console.log(err);
                });
            }
        });
        // Append category to DOM
        this.root.appendChild(clone);
    }
    buildMovie(entry, categoryName) {
        return new Movie(categoryName, entry.id, entry.actors, entry.directors, entry.genres, entry.image_url, entry.imdb_score, entry.imdb_url, entry.title, entry.url, entry.votes, entry.writers, entry.year);
    }
    appendNextMovie(movies) {
        const selector = `#category-${this.name}`;
        const container = document.querySelector(selector);
        movies.forEach(movie => {
            movie.createThumbnail(container);
        });
    }
    async fetchNext() {
        if (this.next == null)
            return;
        const response = await fetchMovies(this.name, this.range, this.next);
        if (response == null)
            return;
        const nextMovies = response.results.map(entry => this.buildMovie(entry, this.name));
        if (response.next != null)
            this.next += 1;
        else
            this.next = null;
        nextMovies.forEach(movie => this.movies.push(movie));
        this.appendNextMovie(nextMovies);
    }
    slide(e, categoryName, translateValue) {
        const selector = `#category-${categoryName}`;
        const container = document.querySelector(selector);
        container.style.transform = `translateX(${translateValue}%)`;
    }
}
export default Category;
