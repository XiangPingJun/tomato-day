<template>
  <bus-info
    :bus="bus"
    :busArrivingSoon="busArrivingSoon"
    :skipUntil="skipUntil"
    @onEnabledChange="setBusEnabled"
  />
</template>

<script>
import BusInfo from '../components/BusInfo.vue';
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  components: { BusInfo },
  computed: { ...mapState(['bus']), ...mapGetters(['busArrivingSoon', 'skipUntil']) },
  methods: { ...mapActions(['setBusEnabled']) },
};
</script>
