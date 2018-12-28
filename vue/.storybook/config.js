import { configure } from '@storybook/vue';
import Vue from 'vue'
import TheBusMonitor from '../src/components/TheBusMonitor.vue'

Vue.component('TheBusMonitor', TheBusMonitor);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
