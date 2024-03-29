import { observeHero } from './components/observer.js'
import Controller from './Controller/Controller.js'

const selectedCategories = ['best', 'Sci-Fi', 'Action', 'Animation']

async function main (categoryNames: string[]): Promise<void> {
  observeHero()
  const controller = new Controller()
  await controller.setHeroMovie()
  await controller.setMovies(categoryNames)
  await controller.setDOM()
}

await main(selectedCategories)
