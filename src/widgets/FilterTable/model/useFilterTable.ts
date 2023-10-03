//@ts-ignore
import { downloadData } from '/src/features/DownloadXLSX/api.ts'
import { initialFields } from '../features/GenerateTable/utils/initialFields'
import { getQuery } from '../utils/getQueryByFields'
import { getFilteredData } from '../api/FilteredData'
import { getSalesData } from '../api/SalesData'
import { getFieldRequest } from '../api/getField'
import { FilterTitleRow } from '../utils/types'
import { FieldType } from '../features/GenerateTable/utils/types'
import formTotalData from './lib/formTotalData'
import { addDictionaries } from '~/src/features/loadDictionaries'

export const filteredContent = ref<FilterTitleRow[] | null>(null)
export const isDownload = ref(false)
export const isLoading = ref(false)
export const isSalesLoading = ref(false)
export const sortedField = ref<{ field: string; isAsc: boolean }>()
export const activePage = ref(1)
export const total = ref({
  pages: 0,
  elements: 0,
  salesItem: 0,
  salesValue: 0,
  purseValue: 0,
})
export const pageSize = ref(10)
export const query = ref({})
export const fields = ref<FieldType[]>(initialFields)

const lastFieldClicked = ref('')

export const onSubmit = async () => {
  return await loadFilteredData()
}

export const getField = async (field: string) => {
  console.log(lastFieldClicked.value !== field)
  if(lastFieldClicked.value !== field){
    setIsLoading(true)
    lastFieldClicked.value = field
    const res = await getFieldRequest(field, query.value)
    console.log(res)
    addDictionaries(field, res, fields.value)
    setIsLoading(false)
  }
}

export const getSalesCounters = async () => await getSalesData(query.value)

export const getTableData = async ( pageSizeProp = pageSize.value,
                                    pageIndex?: number,
                                    sortedField?: { field: string; isAsc: boolean }) => {
  query.value = getQuery(fields.value, pageSizeProp, pageIndex, sortedField)
  await nextTick()
  const filteredData = await getFilteredData(query.value)
  const { totalResult, content } = formTotalData(filteredData)
  // addDictionaries(dictionaries, fields.value)
  total.value.elements = totalResult.elements
  total.value.pages = totalResult.pages
  filteredContent.value = content
}
export const paginateData = async (pageSizeProp = pageSize.value,
                                   pageIndex?: number,
                                   sortedField?: { field: string; isAsc: boolean }) => {
  if (isDownload.value || isLoading.value) return
  try {
    setIsLoading(true)
    await getTableData(pageSizeProp, pageIndex, sortedField)
  } catch (err) {
    console.log(err)
  } finally {
    setIsLoading(false)
  }
}

export const loadFilteredData = async (
  pageSizeProp = pageSize.value,
  pageIndex?: number,
  sortedField?: { field: string; isAsc: boolean }
) => {
  if (isDownload.value || isLoading.value) return
  try {
    setIsLoading(true)
    await getTableData(pageSizeProp, pageIndex, sortedField)
  } catch (err) {
    console.log(err)
  } finally {
    setIsLoading(false)
    const { salesItem, salesValue, purseValue } = await getSalesCounters()
    total.value.purseValue = purseValue
    total.value.salesItem = salesItem
    total.value.salesValue = salesValue
  }
}

export const onDownload = async () => {
  if (isDownload.value) return
  try {
    setIsDownload(true)
    await downloadData(query.value)
  } catch (err) {
    console.log(err)
  } finally {
    setIsDownload(false)
  }
}

export const onReset = () => {
  fields.value.forEach((field) => (field.value = []))
  loadFilteredData()
}

export const setSortedField = (field: string) => {
  if (field === sortedField.value?.field)
    return (sortedField.value.isAsc = !sortedField.value.isAsc)
  sortedField.value = { field, isAsc: true }
}

export const updatePageIndex = (newPageIndex: number) => {
  activePage.value = newPageIndex
}

export const updatePageSize = (newPageSize: number) => {
  pageSize.value = newPageSize
}

export const setIsDownload = (value: boolean) => {
  isDownload.value = value
}

const setIsLoading = (value: boolean) => {
  isLoading.value = value
}

const setSalesLoading = (value: boolean) => {
  isSalesLoading.value = value
}

watch(
  [sortedField, activePage, pageSize],
  async (value) => {
    const newSortedField = value[0]
    const newPageIndex = value[1] - 1
    const newPageSize = value[2]


    if(JSON.stringify(sortedField.value) !== JSON.stringify(newSortedField))
      await loadFilteredData(newPageSize, newPageIndex, newSortedField)
    else
      await paginateData(newPageSize, newPageIndex, newSortedField)

  },
  { deep: true }
)
