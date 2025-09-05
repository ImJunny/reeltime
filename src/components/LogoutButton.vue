<script setup>
import { useAuthStore } from '@/lib/stores/auth'
import Button from 'primevue/button'

const { logout } = useAuthStore()
</script>

<template>
  <Button class="" @click="logout">Sign out</Button>
</template>
