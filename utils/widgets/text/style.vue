<template>
  <div>

    <BaseSettings :activeElement="activeElement" />





  </div>
</template>

<script>

  import BaseSettings from "@/components/widgets/BaseSettings";

  export default {
    name: 'braid-txt-style',
    props: ['activeElement'],
    components: {
      BaseSettings
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
