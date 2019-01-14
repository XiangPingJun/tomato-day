<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5">Countdown Timer</div>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-radio form-inline">
          <input type="radio" v-model="typeModel" value="WORK">
          <i class="form-icon"></i> Work
        </label>
        <label class="form-radio form-inline">
          <input type="radio" v-model="typeModel" value="BREAK">
          <i class="form-icon"></i> Break
        </label>
        <h2>{{countdownWillEndAfter}}</h2>
        <button
          v-if="!countdown.started"
          class="btn"
          @click="$emit('onControlCountdown','START')"
        >▶ 開始</button>
        <button
          v-if="countdown.started"
          class="btn"
          @click="$emit('onControlCountdown','STOP')"
        >■ 停止</button>
        <!--❚❚ 暫停-->
      </div>
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
export default {
  props: {
    countdown: { required: true },
    countdownWillEndAfter: { required: false },
  },
  data() {
    return {
      typeModel: this.countdown.type,
    };
  },
  computed: {
  },
  watch: {
    typeModel(value, oldValue) {
      this.$emit('onChangeType', value);
    },
    countdown: {
      deep: true,
      handler(value, oldValue) {
        this.typeModel = value.type
      },
    }
  },
};
</script>
