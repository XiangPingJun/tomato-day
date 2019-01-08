/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import BusInfo from '../src/components/BusInfo.vue';
import { deaprtureBus, returnBus } from './busStop.mock';

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
        busStopData: deaprtureBus,
      },
    }),
  }))
  .add('arrive in 0 minutes', () => ({
    ...busInfoBasic,
    template: '<bus-info :bus="bus" :busArrivingSoon="busArrivingSoon" @onDirectionChange="onDirectionChange"/>',
    data: () => ({
      bus: {
        direction: 'RETURN',
        arriveIn: 0,
        busStopData: returnBus,
      },
      busArrivingSoon: true,
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
