/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import store from '../src/store'

storiesOf('MainPage', module)
  .add('entry', () => {
    return {
      store,
      template: '<MainPage />'
    }
  })
storiesOf('BusInfo', module)
  .add('deaprture direction', () => {
    return { template: '<BusInfo direction="DEAPRTURE" />' }
  })
  .add('return direction', () => {
    return { template: '<BusInfo direction="RETURN" />' }
  })
  .add('arrive in 10 minutes', () => {
    return {
      template: '<BusInfo arriveIn="10" direction="DEAPRTURE" />'
    }
  })
  .add('error message', () => {
    return {
      template: '<BusInfo errorMessage="Unable to get bus info!" direction="DEAPRTURE" />'
    }
  })


/* eslint-enable react/react-in-jsx-scope */
