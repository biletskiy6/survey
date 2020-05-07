<template>
  <div class="survey-panel">
    <h4>Properties</h4>
    <vs-divider />
    <widget-appearence :active-element="activeElement" />
  </div>
</template>

<script>
import widget from '@/utils/widget-plugin';
import WidgetAppearence from '@/components/widgets/WidgetAppearence';
export default {
  name: 'Panel',
  mounted() {
    // console.log("WIDGET STORE", this.$store.state.widget.activeElement);
  },
  computed: {
    activeElement() {
      //   return this.$store.getters["widget/activeElement"];
      return this.$store.state.widget.activeElement;
    }
  },
  watch: {},
  components: {
    WidgetAppearence
  }
};
</script>

<style scoped></style>
