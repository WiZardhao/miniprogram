import { createStore } from 'vuex'
import moduleCart from './cart.js'
import moduleUser from './user.js'
export default createStore({
  state:{},
  getters:{},
  actions:{},
  mutations:{},
  modules:{
    m_cart:moduleCart,
    m_user:moduleUser
  }
})