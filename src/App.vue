<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import './assets/main.css'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <main class="flex flex-1">
      <Sidebar class="sticky top-16 z-10 h-[calc(100vh-4rem)]" />
      <div class="flex-1">
        <RouterView />
      </div>
    </main>
  </div>
</template>
