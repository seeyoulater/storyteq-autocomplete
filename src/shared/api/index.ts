import { delayedPromise } from '@/shared/lib/delayedPromise.ts'
import { Book, City } from '@/shared/api/types.ts'

export const api = {
  getCities(): Promise<City[]> {
    return delayedPromise([
      'san jose',
      'santiago',
      'san francisco',
      'santa rosa',
      'san juan',
      'sabadell',
      'salamanca',
      'salt lake city',
      'salinas',
      'salem',
      'sausalito',
      'taipei',
      'tel aviv',
      'tempe',
      'termez',
      'temuco',
      'tiajuna',
      'tieling',
      'thousand oaks',
      'thunder bay',
      'tokyo',
      'tulsa',
    ])
  },
  getBooks(): Promise<Book[]> {
    // In a real app, this might fetch data from an API
    return delayedPromise([
      { title: 'Don Quixote', author: 'Miguel De Cervantes' },
      { title: "Pilgrim's Progress", author: 'John Bunyan' },
      { title: 'Robinson Crusoe', author: 'Daniel Defoe' },
      { title: "Gulliver's Travels", author: 'Jonathan Swift' },
      { title: 'Tom Jones', author: 'Henry Fielding' },
      { title: 'Clarissa', author: 'Samuel Richardson' },
      { title: 'Tristram Shandy', author: 'Laurence Sterne' },
    ])
  },
}
