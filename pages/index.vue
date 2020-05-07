<template>
  <div class="container"></div>
</template>

<script>
import Vue from 'vue';
import Logo from '@/components/Logo.vue';
import Toolbar from '@/components/Toolbar';
import Viewport from '@/components/Viewport';
import BaseButton from '@/components/BaseButton';

export default {
  components: {
    Toolbar,
    Viewport,
    Logo,
    BaseButton
  },
  created() {
    // this.$once("hook:mounted", () => {
    //   console.log("mounted");
    // });
  },

  data() {
    return {
      counter: 0
    };
  },

  methods: {
    handleButtonClick() {
      this.counter++;
    }
  },
  computed: {
    widgetStore() {
      return this.$store.getters.widgets;
    }
  }
};
</script>
