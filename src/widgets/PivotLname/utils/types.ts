import { Dictionaries } from '~/src/features/loadDictionaries/utils/types'

export type PivotLnameRow = { [key: string]: number }

export type SearchRow = {
  title: string
  value: string[]
  dictionary: string[]
}

export type PivotLnameResponce = {
  dictionaries: { dictionaries: Dictionaries }
  grp_name2: string
  lname: string
  lname_sum_map_by_brand: PivotLnameRow[]
  total: number
}

export type QueryBody = {
  year: string
  lname: string
  grpName2: string
}
