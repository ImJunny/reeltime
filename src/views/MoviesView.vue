<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import api from '@/utils/api'
import { ref, onMounted } from 'vue'

const topMovies = ref<any[]>([])

const tabs = [{ name: 'New' }, { name: 'Trending' }, { name: 'Top Rated' }]
const selectedTab = ref(tabs[0])

async function fetchTopMovies() {
  const res = await api.get('api/tmdb/popular-movies')

  topMovies.value = res.data.results
}

onMounted(() => {
  fetchTopMovies()
})
</script>

<template>
  <div class="flex items-center mx-8 mt-4 gap-6">
    <button
      v-for="tab in tabs"
      :key="tab.name"
      class="cursor-pointer hover:bg-primary/30 transition-colors duration-200 px-2 py-1 shrink-0"
      @click="selectedTab = tab"
    >
      <p
        :class="{
          'underline underline-offset-6 decoration-4 decoration-primary':
            selectedTab.name === tab.name,
        }"
      >
        {{ tab.name }}
      </p>
    </button>
  </div>

  <ul class="flex gap-6 p-6 flex-wrap shadow-sm justify-center">
    <li v-for="(movie, index) in topMovies" :key="movie.id">
      <MovieCard :data="movie" />
    </li>
  </ul>
</template>
