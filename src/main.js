import Vue from 'vue'
import App from './App.vue'
import router from './Routes'
import store from './store/index'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

Vue.config.productionTip = false

// helper function
Vue.prototype.$isArrayOfObj = function(array) {
  if (Array.isArray(array)) {
    if (array.length > 0) {
      return typeof array[0] === 'object';
    }
  }
  return false;
};

new Vue({
  vuetify,
  router,
  render: h => h(App), store
}).$mount('#app')
