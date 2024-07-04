import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './providers/store'
import 'normalize.css'
import './index.css'

const store = setupStore()

createApp(App).use(store).mount('#app')
