<template>
  <div class="widget-multiple-choice">
    <div class="mb-1">
      <h4 class="fw-b"> {{ widgetIdx + 1 }}.  {{ val.questionTitle }}</h4>
      <p>{{ val.questionDescription }}</p>
    </div>


    <div class="scales d-flex">
      <vs-radio
        class="d-flex fd-c"
        v-for="(scale, index) in val.scales"
        :key="index"
        v-show="scale.isVisible"
        vs-name="scale"
        @change="handleScale($event)"
        :value="index"
      >{{ scale.id }}
      </vs-radio
      >

      {{ val.scaleNumber }}
    </div>
  </div>
</template>

<script>
  import WidgetToolbar from '@/components/widgets/WidgetToolbar';
  import panel from './style';

  const WIDGET_NAME = 'opinion-scale';
  export default {
    name: WIDGET_NAME,
    icon:
      '<svg viewBox="0 0 16 16" id="icon-matrixdynamic"><path d="M3 1C1.3 1 0 2.3 0 4s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path><circle cx="3" cy="4" r="1"></circle><path d="M11 7c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm0-5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM3 9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM8 15h2l-2-2zM9.03 11.99l4.03-4.03 1.98 1.98-4.03 4.03z"></path></svg>',
    title: 'Opinion Scale',
    panel,
    computed: {
      scaleNumber() {
        return this.val.scaleNumber;
      }
    },
    setting: {
      type: WIDGET_NAME,
      isContainer: false,
      questionTitle: '',
      questionDescription: '',
      scaleNumber: 20,
      scales: [
        {id: 0, isChecked: false, isVisible: true},
        {id: 1, isChecked: false, isVisible: true},
        {id: 2, isChecked: false, isVisible: true},
        {id: 3, isChecked: false, isVisible: true},
        {id: 4, isChecked: false, isVisible: true},
        {id: 5, isChecked: false, isVisible: true},
        {id: 6, isChecked: false, isVisible: true},
        {id: 7, isChecked: false, isVisible: true},
        {id: 8, isChecked: false, isVisible: true},
        {id: 9, isChecked: false, isVisible: true},
        {id: 10, isChecked: false, isVisible: true},
        {id: 11, isChecked: false, isVisible: true},
        {id: 12, isChecked: false, isVisible: true},
        {id: 13, isChecked: false, isVisible: true},
        {id: 14, isChecked: false, isVisible: true},
        {id: 15, isChecked: false, isVisible: true},
        {id: 16, isChecked: false, isVisible: true},
        {id: 17, isChecked: false, isVisible: true},
        {id: 18, isChecked: false, isVisible: true},
        {id: 19, isChecked: false, isVisible: true},

      ],
      isChild: true,
      resizable: true,
      belong: 'page'
    },
    // Attribute Meaning Reference widgets/pic/index.vue
    props: ['val', 'h', 'w', 'playState', 'text', 'index', 'uuid',     'widgetIdx'],
    components: {
      WidgetToolbar
    },
    methods: {
      handleScale(e) {
        console.log(e.target.value);
      },
      handleQuestionEdit() {
        this.isEdited = true;
      },
      updateQuestionTitle() {
        this.isEdited = false;
      },
      updateText(e, uuid) {
        let text = e.target.innerHTML;
        this.$vpd.commit('updateData', {
          uuid: uuid,
          key: 'text',
          value: text
        });
      }
    },
    watch: {
      scaleNumber(value) {
        this.$store.commit("widget/updateScaleNumberCount", {
          id: this.val.uuid,
          value
        });
      }
    }
  };
</script>
