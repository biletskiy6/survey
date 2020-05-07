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
    <!--        <vs-input class="inputx" placeholder="Placeholder" v-model=""/>-->

    <vs-input-number label="Min:" v-model="minValue" />
    <vs-input-number label="Max:" v-model="maxValue" />
    <vs-input-number label="Step:" v-model="stepValue" />
  </div>
</template>

<script>
export default {
  name: 'slider-style',
  props: ['activeElement'],
  filters: {
    toFixed: function(data) {
      return data.toFixed(1);
    }
  },
  computed: {
    minValue: {
      get() {
        return this.$store.getters['widget/getSliderMinValue'](
          this.activeElement.uuid
        );
      },
      set(value) {
        this.$store.commit('widget/updateSliderValue', {
          id: this.activeElement.uuid,
          value: value,
          key: 'min'
        });
      }
    },
    maxValue: {
      get() {
        return this.$store.getters['widget/getSliderMaxValue'](
          this.activeElement.uuid
        );
      },
      set(value) {
        this.$store.commit('widget/updateSliderValue', {
          id: this.activeElement.uuid,
          value: value,
          key: 'max'
        });
      }
    },
    stepValue: {
      get() {
        return this.$store.getters['widget/getSliderStepValue'](
          this.activeElement.uuid
        );
      },
      set(value) {
        this.$store.commit('widget/updateSliderValue', {
          id: this.activeElement.uuid,
          value,
          key: 'step'
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
  mounted() {
    // setTimeout(() => {
    //   this.$store.commit("widget/updateWidgetText", "Updated string");
    // }, 1500);
  }
};
</script>
