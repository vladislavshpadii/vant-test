import { createApp } from 'vue'
import { createPinia } from 'pinia'


import 'vant/lib/index.css'
import './style.css'

import { components } from './vant-components'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

components.forEach((component) => {
    app.use(component)
  })
  

app.use(pinia).mount('#app')
