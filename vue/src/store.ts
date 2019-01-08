import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface BusState {
  direction: 'DEAPRTURE' | 'RETURN';
  arriveIn?: number;
  errorMessage?: string;
  intervalID?: number;
  busStopData?: BusStop[];
}
interface BusStop {
  name: string;
  predictionTime: string;
}
interface State {
  bus: BusState;
}

function getInitState(): State {
  const state: State = {
    bus: {
      direction: 'DEAPRTURE',
    },
  };
  if (undefined !== localStorage.busDirection) {
    state.bus.direction = localStorage.busDirection;
  }
  return state;
}
export default new Vuex.Store<State>({
  state: getInitState(),
  getters: {
    busArrivingSoon(state: State): boolean {
      return undefined !== state.bus.arriveIn && 12 >= state.bus.arriveIn;
    },
  },
  mutations: {
    setBusDirection(state: State, payload): void {
      Vue.delete(state.bus, 'arriveIn');
      Vue.delete(state.bus, 'errorMessage');
      Vue.set(state.bus, 'direction', payload);
      localStorage.busDirection = payload;
    },
    setBusArriveIn(state: State, payload): void {
      Vue.delete(state.bus, 'errorMessage');
      Vue.set(state.bus, 'arriveIn', payload);
    },
    setBusErrorMessage(state: State, payload): void {
      Vue.delete(state.bus, 'arriveIn');
      Vue.set(state.bus, 'errorMessage', payload);
    },
    setBusIntervalID(state: State, payload): void {
      Vue.set(state.bus, 'intervalID', payload);
    },
    setBusStopData(state: State, payload): void {
      Vue.set(state.bus, 'busStopData', payload);
    },
  },
  actions: {
    async showNotify({ }, payload) {
      await Notification.requestPermission();
      const notification = new Notification(payload);
      setTimeout(() => notification.close(), 2000);
    },
    saveBusDirection({ state, dispatch }, payload) {
      Vue.delete(state.bus, 'arriveIn');
      Vue.delete(state.bus, 'errorMessage');
      Vue.set(state.bus, 'direction', payload);
      localStorage.busDirection = payload;
      dispatch('loadBusTime');
    },
    subscribeBusTime({ state, commit, dispatch }) {
      clearInterval(state.bus.intervalID);
      Vue.delete(state.bus, 'intervalID');
      dispatch('loadBusTime');
      const id = setInterval(() => dispatch('loadBusTime'), 120 * 1000);
      commit('setBusIntervalID', id);
    },
    async loadBusTime({ state, getters, commit, dispatch }) {
      commit('setBusStopData', undefined);
      try {
        let targetBusStop: string = '';
        let url;
        if ('DEAPRTURE' === state.bus.direction) {
          url = 'https://cors.io/?http://www.taiwanbus.tw/app_api/SP_PredictionTime_V3.ashx'
            + '?routeNo=1032&branch=0&goBack=1&Lang=&Source=w&runid=4948';
          targetBusStop = '南港車站';
        } else {
          url = 'https://cors.io/?http://www.taiwanbus.tw/app_api/SP_PredictionTime_V3.ashx'
            + '?routeNo=1032&branch=0&goBack=2&Lang=&Source=w&runid=4949';
          targetBusStop = '和平高中';
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Unable to get bus info!');
        }
        const data = await response.json();
        let fromBusStop;
        let toBusStop;
        if ('DEAPRTURE' === state.bus.direction) {
          [fromBusStop, toBusStop] = [37, 54];
        } else {
          [fromBusStop, toBusStop] = [14, 31];
        }
        commit(
          'setBusStopData',
          data[0].stopInfo.slice(fromBusStop, toBusStop)
            .map((busStop: BusStop) => ({ name: busStop.name, predictionTime: busStop.predictionTime })),
        );
        let arriveIn = 0;
        const predictionTime = data[0].stopInfo.find((info: any) => targetBusStop === info.name).predictionTime;
        let match = /(\d+)時/.exec(predictionTime);
        if (match instanceof Array) {
          arriveIn += parseInt(match[1], 10) * 60;
        }
        match = /(\d+)分/.exec(predictionTime);
        if (match instanceof Array) {
          arriveIn += parseInt(match[1], 10);
        } else if ('進站中' !== predictionTime && '即將進站' !== predictionTime) {
          throw new Error('Unable to parse predictionTime: ' + predictionTime);
        }
        if (getters.busArrivingSoon) {
          dispatch('showNotify', arriveIn);
        }
        commit('setBusArriveIn', arriveIn);
      } catch (e) {
        commit('setBusErrorMessage', e.message);
        dispatch('showNotify', e.message);
      }
    },
  },
});
