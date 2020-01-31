import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import app from './modules/app'
import user from './modules/user'
import users from './modules/users'
import rooms from './modules/rooms'
import businessEvents from './modules/businessEvents'
import countries from './modules/countries'
import cities from './modules/cities'
Vue.use(Vuex)


export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })], // !debug ? [createPersistedState({ storage: window.sessionStorage })] : [],
  modules: {
    app,
    user,
    users,
    businessEvents,
    rooms,
    countries,
    cities,
  }
})
