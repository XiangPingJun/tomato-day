import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store<States>({
  state: {
    busDirection: 'DEAPRTURE'
  },
  mutations: {
    loadDefault(state: States, payload): void {
      state.busDirection = 'DEAPRTURE';
    },
    setBusDirection(state: States, payload): void {
      state.busDirection = payload;
      localStorage.busDirection = payload;
    },
  },
  actions: {
  },
});

interface States {
  busDirection: 'DEAPRTURE' | 'RETURN'
}