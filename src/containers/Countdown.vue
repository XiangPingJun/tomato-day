<template>
  <countdown
    :countdown="countdown"
    :countdownWillEndAfter="countdownWillEndAfter"
    @onControlCountdown="controlCountdown"
    @onChangeType="setCountdownType"
  />
</template>

<script>
import Countdown from '../components/Countdown.vue';
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  components: { Countdown },
  computed: { ...mapState(['countdown']), ...mapGetters(['countdownWillEndAfter']) },
  methods: { ...mapMutations(['controlCountdown', 'setCountdownType']) },
};
</script>
