<template>
    <div class="widget-toolbar">
        <vs-button color="primary" type="flat" icon="menu"></vs-button>
        <vs-button @click="handleDelete" color="danger" type="flat" icon="delete"></vs-button>
        <vs-button @click="handleCopy" color="primary" type="flat" icon="file_copy"></vs-button>
    </div>
</template>

<script>
    export default {
        name: "WidgetToolbar",
        props: {
            widgetUuid: {
                type: String
            }
        },
        mounted() {

        },
        methods: {
            handleDelete() {
                this.$store.dispatch("widget/delete", this.widgetUuid);
            },
            handleCopy() {
                this.$store.dispatch("widget/copy", this.widgetUuid);
            }
        }
    }
</script>

<style scoped>

</style>
