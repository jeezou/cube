import { useUserStore } from '~/src/app/stores/userStore/store'
import { Roles } from '~/src/app/stores/userStore/types'
import { getUserInfo } from './api/getUserInfo'

export const navigateUser = async (cookie: string | null | undefined) => {
  const store = useUserStore()
  if (cookie) {
    try {
      const response = await getUserInfo()
      store.login(response)
      if (store?.getUser?.roles?.includes(Roles.admin)) return
      return await navigateTo('/filter')
    } catch (err) {
      console.log(err)
    }
  }
  return navigateTo('/login')
}
