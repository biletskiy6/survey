<template>
  <div>
    <vs-checkbox v-model="isTextareaVisible" class="mb-2"
    >Additional text box
    </vs-checkbox
    >

    <v-select placeholder="Choose textarea width" v-model="textareaWidgetWidth"
              :options="activeElement.textarea.widthOptions" v-if="activeElement.textarea.isVisible">
    </v-select>
  </div>

</template>

<script>
  export default {
    name: "AdditionalTextbox",
    props: ["activeElement"],
    beforeMount() {
    },
    computed: {
      isTextareaVisible: {
        get() {
          return this.$store.getters['widget/getTextareaWidgetVisibility'];
        },
        set(value) {
          this.$store.commit('widget/updateTextareaVisibility', value);
        },
      },
      textareaWidgetWidth: {
        get() {
          return this.$store.getters['widget/getTextareaWidgetOptions'];
        },
        set(value) {
          if (value) {
            this.$store.commit('widget/updateTextareaWidgetWidth', value.value);
          }
        }
      },
    },
    methods: {
      updateTextareaVisibility(e) {
        alert(this.isTextareaVisible);
        this.$store.commit('widget/updateTextareaVisibility');
      }
    }
  }
</script>

<style scoped>

</style>
