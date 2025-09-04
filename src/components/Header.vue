<script setup lang="ts">
import InputText from 'primevue/inputtext'
import LoginButton from './LoginButton.vue'
</script>

<template>
  <nav class="shadow-sm sticky z-10 top-0">
    <div class="h-16 bg-surface-500 px-4 shadow-lg mx-auto w-full flex items-center">
      <h1 class="text-xl font-extrabold tracking-tighter uppercase">Reeltime</h1>
      <InputText placeholder="What to watch?" class="text-sm ml-60" />
      <LoginButton class="ml-auto" />
    </div>
  </nav>
</template>
