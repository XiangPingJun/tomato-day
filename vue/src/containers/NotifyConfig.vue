<template>
  <div>
    <notify-config :types="notification.types" @onTypeChange="setNotifyType" @onNotify="notify"/>
  </div>
</template>

<script>
import NotifyConfig from '../components/NotifyConfig.vue';
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  components: { NotifyConfig },
  computed: { ...mapState(['notification']) },
  methods: { ...mapActions(['notify']), ...mapMutations(['setNotifyType']) },
};
</script>
