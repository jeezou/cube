import { $useFetch } from '~/composables/useMyFetch'
import fileDownload from 'js-file-download'
import { QueryBody as BrandBodyType } from 'src/widgets/PivotMonth/utils/types'
import { QueryBody as GroupBodyType } from 'src/widgets/PivotGroup/utils/types'
import { QueryBody as LnameBodyType } from 'src/widgets/PivotLname/utils/types'
import {
  notifyError,
  notifyLimit,
  notifyStart,
  notifySuccess,
} from './lib/notifies'

export const downloadData = async (query: any) => {
  const url = `file/download`
  if (query.size) delete query.size

  notifyStart()
  const res: any = await $useFetch(url, {
    method: 'GET',
    credentials: 'include',
    params: query,
  })
  const error = res.error?.value
  if (error?.statusCode === 400) {
    notifyLimit()
    return
  } else if (error) {
    notifyError()
    return
  }

  const name = getName(query)
  fileDownload(res, name)
  notifySuccess()
  return res
}

export const downloadDataBody = async (
  body: BrandBodyType | GroupBodyType | LnameBodyType,
  query: string
) => {
  const url = `/stat/summary/${query}/download`

  notifyStart()

  try {
    const res: any = await $useFetch(url, {
      method: 'POST',
      body: body,
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
    const name = getName(query)

    fileDownload(res, name)
    notifySuccess()
    return res
  } catch (error: any) {
    if (error.data.code === -206) {
      notifyLimit()
    } else {
      notifyError()
    }
  }
}

const getName = (query: string) => {
  const date = new Date()
  const name = `filtered_data_${
    typeof query === 'string' ? query.split('&').join(',') : ''
  }_${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.xlsx`

  return name
}
