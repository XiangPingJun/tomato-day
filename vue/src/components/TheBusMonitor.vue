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
      </div>
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
export default {
  computed: {
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
