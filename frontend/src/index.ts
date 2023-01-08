import { observeHero } from './components/observer.js'
import { addModalEventListeners } from './components/modal.js'

const main = (): void => {
  addModalEventListeners()
  observeHero()
}

main()
