<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import api from '@/utils/api'
import { onMounted, ref } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useSocketStore } from '@/lib/stores/party'
import { LoaderCircle } from 'lucide-vue-next'

const controller = new AbortController()

const route = useRoute()
const partyId = route.params.id
const streamUrl = ref('')

const loaded = ref(false)
const error = ref(false)
async function getStreamUrl() {
  try {
    const res = await api.get(`/api/stream/url/${partyId}`, {
      signal: controller.signal,
    })
    const url = res.data.streamUrl
    streamUrl.value = url
    loaded.value = true
  } catch {
    error.value = true
    loaded.value = true
  }
}

const socketStore = useSocketStore()

onMounted(() => {
  getStreamUrl()
  socketStore.connect()
  socketStore.joinRoom('party-123')
  console.log(socketStore.clients)
})

onBeforeRouteLeave(() => {
  controller.abort()
  socketStore.disconnect()
})
</script>

<template>
  <div>
    <VideoPlayer v-if="loaded && !error" :url="streamUrl" />
    <div v-else class="w-full max-w-6xl h-80 flex justify-center items-center bg-surface-300">
      <p v-if="error" class="font-bold text-2xl">Error loading player</p>
      <div v-else class="flex items-center">
        <p class="font-bold text-2xl">Loading player</p>
        <LoaderCircle class="animate-spin ml-4 stroke-4" />
      </div>
    </div>
    <div>
      <p>Clients:</p>
      <p v-for="client in socketStore.clients" :key="client">{{ client }}</p>
    </div>
  </div>
</template>
