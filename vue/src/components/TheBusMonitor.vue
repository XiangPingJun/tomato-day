<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5">1032 Bus Monitor</div>
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
        <div v-if="loading" class="loading loading-lg"></div>
        <h2 v-else-if="busMessage">{{busMessage}}</h2>
        <h2 v-else-if="busErrorMessage" class="text-error">{{busErrorMessage}}</h2>
        <h2 v-else class="text-error">Should not reach here</h2>
      </div>
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return null === this.$store.state.busTime
    },
    busMessage() {
      if (isNaN(this.$store.state.busTime))
        return false
      else if (0 === this.$store.state.busTime)
        return 'Arriving';
      else
        return this.$store.state.busTime + ' minute(s)';
    },
    busErrorMessage() {
      if (this.$store.state.busTime instanceof Error)
        return this.$store.state.busTime.message
    },
    busDirection: {
      get() {
        return this.$store.state.busDirection;
      },
      set(value) {
        this.$store.commit('setBusDirection', value);
      }
    }
  }
}
</script>
