import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { themePreset } from './lib/themePreset'
import { createPinia } from 'pinia'
import { useAuthStore } from './lib/stores/auth'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
      cssLayer: {
        name: 'primevue',
        order: 'base, components, primevue, tailwind',
      },
    },
  },
})
document.documentElement.classList.add('my-app-dark')

// Initialize Pinia and auth store
app.use(createPinia())
await useAuthStore().init()

// Mount app
app.mount('#app')
