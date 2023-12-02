import Category from '../Models/Category.js';
import { fetchHeroMovie, fetchMovies } from '../api/api.js';
import Movie from '../Models/Movie.js';
import HeroMovie from '../Models/HeroSection.js';
class Controller {
    constructor(categories = [], heroMovie = null) {
        this.categories = categories;
        this.heroMovie = heroMovie;
    }
    buildMovie(entry, categoryName) {
        return new Movie(categoryName, entry.id, entry.actors, entry.directors, entry.genres, entry.image_url, entry.movie_url, entry.imdb_score, entry.imdb_url, entry.title, entry.url, entry.votes, entry.writers, entry.year);
    }
    buildHeroMovie(entry, categoryName) {
        return new HeroMovie(categoryName, entry.id, entry.actors, entry.directors, entry.genres, entry.image_url, entry.movie_url, entry.imdb_score, entry.imdb_url, entry.title, entry.url, entry.votes, entry.writers, entry.year);
    }
    async setHeroMovie() {
        const response = await fetchHeroMovie();
        if (response == null)
            return;
        this.heroMovie = this.buildHeroMovie(response.results[0], 'hero');
    }
    async setMovies(categoryNames) {
        for (const categoryName of categoryNames) {
            const response = await fetchMovies(categoryName, 10);
            if (response == null)
                return;
            const movies = response.results.map((entry) => this.buildMovie(entry, categoryName));
            const next = response.next == null ? null : 2;
            let category;
            if (categoryName === 'best')
                category = new Category(categoryName, 'Les mieux notés', movies, next);
            else
                category = new Category(categoryName, categoryName, movies, next);
            this.categories.push(category);
        }
    }
    async setHeroSection() {
        if (this.heroMovie == null)
            return;
        await this.heroMovie.buildDOM();
    }
    async setCategories() {
        for (const category of this.categories) {
            await category.buildDOM();
        }
    }
    async setDOM() {
        await this.setHeroSection();
        await this.setCategories();
    }
}
export default Controller;
