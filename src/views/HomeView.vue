<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import api from '@/utils/api'
import { ref, onMounted } from 'vue'

const topMovies = ref<any[]>([])

async function fetchTopMovies() {
  const res = await api.get('api/tmdb/popular-movies')

  topMovies.value = res.data.results
}

onMounted(() => {
  fetchTopMovies()
})
</script>

<template>
  <ul class="flex gap-6 p-6 flex-wrap shadow-sm">
    <li v-for="(movie, index) in topMovies" :key="movie.id">
      <MovieCard :data="movie" />
    </li>
  </ul>
</template>
