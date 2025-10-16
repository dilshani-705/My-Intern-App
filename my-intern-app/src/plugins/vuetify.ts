/**
 * plugins/vuetify.ts
 *
 * Vuetify plugin setup for Vue 3 application.
 *
 * Official Documentation:
 * - Vuetify Main: https://vuetifyjs.com
 * - Feature Guides: https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Composable
import { createVuetify } from 'vuetify'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#E82429',
          secondary: '#472426',
          surface: '#211212',
          error: '#FFFFFF', 
        },
      },
    },
  },
  defaults: {
    VTextField: {
      class: 'bg-secondary',
      variant: 'outlined',
      density: 'compact',
      hideDetails: 'auto',
    },
    VTextarea: {
      class: 'bg-secondary',
      variant: 'outlined',
      density: 'compact',
      hideDetails: 'auto',
    },
    VSelect: {
      class: 'bg-secondary',
      variant: 'outlined',
      density: 'compact',
      hideDetails: 'auto',
    },
  },
})
