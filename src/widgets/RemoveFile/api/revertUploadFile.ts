import { $useFetch } from '~/composables/useMyFetch'

const url = 'file/revert-upload'

export const revertUploadFile = async (file: any) => {
  const bodyFormData = new FormData()
  bodyFormData.append('xlsx_file', file)

  const res = await $useFetch(url, {
    method: 'post',
    body: bodyFormData,
    mode: 'no-cors',
  })
  return res
}
