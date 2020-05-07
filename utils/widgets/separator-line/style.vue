<template>
  <div>
    options
  </div>
</template>

<script>
export default {
  name: 'separator-line-style',
  props: ['activeElement'],
  methods: {
    updateWidgetData(e, uuid, key) {
      this.$store.commit('widget/updateData', {
        uuid,
        value: e.target.value,
        key: [key]
      });
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.$store.commit("widget/updateWidgetText", "Updated string");
    // }, 1500);
  }
};
</script>
