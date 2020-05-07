<template>
  <div>
    <form class="final-survey" @submit.prevent="handleSubmit">
      <div
        class="widget-list d-flex fd-c item"
        :key="val.uuid"
        v-for="val in widgetStore"
      >
        <component
          class="widget"
          :is="val.type"
          :val="val"
          :formData="formData"
          :readonly="false"
          :data-uuid="val.uuid"
        />
      </div>
      <input type="submit" />
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      console.log(this.formData);
    }
  },
  data() {
    return {
      formData: []
    };
  },
  computed: {
    id() {
      return this.$store.getters['widget/uuid'];
    },
    widgetStore: {
      get() {
        return this.$store.getters['widget/widgets'];
      },
      set(value) {
        this.$store.dispatch('widget/updateWidgets', value);
      }
    }
  },
  watch: {
    widgetStore(value) {
      this.formData = this.$store.getters['widget/widgetsUuid'];
      console.log(this.formData);
    }
  }
};
</script>
