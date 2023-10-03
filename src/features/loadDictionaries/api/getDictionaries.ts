import { $useFetch } from '~/composables/useMyFetch'
import { Dictionaries } from '../utils/types'

export const getDictionaries = async (): Promise<Dictionaries> => {
  const url = 'stat/sales/dictionary'

  return await $useFetch(url, { credentials: 'include' })
}
