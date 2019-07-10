<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5">Where am I ?</div>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-radio form-inline">
          <input type="radio" v-model="whereAmIModel" value="OFFICE">
          <i class="form-icon"></i> Office
        </label>
        <label class="form-radio form-inline">
          <input type="radio" v-model="whereAmIModel" value="HOME">
          <i class="form-icon"></i> Home
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    whereAmI: { required: true },
  },
  data() {
    return {
      whereAmIModel: this.whereAmI,
    };
  },
  computed: {
  },
  watch: {
    whereAmIModel(value, oldValue) {
      this.$emit('onWhereAmIChange', value);
    },
    whereAmI(value, oldValue) {
      this.whereAmIModel = value;
    },
  },
};
</script>
