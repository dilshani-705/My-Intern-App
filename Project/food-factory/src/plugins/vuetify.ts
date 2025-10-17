/**
 * plugins/vuetify.ts
 *
 * Vuetify plugin setup for Vue 3 application.
 *
 * Official Docs:
 * - https://vuetifyjs.com
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Composable
import { createVuetify } from 'vuetify'

// Theme Configuration
export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1976D2',       // Soft blue for buttons
          secondary: '#E3F2FD',     // Light background for form fields
          accent: '#0D47A1',
          surface: '#FFFFFF',
          background: '#F5F7FA',    // Light background color
          success: '#2E7D32',
          warning: '#F9A825',
          error: '#D32F2F',
          info: '#0288D1',
        },
      },
    },
  },

  // Default component styles
  defaults: {
    VTextField: {
      variant: 'outlined',
      color: 'primary',
      density: 'comfortable',
      hideDetails: 'auto',
      class: 'mb-3',
    },
    VSelect: {
      variant: 'outlined',
      color: 'primary',
      density: 'comfortable',
      hideDetails: 'auto',
      class: 'mb-3',
    },
    VBtn: {
      rounded: 'small',
      elevation: 2,
      class: 'ma-2',
    },
    VCard: {
      rounded: 'small',
      elevation: 2,
      class: 'pa-4',
    },
  VTable: {
    class: 'elevation-2 rounded-small mt-4',
  },
},
})
