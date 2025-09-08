<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'
import { useMediaControls } from '@vueuse/core'
import { useSocketStore } from '@/lib/stores/party'

const props = defineProps<{ videoRef: Ref<HTMLVideoElement | null> }>()
const videoRef = props.videoRef
const socketStore = useSocketStore()
const { currentTime, duration } = useMediaControls(videoRef)

let isProgrammaticSeek = false
function onSeeked() {
  if (!videoRef.value || !socketStore.roomId) return

  if (isProgrammaticSeek) {
    isProgrammaticSeek = false
    return
  }
  socketStore.sendTimestamp(videoRef.value.currentTime)
}

let lastSyncedTime = 0
watch(
  () => socketStore.timestamp,
  (newTimestamp) => {
    if (!videoRef.value) return
    if (newTimestamp !== null) {
      const diff1 = Math.abs(videoRef.value.currentTime - newTimestamp)
      const diff2 = Math.abs(lastSyncedTime - newTimestamp)
      if (diff1 > 0.3 && diff2 > 0.1) {
        isProgrammaticSeek = true
        videoRef.value.currentTime = newTimestamp
        lastSyncedTime = newTimestamp
      }
    }
  },
)

function onSeekBarClick(e: MouseEvent) {
  if (!videoRef.value || duration.value <= 0) return

  const bar = e.currentTarget as HTMLElement
  const rect = bar.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const newTime = (clickX / rect.width) * duration.value

  isProgrammaticSeek = true
  videoRef.value.currentTime = newTime
  socketStore.sendTimestamp(newTime)
}

onMounted(() => {
  videoRef?.value?.addEventListener('seeked', onSeeked)
})
onBeforeUnmount(() => {
  videoRef?.value?.removeEventListener('seeked', onSeeked)
})
</script>

<template>
  <div
    class="relative h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer"
    @click="onSeekBarClick"
  >
    <!-- played bar -->
    <div
      class="bg-primary-200 h-full absolute z-10"
      :style="{
        width: duration > 0 ? (currentTime / duration) * 100 + '%' : '0%',
      }"
    />
  </div>
</template>
