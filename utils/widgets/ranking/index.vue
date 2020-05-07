<template>
  <div class="widget-single-input">
    <h6>{{ val.questionTitle }}</h6>

    <p>{{ val.questionDescription }}</p>

    <draggable v-model="rankingRows" draggable=".item" handle=".btn-drag">
      <div
        class="item mb-1"
        :key="index"
        v-for="(row, index) in val.rankingRows"
      >
        <vs-button
          class="btn-drag"
          color="primary"
          type="flat"
          icon="list"
        ></vs-button>
        <input
          readonly
          class="custom-input"
          placeholder="Question text"
          :data-uuid="row.id"
          :value="row.value"
          type="text"
        />
      </div>
    </draggable>
  </div>
</template>

<script>
import Vue from 'vue';
import draggable from 'vuedraggable';
import WidgetToolbar from '@/components/widgets/WidgetToolbar';
import panel from './style';
import { v4 as uuidv4 } from 'uuid';
const WIDGET_NAME = 'ranking';
export default {
  name: WIDGET_NAME,
  icon:
    '<svg viewBox="0 0 16 16" id="icon-text"><path d="M2 1v3h1V3h4v10H5v1h6v-1H9V3h4v1h1V1H2z"></path></svg>',
  title: 'Ranking',
  panel,
  computed: {
    rankingRows: {
      get() {
        return this.$store.getters['widget/rankingRows'];
      },
      set(value) {
        this.$store.commit('widget/updateRankingRows', value);
      }
    }
  },
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
    rankingRows: [
      { id: uuidv4(), value: '' },
      { id: uuidv4(), value: '' },
      { id: uuidv4(), value: '' }
    ],
    href: '',
    belong: 'page',
    animationName: ''
  },
  // Attribute Meaning Reference widgets/pic/index.vue
  props: ['val', 'h', 'w', 'playState', 'text', 'index', 'uuid'],
  components: {
    WidgetToolbar,
    draggable
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
