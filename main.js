import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router'
import store from './store/store'
import './registerServiceWorker'

import VueYoutube from 'vue-youtube'

import 'normalize.css';

//import process from '../.env'

Vue.config.productionTip = false

//const env = process.env.VUE_APP_LOCALE

Vue.use(VueYoutube);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
