import './assets/main.css'
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//Components
import BtnPrimary from "@/components/buttons/BtnPrimary.vue"; 

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('BtnPrimary',BtnPrimary)

app.mount('#app')
