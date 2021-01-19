import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const cart = window.localStorage.getItem('cart')
export default new Vuex.Store({
  state: {
    API_LOCATION: 'http://10.177.68.79:8760',
    userDetails: null,
    cart:[],
    logout: true
  },
  getters: {
    totalPrice: state => {
      let total = 0
      state.cart.filter((item) => {
        total += (item.productPrice * item.productQuantity)
      })

      return total
    }
  },
  mutations: {
    addToCart (state, item) {
      state.cart.push(item)
      this.commit('saveData')
    },
    removeFromCart (state, item) {
      const index = state.cart.indexOf(item)
      state.cart.splice(index, 1)
      window.localStorage.removeItem(index)
      this.commit('saveData')
    }
  }
})
