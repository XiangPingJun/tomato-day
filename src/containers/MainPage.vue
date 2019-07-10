<template>
  <div class style="margin:5px;">
    <div class="columns">
      <div class="column col-12" style="margin-bottom: 10px;">
        <where-am-i/>
      </div>
      <div class="column col-6">
        <bus-info v-if="'HOME'===whereAmI"/>
        <countdown v-else/>
      </div>
      <div class="column col-6">
        <countdown v-if="'HOME'===whereAmI"/>
        <bus-info v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import BusInfo from './BusInfo';
import Countdown from './Countdown';
import WhereAmI from './WhereAmI';
import { mapActions, mapState } from 'vuex';

export default {
  components: { WhereAmI, BusInfo, Countdown },
  created() {
    this.init();
  },
  computed: { ...mapState(['whereAmI']) },
  methods: { ...mapActions(['init']) },
};
</script>
