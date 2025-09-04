<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import './assets/main.css'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <main class="flex flex-1 bg-surface-600">
      <Sidebar />
      <RouterView class="flex-1" />
    </main>
  </div>
</template>
