<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Logo from '../assets/header-logo.svg'
</script>

<template>
  <nav class="shadow-sm sticky z-10 top-0">
    <div class="h-16 bg-surface-900 px-4 shadow-lg mx-auto w-full flex items-center">
      <img :src="Logo" alt="Reeltime Logo" class="h-[1.15rem]" />
      <InputText placeholder="What to watch?" class="text-sm ml-40 w-full max-w-md" />
    </div>
  </nav>
</template>
