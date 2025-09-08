import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useViewStore = defineStore('view', () => {
  const compact = ref(false)

  function toggleCompact() {
    compact.value = !compact.value
  }

  return { compact, toggleCompact }
})
