<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import api from '@/utils/api'
import { inject, onMounted, ref } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { io, Socket } from 'socket.io-client'
import { useSocketStore } from '@/lib/stores/party'

const controller = new AbortController()

const route = useRoute()
const partyId = route.params.id
const streamUrl = ref('')

async function getStreamUrl() {
  const res = await api.get(`/api/public/stream/url/${partyId}`, {
    signal: controller.signal,
  })
  const url = res.data.streamUrl
  streamUrl.value = url
}

const socketStore = useSocketStore()

onMounted(() => {
  getStreamUrl()
  socketStore.connect()
  socketStore.joinRoom('party-123')
})

onBeforeRouteLeave(() => {
  controller.abort()
  socketStore.disconnect()
})
</script>

<template>
  <div>
    <VideoPlayer :url="streamUrl" />
  </div>
</template>
