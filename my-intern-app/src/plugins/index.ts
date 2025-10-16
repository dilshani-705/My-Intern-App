//index.ts
/**
 * plugins/formStore.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import router from '@/router'
import { createPinia } from 'pinia'
import { firebaseApp } from './firebase'
import { VueFire, VueFireAuth } from 'vuefire'
import vuetify from './vuetify'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app.use(router)
  app.use(vuetify)
  app.use(createPinia())
  app.use(VueFire, { firebaseApp, modules: [VueFireAuth()] })
}

