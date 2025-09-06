import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

export const themePreset = definePreset(Aura, {
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
          100: '#E4E5FF',
          200: '#C3C6F9',
          300: '#A6A9F5',
          400: '#868BE8',
          500: '#595EB3',
          600: '#454A80',
          700: '#2E324D',
          800: '#1C1E2A',
          900: '#0D0D14',
        },
        surface: {
          300: '#33333E',
          400: '#22222B',
          500: '#181820',
          600: '#13131a',
          700: '#33333E',
          800: '#22222B',
          900: '#181820',
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
