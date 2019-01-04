<template>
  <notify :notification="notification"/>
</template>

<script>
import Notify from '../components/Notify';
import { mapState } from 'vuex';

export default {
  components: { Notify },
  computed: { ...mapState(['notification']) },
};
</script>
