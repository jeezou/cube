import { QueryBody, SearchRow } from './types'

export const getQueryBody = (fields: SearchRow[]): QueryBody => {
  let result: QueryBody = { year: '', months: [], brands: [] }

  fields.forEach((field) => {
    if (field.value.length !== 0) {
      const title = field.title
      result[title] = field.value
    }
  })

  return result
}
