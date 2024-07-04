import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Book, City } from '@/shared/api/types.ts'
import { api } from '@/shared/api'

export const useDictionaryStore = defineStore('dictionaryStore', () => {
  const cities = ref<City[]>([])
  const books = ref<Book[]>([])

  const isLoadingCities = ref(false)
  const isLoadingBooks = ref(false)

  const fetchCities = async () => {
    try {
      isLoadingCities.value = true
      cities.value = await api.getCities()
    } catch (e) {
      console.error(e)
    } finally {
      isLoadingCities.value = false
    }
  }

  const fetchBooks = async () => {
    try {
      isLoadingBooks.value = true
      books.value = await api.getBooks()
    } catch (e) {
      console.error(e)
    } finally {
      isLoadingBooks.value = false
    }
  }

  return {
    cities,
    books,
    isLoadingCities,
    isLoadingBooks,
    fetchCities,
    fetchBooks,
  }
})
