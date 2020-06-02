<template>
  <div class="widget-multiple-choice">
    <div class="mb-1">
      <h4 class="fw-b">{{ val.questionTitle }}</h4>
      <p>{{ val.questionDescription }}</p>
    </div>

    <div
      class="multiple-choice-row mb-1"
      :key="index"
      v-for="(row, index) in val.choiceRows"
    >

      <vs-checkbox :disabled="isDev" @change="handleInput(row)"
                   :value="row.isChecked"></vs-checkbox>

      <div class="custom-input">
        {{ row.value }}
      </div>
    </div>

    <div>
      <vs-textarea
        :rows="val.textarea.rows"
        :label="val.textarea.label"
        v-model="additionalTextareaValue"
        :readonly="readonly"
        :width="val.textarea.width"
        v-show="val.textarea.isVisible"
      />
    </div>
  </div>
</template>

<script>
  import WidgetToolbar from '@/components/widgets/WidgetToolbar';
  import {required} from 'vuelidate/lib/validators';
  import {sameAs } from 'vuelidate/lib/validators';
  import {v4 as uuidv4} from 'uuid';
  import panel from './style';

  const WIDGET_NAME = 'multiple-choice';
  export default {
    name: WIDGET_NAME,
    icon:
      '<svg viewBox="0 0 16 16" id="icon-matrixdropdown"><path d="M4 1C2.3 1 1 2.3 1 4s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path><circle cx="4" cy="4" r="1"></circle><path d="M12 7c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm0-5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM4 9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path><circle cx="4" cy="12" r="1"></circle><path d="M12 9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg>',
    title: 'Multiple Choice',
    panel,
    data() {
      return {
        selectedRoute: []
      }
    },

    validations: {
      selectedRoute: {
        checked (val) {
          return val
        }
      }
    },

    computed: {
      additionalTextareaValue: {
        get() {
          return this.$store.getters['survey/additionalTextareaValue'](this.val.uuid);
        },
        set(value) {
          this.$store.commit('survey/setAdditionalTextareaValue', {
            questionId: this.val.uuid,
            textareaValue: value
          })
        }
      },
      value: {
        get() {
          return [];
        },
        set(value) {
          return;
          this.$store.commit('survey/updateAnswer', {
            value,
            uuid: this.val.uuid
          });
        }
      }
    },
    setting: {
      type: WIDGET_NAME,
      typeTitle: 'multiple choice',
      isContainer: false,
      isChild: true,
      resizable: true,
      questionTitle: 'Question Title',
      questionDescription: '',
      isRequired: true,
      textarea: {
        isVisible: false,
        label: null,
        rows: 3,
        width: '100%',
        widthOptions: [
          {label: 'Size: 25%', value: '25%'},
          {label: 'Size: 50%', value: '50%'},
          {label: 'Size: 75%', value: '75%'},
          {label: 'Size: 100%', value: '100%'}
        ],
        text: ''
      },

      choiceRows: [
        {id: uuidv4(), value: '', isChecked: false},
        {id: uuidv4(), value: '', isChecked: false},
        {id: uuidv4(), value: '', isChecked: false}
      ],
      belong: 'page'
    },
    // Attribute Meaning Reference widgets/pic/index.vue
    props: [
      'val',
      'h',
      'w',
      'playState',
      'text',
      'index',
      'isDev',
      'uuid',
      'readonly',
      'formData',
      'widgetIdx',
    ],
    components: {
      WidgetToolbar
    },
    methods: {

      handleInput(row) {
        this.$store.commit('survey/updateMultipleChoiceAnswers', {
          row,
          questionId: this.val.uuid
        });
      },

      getVal(value) {
        return value.split(' ').join('_');
      },

      updateMultipleChoiseQuestionRows(e, widgetId, rowId) {
        this.$store.commit('widget/updateData', {
          uuid: widgetId,
          isNested: true,
          isNestedKey: 'choiceRows',
          isNestedRowId: rowId,
          isNestedValue: e.target.value
        });
        // return;
        // this.$store.commit("widget/updateMultipleChoiseQuestionRows", {
        //   id,
        //   value: e.target.value
        // });
      },
      handleQuestionEdit() {
        this.isEdited = true;
      },
      updateQuestionTitle() {
        this.isEdited = false;
      }
    },
    watch: {
      choiceRows(value) {
        console.log('choise row updated');
      }
    }
  };
</script>
