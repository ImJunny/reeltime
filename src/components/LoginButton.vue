<script setup>
import api from '@/lib/api'
import Button from 'primevue/button'
import { onMounted } from 'vue'

let client

onMounted(() => {
  client = google.accounts.oauth2.initCodeClient({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope: 'openid email',
    ux_mode: 'redirect',
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    callback: async (response) => {
      console.log('Auth code:', response.code)
      const res = await api.post('/api/public/auth/exchange-code', {
        code: response.code,
      })
      console.log(res)
    },
  })
})

function loginWithGoogle() {
  client.requestCode()
}
</script>

<template>
  <Button class="" @click="loginWithGoogle">Sign in</Button>
</template>
