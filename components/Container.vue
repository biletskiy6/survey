<template>
    <div class="builder-container">
        <button @click="onAdd">Add new+</button>
    </div>
</template>

<script>
    // import widget from '@/utils/widget-plugin';
    export default {
        name: "Container",
        methods: {
            onAdd() {
                this.$store.dispatch('addWidget')
            }
        }
    }
</script>

<style scoped>
    .builder-container {
        width: 600px;
        margin: 0 auto;
        height: 200px;
        border: 1px solid #000;
    }
</style>
