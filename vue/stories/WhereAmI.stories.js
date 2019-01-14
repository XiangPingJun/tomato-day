/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import WhereAmI from '../src/components/WhereAmI.vue';

const whereAmIBasic = {
  components: { WhereAmI },
  template: '<where-am-i :whereAmI="whereAmI" @onWhereAmIChange="onWhereAmIChange"/>',
  methods: {
    onWhereAmIChange: action('onWhereAmIChange'),
  }
}
storiesOf('WhereAmI', module)
  .add('office', () => ({
    ...whereAmIBasic,
    data: () => ({
      whereAmI: 'OFFICE'
    }),
  }))
  .add('home', () => ({
    ...whereAmIBasic,
    data: () => ({
      whereAmI: 'HOME'
    }),
  }))
