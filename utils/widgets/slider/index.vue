<template>
  <div class="widget-single-input">
    <div class="mb-1">
      <h4 class="fw-b">{{ val.questionTitle }}</h4>
      <p>{{ val.questionDescription }}</p>
    </div>


    <div>
      <vs-slider
        :min="val.slider.min"
        :max="val.slider.max"
        :step="val.slider.step"
        v-model="sliderValue"
      />
      {{ sliderValue }}
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import WidgetToolbar from '@/components/widgets/WidgetToolbar';
import panel from './style';
const WIDGET_NAME = 'slider';
export default {
  name: WIDGET_NAME,
  icon:
    '<svg viewBox="0 0 16 16" id="icon-rating"><path d="M0 7h1l1-1v5h1V5H2L0 7zm5 5h5V4H5v8zm1-5h2V6H6V5h3v3H7v2h2v1H6V7zm6-2v1h2v1h-2v1h2v2h-2v1h3V5h-3z"></path></svg>',
  title: 'Slider',
  panel,
  mounted() {
    // console.log(this.name);
  },
  computed: {
    sliderValue: {
      get() {
        return this.$store.getters['widget/getSliderValue'](this.val.uuid);
        // return this.$store.getters['widget/getSliderValue'];
      },
      set(value) {
        this.$store.commit('widget/updateSliderValue', {
          id: this.val.uuid,
          value,
          key: 'value'
        });
      }
    }
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
    slider: {
      min: 1,
      max: 20,
      step: 1,
      value: 1
    },
    text: 'Paste your text here',
    questionTitle: '',
    questionDescription: '',
    href: '',
    belong: 'page',
    animationName: ''
  },
  // Attribute Meaning Reference widgets/pic/index.vue
  props: ['val', 'h', 'w', 'playState', 'text', 'index', 'uuid',     'widgetIdx',],
  components: {
    WidgetToolbar
  },
  methods: {
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
