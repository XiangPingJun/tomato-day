<template>
  <bus-info :bus="bus" @onDirectionChange="saveBusDirection"/>
</template>

<script>
import BusInfo from '../components/BusInfo.vue';
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  components: { BusInfo },
  created() {
    this.subscribeBusTime();
  },
  computed: { ...mapState(['bus']) },
  methods: { ...mapActions(['subscribeBusTime', 'saveBusDirection']) },
};
</script>
