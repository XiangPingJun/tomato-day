/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import Countdown from '../src/components/Countdown.vue';
import { deaprtureBus, returnBus } from './busStop.mock';

const countdownBasic = {
  components: { Countdown },
  template: '<countdown :countdown="countdown" :countdownWillEndAfter="countdownWillEndAfter" @onControlCountdown="onControlCountdown" @onChangeType="onChangeType"/>',
  methods: {
    onControlCountdown: action('onControlCountdown'),
    onChangeType: action('onChangeType'),
  }
}
storiesOf('Countdown', module)
  .add('work stop', () => ({
    ...countdownBasic,
    data: () => ({
      countdown: {
        passed: 0,
        started: false,
        type: 'WORK',
      },
      countdownWillEndAfter: '25:00',
    }),
  }))
  .add('break stop', () => ({
    ...countdownBasic,
    data: () => ({
      countdown: {
        passed: 0,
        started: false,
        type: 'BREAK',
      },
      countdownWillEndAfter: '10:00',
    }),
  }))
  .add('work started', () => ({
    ...countdownBasic,
    data: () => ({
      countdown: {
        passed: 0,
        started: true,
        type: 'WORK',
      },
      countdownWillEndAfter: '23:53',
    }),
  }))
  .add('break started', () => ({
    ...countdownBasic,
    data: () => ({
      countdown: {
        passed: 0,
        started: true,
        type: 'WORK',
      },
      countdownWillEndAfter: '03:35',
    }),
  }))

/* eslint-enable react/react-in-jsx-scope */