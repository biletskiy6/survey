<template>
  <div>
    Options for varialbe widget

    <!--        <vs-input class="inputx" placeholder="Placeholder" v-model=""/>-->
  </div>
</template>

<script>
export default {
  name: 'variable-style',
  props: ['activeElement'],
  filters: {
    toFixed: function(data) {
      return data.toFixed(1);
    }
  },
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
