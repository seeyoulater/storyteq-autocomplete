import { expect, test, describe } from 'vitest'
import { Book } from '@/shared/api/types.ts'
import { booksToAutocompleteOptions } from '@/features/BookAutocomplete/domain.ts'

const books: Book[] = [
  {
    title: 'C Book 789',
    author: 'S. King',
  },
  {
    title: 'B Book 456',
    author: 'John Doe',
  },
  {
    title: 'A Book 123',
    author: 'John Doe',
  },
]

describe('BookAutocomplete | domain', () => {
  describe('booksToAutocompleteOptions', () => {
    test('should map books to autocomplete options', () => {
      const [option] = booksToAutocompleteOptions(books, '')

      expect(option.id).toBeDefined()
    })

    test('should sort books alphabetically by title', () => {
      const res = booksToAutocompleteOptions(books, '')

      expect(res[0].label).toBe('A Book 123')
    })

    test('should filter books by title', () => {
      const res = booksToAutocompleteOptions(books, 'B Book')

      expect(res.length).toBe(1)
    })

    test('should filter books by author', () => {
      const res = booksToAutocompleteOptions(books, 'john doe')

      expect(res.length).toBe(2)
    })
  })
})
