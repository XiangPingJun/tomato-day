import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface BusState {
  direction: 'DEAPRTURE' | 'RETURN';
  arriveIn?: number;
  errorMessage?: string;
  busStopData?: BusStop[];
  enabled: boolean;
}
interface BusStop {
  name: string;
  predictionTime: string;
}
interface CountdownState {
  type: 'WORK' | 'BREAK';
  started: boolean;
  passed: number;
}
interface State {
  bus: BusState;
  countdown: CountdownState;
}

function getInitState(): State {
  const state: State = {
    bus: {
      direction: 'DEAPRTURE',
      enabled: false,
    },
    countdown: {
      passed: 0,
      started: false,
      type: 'WORK',
    },
  };
  if (undefined !== localStorage.busDirection) {
    state.bus.direction = localStorage.busDirection;
  }
  if ('DEAPRTURE' === state.bus.direction) {
    state.bus.enabled = true;
  }
  return state;
}
export default new Vuex.Store<State>({
  state: getInitState(),
  getters: {
    busArrivingSoon(state: State): boolean {
      return undefined !== state.bus.arriveIn && 12 >= state.bus.arriveIn;
    },
    countdownWillEndAfter(state: State, getters): string | undefined {
      const diff: number = getters.countdownTarget - state.countdown.passed;
      if (0 >= diff) {
        return undefined;
      } else {
        return `${Math.floor(diff / 60).toString().padStart(2, '0')}:${(diff % 60).toString().padStart(2, '0')}`;
      }
    },
    countdownTarget(state: State): number {
      return 'WORK' === state.countdown.type ? 25 * 60 : 10 * 60;
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
    setBusStopData(state: State, payload): void {
      Vue.set(state.bus, 'busStopData', payload);
    },
    setBusEnabled(state: State, payload): void {
      Vue.set(state.bus, 'enabled', payload);
    },
    setCountdownType(state: State, payload): void {
      Vue.set(state.countdown, 'type', payload);
      Vue.set(state.countdown, 'started', false);
    },
    setCountdownPassed(state: State, payload): void {
      Vue.set(state.countdown, 'passed', payload)
    },
    controlCountdown(state: State, payload: 'START' | 'STOP'): void {
      Vue.set(state.countdown, 'started', 'START' === payload);
    },
  },
  actions: {
    init({ state, getters, commit, dispatch }) {
      const getBusTime = () => {
        if (state.bus.enabled) {
          dispatch('getBusTime');
        }
      }
      setInterval(getBusTime, 120 * 1000);
      getBusTime();
      let link: any = window.top.document.querySelector("link[rel*='icon']");
      if (!link) {
        link = window.top.document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        window.top.document.getElementsByTagName('head')[0].appendChild(link);
      }
      setInterval(() => {
        if (state.countdown.started) {
          commit('setCountdownPassed', state.countdown.passed + 1);
          if (state.countdown.passed >= getters.countdownTarget) {
            dispatch('showNotify', `${state.countdown.type} timer!`);
            commit('setCountdownPassed', 0);
            commit('controlCountdown', 'STOP');
            commit('setCountdownType', 'WORK' === state.countdown.type ? 'BREAK' : 'WORK');
          }
          link.href = 'https://favicon-generator.org/favicon-generator/htdocs/favicons/2015-01-13/83c32432b480c0f5dd4a664d73079134.ico';
          window.top.document.title = getters.countdownWillEndAfter;
        } else {
          link.href = 'https://favicon-generator.org/favicon-generator/htdocs/favicons/2015-01-31/f86e790d31405a65eaaf5f4732e14967.ico';
        }
      }, 1000);
    },
    async showNotify({ }, payload) {
      await Notification.requestPermission();
      const notification = new Notification(payload);
      setTimeout(() => notification.close(), 2000);
    },
    setBusDirection({ state, dispatch }, payload) {
      Vue.delete(state.bus, 'arriveIn');
      Vue.delete(state.bus, 'errorMessage');
      Vue.set(state.bus, 'direction', payload);
      localStorage.busDirection = payload;
      dispatch('getBusTime');
    },
    setBusEnabled({ commit, dispatch }, payload) {
      if (payload) {
        dispatch('getBusTime');
      }
      commit('setBusEnabled', payload);
    },
    async getBusTime({ state, getters, commit, dispatch }) {
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
        commit('setBusArriveIn', arriveIn);
        if (getters.busArrivingSoon) {
          dispatch('showNotify', arriveIn);
        }
      } catch (e) {
        commit('setBusErrorMessage', e.message);
        dispatch('showNotify', e.message);
      }
    },
  },
});
