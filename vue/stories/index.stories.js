/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import MainPage from '../src/containers/MainPage.vue'
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

/* eslint-enable react/react-in-jsx-scope */
