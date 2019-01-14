<template>
  <bus-info
    :bus="bus"
    :busArrivingSoon="busArrivingSoon"
    @onDirectionChange="saveBusDirection"
    @onEnabledChange="setBusEnabled"
  />
</template>

<script>
import BusInfo from '../components/BusInfo.vue';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';

export default {
  components: { BusInfo },
  computed: { ...mapState(['bus']), ...mapGetters(['busArrivingSoon']) },
  methods: { ...mapActions(['saveBusDirection']), ...mapMutations(['setBusEnabled']) },
};
</script>
