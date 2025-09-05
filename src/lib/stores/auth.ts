import api from '@/utils/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: string
  email: string
}

interface AuthState {
  user_id: User | null
  authenticated: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const user_id = ref<User | null>(null)
  const authenticated = ref(false)

  async function init() {
    try {
      const res = await api.get('/api/public/auth/is-authenticated')
      authenticated.value = res.data.authenticated
    } catch {
      authenticated.value = false
    }
  }
  async function login(code: string) {
    await api.post('/api/public/auth/exchange-code', {
      code,
    })
    authenticated.value = true
  }

  async function logout() {
    const res = await api.post('/api/public/auth/logout')
    authenticated.value = res.data.success ? false : authenticated.value
  }

  return {
    user_id,
    authenticated,
    init,
    login,
    logout,
  }
})
