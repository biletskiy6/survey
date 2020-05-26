<template>
  <div>
    <vs-checkbox v-model="isTextareaVisible" class="mb-2"
    >Additional text box
    </vs-checkbox
    >


    <transition name="fadeHeight">
      <div v-if="activeElement.textarea.isVisible">
        <input v-model="textareaWidgetLabel" class="custom-input"/>
        <v-select placeholder="Choose textarea width" v-model="textareaWidgetWidth"
                  :options="activeElement.textarea.widthOptions">
        </v-select>
        <vs-slider max="15" v-model="textareaWidgetRows"/>
      </div>
    </transition>

  </div>

</template>

<script>
  export default {
    name: "AdditionalTextbox",
    props: ["activeElement"],
    beforeMount() {
    },
    computed: {
      textareaWidgetRows: {
        get() {
          return this.$store.getters['widget/getTextareaWidgetRows'];
        },
        set(value) {
          this.$store.commit('widget/updateTextareaWidgetRows', value);
        }
      },
      textareaWidgetLabel: {
        get() {
          return this.$store.getters['widget/getTextareaWidgetLabel'];
        },
        set(value) {
          this.$store.commit('widget/updateTextareaWidgetLabel', value);
        },
      },
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
