import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface BusState {
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
  playback: 'START' | 'STOP' | 'PAUSE';
  passed: number;
}
interface State {
  whereAmI: 'OFFICE' | 'HOME';
  bus: BusState;
  countdown: CountdownState;
}

function getInitState(): State {
  const state: State = {
    whereAmI: 'OFFICE',
    bus: {
      enabled: false,
    },
    countdown: {
      passed: 0,
      playback: 'STOP',
      type: 'WORK',
    },
  };
  if (undefined !== localStorage.whereAmI) {
    state.whereAmI = localStorage.whereAmI;
  }
  if ('HOME' === state.whereAmI) {
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
    setWhereAmI(state: State, payload): void {
      state.whereAmI = payload;
      Vue.delete(state.bus, 'arriveIn');
      Vue.delete(state.bus, 'errorMessage');
      localStorage.whereAmI = payload;
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
      Vue.set(state.countdown, 'playback', 'STOP');
      Vue.set(state.countdown, 'passed', 0);
    },
    setCountdownPassed(state: State, payload): void {
      Vue.set(state.countdown, 'passed', payload);
    },
    controlCountdown(state: State, payload: 'START' | 'STOP' | 'PAUSE'): void {
      Vue.set(state.countdown, 'playback', payload);
      if ('STOP' === payload) {
        Vue.set(state.countdown, 'passed', 0);
      }
    },
  },
  actions: {
    init({ state, getters, commit, dispatch }) {
      const getBusTime = () => {
        if (state.bus.enabled) {
          dispatch('getBusTime');
        }
      };
      setInterval(getBusTime, 120 * 1000);
      getBusTime();
      let link: any = window.top.document.querySelector('link[rel*="icon"]');
      if (!link) {
        link = window.top.document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        window.top.document.getElementsByTagName('head')[0].appendChild(link);
      }
      setInterval(() => {
        const favicons = 'https://favicon-generator.org/favicon-generator/htdocs/favicons/2015-01-13/';
        if ('START' === state.countdown.playback) {
          commit('setCountdownPassed', state.countdown.passed + 1);
          if (state.countdown.passed >= getters.countdownTarget) {
            dispatch('showNotify', `${state.countdown.type} timer!`);
            commit('setCountdownPassed', 0);
            commit('controlCountdown', 'STOP');
            commit('setCountdownType', 'WORK' === state.countdown.type ? 'BREAK' : 'WORK');
          }
          link.href = favicons + '83c32432b480c0f5dd4a664d73079134.ico';
        } else if ('PAUSE' === state.countdown.playback) {
          link.href = favicons + 'f86e790d31405a65eaaf5f4732e14967.ico';
        } else {
          link.href = favicons + '66e0f1e0443a5ee9eb45af51b3ca755a.ico';
        }
        window.top.document.title = getters.countdownWillEndAfter;
      }, 1000);
    },
    async showNotify({ }, payload) {
      await Notification.requestPermission();
      const notification = new Notification(payload);
      setTimeout(() => notification.close(), 2000);
    },
    setWhereAmI({ commit, dispatch }, payload) {
      commit('setWhereAmI', payload);
      if ('HOME' === payload) {
        commit('setBusEnabled', true);
        dispatch('getBusTime');
      } else {
        commit('setBusEnabled', false);
      }
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
        if ('HOME' === state.whereAmI) {
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
        if ('HOME' === state.whereAmI) {
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
