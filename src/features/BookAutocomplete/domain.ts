import { Book } from '@/shared/api/types.ts'
import { searchBy } from '@/shared/lib/searchBy.ts'

export const booksToAutocompleteOptions = (books: Book[], query: string) => {
  return books
    .concat()
    .sort((a, b) => a.title.localeCompare(b.title))
    .filter(searchBy(query, ['title', 'author']))
    .map((item) => ({ id: item.title, label: item.title, description: item.author }))
}
