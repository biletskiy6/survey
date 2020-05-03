<template>
   <div class="widget-multiple-choise">
       multiple choise
   </div>
</template>

<script>
    import WidgetToolbar from '@/components/widgets/WidgetToolbar'
    import panel from './style'

    const WIDGET_NAME = 'multiple-choice';
    export default {
        name: WIDGET_NAME,
        icon: "<svg viewBox=\"0 0 16 16\" id=\"icon-matrixdropdown\"><path d=\"M4 1C2.3 1 1 2.3 1 4s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z\"></path><circle cx=\"4\" cy=\"4\" r=\"1\"></circle><path d=\"M12 7c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm0-5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM4 9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z\"></path><circle cx=\"4\" cy=\"12\" r=\"1\"></circle><path d=\"M12 9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z\"></path></svg>",
        title: 'Multiple Choice',
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
