<template>
  <div @click.prevent class="widget-toolbar">
    <vs-button
      v-tooltip.top-center="tooltipDrag"
      color="primary"
      type="flat"
      icon="menu"
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
    widgetUuid: {
      type: String
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
      this.$store.commit('widget/select', {
        uuid: this.widgetUuid
      });
    },
    handleDelete() {
      this.$store.dispatch('widget/delete', this.widgetUuid);
    },
    handleCopy() {
      this.$store.dispatch('widget/copy', this.widgetUuid);
    }
  }
};
</script>

<style scoped></style>
