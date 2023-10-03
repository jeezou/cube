// @ts-ignore
import { UserLoginType } from '../utils/types'
import { UserType } from 'src/app/stores/userStore/types'
import { $useFetch } from '~/composables/useMyFetch'

export const getUser = async (payload: UserLoginType): Promise<UserType> => {
  const url = 'auth/login/'

  return await $useFetch(url, {
    method: 'POST',
    body: payload,
  })
}
