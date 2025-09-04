<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import api from '@/lib/api'
import { onMounted, ref } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'

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

onMounted(() => {
  getStreamUrl()
})

onBeforeRouteLeave(() => {
  controller.abort()
})
</script>

<template>
  <div>
    <VideoPlayer :url="streamUrl" />
  </div>
</template>
