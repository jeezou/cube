import { PivotLnameResponce, QueryBody } from '../utils/types'
import { $useFetch } from '~/composables/useMyFetch'

export const getPivotData = async (
  body: QueryBody
): Promise<PivotLnameResponce> => {
  const url = 'stat/summary/lnames'

  return await $useFetch(url, {
    method: 'POST',
    body: body,
    credentials: 'include',
  })
}
