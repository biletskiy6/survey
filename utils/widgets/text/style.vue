<template>
  <div>

    <BaseSettings :activeElement="activeElement" />



    <div class="settings-gutter mt-1">
      <vs-checkbox v-model="isRequired">Is Required?</vs-checkbox>
      <vs-checkbox class="mt-1" v-model="isTooltip">Help Tooltip</vs-checkbox>
      <vs-textarea v-if="isTooltip" class="mt-1  mb-1" label="Tooltip Text" v-model="tooltipText" />
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
      tooltipText: {
        get() {
          return this.$store.getters['widget/getTooltipText'];
        },
        set(value) {
          this.$store.commit('widget/setTooltipText', value);
        },
      },
      isTooltip: {
        get() {
          return this.$store.getters['widget/isTooltip'];
        },
        set(value) {
          this.$store.commit('widget/setTooltip', value);
        },
      },
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
