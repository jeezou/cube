import { ExtraField } from '../features/ExtraFields/libs/types'

export enum InfoType {
  number = 'number',
  ru_string = 'ru_string',
}

export type FieldType = {
  title: string
  value: string | string[] | ExtraField
  disabled?: boolean
  dictionary?: string[] | number[] | number
  type?: InfoType
}

export enum PivotExtraField {
  all = 'Выбрать все',
  reset = 'Очистить',
}
