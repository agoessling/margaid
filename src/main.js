import Vue from 'vue';

import Vuex from 'vuex';
import vuetify from './plugins/vuetify';

import App from './App.vue';
import getStore from './store';

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  vuetify,
  render: (h) => h(App),
  store: getStore(),
}).$mount('#app');
