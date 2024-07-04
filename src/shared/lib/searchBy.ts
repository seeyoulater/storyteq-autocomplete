export function searchBy<T extends string>(query: string): (item: T) => boolean
export function searchBy<T extends Record<string, string>>(
  query: string,
  fields: Array<keyof T>,
): (item: T) => boolean
export function searchBy<T extends string | Record<string, string>>(
  query: string,
  fields?: Array<keyof T>,
): (item: T) => boolean {
  if (typeof fields === 'undefined') {
    return (item: T) => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(query.toLowerCase())
      }
      return false
    }
  }

  return (item: T) => {
    return fields.some((field) => {
      if (typeof item[field] === 'string') {
        return item[field].toLowerCase().includes(query.toLowerCase())
      }
      return false
    })
  }
}
