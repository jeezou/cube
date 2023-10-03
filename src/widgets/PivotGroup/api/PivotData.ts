import { PivotGroupResponce, QueryBody } from '../utils/types'
import { $useFetch } from '~/composables/useMyFetch'

export const getPivotData = async (
  body: QueryBody
): Promise<PivotGroupResponce> => {
  const url = 'stat/summary/groups'

  return await $useFetch(url, {
    method: 'POST',
    body: body,
    credentials: 'include',
  })
}
