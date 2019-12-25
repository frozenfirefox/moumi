import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios'
import qs from 'qs'

Vue.use(ViewUI);

axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
};

Vue.prototype.$axios = axios;
Vue.prototype.$qs    = qs;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
