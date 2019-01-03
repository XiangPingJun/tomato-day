<template>
  <div class="container" style="margin-top:5px;">
    <div class="columns">
      <div class="column col-6">
        <BusInfoContainer/>
      </div>
      <div class="column col-6"></div>
    </div>
  </div>
</template>

<script>
import BusInfoContainer from './BusInfoContainer.vue';

export default {
  components: { BusInfoContainer },
};
</script>
