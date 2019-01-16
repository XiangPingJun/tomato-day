/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import Countdown from '../src/components/Countdown.vue';

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
        playback: 'STOP',
        type: 'WORK',
      },
      countdownWillEndAfter: '25:00',
    }),
  }))
  .add('short break stop', () => ({
    ...countdownBasic,
    data: () => ({
      countdown: {
        passed: 0,
        playback: 'STOP',
        type: 'SHORT_BREAK',
      },
      countdownWillEndAfter: '10:00',
    }),
  }))
  .add('long break stop', () => ({
    ...countdownBasic,
    data: () => ({
      countdown: {
        passed: 0,
        playback: 'STOP',
        type: 'LONG_BREAK',
      },
      countdownWillEndAfter: '10:00',
    }),
  }))
  .add('work started', () => ({
    ...countdownBasic,
    data: () => ({
      countdown: {
        passed: 0,
        playback: 'START',
        type: 'WORK',
      },
      countdownWillEndAfter: '23:53',
    }),
  }))
  .add('short break paused', () => ({
    ...countdownBasic,
    data: () => ({
      countdown: {
        passed: 0,
        playback: 'PAUSE',
        type: 'SHORT_BREAK',
      },
      countdownWillEndAfter: '03:35',
    }),
  }))
  .add('long break paused', () => ({
    ...countdownBasic,
    data: () => ({
      countdown: {
        passed: 0,
        playback: 'PAUSE',
        type: 'LONG_BREAK',
      },
      countdownWillEndAfter: '03:35',
    }),
  }))
