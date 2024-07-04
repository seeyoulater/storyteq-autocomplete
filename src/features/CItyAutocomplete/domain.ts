import { City } from '@/shared/api/types.ts'
import { searchBy } from '@/shared/lib/searchBy.ts'

export const citiesToAutocompleteOptions = (cities: City[], query: string) => {
  return cities
    .concat()
    .sort((a, b) => a.localeCompare(b))
    .filter(searchBy(query))
    .map((label) => ({ id: label, label }))
}
