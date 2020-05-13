<template>
  <div>
    <h5 class="fw-b tac">Basic settings</h5>
    <vs-divider/>
    <input
      class="custom-input mb-1"
      type="text"
      :value="activeElement.questionTitle"
      placeholder="Question title"
      v-on:input="updateWidgetData($event, activeElement.uuid, 'questionTitle')"
    />

    <input
      class="custom-input"
      type="text"
      placeholder="Question description"
      :value="activeElement.questionDescription"
      v-on:input="
        updateWidgetData($event, activeElement.uuid, 'questionDescription')
      "
    />

    <!--        <vs-input class="inputx" placeholder="Placeholder" v-model=""/>-->
  </div>
</template>

<script>
export default {
  name: 'braid-txt-style',
  props: ['activeElement'],
  filters: {
    toFixed: function(data) {
      return data.toFixed(1);
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
