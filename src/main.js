import Vue from 'vue';

import Vuex from 'vuex';
import vuetify from './plugins/vuetify';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentCommand: 'select',
  },
  mutations: {
    setCurrentCommand(state, command) {
      state.currentCommand = command;
    },
  },
});

new Vue({
  vuetify,
  render: (h) => h(App),
  store,
}).$mount('#app');
