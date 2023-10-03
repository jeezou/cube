import { Dictionaries } from '~/src/features/loadDictionaries/utils/types'

export type PivotMonthRow = {
  [key: string]: { month: string; sum: number }[]
}

export type SearchRow = {
  title: string
  value: string | string[]
  dictionary: string[]
}

export type QueryBody = {
  year: string
  months: string[]
  brands: string[]
}

export type PivotMonthResponce = {
  dictionaries: { dictionaries: Dictionaries }
  summary_map: PivotMonthRow[]
  monthly_sum: MonthlySumType[]
}

export type MonthlySumType = {
  [key: string]: number
}
