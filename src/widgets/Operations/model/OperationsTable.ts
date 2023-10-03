import '@mdi/font/css/materialdesignicons.css'
import { LocationQueryValue } from "vue-router";

import { OperationItem, OperationsResponse } from "~/src/widgets/Operations/utils/types";
import { getOperationsRequest, getExactOperationRequest, deleteOperationRequest } from "~/src/widgets/Operations/api/getOperationsRequest";

export const operations = ref<OperationItem[] | null>(null)
export const operationsResponse = ref<OperationsResponse | null>(null)
export const size = ref(10)
export const page = ref(1)
export const loading = ref(false)
export const sorting = ref('DESC')

export const onDelete = async (id: number) => {
  loading.value = true
  const deleted = await deleteOperationRequest(id)
  await getFilteredOperations()
  loading.value = false
}

export const getFilteredOperations = async () => {
  loading.value = true
  // @ts-ignore
  operationsResponse.value = await getOperationsRequest(size.value,  page.value - 1, sorting.value)
  if(operationsResponse.value)
    // @ts-ignore
    operations.value = operationsResponse.value.content
  loading.value = false
}

export const intervalExactOperation = (id: LocationQueryValue | LocationQueryValue[] | string) => {
  return setInterval(async()=> {
      const op: OperationItem = await getExactOperationRequest(id)
      // @ts-ignore
      operations.value = [op]
    }, 1000)
}

watch([size, page, sorting], async ([newSize, newPage, newSorting], [prevSize, prevPage, prevSorting]) =>{
  if(prevSorting !== newSorting){
    page.value = 1;
  }
  await getFilteredOperations()
})