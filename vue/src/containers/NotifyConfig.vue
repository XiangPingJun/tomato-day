<template>
  <notify-config :types="notification.types" @onTypeChange="setNotifyType" @onNotify="showNotify"/>
</template>

<script>
import NotifyConfig from '../components/NotifyConfig.vue';
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  components: { NotifyConfig },
  computed: { ...mapState(['notification']) },
  methods: { ...mapMutations(['setNotifyType']), ...mapActions(['showNotify']) },
};
</script>
