<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, watchEffect } from 'vue'
import Hls from 'hls.js'
import { useSocketStore } from '@/lib/stores/party'
import VideoPlayerControls from './VideoPlayerControls.vue'

const props = defineProps<{ url: string }>()
const videoRef = ref<HTMLVideoElement | null>(null)
const hls = ref<Hls | null>(null)
const socketStore = useSocketStore()

// Get url to load HLS
watch(
  () => props.url,
  (newUrl) => {
    if (newUrl) {
      loadHls(newUrl)
    }
  },
)

// Function to load HLS source
function loadHls(url: string) {
  const source = `https://corsproxy.io/?${encodeURIComponent(url)}`
  if (!videoRef.value) return
  if (hls.value) {
    hls.value.destroy()
    hls.value = null
    videoRef.value.src = ''
  }

  if (Hls.isSupported()) {
    hls.value = new Hls()
    hls.value.loadSource(source)
    hls.value.attachMedia(videoRef.value)
  } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
    videoRef.value.src = source
  }
}

// Control playback based on socketStore isPlaying state
watch(
  () => socketStore.isPlaying,
  (isPlaying) => {
    if (!videoRef.value) return
    if (isPlaying) videoRef.value.play()
    else videoRef.value.pause()
  },
)

onMounted(() => {
  loadHls(props.url)
})

onBeforeUnmount(() => {
  if (hls.value) {
    hls.value.destroy()
    hls.value = null
  }
  if (videoRef.value) {
    videoRef.value.src = ''
    videoRef.value.load()
  }
})

function togglePlayback() {
  if (!videoRef.value) return
  if (socketStore.isPlaying) videoRef.value.pause()
  else videoRef.value.play()
  socketStore.togglePlayback()
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="w-full max-w-6xl relative group">
      <video ref="videoRef" class="w-full" @click="togglePlayback" autoplay />
      <VideoPlayerControls :videoRef="videoRef" :togglePlayback="togglePlayback" />
    </div>
  </div>
</template>
