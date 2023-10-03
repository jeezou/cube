import { Dictionaries } from '~/src/features/loadDictionaries/utils/types'

export type FilterTitleRow = {
  brand: string
  category: string
  city: string
  client_name: string
  code: number
  dm_store_format: string
  grp_name: string
  grp_name2: string
  id: number
  lname: string
  month: string
  oblast: string
  one: string
  purse_value: number
  region: string
  sales_item: number
  sales_value: number
  store_add: string
  store_format: string
  store_no: number
  type: string
  xcode: number
  xname: string
  year: number
}

type Sort = { empty: boolean; unsorted: boolean; sorted: boolean }

type Pageable = {
  sort: Sort
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
}

export type FilterResponce = {
  dictionaries: Dictionaries
  filtered_sales_reports: {
    content: FilterTitleRow[]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    pageable: Pageable
    size: number
    sort: Sort
    totalElements: number
    totalPages: number
  }
  purse_value_summary: number
  sales_item_summary: number
  sales_value_summary: number
}

export type QueryBodyType = Record<string, string | string[] | number>

export type SalesData = {
  salesItem: number
  salesValue: number
  purseValue: number
}
