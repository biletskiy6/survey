<template>
    <div class="widget-single-input">

        <WidgetToolbar :widgetUuid="val.uuid"/>
        <h6 v-show="!isEdited">{{ questionTitle }}
            <vs-button @click="handleQuestionEdit" color="primary" type="flat" icon="create"></vs-button>
        </h6>
        <vs-input class="editable-input mb-1" @blur="updateQuestionTitle(val.uuid)"
                  @keyup.enter="updateQuestionTitle(val.uuid)" v-show="isEdited" v-model="questionTitle" type="text"/>
        <vs-input class="inputx" v-model="inputText"/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import WidgetToolbar from '@/components/widgets/WidgetToolbar'
    import panel from './style';
    const WIDGET_NAME = 'braid-txt';
    export default {

        name: WIDGET_NAME,
        icon: "<svg viewBox=\"0 0 16 16\" id=\"icon-text\"><path d=\"M2 1v3h1V3h4v10H5v1h6v-1H9V3h4v1h1V1H2z\"></path></svg>",
        title:  "Text",
        panel,
        mounted() {

          // console.log(this.name);
        },
        data() {
            return {
                title: "",
                inputText: "",
                questionTitle: "Question title",
                isEdited: false,
            }
        },
        setting: {
            type: WIDGET_NAME,
            isContainer: false,
            isUpload: false,
            hasGuide: true,
            isChild: true,
            dragable: true,
            resizable: true,
            text: 'Paste your text here',
            href: '',
            belong: 'page',
            animationName: '',
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
            updateQuestionTitle(uuid) {
                this.isEdited = false;
                this.$store.dispatch("widget/updateData", {
                    key: "questionTitle",
                    uuid: uuid,
                    value: this.questionTitle,
                })
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
