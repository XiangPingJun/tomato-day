<template>
  <where-am-i :whereAmI="whereAmI" @onWhereAmIChange="setWhereAmI"/>
</template>

<script>
import WhereAmI from '../components/WhereAmI.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: { WhereAmI },
  computed: { ...mapState(['whereAmI']) },
  methods: { ...mapActions(['setWhereAmI']) },
};
</script>
