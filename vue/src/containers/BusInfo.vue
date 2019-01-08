<template>
  <bus-info :bus="bus" :busArrivingSoon="busArrivingSoon" @onDirectionChange="saveBusDirection"/>
</template>

<script>
import BusInfo from '../components/BusInfo.vue';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';

export default {
  components: { BusInfo },
  created() {
    this.subscribeBusTime();
  },
  computed: { ...mapState(['bus']), ...mapGetters(['busArrivingSoon']) },
  methods: { ...mapActions(['subscribeBusTime', 'saveBusDirection']) },
};
</script>
