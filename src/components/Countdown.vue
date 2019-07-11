<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5">Countdown Timer</div>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-radio form-inline">
          <input type="radio" v-model="typeModel" value="WORK" />
          <i class="form-icon"></i> Work
        </label>
        <label class="form-radio form-inline">
          <input type="radio" v-model="typeModel" value="SHORT_BREAK" />
          <i class="form-icon"></i> Short Break
        </label>
        <label class="form-radio form-inline">
          <input type="radio" v-model="typeModel" value="LONG_BREAK" />
          <i class="form-icon"></i> Long Break
        </label>
      </div>
      <h2>{{countdownWillEndAfter}}</h2>
      <div v-if="'START'===countdown.playback" class="btn-group btn-group-block">
        <button
          class="btn"
          @click="$emit('onControlCountdown','PAUSE');"
          onclick="this.blur();"
        >❚❚ Pause</button>
        <button
          class="btn"
          @click="$emit('onControlCountdown','STOP');"
          onclick="this.blur();"
        >■ Stop</button>
      </div>
      <div v-else class="btn-group btn-group-block">
        <button
          class="btn"
          @click="$emit('onControlCountdown','START');"
          onclick="this.blur();"
        >▶ Start</button>
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
      spaceKeyListener: (event) => {
        if (' ' !== event.key) {
          return;
        }
        if ('START' === this.countdown.playback) {
          this.$emit('onControlCountdown', 'PAUSE');
        } else {
          this.$emit('onControlCountdown', 'START');
        }
      },
    };
  },
  created() {
    document.addEventListener('keypress', this.spaceKeyListener);
  },
  beforeDestroy() {
    document.removeEventListener('keypress', this.spaceKeyListener);
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
