import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface State {
  busDirection: 'DEAPRTURE' | 'RETURN',
  busTime: number | null | Error
}

export default new Vuex.Store<State>({
  state: {
    busDirection: 'DEAPRTURE',
    busTime: null
  },
  mutations: {
    loadDefaultSetting(state: State): void {
      state.busDirection = 'DEAPRTURE';
    },
    setBusDirection(state: State, payload): void {
      state.busDirection = payload;
      localStorage.busDirection = payload;
    },
    setBusTime(state: State, payload): void {
      state.busTime = payload
    }
  },
  actions: {
    async subscribeBus({ state, commit }) {
      try {
        const response = await fetch('https://cors.io/?http://www.taiwanbus.tw/app_api/SP_PredictionTime_V3.ashx?routeNo=1032&branch=0&goBack=2&Lang=&Source=w&runid=4949');
        if (!response.ok)
          throw new Error('Unable to get bus info!');
      } catch (e) {
        state.busTime = e
      }
    }
  },
});