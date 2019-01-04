<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5">Notify Config</div>
      <div class="card-subtitle text-gray"></div>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-checkbox form-inline">
          <input type="checkbox" v-model="page_title">
          <i class="form-icon"></i> Page title
        </label>
        <label class="form-checkbox form-inline">
          <input type="checkbox" v-model="web_notifications">
          <i class="form-icon"></i> Web notification
        </label>
      </div>
      <button v-if="0===testCountdown" @click="test" class="btn">Test</button>
      <button v-if="0!==testCountdown" class="btn" disabled>{{testCountdown}} second(s)...</button>
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
export default {
  props: {
    types: {
      types: Set,
      required: true,
    },
  },
  data() {
    return {
      page_title: this.types.includes('PAGE_TITLE'),
      web_notifications: this.types.includes('WEB_NOTIFICATIONS'),
      testCountdown: 0,
      testIntervalID: undefined,
    };
  },
  watch: {
    page_title(value, oldValue) {
      this.onTypeChange();
    },
    web_notifications(value, oldValue) {
      this.onTypeChange();
    },
  },
  methods: {
    onTypeChange() {
      const value = [];
      if (this.page_title) {
        value.push('PAGE_TITLE');
      }
      if (this.web_notifications) {
        value.push('WEB_NOTIFICATIONS');
      }
      this.$emit('onTypeChange', value);
    },
    test() {
      this.testCountdown = 3;
      this.testIntervalID = setInterval(() => {
        this.testCountdown--;
        if (0 === this.testCountdown) {
          clearInterval(this.testIntervalID);
          this.$emit('onNotify', 'Test notification!');
        }
      }, 1000);
    },
  },
};
</script>
