import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: string
  name: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  const setUser = (newUser: User | null) => {
    user.value = newUser
    isAuthenticated.value = !!newUser
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
  }
})
