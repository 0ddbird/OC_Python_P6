import { observeHero } from './components/observer.js';
import { addModalEventListeners } from './components/modal.js';
const main = () => {
    addModalEventListeners();
    observeHero();
};
main();
