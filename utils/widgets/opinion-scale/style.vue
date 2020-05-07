<template>
  <div>
    <input
      class="custom-input mb-1"
      type="text"
      :value="activeElement.questionTitle"
      placeholder="Question title"
      v-on:input="updateWidgetData($event, activeElement.uuid, 'questionTitle')"
    />

    <input
      class="custom-input mb-1"
      placeholder="Question description"
      type="text"
      :value="activeElement.questionDescription"
      v-on:input="
        updateWidgetData($event, activeElement.uuid, 'questionDescription')
      "
    />
  </div>
</template>

<script>
export default {
  name: 'opinion-scale-widget',
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
  filters: {
    toFixed: function(data) {
      return data.toFixed(1);
    }
  }
};
</script>
