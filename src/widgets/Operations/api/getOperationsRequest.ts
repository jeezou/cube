import { $useFetch } from '~/composables/useMyFetch'
import { OperationItem } from "~/src/widgets/Operations/utils/types";
import { LocationQueryValue } from "vue-router";

export const getOperationsRequest = async (size: number, page: number, sorting: string) :Promise<OperationItem[]> => {
  const url = `account/operations?page=${page}&size=${size}&sorting=${sorting}`
  return $useFetch(url, { method: 'GET', credentials: 'include'})
}

export const getExactOperationRequest = async (id: LocationQueryValue | LocationQueryValue[] | string):Promise<OperationItem> => {
  const url = `account/operation/${id}`
  return $useFetch(url, { method: 'GET', credentials: 'include'})
}

export const deleteOperationRequest = async (id: number) => {
  const url = `file/operation/delete?id=${id}`
  return $useFetch(url, { method: 'DELETE', credentials: 'include'})
}
