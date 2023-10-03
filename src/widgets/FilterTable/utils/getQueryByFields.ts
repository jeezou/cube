import { parseSortField } from './parseSortField'
import { ExtraField, FieldType } from '../features/GenerateTable/utils/types'
import { QueryBodyType } from './types'

export const getQuery = (
  fields: FieldType[],
  pageSize?: number,
  pageIndex?: number,
  sortedField?: { field: string; isAsc: boolean }
) => {
  let result: QueryBodyType = {}

  fields.forEach((field: FieldType) => {
    if (Array.isArray(field.value) && field.value.includes(ExtraField.empty)) {
      result[field.title] = getEmptyCode(field.title)
      return
    }
    if (Array.isArray(field.value) && field.value.includes(ExtraField.filled)) {
      result[field.title] = getFilledCode(field.title)
      return
    }
    if (Array.isArray(field.value) && field.value.length !== 0) {
      result[field.title] = field.value.join(';')
      return
    }
    if (field.value.length !== 0) {
      result[field.title] = field.value
      return
    }
  })
  if (pageSize) {
    result['size'] = pageSize
  }
  if (pageIndex) {
    result['page'] = pageIndex
  }
  if (sortedField) {
    // result['sort_prop'] = parseSortField(sortedField.field)
    result['sort_prop'] = sortedField.field
    result['sorting'] = sortedField.isAsc ? 'ASC' : 'DESC'
  }
  return result
}

const getEmptyCode = (title: string) => {
  switch (title) {
    case 'xcode':
    case 'code':
    case 'year':
    case 'store_no':
      return `8888`
    default:
      return `null`
  }
}

const getFilledCode = (title: string) => {
  switch (title) {
    case 'xcode':
    case 'code':
    case 'year':
    case 'store_no':
      return `9999`
    default:
      return `notNull`
  }
}
