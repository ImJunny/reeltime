<script setup lang="ts">
import api from '@/utils/api'
import { Play, PlayCircle } from 'lucide-vue-next'
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
      :class="['my-2 flex flex-col overflow-hidden rounded-sm w-45']"
    >
      <div class="relative w-full aspect-[2/3] rounded-sm overflow-hidden">
        <div
          class="absolute inset-0 z-1 items-center justify-center flex cursor-pointer"
          @mouseenter="onMouseEnter(index)"
          @mouseleave="onMouseLeave"
          @click="onClickMovie(movie)"
        >
          <div
            :class="[
              'absolute inset-0 bg-black transition-opacity duration-400',
              {
                'opacity-60': hoveredIndex === index,
                'opacity-0': hoveredIndex !== index,
              },
            ]"
          />
          <div
            :class="[
              'flex flex-col z-2 items-center transition-opacity duration-200',
              { 'opacity-0': hoveredIndex !== index },
            ]"
          >
            <PlayCircle :class="['h-14 w-14 stroke-[1.2] ']" />
            <span class="mt-2 font-bold">Play</span>
          </div>
        </div>
        <img
          :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
          :alt="movie.title"
          :class="[
            'w-full h-full object-cover transition-transform duration-300',
            { 'scale-105': hoveredIndex === index },
          ]"
        />
      </div>
      <div class="bg-surface-700 p-4 h-24">
        <p class="font-bold text-sm line-clamp-2">{{ movie.title }}</p>
        <span class="text-sm">{{
          movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'
        }}</span>
      </div>
    </li>
  </ul>
</template>
