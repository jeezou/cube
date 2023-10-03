import { downloadDataBody } from '~/src/features/DownloadXLSX/api'
import { getQueryBody } from '../utils/getQuery'
import { getPivotData } from '../api/PivotData'
import { initialSearch, initialTitles } from '../utils/initialTitles'
import { PivotGroupRow, QueryBody } from '../utils/types'

export const pivotContent = ref<PivotGroupRow[] | null>(null)
export const isDownload = ref(false)
export const isLoading = ref(false)
export const activePage = ref(0)
export const total = ref<number>()
export const pageSize = ref(10)
export const queryBody = ref<QueryBody | null>(null)
export const titles = ref<string[]>(initialTitles)
export const fields = ref(initialSearch)

export const onSubmit = async () => {
  return await loadFilteredData()
}

export const loadFilteredData = async () => {
  if (isDownload.value || isLoading.value) return
  try {
    setIsLoading(true)
    queryBody.value = getQueryBody(fields.value)
    const pivotData = await getPivotData(queryBody.value)
    pivotContent.value = pivotData.group_summary
    total.value = pivotData.total_sum
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
      await downloadDataBody(queryBody.value, 'groups')
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
