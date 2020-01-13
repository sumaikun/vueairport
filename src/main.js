import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import routes from './routes'
import store from './store';
import VueProgressBar from 'vue-progressbar'
import VueSweetalert2 from 'vue-sweetalert2'


// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
 
const optionsSweet = {
  confirmButtonColor: '#424242',
  cancelButtonColor: '#ff7674',
};

Vue.use(VueSweetalert2,optionsSweet);

Vue.config.productionTip = false

//forcing global
window.Store = store;

const options = {
  color: '#2196f3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.1s',
    opacity: '0.5s',
    termination: 400
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

new Vue({
  vuetify,
  router: routes,
  store,
  render: h => h(App)
}).$mount('#app')
