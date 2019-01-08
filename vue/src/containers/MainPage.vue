<template>
  <div class style="margin-top:5px;">
    <div class="columns">
      <div class="column col-6">
        <bus-info/>
      </div>
    </div>
  </div>
</template>

<script>
import BusInfo from './BusInfo';
import { mapState } from 'vuex';

export default {
  components: { BusInfo },
  computed: { ...mapState(['notification']) },
};
</script>
