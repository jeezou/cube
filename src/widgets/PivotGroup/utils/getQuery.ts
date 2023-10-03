import { QueryBody, SearchRow } from './types'

export const getQueryBody = (fields: SearchRow[]): QueryBody => {
  let result: { year: string; grpName2s: string[] } = {
    year: '',
    grpName2s: [],
  }

  fields.forEach((field) => {
    if (
      field.value &&
      field.value.length !== 0 &&
      !Array.isArray(field.value)
    ) {
      result.year = field.value
    }
    if (field.value && field.value.length !== 0 && Array.isArray(field.value)) {
      result.grpName2s = field.value
    }
  })

  return result
}
