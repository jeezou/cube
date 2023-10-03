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

export enum ExtraField {
  empty = 'Пустые поля',
  filled = 'Заполненные',
}
