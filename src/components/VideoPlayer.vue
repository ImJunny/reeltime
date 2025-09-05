<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, watchEffect } from 'vue'
import Hls from 'hls.js'
import { useSocketStore } from '@/lib/stores/party'

const props = defineProps<{ url: string }>()

const videoRef = ref<HTMLVideoElement | null>(null)
const hls = ref<Hls | null>(null)

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

// Watch for changes in the URL prop
watch(
  () => props.url,
  (newUrl) => {
    if (newUrl) {
      loadHls(newUrl)
    }
  },
)

const socketStore = useSocketStore()

function onSeeked() {
  if (socketStore.roomId && videoRef.value) {
    socketStore.sendTimestamp(videoRef.value.currentTime)
  }
}

function onPlay() {
  if (socketStore.roomId) socketStore.play()
}

function onPause() {
  if (socketStore.roomId) socketStore.pause()
}

let lastSyncedTime = 0

watchEffect(() => {
  if (!videoRef.value) return

  // --- Sync timestamp only if it changed significantly ---
  if (socketStore.timestamp) {
    const diff = Math.abs(videoRef.value.currentTime - socketStore.timestamp)
    if (diff > 0.5 && Math.abs(lastSyncedTime - socketStore.timestamp) > 0.1) {
      videoRef.value.currentTime = socketStore.timestamp
      lastSyncedTime = socketStore.timestamp
    }
  }

  // --- Sync play/pause separately ---
  if (socketStore.isPlaying && videoRef.value.paused) {
    videoRef.value.play().catch((err) => console.error(err))
  } else if (!socketStore.isPlaying && !videoRef.value.paused) {
    videoRef.value.pause()
  }
})

onMounted(() => {
  loadHls(props.url)
  videoRef.value?.addEventListener('seeked', onSeeked)
  videoRef.value?.addEventListener('play', onPlay)
  videoRef.value?.addEventListener('pause', onPause)
})

onBeforeUnmount(() => {
  if (hls.value) {
    hls.value.destroy()
    hls.value = null
  }
  if (videoRef.value) {
    videoRef.value.removeEventListener('seeked', onSeeked)
    videoRef.value.removeEventListener('play', onPlay)
    videoRef.value.removeEventListener('pause', onPause)
    videoRef.value.src = ''
    videoRef.value.load()
  }
})
</script>

<template>
  <div class="flex justify-center items-center">
    <video ref="videoRef" controls class="max-w-6xl w-full" />
  </div>
</template>
