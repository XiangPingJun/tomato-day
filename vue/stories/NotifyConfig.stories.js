/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import NotifyConfig from '../src/components/NotifyConfig.vue'

const notifyConfigBasic = {
  components: { NotifyConfig },
  template: '<notify-config :types="types" @onTypeChange="onTypeChange" @onNotify="onNotify"/>',
  methods: {
    onTypeChange: action('onTypeChange'),
    onNotify: action('onNotify'),
  }
}
storiesOf('NotifyConfig', module)
  .add('page title', () => ({
    ...notifyConfigBasic,
    data: () => ({
      types: ['PAGE_TITLE']
    }),
  }))
  .add('web notifications', () => ({
    ...notifyConfigBasic,
    data: () => ({
      types: ['WEB_NOTIFICATIONS']
    }),
  }))
  .add('none', () => ({
    ...notifyConfigBasic,
    data: () => ({
      types: []
    }),
  }))
  .add('all', () => ({
    ...notifyConfigBasic,
    data: () => ({
      types: ['PAGE_TITLE', 'WEB_NOTIFICATIONS']
    }),
  }))

/* eslint-enable react/react-in-jsx-scope */
