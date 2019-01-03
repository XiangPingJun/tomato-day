<template>
  <MainPage msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainPage from './components/MainPage.vue';

@Component({
  components: {
    MainPage,
  },
})
export default class App extends Vue { }
</script>
