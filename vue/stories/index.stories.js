/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import BusInfo from '../src/components/BusInfo.vue'
import MainPage from '../src/components/MainPage.vue'
import store from '../src/store'

const mainPageBasic = {
  components: { MainPage },
  template: '<MainPage/>',
  store,
}
storiesOf('MainPage', module)
  .add('entry', () => ({
    ...mainPageBasic,
  }))

const busInfoBasic = {
  components: { BusInfo },
  template: '<bus-info :bus="bus" @onDirectionChange="onDirectionChange"/>',
  methods: {
    onDirectionChange: action('onDirectionChange'),
  }
}
storiesOf('BusInfo', module)
  .add('deaprture direction', () => ({
    ...busInfoBasic,
    data: () => ({
      bus: {
        direction: 'DEAPRTURE',
      }
    }),
  }))
  .add('return direction', () => ({
    ...busInfoBasic,
    data: () => ({
      bus: {
        direction: 'RETURN',
      }
    }),
  }))
  .add('arrive in 12 minutes', () => ({
    ...busInfoBasic,
    data: () => ({
      bus: {
        direction: 'DEAPRTURE',
        arriveIn: 10,
      }
    }),
  }))
  .add('arrive in 0 minutes', () => ({
    ...busInfoBasic,
    data: () => ({
      bus: {
        direction: 'DEAPRTURE',
        arriveIn: 0,
      }
    }),
  }))
  .add('error message', () => ({
    ...busInfoBasic,
    data: () => ({
      bus: {
        direction: 'DEAPRTURE',
        errorMessage: 'Unable to get bus info!',
      }
    }),
  }))


/* eslint-enable react/react-in-jsx-scope */
