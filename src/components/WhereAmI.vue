<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5 title">
        <div>Where am I ?</div>
        <button class="btn btn-link" @click="showNotify('Test')">Test Notification</button>
      </div>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-radio form-inline">
          <input type="radio" v-model="whereAmIModel" value="OFFICE" />
          <i class="form-icon"></i> Office
        </label>
        <label class="form-radio form-inline">
          <input type="radio" v-model="whereAmIModel" value="HOME" />
          <i class="form-icon"></i> Home
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
}
</style>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    whereAmI: { required: true },
  },
  data() {
    return {
      whereAmIModel: this.whereAmI,
    };
  },
  methods: { ...mapActions(['showNotify']) },
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
