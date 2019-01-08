<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5">1032 Bus Info</div>
      <div class="card-subtitle text-gray"></div>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-radio form-inline">
          <input type="radio" v-model="directionModel" value="DEAPRTURE">
          <i class="form-icon"></i> Deaprture
        </label>
        <label class="form-radio form-inline">
          <input type="radio" v-model="directionModel" value="RETURN">
          <i class="form-icon"></i> Return
        </label>
        <div v-if="loading" class="loading loading"></div>
        <h2 v-if="!isNaN(bus.arriveIn)">{{bus.arriveIn}} minute(s).</h2>
        <h2 v-if="bus.errorMessage" class="text-error">{{bus.errorMessage}}</h2>
      </div>
      <div v-for="busStop in bus.busStopData">{{busStop.name}} {{busStop.predictionTime}}</div>
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
export default {
  props: {
    bus: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      directionModel: this.bus.direction,
    };
  },
  computed: {
    loading() {
      return undefined === this.bus.arriveIn && undefined === this.bus.errorMessage;
    },
    arrivingAt() {
      if (isNaN(this.arriveIn)) {
        return false;
      } else {
        return this.arriveIn + ' minute(s)';
      }
    },
  },
  watch: {
    directionModel(value, oldValue) {
      this.$emit('onDirectionChange', value);
    },
  },
};
</script>
