import { defineStore } from 'pinia'
import { UserType } from './types'
import { postLogout } from './api/logout'

export const useUserStore = defineStore('user', () => {
  const jwt_token = useCookie('token')
  const user = ref<UserType | null>(null)

  const getUser = computed(() => user.value)

  function login(newUser: UserType) {
    user.value = newUser
    if (user.value.token) {
      jwt_token.value = user.value.token
    }
  }

  async function logout() {
    user.value = null
    jwt_token.value = null
    await postLogout()
  }

  return { getUser, login, logout }
})
