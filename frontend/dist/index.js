import { observeHero } from './components/observer.js';
import Controller from './Controller/Controller.js';
const selectedCategories = ['Action', 'Sci-Fi', 'Adventure'];
async function main(categoryNames) {
    observeHero();
    const controller = new Controller();
    await controller.getMovies(categoryNames);
    controller.buildDOM();
}
await main(selectedCategories);
