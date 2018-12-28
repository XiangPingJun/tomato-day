/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import store from '../src/store'

storiesOf('TheBusMonitor', module)
  .add('default status', () => {
    store.commit('loadDefaultSetting')
    return {
      store,
      template: '<TheBusMonitor />'
    }
  })
  .add('"return" direction', () => {
    store.commit('setBusDirection', 'RETURN')
    return {
      store,
      template: '<TheBusMonitor />'
    }
  })
  .add('subscribe real data', () => {
    store.dispatch('subscribeBus')
    return {
      store,
      template: '<TheBusMonitor />'
    }
  })

/* eslint-enable react/react-in-jsx-scope */
