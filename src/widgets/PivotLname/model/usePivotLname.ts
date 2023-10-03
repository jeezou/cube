import { downloadDataBody } from '~/src/features/DownloadXLSX/api'
import { getPivotData } from '../api/PivotData'
import { initialSearch, initialTitles } from '../utils/initialTitles'
import { getQueryBody } from '../utils/getQuery'
import { PivotLnameRow } from '../utils/types'
import { addPivotDictionaries } from '~/src/features/loadDictionaries'

export const pivotContent = ref<PivotLnameRow[] | null>(null)
export const isDownload = ref(false)
export const isLoading = ref(false)
export const activePage = ref(0)
export const total = ref<number>()
export const pageSize = ref(10)
export const queryBody = ref()
export const titles = ref<string[]>(initialTitles)
export const fields = ref(initialSearch)

export const onSubmit = async () => {
  await loadFilteredData()
}

export const loadFilteredData = async () => {
  if (isDownload.value || isLoading.value) return
  try {
    setIsLoading(true)
    queryBody.value = getQueryBody(fields.value)
    const pivotData = await getPivotData(queryBody.value)
    addPivotDictionaries(pivotData.dictionaries.dictionaries, fields.value)
    pivotContent.value = pivotData.lname_sum_map_by_brand
    total.value = pivotData.total
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
      await downloadDataBody(queryBody.value, 'lnames')
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
