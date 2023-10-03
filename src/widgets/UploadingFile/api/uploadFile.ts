import { $useFetch } from '~/composables/useMyFetch'
import { XLSXFile } from '../types'

export const uploadFile = async (file: XLSXFile) => {
  const url = 'file/upload'
  const bodyFormData = new FormData()

  // @ts-ignore
  bodyFormData.append('xlsx_file', file)

  return await $useFetch(url, {
    method: 'POST',
    body: bodyFormData,
    credentials: 'include'
  })
}
