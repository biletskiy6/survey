<template>
  <div>

    <BaseSettings :activeElement="activeElement" />





    <AdditionalTextbox :activeElement="activeElement" />
    <vs-checkbox v-model="isRequired">Is Required?</vs-checkbox>





  </div>
</template>

<script>

  import BaseSettings from "@/components/widgets/BaseSettings";
  import AdditionalTextbox from "@/components/widgets/AdditionalTextbox";

  export default {
    name: 'braid-txt-style',
    props: ['activeElement'],
    computed: {
      isRequired: {
        get() {
          return this.$store.getters['widget/isRequired'];
        },
        set(value) {
          this.$store.commit('widget/setRequiredField', value);
        },
      }
    },
    components: {
      BaseSettings,
      AdditionalTextbox
    },
    filters: {
      toFixed: function (data) {
        return data.toFixed(1);
      }
    },

    methods: {


    },
    mounted() {
      // setTimeout(() => {
      //   this.$store.commit("widget/updateWidgetText", "Updated string");
      // }, 1500);
    }
  };
</script>
