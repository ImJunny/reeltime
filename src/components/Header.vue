<script setup lang="ts">
import InputText from 'primevue/inputtext'
import LoginButton from './LoginButton.vue'
import LogoutButton from './LogoutButton.vue'
import { useAuthStore } from '@/lib/stores/auth'
import Logo from '../assets/header-logo.svg'

const auth = useAuthStore()
</script>

<template>
  <nav class="shadow-sm sticky z-10 top-0">
    <div class="h-16 bg-surface-900 px-4 shadow-lg mx-auto w-full flex items-center">
      <img :src="Logo" alt="Reeltime Logo" />
      <!-- <h1 class="text-xl font-extrabold tracking-tighter uppercase">Reeltime</h1> -->
      <InputText placeholder="What to watch?" class="text-sm ml-60" />
      <LoginButton v-if="!auth.authenticated" class="ml-auto" />
      <LogoutButton v-else class="ml-auto" />
    </div>
  </nav>
</template>
