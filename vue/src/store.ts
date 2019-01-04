import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface BusState {
  direction: 'DEAPRTURE' | 'RETURN';
  arriveIn?: number;
  errorMessage?: string;
  intervalID?: number;
}
interface NotificationState {
  types: Array<'PAGE_TITLE' | 'WEB_NOTIFICATIONS'>;
  intervalID?: number;
}
interface State {
  bus: BusState;
  notification: NotificationState;
}

function getInitState(): State {
  const state: State = {
    bus: {
      direction: 'DEAPRTURE',
    },
    notification: {
      types: ['PAGE_TITLE', 'WEB_NOTIFICATIONS'],
    },
  };
  if (undefined !== localStorage.busDirection) {
    state.bus.direction = localStorage.busDirection;
  }
  if (undefined !== localStorage.notifyType) {
    state.notification.types = JSON.parse(localStorage.notifyType);
  }
  return state;
}
export default new Vuex.Store<State>({
  state: getInitState(),
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
    setNotifyType(state: State, payload): void {
      Vue.set(state.notification, 'type', payload);
      localStorage.notifyType = JSON.stringify(payload);
    },
    setNotifyTypeIntervalID(state: State, payload): void {
      Vue.set(state.notification, 'intervalID', payload);
    },
  },
  actions: {
    async notify({ state, commit }, payload) {
      if (state.notification.types.includes('PAGE_TITLE')) {
        let blinkIn: boolean = false;
        const id = setInterval(() => {
          const link: any = document.querySelector('link[rel*="icon"]') || document.createElement('link');
          if (blinkIn) {
            link.href = '/favicon.ico';
          } else {
            link.href = '/blank.ico';
          }
          blinkIn = !blinkIn;
        }, 500);
        commit('setNotifyTypeIntervalID', id);
      }
      if (state.notification.types.includes('WEB_NOTIFICATIONS')) {
        await Notification.requestPermission();
        const notification = new Notification(payload);
        setTimeout(() => notification.close(), 1500);
      }
    },
    saveBusDirection({ state, dispatch }, payload) {
      Vue.delete(state.bus, 'arriveIn');
      Vue.delete(state.bus, 'errorMessage');
      Vue.set(state.bus, 'direction', payload);
      localStorage.busDirection = payload;
      dispatch('loadBusTime');
    },
    subscribeBusTime({ state, dispatch, commit }) {
      clearInterval(state.bus.intervalID);
      Vue.delete(state.bus, 'intervalID');
      dispatch('loadBusTime');
      const id = setInterval(() => dispatch('loadBusTime'), 60 * 1000);
      commit('setBusIntervalID', id);
    },
    async loadBusTime({ state, dispatch, commit }) {
      try {
        let targetBusStop: string = '';
        let url;
        if ('DEAPRTURE' === state.bus.direction) {
          url = 'https://cors.io/?http://www.taiwanbus.tw/app_api/SP_PredictionTime_V3.ashx'
            + '?routeNo=1032&branch=0&goBack=2&Lang=&Source=w&runid=4949';
          targetBusStop = '南港車站';
        } else {
          url = 'https://cors.io/?http://www.taiwanbus.tw/app_api/SP_PredictionTime_V3.ashx'
            + '?routeNo=1032&branch=0&goBack=1&Lang=&Source=w&runid=4948';
          targetBusStop = '和平高中';
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Unable to get bus info!');
        }
        const data = await response.json();
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
        if (12 >= arriveIn) {
          dispatch('notify', arriveIn);
        }
        commit('setBusArriveIn', arriveIn);
      } catch (e) {
        commit('setBusErrorMessage', e.message);
        dispatch('notify', e.message);
      }
    },
  },
});
