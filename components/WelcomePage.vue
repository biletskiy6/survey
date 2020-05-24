<template>
  <div class="welcome-page">
    <div class="welcome-page-container">


      <h2 class="fw-b mb-3" v-if="isDev">Welcome Page</h2>
      <transition name="fadeHeight">
        <h4 v-if="!welcomePageWidgets.length">Welcome page is empty now. Add needed widgets or disable it in the settings</h4>
      </transition>

      <draggable
        class="w-100"
        v-if="welcomePageWidgets.length"
        v-model="welcomePageWidgets"
        @start="isDragging = true"
        @end="isDragging = false"
        draggable=".item"
        handle=".btn-drag"
      >
        <transition-group type="transition" name="flip-list">

          <div
            class="widget-list d-flex fd-c item"
            :class="{ active: isDev && id === val.uuid }"
            :key="val.uuid"
            v-for="(val, index) in welcomePageWidgets"
          >

            <WidgetToolbar v-if="isDev" :widget="val"/>
            <component
              class="widget"
              @click.native="handleClick(val)"
              :is="val.type"
              :isWelcomePage="true"
              :isDev="isDev"
              :widgetIdx="index"
              :val="val"
              :formData="formData"
              :readonly="true"
              :data-uuid="val.uuid"
            />
          </div>
        </transition-group>
      </draggable>


      <vs-dropdown v-if="isDev">
          <vs-button class="mt-1 btn-drop" color="primary" icon="more_horiz"></vs-button>
        <vs-dropdown-menu>
          <vs-dropdown-item
            v-for="item in widgets"
            v-if="item.name === 'header-widget' || item.name === 'text-editor' "
            :key="item.name"
            @click="handleAddWidget(item)"
          >
            {{ item.title }}
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>


      <vs-button @click="$emit('handleStartSurvey', $event) " v-if="!isDev"> Start Survey</vs-button>
    </div>
  </div>
</template>

<script>
  import WidgetToolbar from '@/components/widgets/WidgetToolbar';
  import draggable from 'vuedraggable';
  import widget from '@/utils/widget-plugin';

  export default {
    name: "WelcomePage",
    props: ['isDev'],
    components: {
      draggable,
      WidgetToolbar
    },
    data() {
      return {
        formData: {},
        popupActive: false,
        welcomeEditorContent: null,
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
      }
    },
    computed: {
      id() {
        return this.$store.getters['widget/uuid'];
      },

      welcomePageActiveId() {
        return this.$store.getters['widget/welcomePageActiveId']
      },

      welcomePageWidgets: {
        get() {
          return this.$store.getters['widget/welcomePageWidgets'];
        },
        set(value) {
          this.$store.commit('widget/updateWelcomePageWidgets', value);
        }
      },
      widgets() {
        return widget.getWidgets();
      }
    },
    methods: {
      handleClick(val) {

        if(this.isDev) {
          this.$store.commit('widget/select', val);
        }

      },
      handleAddWidget(item) {
        this.$store.commit('widget/addWelcomePageWidget', {
          item,
          isWelcomePage: true
        });
      },

      handleTextEditor() {
        this.activePopup = true;
      },

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
        // this.$store.commit('widget/updatePrivacyPolicyContent', html)
        // this.val.content = html
      }
    }
  }
</script>

<style scoped>

</style>
