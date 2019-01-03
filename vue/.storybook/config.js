import { configure } from '@storybook/vue';
import Vue from 'vue'
import MainPage from '../src/components/MainPage.vue'
import BusInfo from '../src/components/BusInfo.vue'

Vue.component('MainPage', MainPage);
Vue.component('BusInfo', BusInfo);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
