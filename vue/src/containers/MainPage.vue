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
  </div>
</template>

<script>
import BusInfo from './BusInfo';
import NotifyConfig from './NotifyConfig';

export default {
  components: { BusInfo, NotifyConfig },
};
</script>
