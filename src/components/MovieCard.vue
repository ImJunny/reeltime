<script setup lang="ts">
import { Play, Star } from 'lucide-vue-next'
import { defineProps, toRefs } from 'vue'

const props = defineProps<{
  data: any
}>()
const { data: movie } = toRefs(props)

function onClickMovie(movie: any) {
  const slug = movie.title.toLowerCase().replace(/\s+/g, '-')
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'unknown'
  window.location.href = `/party/${slug}-${year}`
}
</script>

<template>
  <div
    :class="[
      'my-2 flex flex-col overflow-hidden group hover:scale-103 rounded-md w-45 transition-transform duration-300 border-2 border-primary-700',
    ]"
  >
    <div class="relative w-full aspect-[2/3] rounded-sm overflow-hidden">
      <div class="absolute inset-0 z-1 items-center justify-center flex">
        <div class="absolute top-1 right-1 z-2">
          <div class="w-full h-full bg-primary-800 opacity-70 absolute rounded-sm" />
          <div class="flex gap-1 py-[2px] items-center px-2 relative">
            <Star class="h-3 w-3 fill-amber-300 stroke-0" />
            <span class="text-white text-xs">{{ movie.vote_average.toFixed(1) }}</span>
          </div>
        </div>

        <div
          class="absolute inset-0 bg-black transition-opacity duration-400 opacity-0 group-hover:opacity-75"
        />
        <div
          class="flex flex-col items-center group-hover:translate-y-0 translate-y-4 opacity-0 group-hover:opacity-100 bg-primary-400 p-4 rounded-full cursor-pointer transition-all duration-300 ease-out hover:bg-primary-600"
          @click="onClickMovie(movie)"
        >
          <Play class="h-6 w-6 stroke-[1.2]" />
        </div>
      </div>
      <img
        :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
        :alt="movie.title"
        class="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
      />
    </div>
    <div class="bg-surface-700 p-4 h-24">
      <p class="font-bold text-sm line-clamp-2">{{ movie.title }}</p>
      <p class="text-xs">
        {{ movie.release_date ? movie.release_date.slice(0, 4) : 'N/A' }}
      </p>
    </div>
  </div>
</template>
