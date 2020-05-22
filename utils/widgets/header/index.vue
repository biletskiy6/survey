<template>
  <div class="widget-single-input">
    <div class="">

      <h4 :style="{
        textAlign: val.headerAlignment,
        fontSize: val.headerFontSize + 'px',
        color: val.headerColor,
        fontStyle: val.isHeaderItalic ? 'italic' : 'normal',
      }"  class="fw-b">{{ val.questionTitle }}</h4>
      <div v-if="val.separatorLine" :style="{
        marginTop: '10px',
        border: `${val.separatorLineHeight}px solid ${val.separatorColor}`,
      }"></div>
    </div>
  </div>
</template>

<script>

import WidgetToolbar from '@/components/widgets/WidgetToolbar';
import panel from './style';
const WIDGET_NAME = 'header-widget';
export default {
  name: WIDGET_NAME,
  icon:
    '<svg viewBox="0 0 16 16" id="icon-text"><path d="M2 1v3h1V3h4v10H5v1h6v-1H9V3h4v1h1V1H2z"></path></svg>',
  title: 'Header',
  panel,

  data() {
    return {
      title: '',
      txt: '',
    };
  },

  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isChild: true,
    text: 'Paste your text here',
    questionTitle: 'My Custom Header',
    questionDescription: '',
    separatorLine: false,
    separatorColor: '#eeeeee',
    separatorLineHeight: 1,
    headerAlignment: 'left',
    isHeaderItalic: false,
    headerFontSize: 18,
    headerColor: '#2F495E',
    belong: 'page',
  },
  // Attribute Meaning Reference widgets/pic/index.vue
  props: [
    'val',
    'h',
    'w',
    'playState',
    'text',
    'index',
    'uuid',
    'readonly',
    'formData',
    'widgetIdx',
  ],
  components: {
    WidgetToolbar
  },
  methods: {
    handleSelect() {
    },
    handleQuestionEdit() {
      this.isEdited = true;
    },
    updateQuestionTitle(uuid) {
      this.isEdited = false;
      this.$store.dispatch('widget/updateData', {
        key: 'questionTitle',
        uuid: uuid,
        value: this.questionTitle,
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
