// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

// Import your plugin setup
import { registerPlugins } from './plugins'

const app = createApp(App)

// Register all plugins (Vuetify, Router, Pinia, Firebase)
registerPlugins(app)

app.mount('#app')
