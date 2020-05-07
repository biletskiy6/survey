<template>
    <div class="container">

        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold"
                >
                    BOLD
<!--                    <icon name="bold"/>-->
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic"
                >
                    ITALIC
<!--                    <icon name="italic"/>-->
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.strike() }"
                        @click="commands.strike"
                >
<!--                    <icon name="strike"/>-->
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.underline() }"
                        @click="commands.underline"
                >
<!--                    <icon name="underline"/>-->
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.code() }"
                        @click="commands.code"
                >
<!--                    <icon name="code"/>-->
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.paragraph() }"
                        @click="commands.paragraph"
                >
<!--                    <icon name="paragraph"/>-->
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })"
                >
                    H1
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })"
                >
                    H2
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({ level: 3 })"
                >
                    H3
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                >
<!--                    <icon name="ul"/>-->
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.ordered_list() }"
                        @click="commands.ordered_list"
                >
                    <icon name="ol"/>
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.blockquote() }"
                        @click="commands.blockquote"
                >
<!--                    <icon name="quote"/>-->
                </button>

                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.code_block() }"
                        @click="commands.code_block"
                >
                    <icon name="code"/>
                </button>

                <button
                        class="menubar__button"
                        @click="commands.horizontal_rule"
                >
<!--                    <icon name="hr"/>-->
                </button>

                <button
                        class="menubar__button"
                        @click="commands.undo"
                >
<!--                    <icon name="undo"/>-->
                </button>

                <button
                        class="menubar__button"
                        @click="commands.redo"
                >
<!--                    <icon name="redo"/>-->
                </button>

            </div>
        </editor-menu-bar>

        <editor-content class="editor__content" :editor="editor"/>
    </div>
</template>

<script>
    import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
    // import Icon from 'Components/Icon';
    import {
        Blockquote,
        CodeBlock,
        HardBreak,
        Heading,
        HorizontalRule,
        OrderedList,
        BulletList,
        ListItem,
        TodoItem,
        TodoList,
        Bold,
        Code,
        Italic,
        Link,
        Strike,
        Underline,
        History,
    } from 'tiptap-extensions'

    const WIDGET_NAME = 'ck-txt';
    export default {
        components: {
            EditorContent,
            EditorMenuBar
        },
        mounted() {
          // console.log(this.editor.getHTML());
        },
        data() {
            return {
                // Create an `Editor` instance with some default content. The editor is
                // then passed to the `EditorContent` component as a `prop`
                editor: new Editor({
                    content: '<p>This is just a boring paragraph</p>',
                    extensions: [
                        new Blockquote(),
                        new BulletList(),
                        new CodeBlock(),
                        new HardBreak(),
                        new Heading({ levels: [1, 2, 3] }),
                        new HorizontalRule(),
                        new ListItem(),
                        new OrderedList(),
                        new TodoItem(),
                        new TodoList(),
                        new Link(),
                        new Bold(),
                        new Code(),
                        new Italic(),
                        new Strike(),
                        new Underline(),
                        new History(),
                    ],
                }),
            }
        },
        beforeDestroy() {
            // Always destroy your editor instance when it's no longer needed
            this.editor.destroy()
        },

        name: WIDGET_NAME,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
        title: 'CKeditor-Text',
        setting: {
            type: WIDGET_NAME,
            isContainer: false,
            isUpload: false,
            hasGuide: true,
            isChild: true,
            dragable: true,
            resizable: true,
            width: 150,
            height: 50,
            left: 50,
            top: 50,
            z: 1,
            lineHeight: 1.6,
            fontSize: 20,
            fontWeight: false,
            italic: false,
            uppercase: false,
            color: '#000000',
            backgroundColor: '',
            fontFamily: '',
            border: '',
            textAlign: 'left',
            text: 'Paste your text here',
            href: '',
            belong: 'page',
            animationName: ''
        },
        // Attribute Meaning Reference widgets/pic/index.vue
        props: ['val', 'h', 'w', 'playState', 'text', "index", "uuid"],
        methods: {
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
