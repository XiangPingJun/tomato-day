<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5 title">
        <div class="text">1032 Bus Info (Skip until {{skipUntil}})</div>
      </div>
      <div class="card-subtitle text-gray"></div>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-checkbox">
          <input type="checkbox" v-model="enabledModel" />
          <i class="form-icon"></i> Enable tracking
        </label>
      </div>
      <div v-if="enabledModel">
        <div v-if="loading" class="loading loading"></div>
        <h2
          v-if="!isNaN(bus.arriveIn)"
          :class="{'text-warning':busArrivingSoon}"
        >{{bus.arriveIn}} minute(s).</h2>
        <h2 v-if="bus.errorMessage" class="text-error">{{bus.errorMessage}}</h2>
        <div v-for="busStop in bus.busStopData">
          <div
            :class="{'text-bold':'進站中'==busStop.predictionTime||'即將進站'==busStop.predictionTime}"
          >{{busStop.name}} {{busStop.predictionTime}}</div>
        </div>
      </div>
      <div v-if="!enabledModel">
        <h2 class="text-gray">(Tracking disabled)</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bus: { type: Object, required: true },
    busArrivingSoon: { type: Boolean, required: false },
    skipUntil: { type: String, required: true },
  },
  data() {
    return {
      enabledModel: this.bus.enabled,
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
    enabledModel(value, oldValue) {
      this.$emit('onEnabledChange', value);
    },
    bus: {
      deep: true,
      handler(value, oldValue) {
        this.enabledModel = value.enabled;
      },
    },
  },
};
</script>
