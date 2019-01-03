<template>
  <div>
    <BusInfo :bus="bus" @onDirectionChange="saveBusDirection"/>
  </div>
</template>

<script>
import BusInfo from './BusInfo.vue';
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
