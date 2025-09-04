<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Hls from 'hls.js'

const props = defineProps<{ url: string }>()

const videoRef = ref<HTMLVideoElement | null>(null)
const hls = ref<Hls | null>(null)

// Function to load HLS source
function loadHls(url: string) {
  const source = `https://corsproxy.io/?${encodeURIComponent(url)}`

  if (!videoRef.value) return

  // Destroy previous instance if exists
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
    // Safari native support
    videoRef.value.src = source
  }
}

onMounted(() => {
  loadHls(props.url)
})

// Watch for changes in the URL prop
watch(
  () => props.url,
  (newUrl) => {
    if (newUrl) {
      loadHls(newUrl)
    }
  },
)

onBeforeUnmount(() => {
  if (hls.value) {
    hls.value.destroy()
  }
})
</script>

<template>
  <div class="flex justify-center items-center">
    <video ref="videoRef" controls class="max-w-6xl w-full" />
  </div>
</template>
