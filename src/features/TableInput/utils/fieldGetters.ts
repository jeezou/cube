import { FieldType, InfoType } from './types'

export const isOdd = (index: number) => Math.floor(index % 2) === 0

export const getSortIcon = (
  field: string,
  sortedField?: { field: string; isAsc: boolean }
) => {
  if (field !== sortedField?.field) return 'mdi-sort-descending'
  if (field === sortedField?.field && sortedField.isAsc)
    return 'mdi-sort-descending'
  return 'mdi-sort-ascending'
}

export const getFieldValue = (field: FieldType) => {
  if (field.value === 'null' || field.value === '3770737707')
    return 'Пустые поля'
  return !field.disabled ? field.value : '     --//--'
}

const numberPattern = /[^0-9]/g
const ruStringPattern = /^[A-Za-z]+$/i

export const validateField = (field: FieldType, value: string) => {
  if (field.type === InfoType.number) {
    return value.replace(numberPattern, '')
  }
  if (field.type === InfoType.ru_string) {
    return value.replace(ruStringPattern, '')
  }

  return value
}

export const formValidationMessage = (field: FieldType, eventValue: string) => {
  if (field.type === InfoType.number && numberPattern.test(eventValue)) {
    return 'Для ввода допустимы только цифры'
  }
  if (field.type === InfoType.ru_string && ruStringPattern.test(eventValue)) {
    return 'Для ввода допустимы только русские буквы'
  }
  return ''
}
