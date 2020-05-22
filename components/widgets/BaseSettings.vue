<template>
  <div>
    <h5 class="fw-b tac">Basic settings</h5>
    <vs-divider/>

    <div class="settings-gutter">
      <input
        class="custom-input mb-1"
        type="text"
        :value="activeElement.questionTitle"
        placeholder="Question title"
        v-on:input="updateWidgetData($event, activeElement.uuid, 'questionTitle')"
      />

      <input
        v-if="activeElement.type !== 'header-widget'"
        class="custom-input"
        type="text"
        placeholder="Question description"
        :value="activeElement.questionDescription"
        v-on:input="
        updateWidgetData($event, activeElement.uuid, 'questionDescription')
      "
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: "BaseSettings",
    props: ['activeElement'],
    methods: {
      updateWidgetData(e, uuid, key) {
        this.$store.commit('widget/updateData', {
          uuid,
          value: e.target.value,
          key: [key],
          isWelcomePage: this.activeElement.isWelcomePage
        });
      }
    },
  }
</script>

<style scoped>

</style>
