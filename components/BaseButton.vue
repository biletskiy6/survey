<template>
  <div>
    <vs-button @click="handleClick">JUst click me</vs-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$listeners.handleButtonClick();
    }
  }
};
</script>

<style></style>
