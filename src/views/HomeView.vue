<script setup lang="ts">
import api from '@/utils/api'
import { Play, Star } from 'lucide-vue-next'
import Tag from 'primevue/tag'
import { ref, onMounted } from 'vue'

const topMovies = ref<any[]>([])
const hoveredIndex = ref<number | null>(null)

function onMouseEnter(index: number) {
  hoveredIndex.value = index
}
function onMouseLeave() {
  hoveredIndex.value = null
}

async function fetchTopMovies() {
  const res = await api.get('api/tmdb/popular-movies')

  topMovies.value = res.data.results
}

function onClickMovie(movie: any) {
  const slug = movie.title.toLowerCase().replace(/\s+/g, '-')
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'unknown'
  window.location.href = `/party/${slug}-${year}`
}

onMounted(() => {
  fetchTopMovies()
})
</script>

<template>
  <ul class="flex gap-6 p-6 flex-wrap shadow-sm">
    <li
      v-for="(movie, index) in topMovies"
      :key="movie.id"
      :class="[
        'my-2 flex flex-col overflow-hidden rounded-md w-45 transition-transform duration-300 border-2 border-primary-700',
        {
          'scale-103': hoveredIndex === index,
        },
      ]"
      @mouseenter="onMouseEnter(index)"
      @mouseleave="onMouseLeave"
    >
      <div class="relative w-full aspect-[2/3] rounded-sm overflow-hidden">
        <div class="absolute inset-0 z-1 items-center justify-center flex">
          <div class="px-2 absolute top-2 z-2 justify-between w-full flex">
            <div class="flex gap-1 py-[2px] px-2 rounded-sm bg-primary-900">
              <span class="text-white text-xs uppercase">Movie</span>
            </div>
            <div class="flex gap-1 py-[2px] px-2 rounded-sm bg-primary-900 items-center">
              <Star class="h-3 w-3 fill-amber-300 stroke-0" />
              <span class="text-white text-xs">{{ movie.vote_average.toFixed(1) }}</span>
            </div>
          </div>

          <div
            :class="[
              'absolute inset-0 bg-black transition-opacity duration-400',
              {
                'opacity-75': hoveredIndex === index,
                'opacity-0': hoveredIndex !== index,
              },
            ]"
          />
          <div
            class="flex flex-col items-center bg-primary-400 p-4 rounded-full cursor-pointer transition-all duration-300 ease-out hover:bg-primary-600"
            :class="hoveredIndex === index ? 'translate-y-0' : 'translate-y-4 opacity-0'"
            @click="onClickMovie(movie)"
          >
            <Play class="h-6 w-6 stroke-[1.2]" />
          </div>
        </div>
        <img
          :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
          :alt="movie.title"
          :class="[
            'w-full h-full object-cover transition-transform duration-400',
            { 'scale-110': hoveredIndex === index },
          ]"
        />
      </div>
      <div class="bg-surface-700 p-4 h-24">
        <p class="font-bold text-sm line-clamp-2">{{ movie.title }}</p>
        <p class="text-xs">
          {{ movie.release_date ? movie.release_date.slice(0, 4) : 'N/A' }}
        </p>
      </div>
    </li>
  </ul>
</template>
