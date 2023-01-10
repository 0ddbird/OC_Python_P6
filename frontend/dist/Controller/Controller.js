import Category from '../Models/Category.js';
import { fetchMovies } from '../api/api.js';
import Movie from '../Models/Movie.js';
class Controller {
    constructor(categories = []) {
        this.categories = categories;
    }
    async getMovies(categoryNames) {
        for (const categoryName of categoryNames) {
            const response = await fetchMovies(categoryName, 10);
            if (response == null)
                return;
            const movies = response.results.map((entry) => {
                return new Movie(categoryName, entry.id, entry.actors, entry.directors, entry.genres, entry.image_url, entry.imdb_score, entry.imdb_url, entry.title, entry.url, entry.votes, entry.writers, entry.year);
            });
            const category = new Category(categoryName, categoryName, movies);
            this.categories.push(category);
        }
    }
    buildDOM() {
        this.categories.forEach((category) => {
            category.buildDOM();
        });
    }
}
export default Controller;
