<template>
  <div class style="margin-top:5px;">
    <div class="columns">
      <div class="column col-6">
        <bus-info/>
      </div>
      <div class="column col-6">
        <notify-config/>
      </div>
    </div>
    <notify v-if="notification.message"/>
  </div>
</template>

<script>
import BusInfo from './BusInfo';
import NotifyConfig from './NotifyConfig';
import Notify from './Notify';
import { mapState } from 'vuex';

export default {
  components: { BusInfo, NotifyConfig, Notify },
  computed: { ...mapState(['notification']) },
};
</script>
