import { observeHero } from './components/observer.js'
import Controller from './Controller/Controller.js'

const selectedCategories = ['Action', 'Sci-Fi', 'Adventure']

async function main (categoryNames: string[]): Promise<void> {
  observeHero()
  const controller = new Controller()
  await controller.getMovies(categoryNames)
  controller.buildDOM()
}

await main(selectedCategories)
