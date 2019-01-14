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
      </div>
      <h2>{{countdownWillEndAfter}}</h2>
      <div v-if="'START'==countdown.playback" class="form-group">
        <button class="btn" @click="$emit('onControlCountdown','PAUSE')">❚❚ Pause</button>
        <button class="btn" @click="$emit('onControlCountdown','STOP')">■ Stop</button>
      </div>
      <div v-else class="form-group">
        <button class="btn" @click="$emit('onControlCountdown','START')">▶ Start</button>
      </div>
    </div>
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
        this.typeModel = value.type;
      },
    },
  },
};
</script>
