<template>
  <div v-if="val.separatorLine" :style="{
        borderBottom: `${val.separatorLineHeight}px solid ${val.separatorColor}`,
        height: `${val.separatorLineHeight}px`,
        backgroundColor: `${val.separatorColor}`
      }"></div>
</template>

<script>
import Vue from 'vue';
import WidgetToolbar from '@/components/widgets/WidgetToolbar';
import panel from './style';
const WIDGET_NAME = 'separator-line';
export default {
  name: WIDGET_NAME,
  icon:
    '<svg viewBox="0 0 16 16" id="icon-html"><path d="M4 4L0 8l4 4 1-1-3-3 3-3zM11 4l-1 1 3 3-3 3 1 1 4-4z"></path></svg>',
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
    separatorLine: true,
    separatorColor: '#eeeeee',
    separatorLineHeight: 1,
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
