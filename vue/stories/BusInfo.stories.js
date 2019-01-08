/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import BusInfo from '../src/components/BusInfo.vue';
import busDeaprtureMock from './bus.deaprture.mock';

const busInfoBasic = {
  components: { BusInfo },
  template: '<bus-info :bus="bus" :busStopData="busStopData" @onDirectionChange="onDirectionChange"/>',
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
      },
      busStopData: busDeaprtureMock,
    }),
  }))
  .add('arrive in 0 minutes', () => ({
    ...busInfoBasic,
    data: () => ({
      bus: {
        direction: 'DEAPRTURE',
        arriveIn: 0,
      },
      busStopData: busDeaprtureMock,
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
