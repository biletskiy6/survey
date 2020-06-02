<template>
  <div class="widget-single-input">
    <h4 class="fw-b"> {{ val.questionTitle }}</h4>
    <p>{{ val.questionDescription }}</p>

    <div :key="opt.id" v-for="opt in val.variableOptions" class="variable-options mb-2">
      <div>
        <h4 class="mb-1">{{ opt.label }}</h4>
        <div v-show="opt.selectedVariableOption === 'textbox'" class="variable-textbox">


<!--                    <input v-model="variableTextboxValue[getKeyForLabel(opt.label)]" :readonly="isDev" class="custom-input" type="text">-->

          <input :ref="opt.id" :readonly="isDev"
                 @input="updateVariableValues($event, opt.id, opt.label)" class="custom-input"/>
        </div>
        <div v-show="opt.selectedVariableOption === 'dnd-numbers'" class="variable-dnd-numbers">
          <v-select :ref="opt.id" @input="updateVariableValues($event, opt.id, opt.label)" placeholder="Choose the answer"
                    :options="getVarNumberOptions(opt.id)"></v-select>
        </div>
        <div v-show="opt.selectedVariableOption === 'dnd-text'" class="variable-dnd-text">
          <v-select @input="updateVariableValues($event, opt.id, opt.label)" placeholder="Choose the answer"
                    :options="getVarTextOptions(opt.id)"></v-select>
        </div>
        <div v-show="opt.selectedVariableOption === 'single-answer'" class="variable-single-answer">
          <vs-radio
            v-model="variableSingleAnswer"
            @input="updateVariableValues($event, opt.id, opt.label)"
            class="mb-1"
            :key="radioOption.id"
            :disabled="isDev"
            v-for="radioOption in opt.variableRadioOptions"
            vs-name="radios1"
            :vs-value="radioOption.value"
          > {{ radioOption.value }}
          </vs-radio>
        </div>
        <div v-show="opt.selectedVariableOption === 'multiple-answer'" class="variable-multiple-answer">
          <vs-checkbox :disabled="isDev"
                       @change="handleVariableMultipleAnswer(checkboxOption, opt.id, opt.label, checkboxOption.id)"
                       class="mb-1" :key="checkboxOption.id"
                       :value="checkboxOption.isChecked" v-for="checkboxOption in opt.variableCheckboxOptions">
            {{checkboxOption.value }}
          </vs-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {v4 as uuidv4} from 'uuid';
  import WidgetToolbar from '@/components/widgets/WidgetToolbar';
  import panel from './style';

  const WIDGET_NAME = 'variable';
  export default {
    name: WIDGET_NAME,
    icon:
      '<svg viewBox="0 0 16 16" id="icon-boolean"><path d="M0 16h10V6H0v10zm2-6l2 2 4-4 1 1-5 5-3-3 1-1z"></path><path d="M5 1v4h1V2h8v8h-3v1h4V1z"></path></svg>',
    title: 'Variable',
    panel,
    mounted() {
      this.getVariableValues();
    },
    data() {
      return {
        title: '',
        inputText: '',
        selectDndText: null,
        isEdited: false,
        variableTextboxValue: {}
      };
    },

    computed: {
      variableSingleAnswer: {
        get() {

        },
        set() {

        }
      },
      dndText: {
        get() {
          return this.$store.getters['survey/answerValue'](this.val.uuid);
        },
        set(value) {
          if (!this.isDev) {
            this.$store.commit('survey/updateAnswer', {
              value,
              uuid: this.val.uuid
            })
          }

        },
      },

      dndNumbers: {
        get() {
          return this.$store.getters['survey/answerValue'](this.val.uuid);
        },
        set(value) {
          if (!this.isDev) {
            this.$store.commit('survey/updateAnswer', {
              value,
              uuid: this.val.uuid
            })
          }

        },
      },
      textboxValue: {
        get() {
          return this.$store.getters['survey/answerValue'](this.val.uuid);
        },
        set(value) {
          this.$store.commit('survey/updateVariableWidget', {
            value,
            questionId: this.val.uuid
          });
        }
      }
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
      animationName: '',
      selectedVariableOption: 'textarea',
      variableOptions: [
        {
          id: uuidv4(),
          label: "Test",
          selectedVariableOption: null,
          varMinNumber: 1,
          varMaxNumber: 10,
          variableSelectOptions: [
            {id: uuidv4(), label: "", value: ""},
          ],
          variableRadioOptions: [
            {id: uuidv4(), label: "", value: ""},
          ],
          variableCheckboxOptions: [
            {id: uuidv4(), label: "", value: "", isChecked: false},
          ]
        }
      ],
    },
    props: ['val', 'h', 'w', 'playState', 'text', 'index', 'isDev', 'uuid', 'widgetIdx'],
    components: {
      WidgetToolbar
    },
    methods: {
      getVariableValues() {
        const questionId = this.val.uuid;
        let variableOptionsIds = [];
        let variableOptions = this.val.variableOptions;

        for(let i = 0; i < variableOptions.length; i++) {
          variableOptionsIds.push(variableOptions[i].id);
        }

       const values = this.$store.getters['survey/getVariableValues'](questionId,variableOptionsIds)


        return '...';

        // if(values.length) {
        //   let i = 0;
        //   for(let ref in this.$refs) {
        //     this.$refs[ref][0].value = values[i];
        //     i++;
        //   }
        // }


      },
      getKeyForLabel(label) {
        return label.replace(/ /g, "_").toLowerCase();
      },
      getVariableValue(questionId, optionId) {
        this.$store.getters['survey/variableValue'](questionId, optionId);
      },
      updateVariableValues(e, optionId, optionLabel) {
        if (!this.isDev) {
          let value = e instanceof InputEvent ? e.target.value : e;
          this.$store.commit('survey/updateVariableValues', {
            questionId: this.val.uuid,
            value,
            optionId,
            optionLabel
          })
        }
      },
      handleVariableMultipleAnswer(row, optionId, optionLabel, checkboxId) {
        if (!this.isDev) {
          this.$store.commit('survey/updateVariableMultipleAnswer', {
            row,
            optionId,
            optionLabel,
            questionId: this.val.uuid,
            isVariable: true,
            checkboxId
          });
        }
      },
      handleScale(value) {
        if (!this.isDev) {
          this.$store.commit('survey/setOpinionScaleValue', {
            questionId: this.val.uuid,
            value
          });
        }
      },
      getVarTextOptions(id) {
        const element = this.val.variableOptions.find((el) => el.id === id);
        return element.variableSelectOptions;
      },
      getVarNumberOptions(id) {
        const element = this.val.variableOptions.find((el) => el.id === id);
        let numbers = [];

        for (let i = element.varMinNumber; i <= element.varMaxNumber; i++) {
          numbers.push(i);
        }

        return numbers;
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
    },
    watch: {
      variableTextboxValue(value) {
        this.$store.commit('survey/setVariableTextboxValue', {
          questionId: this.val.uuid,
          value
        })
      }
    },
  };
</script>
