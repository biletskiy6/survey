<template>
  <div>
    <div v-if="!isDev" v-html="val.content"></div>
    <div v-if="isDev" class="quill-editor"
         :content="val.content"
         @change="onEditorChange($event)"
         @blur="onEditorBlur($event)"
         @focus="onEditorFocus($event)"
         @ready="onEditorReady($event)"
         v-quill:myQuillEditor="editorOption">
    </div>
  </div>
</template>

<script>
  const WIDGET_NAME = 'text-editor';
  export default {
    components: {},
    computed: {
      editorContent: {
        get() {
          return this.$store.getters['widget/getTextEditorContent'](this.val.uuid);
        },
        set(value) {
          // this.$store.commit('widget/updateTextEditorContent', {
          //   id: this.val.uuid,
          //   value
          // })
        }
      }
    },
    mounted() {
      // console.log(this.editor.getHTML());
    },
    data: () => ({

      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'direction': 'rtl'}],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            [{'font': []}],
            [{'color': []}, {'background': []}],
            [{'align': []}],
            ['clean'],
            ['link', 'image', 'video']
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
    }),
    name: WIDGET_NAME,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
    title: 'Text Editor',
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
      belong: 'page',
      textEditorContent: '<p>Initial</p>',
      content: '<p>tttteeeeesssstttt</p>'
    },
    // Attribute Meaning Reference widgets/pic/index.vue
    props: ['val', 'h', 'w', 'playState', 'text', "index", "uuid", "isDev"],
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({editor, html, text}) {
        console.log('editor change!', editor, html, text)
        this.$store.commit('widget/updateTextEditorContent', {
          id: this.val.uuid,
          html
        })
        // this.val.content = html
      }
    },
  }
</script>
<style scoped>
  .ql-editor.ql-editor--preview {
    min-height: auto;
  }
</style>
