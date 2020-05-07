<template>
  <div
    :style="{
      border: '1px solid #ccc'
    }"
  ></div>
</template>

<script>
import Vue from 'vue';
import WidgetToolbar from '@/components/widgets/WidgetToolbar';
import panel from './style';
const WIDGET_NAME = 'separator-line';
export default {
  name: WIDGET_NAME,
  icon:
    '<svg viewBox="0 0 16 16" id="icon-text"><path d="M2 1v3h1V3h4v10H5v1h6v-1H9V3h4v1h1V1H2z"></path></svg>',
  title: 'Separator Line',
  panel,
  mounted() {
    // console.log(this.name);
  },
  data() {
    return {
      title: '',
      inputText: '',

      isEdited: false
    };
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
    questionTitle: 'Question Title',
    questionDescription: '',
    href: '',
    belong: 'page',
    animationName: ''
  },
  // Attribute Meaning Reference widgets/pic/index.vue
  props: ['val', 'h', 'w', 'playState', 'text', 'index', 'uuid'],
  components: {
    WidgetToolbar
  },
  methods: {
    handleSelect() {
      alert(1);
    },
    handleQuestionEdit() {
      this.isEdited = true;
    },
    updateQuestionTitle(uuid) {
      this.isEdited = false;
      this.$store.dispatch('widget/updateData', {
        key: 'questionTitle',
        uuid: uuid,
        value: this.questionTitle
      });
    },
    updateText(e, uuid) {
      let text = e.target.innerHTML;
      this.$vpd.commit('updateData', {
        uuid: uuid,
        key: 'text',
        value: text
      });
    }
  }
};
</script>
