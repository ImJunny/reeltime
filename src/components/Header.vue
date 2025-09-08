<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Logo from '../assets/header-logo.svg'
import { Menu } from 'lucide-vue-next'
import { useViewStore } from '@/lib/stores/view'

const viewStore = useViewStore()

function resize() {
  viewStore.toggleCompact()
}
</script>

<template>
  <nav class="shadow-sm sticky z-10 top-0">
    <div class="h-16 bg-surface-900 px-4 shadow-lg mx-auto w-full flex items-center">
      <button @click="resize" class="cursor-pointer">
        <Menu class="hover:text-slate-300" />
      </button>
      <img :src="Logo" alt="Reeltime Logo" class="h-[1.15rem] ml-4" />
      <InputText placeholder="What to watch?" class="text-sm ml-40 w-full max-w-md" />
    </div>
  </nav>
</template>
