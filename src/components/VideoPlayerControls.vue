<script setup lang="ts">
import { type Ref } from 'vue'
import { Pause, Play } from 'lucide-vue-next'
import VideoPlayerBar from './VideoPlayerBar.vue'
import { useSocketStore } from '@/lib/stores/party'

const props = defineProps<{ videoRef: Ref<HTMLVideoElement | null>; togglePlayback: () => void }>()
const videoRef = props.videoRef
const socketStore = useSocketStore()
</script>

<template>
  <div
    class="p-6 absolute bottom-0 w-full group-hover:opacity-100 transition opacity duration-200 bg-gradient-to-b -from-30% to-black/60"
    :class="{ 'opacity-0': socketStore.isPlaying }"
  >
    <VideoPlayerBar :videoRef="videoRef" />

    <div class="mt-3">
      <button class="cursor-pointer px-2" @click="togglePlayback">
        <Play v-if="!socketStore.isPlaying" class="fill-white stroke-0" />
        <Pause v-else class="fill-white stroke-0" />
      </button>
    </div>
  </div>
</template>
