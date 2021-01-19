
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import store from './store.js'
import VueCarousel from 'vue-carousel'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import jQuery from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
window.$ = window.jQuery = jQuery

// Import Bootstrap an BootstrapVue CSS files (order is important)

Vue.component('add-to-cart', require('./views/AddToCart.vue').default)
Vue.component('mini-cart', require('./views/MiniCart.vue').default)
Vue.component('view-product', require('./views/ViewProduct.vue').default)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(VueCarousel)
Vue.use(VueAxios, axios)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
