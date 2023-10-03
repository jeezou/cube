import { $useFetch } from '~/composables/useMyFetch'

export const postLogout = async () => {
  const url = 'auth/logout'

  return await $useFetch(url, {
    method: 'POST',
    mode: 'no-cors',
    credentials: 'include',
  })
}
