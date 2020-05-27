<template>
  <div>
    <vs-checkbox v-model="isTextareaVisible" class="mt-1 ml-1 mb-2"
    >Additional text box
    </vs-checkbox
    >


    <transition name="fadeHeight">
      <div class="settings-gutter" v-if="activeElement.textarea.isVisible">
        <vs-divider> Textarea label </vs-divider>
        <input placeholder="Textarea label(placeholder)" v-model="textareaWidgetLabel" class="custom-input mb-1"/>
        <vs-divider> Textarea width </vs-divider>
        <v-select placeholder="Choose textarea width" v-model="textareaWidgetWidth"
                  :options="activeElement.textarea.widthOptions">
        </v-select>


        <vs-divider> Textarea rows </vs-divider>
        <div class="d-flex ai-c">
          <vs-slider max="15" v-model="textareaWidgetRows"/>
          <div class="ml-1 badge">{{ textareaWidgetRows }}</div>
        </div>
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
