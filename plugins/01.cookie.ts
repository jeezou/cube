import { navigateUser } from '~/src/process/navigateUser'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    getCookie()
  })
})

const getCookie = () => {
  const cookie = useCookie('token')

  navigateUser(cookie.value)
}
