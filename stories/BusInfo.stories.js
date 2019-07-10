/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import BusInfo from '../src/components/BusInfo.vue';
import { deaprtureBus, returnBus } from './busStop.mock';

const busInfoBasic = {
  components: { BusInfo },
  template: '<bus-info :bus="bus" @onEnabledChange="onEnabledChange"/>',
  methods: {
    onEnabledChange: action('onEnabledChange'),
  }
}
storiesOf('BusInfo', module)
  .add('disabled', () => ({
    ...busInfoBasic,
    data: () => ({
      bus: {
        enabled: false,
      }
    }),
  }))
  .add('arrive in 12 minutes', () => ({
    ...busInfoBasic,
    data: () => ({
      bus: {
        arriveIn: 12,
        busStopData: deaprtureBus,
        enabled: true,
      },
    }),
  }))
  .add('arrive in 9 minutes', () => ({
    ...busInfoBasic,
    template: '<bus-info :bus="bus" :busArrivingSoon="busArrivingSoon"/>',
    data: () => ({
      bus: {
        arriveIn: 9,
        busStopData: deaprtureBus,
        enabled: true,
      },
      busArrivingSoon: true,
    }),
  }))
  .add('arrive in 0 minutes', () => ({
    ...busInfoBasic,
    template: '<bus-info :bus="bus" :busArrivingSoon="busArrivingSoon"/>',
    data: () => ({
      bus: {
        arriveIn: 0,
        busStopData: returnBus,
        enabled: true,
      },
      busArrivingSoon: true,
    }),
  }))
  .add('error message', () => ({
    ...busInfoBasic,
    data: () => ({
      bus: {
        errorMessage: 'Unable to get bus info!',
        enabled: true,
      }
    }),
  }))
