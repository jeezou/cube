import { $useFetch } from '~/composables/useMyFetch'
import { UserType } from '~/src/app/stores/userStore/types'

export const getUserInfo = async (): Promise<UserType> => {
  const url = 'auth/user-info'
  return await $useFetch(url, {
    credentials: 'include',
  })
}
