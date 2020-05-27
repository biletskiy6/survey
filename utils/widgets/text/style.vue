<template>
  <div>

    <BaseSettings :activeElement="activeElement" />






    <div class="mt-1">
      <vs-checkbox class="ml-1" v-model="isRequired">Is Required?</vs-checkbox>
      <AdditionalTextbox :activeElement="activeElement" />
    </div>






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
