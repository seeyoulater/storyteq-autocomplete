import { expect, test, describe } from 'vitest'
import { citiesToAutocompleteOptions } from '@/features/CItyAutocomplete/domain.ts'
import { City } from '@/shared/api/types.ts'

const cities: City[] = [
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
  'aaa',
  'bbb'
]

describe('CityAutocomplete | domain', () => {
  describe('citiesToAutocompleteOptions', () => {
    test('should map cities to autocomplete options', () => {
      const [option] = citiesToAutocompleteOptions(cities, '')

      expect(option.id).toBeDefined()
    })

    test('should sort cities alphabetically', () => {
      const [firstOption] = citiesToAutocompleteOptions(cities, '')

      expect(firstOption.label).toBe('aaa')
    })

    test('should filter cities by query', () => {
      const res = citiesToAutocompleteOptions(cities, 'tel aviv')

      expect(res.length).toBe(1)
    })
  })
})