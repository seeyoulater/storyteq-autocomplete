import { defineStore } from 'pinia'
import { SearchResult } from '@/shared/ui/autocomplete/types.ts'
import { ref } from 'vue'

export const useSearchStore = defineStore('searchStore', () => {
  const selectedCity = ref<SearchResult | null>(null)
  const selectedBook = ref<SearchResult | null>(null)

  return {
    selectedCity,
    selectedBook
  }
})
