<template>
   <div class="widget-multiple-choice">
       opinion scale
   </div>
</template>

<script>
    import WidgetToolbar from '@/components/widgets/WidgetToolbar'
    import panel from './style';

    const WIDGET_NAME = 'opinion-scale';
    export default {
        name: WIDGET_NAME,
        icon: "<svg viewBox=\"0 0 16 16\" id=\"icon-matrixdynamic\"><path d=\"M3 1C1.3 1 0 2.3 0 4s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z\"></path><circle cx=\"3\" cy=\"4\" r=\"1\"></circle><path d=\"M11 7c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm0-5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM3 9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM8 15h2l-2-2zM9.03 11.99l4.03-4.03 1.98 1.98-4.03 4.03z\"></path></svg>",
        title: 'Opinion Scale',
        panel,

        setting: {
            type: WIDGET_NAME,
            isContainer: false,
            isChild: true,
            resizable: true,
            belong: 'page',

        },
        // Attribute Meaning Reference widgets/pic/index.vue
        props: ['val', 'h', 'w', 'playState', 'text', "index", "uuid"],
        components: {
            WidgetToolbar
        },
        methods: {
            handleQuestionEdit() {
                this.isEdited = true;
            },
            updateQuestionTitle() {
                this.isEdited = false;
            },
            updateText(e, uuid) {
                let text = e.target.innerHTML
                this.$vpd.commit('updateData', {
                    uuid: uuid,
                    key: 'text',
                    value: text
                })
            }
        }
    }
</script>
