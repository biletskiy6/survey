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


<!--    <vs-select-->

<!--      v-model="numberOfScales"-->
<!--      class="con-select-example"-->
<!--      label="Number of scales"-->
<!--      icon="keyboard_arrow_down"-->
<!--    >-->
<!--      <vs-select-item-->
<!--        :key="index"-->
<!--        :value="item.id + 1"-->
<!--        :text="item.id + 1"-->
<!--        v-for="(item, index) in activeElement.scales"-->
<!--      />-->
<!--    </vs-select>-->
  </div>
</template>

<script>
export default {
  name: 'opinion-scale-widget',
  props: ['activeElement'],
  computed: {
    numberOfScales: {
      get() {
        this.$store.getters['widget/numberOfScales'](this.activeElement.uuid)
      },
      set(value) {
        this.$store.commit('widget/updateNumberOfScales', {
          id: this.activeElement.uuid,
          value
        });
      }
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
  filters: {
    toFixed: function(data) {
      return data.toFixed(1);
    }
  }
};
</script>
