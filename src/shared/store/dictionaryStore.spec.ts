import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDictionaryStore } from './dictionaryStore'
import { api } from '@/shared/api'
import { Book, City } from '@/shared/api/types.ts'

vi.mock('@/shared/api', () => ({
  api: {
    getCities: vi.fn(),
    getBooks: vi.fn()
  }
}))

describe.only('dictionaryStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('fetches cities successfully', async () => {
    const mockCities: City[] = ['New York']
    vi.mocked(api.getCities).mockResolvedValue(mockCities)
    const store = useDictionaryStore()

    expect(store.isLoadingCities).toBe(false)
    await store.fetchCities()
    expect(store.isLoadingCities).toBe(false)
    expect(store.cities).toEqual(mockCities)
  })

  it('handles error when fetch cities fails', async () => {
    vi.mocked(api.getCities).mockRejectedValue(new Error('API error'))
    const store = useDictionaryStore()

    await store.fetchCities()
    expect(store.isLoadingCities).toBe(false)
    expect(store.cities).toEqual([])
  })

  it('fetches books successfully', async () => {
    const mockBooks: Book[] = [{ title: 'books', author: 'John doe' }]
    vi.mocked(api.getBooks).mockResolvedValue(mockBooks)
    const store = useDictionaryStore()

    expect(store.isLoadingBooks).toBe(false)
    await store.fetchBooks()
    expect(store.isLoadingBooks).toBe(false)
    expect(store.books).toEqual(mockBooks)
  })

  it('handles error when fetch books fails', async () => {
    vi.mocked(api.getBooks).mockRejectedValue(new Error('API error'))
    const store = useDictionaryStore()

    await store.fetchBooks()
    expect(store.isLoadingBooks).toBe(false)
    expect(store.books).toEqual([])
  })
})