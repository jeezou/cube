import { downloadDataBody } from '~/src/features/DownloadXLSX/api'
import { getQueryBody } from '../utils/getQuery'
import { getPivotData } from '../api/PivotData'
import { initialSearch } from '../utils/initialTitles'
import { PivotMonthRow, QueryBody, SearchRow } from '../utils/types'
import { addPivotDictionaries } from '~/src/features/loadDictionaries'

export const pivotContent = ref<PivotMonthRow[] | null>(null)
export const isDownload = ref(false)
export const isLoading = ref(false)
export const activePage = ref(0)
export const total = ref<{}>({})
export const pageSize = ref(10)
export const queryBody = ref<QueryBody | null>(null)
export const fields = ref<SearchRow[]>(initialSearch)
export const brands = ref<string[]>([])

export const onSubmit = async () => {
  return await loadPivotData()
}

export const loadPivotData = async () => {
  if (isDownload.value || isLoading.value) return
  try {
    setIsLoading(true)
    queryBody.value = getQueryBody(fields.value)
    const pivotData = await getPivotData(queryBody.value)
    addPivotDictionaries(pivotData.dictionaries.dictionaries, fields.value)
    pivotContent.value = pivotData.summary_map
    total.value = pivotData.monthly_sum
  } catch (err) {
    console.log(err)
  } finally {
    setIsLoading(false)
  }
}

export const onDownload = async () => {
  if (isDownload.value) return
  try {
    setIsDownload(true)
    if (queryBody.value !== null) {
      await downloadDataBody(queryBody.value, 'brands')
    }
  } catch (err) {
    console.log(err)
  } finally {
    setIsDownload(false)
  }
}

export const setIsDownload = (value: boolean) => {
  isDownload.value = value
}

const setIsLoading = (value: boolean) => {
  isLoading.value = value
}

export const required = (value: string[] | string) => {
  if (Array.isArray(value)) {
    return value.length || 'Это поле обязательно'
  }
  return value || 'Это поле обязательно'
}
