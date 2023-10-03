import { FilterResponce, QueryBodyType } from '../utils/types'
import { $useFetch } from '~/composables/useMyFetch'

export const getFilteredData = async (
  query: QueryBodyType
): Promise<FilterResponce> => {
  const url = 'stat/sales/filter'

  return await $useFetch(url, {
    method: 'POST',
    body: query,
  })
}
