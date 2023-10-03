import { useUserStore } from '~/src/app/stores/userStore/store'

export const handleLogout = () => {
  const { $notify } = useNuxtApp()
  const store = useUserStore()

  store.logout()
  $notify({
    title: 'Вы вышли из аккаунта!',
    type: 'success',
  })
  navigateTo('/login')
}
