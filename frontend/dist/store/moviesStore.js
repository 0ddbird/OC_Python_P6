import Movie from '../Factories/movieFactory.js';
const Store = {};
function storeMovies(fetchResult, category) {
    fetchResult.forEach((entry) => {
        const movie = new Movie(category, entry.id, entry.actors, entry.directors, entry.genres, entry.image_url, entry.imdb_score, entry.imdb_url, entry.title, entry.url, entry.votes, entry.writers, entry.year);
        if (Store[`${category}`] != null) {
            Store[`${category}`] = [...Store[`${category}`], movie];
        }
        else {
            Store[`${category}`] = [movie];
        }
    });
}
export { Store, storeMovies };
