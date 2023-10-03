import { PivotMonthResponce, QueryBody } from '../utils/types'
import { $useFetch } from '~/composables/useMyFetch'

export const getPivotData = async (
  body: QueryBody
): Promise<PivotMonthResponce> => {
  const url = 'stat/summary/brands'

  return await $useFetch(url, {
    method: 'POST',
    body: body,
    credentials: 'include',
  })
}
