import Notifications, { useNotification } from '@kyvg/vue3-notification'

export default defineNuxtPlugin((nuxtApp) => {
  const { notify } = useNotification()
  nuxtApp.vueApp.use(Notifications)
  return {
    provide: {
      notify,
    },
  }
})
