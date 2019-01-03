<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5">1032 Bus Info</div>
      <div class="card-subtitle text-gray"></div>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-radio form-inline">
          <input type="radio" v-model="busDirection" value="DEAPRTURE">
          <i class="form-icon"></i> Deaprture
        </label>
        <label class="form-radio form-inline">
          <input type="radio" v-model="busDirection" value="RETURN">
          <i class="form-icon"></i> Return
        </label>
        <div v-if="loading" class="loading loading"></div>
        <h2 v-if="arriveIn">{{arriveIn}} minute(s).</h2>
        <h2 v-if="errorMessage" class="text-error">{{errorMessage}}</h2>
      </div>
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    direction: {
      required: true,
      validator: value => 'DEAPRTURE' === value || 'RETURN' === value
    },
    arriveIn: {},
    errorMessage: {},
    setBusDirection: { default: () => () => { } }
  },
  data() {
    return {
      busDirection: this.direction,
    };
  },
  computed: {
    loading() {
      return undefined === this.arriveIn && undefined === this.errorMessage;
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
    busDirection(value, oldValue) {
      this.setBusDirection(value);
    },
  },
};
</script>
