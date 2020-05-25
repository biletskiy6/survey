<template>
  <div class="widget-single-input">
    <div class="mb-1">
      <h4 class="fw-b">{{ val.questionTitle }}</h4>
      <p>{{ val.questionDescription }}</p>
    </div>

    <vs-input
      v-model="value"
      :readonly="readonly"
      :danger="$v.value.$dirty && !$v.value.required"
      danger-text="Required field!"
      :class="{
                  invalid:
                    ($v.value.$dirty && !$v.value.required)
                }"
      :state="$v.value.$error ? false : null"
      class="inputx"
    />
    <p v-show="$v.value.$dirty && !$v.value.required">
      The email field is required!
    </p>

        <div class="mt-1">
          <vs-textarea
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
  import panel from './style';
  import {required} from 'vuelidate/lib/validators';

  const WIDGET_NAME = 'braid-txt';
  export default {
    name: WIDGET_NAME,
    icon:
      '<svg viewBox="0 0 16 16" id="icon-text"><path d="M2 1v3h1V3h4v10H5v1h6v-1H9V3h4v1h1V1H2z"></path></svg>',
    title: 'Text',
    panel,


    touch() {
      this.$v.$touch()
    },

    data() {

      return {
        title: '',
        txt: '',
      };
    },

    validations: {
      value: {
        required
      }
    },

    setting: {
      type: WIDGET_NAME,
      isContainer: false,
      isChild: true,
      text: 'Paste your text here',
      questionTitle: 'Question Title',
      questionDescription: '',
      belong: 'page',
      isRequired: false,
      textarea: {
        isVisible: false,
        width: '100%',
        widthOptions: [
          {label: 'Size: 25%', value: '25%'},
          {label: 'Size: 50%', value: '50%'},
          {label: 'Size: 75%', value: '75%'},
          {label: 'Size: 100%', value: '100%'}
        ],
        text: ''
      },
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
          return this.$store.getters['survey/answerValue'](this.val.uuid);
        },
        set(value) {
          this.$store.commit('survey/updateAnswer', {
            value,
            uuid: this.val.uuid
          });
        }
      }
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
