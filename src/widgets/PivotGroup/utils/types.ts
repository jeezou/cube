export type PivotGroupRow = { [key: string]: { month: string; sum: number }[] }

export type SearchRow = {
  title: string
  value: string[]
  dictionary: string[]
}

export type PivotGroupResponce = {
  group_summary: PivotGroupRow[]
  total_sum: number
}

export type QueryBody = {
  year: string
  grpName2s: string[]
}
