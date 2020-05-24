<template>
    <div class="widget-appearence">
        <transition name="fadeHeight">
            <component
                    v-for="(item, i) in widgetStyle"
                    v-if="item.type === activeElement.type"
                    :is="widgetStyle[i]"
                    :key="i"
                    :active-element="activeElement"
            />
        </transition>
    </div>
</template>

<script>
    import widget from '@/utils/widget-plugin';

    export default {
        name: 'WidgetAppearence',
        props: ['activeElement'],
        computed: {
            widgetStyle() {
                return widget.getWidgetStyle();
            }
        }
    };
</script>

<style scoped>


</style>
