<template>
   <div class="survey-panel" >
       <h4>Properties</h4>
       <widget-appearence :active-element="activeElement" />
   </div>
</template>

<script>
    import widget from '@/utils/widget-plugin';
    import WidgetAppearence from "@/components/widgets/widgetAppearence";
    export default {
        name: "Panel",
        computed: {

            activeElement() {
                return this.$store.getters['widget/activeElement'];
            }
        },
        watch: {
            activeElement(value) {
                console.log(value)
            }
        },
        components: {
            WidgetAppearence
        }
    }
</script>

<style scoped>

</style>
