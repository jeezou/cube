export interface OperationItem {
  current_count: number
  date_created: string
  file_name: string
  id: number
  percent: string
  total_count: number
  status: number
}

export interface SortType {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface Pageable {
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  sort: SortType
  unpaged: boolean

}

export interface OperationsResponse{
  content?: OperationItem[] | null
  empty?: boolean
  first?: boolean
  last?: boolean
  number?: number
  numberOfElements?: number
  pageable?: Pageable
  size?: number
  sort?: SortType
  totalElements?: number
  totalPages?: number

}

export interface SingleOperation{

}