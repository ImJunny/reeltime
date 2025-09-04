<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { House, Film, Clapperboard, Users } from 'lucide-vue-next'

const router = useRouter()

const links = ref({
  main: [
    { text: 'Home', to: '/', icon: House },
    { text: 'Movies', to: '/movies', icon: Film },
    { text: 'TV Shows', to: '/shows', icon: Clapperboard },
  ],
  personal: [{ text: 'Party', to: '/party', icon: Users }],
})

function goTo(link) {
  router.push(link.to)
}
</script>

<template>
  <aside class="bg-surface-400 min-w-64">
    <ul class="p-4">
      <template v-for="[sectionKey, sectionLinks] in Object.entries(links)" :key="sectionKey">
        <li
          v-for="link in sectionLinks"
          :key="link.text"
          :class="[
            'hover:bg-surface-300 transition-all duration-200 flex rounded-sm px-4 py-3 items-center gap-4 cursor-pointer',
            { 'bg-surface-300': $route.path === link.to },
          ]"
          @click="goTo(link)"
        >
          <component :is="link.icon" class="w-5 h-5" />
          <span class="text-sm">{{ link.text }}</span>
        </li>
        <li v-if="sectionKey !== Object.keys(links).at(-1)" class="border-t border-zinc-700 my-4" />
      </template>
    </ul>
  </aside>
</template>
