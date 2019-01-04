<template>
  <div></div>
</template>

<script>
export default {
  props: ['notification'],
  data() {
    return {
      intervalID: undefined
    }
  },
  async created() {
    if (this.notification.types.includes('PAGE_TITLE')) {
      let blinkIn = false;
      this.intervalID = setInterval(() => {
        const link = document.querySelector('link[rel*="icon"]') || document.createElement('link');
        if (blinkIn) {
          link.href = '/favicon.ico';
          document.title = this.notification.message || '';
        } else {
          link.href = '/blank.ico';
          document.title = '';
        }
        blinkIn = !blinkIn;
      }, 500);
    }
    if (this.notification.types.includes('WEB_NOTIFICATIONS')) {
      await Notification.requestPermission();
      const notification = new Notification(this.notification.message);
      setTimeout(() => notification.close(), 2000);
    }
  },
};
</script>
