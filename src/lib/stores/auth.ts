import api from '@/utils/api'
import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
}

interface AuthState {
  user_id: User | null
  authenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user_id: null,
    authenticated: false,
  }),

  actions: {
    async init() {
      try {
        const res = await api.get('/api/public/auth/is-authenticated')
        this.authenticated = res.data.authenticated
      } catch {
        this.authenticated = false
      }
    },
    async login(code: string) {
      await api.post('/api/public/auth/exchange-code', {
        code,
      })
      this.authenticated = true
    },

    async logout() {
      const res = await api.post('/api/public/auth/logout')
      this.authenticated = res.data.success ? false : this.authenticated
    },
  },
})
