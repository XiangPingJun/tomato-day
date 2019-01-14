<template>
  <div class style="margin:5px;">
    <div class="columns">
      <div class="column col-6">
        <bus-info/>
      </div>
      <div class="column col-6">
        <countdown/>
      </div>
    </div>
  </div>
</template>

<script>
import BusInfo from './BusInfo';
import Countdown from './Countdown';
import { mapActions } from 'vuex';

export default {
  components: { BusInfo, Countdown },
  created() {
    this.init();
  },
  methods: { ...mapActions(['init']) }
};
</script>
