import { createApp } from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import NotFound from './NotFound.vue'


// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



createApp(App).mount('#app')
