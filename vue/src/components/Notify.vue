<template>
  <div/>
</template>

<script>
export default {
  props: {
    types: {
      required: true,
      type: Array,
      default() {
        return [];
      },
      validator: value => value.every(item => 'ALERT' === value || 'TITLE' === value || 'NOTIFICATION' == value),
    },
    message: {},
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
      this.onDirectionSet(value);
    },
  },
};
</script>
