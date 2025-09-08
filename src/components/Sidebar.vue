<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { House, Film, Clapperboard, Users } from 'lucide-vue-next'
import { useViewStore } from '@/lib/stores/view'

const viewStore = useViewStore()

const router = useRouter()

const links = ref({
  main: [
    { text: 'Home', to: '/', icon: House },
    { text: 'Movies', to: '/movies', icon: Film },
    { text: 'TV Shows', to: '/shows', icon: Clapperboard },
  ],
})

function goTo(link) {
  router.push(link.to)
}
</script>

<template>
  <aside class="bg-surface-800" :class="{ 'w-64': !viewStore.compact }">
    <ul class="p-4">
      <template v-for="[sectionKey, sectionLinks] in Object.entries(links)" :key="sectionKey">
        <li
          v-for="link in sectionLinks"
          :key="link.text"
          :class="[
            'hover:bg-surface-700 transition-all duration-200 flex rounded-sm px-4 py-3 items-center gap-4 cursor-pointer',
            { 'bg-surface-700': $route.path === link.to },
          ]"
          @click="goTo(link)"
        >
          <component :is="link.icon" class="w-5 h-5" />
          <span v-if="!viewStore.compact" class="text-sm">{{ link.text }}</span>
        </li>
        <li v-if="sectionKey !== Object.keys(links).at(-1)" class="border-t border-zinc-700 my-4" />
      </template>
    </ul>
  </aside>
</template>
