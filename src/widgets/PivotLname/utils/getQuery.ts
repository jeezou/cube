import { QueryBody, SearchRow } from './types'

export const getQueryBody = (fields: SearchRow[]): QueryBody => {
  let result: { year: string; lname: string; grpName2: string } = {
    year: '',
    lname: '',
    grpName2: '',
  }

  fields.forEach((field) => {
    const title = field.title
    if (field.value && field.value.length !== 0) {
      result[title] = field.value
    }
  })

  return result
}
