<template>
  <div @click.prevent class="widget-toolbar">
    <vs-button
      v-tooltip.top-center="tooltipDrag"
      color="primary"
      type="flat"
      icon="drag_indicator"
      class="btn-drag"
    ></vs-button>
    <vs-button
      v-tooltip.top-center="tooltipDelete"
      @click="handleDelete"
      color="danger"
      type="flat"
      icon="delete"
    ></vs-button>
    <vs-button
      v-tooltip.top-center="tooltipCopy"
      @click="handleCopy"
      color="primary"
      type="flat"
      icon="file_copy"
    ></vs-button>

    <vs-button
      v-tooltip.top-center="tooltipSelect"
      @click="handleSelect"
      type="flat"
      icon="touch_app"
    ></vs-button>
  </div>
</template>

<script>
export default {
  name: 'WidgetToolbar',
  props: {
    widget: {
      type: Object
    }
  },
  data() {
    return {
      tooltipDrag: 'Move',
      tooltipSelect: 'Select',
      tooltipCopy: 'Copy',
      tooltipDelete: 'Delete'
    };
  },
  methods: {
    handleSelect(uuid) {
      this.$store.commit('widget/select', this.widget);
    },
    handleDelete() {
      this.$store.dispatch('widget/delete', this.widget);
    },
    handleCopy() {
      this.$store.dispatch('widget/copy', this.widget);
    }
  }
};
</script>

<style scoped></style>
