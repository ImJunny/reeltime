<script setup>
import { useAuthStore } from '@/lib/stores/auth'
import Button from 'primevue/button'
import { onMounted } from 'vue'

let client

onMounted(() => {
  client = google.accounts.oauth2.initCodeClient({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope: 'openid email',
    ux_mode: 'redirect',
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    callback: async (res) => {
      await useAuthStore().login(res.code)
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
