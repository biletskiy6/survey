<template>
  <div>
    <BaseSettings :activeElement="activeElement" />

    <vs-divider/>

    <vs-input-number label="Min:" v-model="minValue" />
    <vs-input-number label="Max:" v-model="maxValue" />
    <vs-input-number label="Step:" v-model="stepValue" />
  </div>
</template>

<script>
import BaseSettings from "@/components/widgets/BaseSettings";
export default {
  name: 'slider-style',
  components: {BaseSettings},
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
