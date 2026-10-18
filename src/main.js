import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'

// Load the saved library from localStorage when the app starts.
store.dispatch('library/loadLibrary')

createApp(App).use(store).use(router).mount('#app')
