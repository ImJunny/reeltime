<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'
import { useMediaControls } from '@vueuse/core'
import { useSocketStore } from '@/lib/stores/party'

const props = defineProps<{ videoRef: Ref<HTMLVideoElement | null> }>()
const videoRef = props.videoRef
const socketStore = useSocketStore()
const { currentTime, duration } = useMediaControls(props.videoRef)

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
        console.log('backed')
        isProgrammaticSeek = true

        videoRef.value.currentTime = newTimestamp
        lastSyncedTime = newTimestamp
      }
    }
  },
)

onMounted(() => {
  videoRef?.value?.addEventListener('seeked', onSeeked)
})
onBeforeUnmount(() => {
  videoRef?.value?.removeEventListener('seeked', onSeeked)
})
</script>

<template>
  <div class="relative h-2 bg-white/20 rounded-full overflow-hidden">
    <div
      class="bg-primary-200 h-full absolute z-1"
      :style="{
        width: duration > 0 ? (currentTime / duration) * 100 + '%' : '0%',
      }"
    />
  </div>
</template>
