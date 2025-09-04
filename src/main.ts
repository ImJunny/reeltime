import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

const app = createApp(App)
const MyPreset = definePreset(Aura, {
  components: {
    button: {
      text: {
        primary: { color: '#ffffff' },
      },
    },
  },
  semantic: {
    colorScheme: {
      dark: {
        primary: {
          300: '#7A7FDC',
          400: '#585CA8',
          500: '#3D3D47',
          600: '#7A7FDC',
        },
        surface: {
          300: '#33333E',
          400: '#22222B',
          500: '#181820',
          600: '#13131a',
        },
        formField: {
          backgroundColor: '{surface.400}',
          borderColor: '{primary.500}',
          hoverBorderColor: '{primary.400}',
          background: '{surface.400}',
          placeholderColor: '#ffffff',
          focusBorderColor: '{primary.300}',
        },
      },
    },
  },
})

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
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

app.use(router)
app.mount('#app')
