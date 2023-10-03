import { useUserStore } from '~/src/app/stores/userStore/store'
import { getUser } from '../api/getUser'
import { UserLoginType } from '../utils/types'

export const isDisabled = ref(true)
export const showPassword = ref(false)
export const isLoading = ref(false)

export const user = ref<UserLoginType>({ username: '', password: '' })

export const required = (value: string) => !!value || 'Это поле обязательно'

export const setIsDisabled = (value: boolean) => {
  isDisabled.value = value
}

export const onLogin = async () => {
  const { login } = useUserStore()
  const { $notify } = useNuxtApp()

  try {
    isLoading.value = true
    const response = await getUser(user.value)
    login(response)

    $notify({
      title: 'Успешный вход!',
      text: `Добро пожаловaть, ${response.username}`,
      type: 'success',
    })
    navigateTo('/filter')
  } catch (err) {
    $notify({
      title: 'Не удалось войти',
      text: 'Проверьте имя и пароль',
      type: 'error',
    })
  } finally {
    isLoading.value = false
  }
}
