<template>
  <div class="widget-single-input">
    <h4 class="fw-b"> {{ widgetIdx + 1 }}.  {{ val.questionTitle }}</h4>
    <p>{{ val.questionDescription }}</p>

    <div :key="opt.id" v-for="opt in val.variableOptions" class="variable-options mb-2">
      <div>
        <h4 class="mb-1">{{ opt.label }}</h4>
        <div v-show="opt.selectedVariableOption === 'textbox'" class="variable-textbox">
          <input class="custom-input"/>
        </div>
        <div v-show="opt.selectedVariableOption === 'dnd-numbers'" class="variable-dnd-numbers">
          <v-select placeholder="Choose the answer" :options="getVarNumberOptions(opt.id)"></v-select>
        </div>
        <div v-show="opt.selectedVariableOption === 'dnd-text'" class="variable-dnd-text">
          <v-select placeholder="Choose the answer" :options="getVarTextOptions(opt.id)"></v-select>
        </div>
        <div v-show="opt.selectedVariableOption === 'single-answer'" class="variable-single-answer">
          <vs-radio class="mb-1" :key="radioOption.id" v-for="radioOption in opt.variableRadioOptions" vs-name="radios1"
                    vs-value="luis"> {{ radioOption.value }}
          </vs-radio>
        </div>
        <div v-show="opt.selectedVariableOption === 'multiple-answer'" class="variable-multiple-answer">
          <vs-checkbox class="mb-1" :key="checkboxOption.id" v-for="checkboxOption in opt.variableCheckboxOptions"> {{
            checkboxOption.value }}
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
      // console.log(this.name);
    },


    data() {
      return {
        title: '',
        inputText: '',
        selectDndText: null,
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
            {id: uuidv4(), label: "", value: ""},
          ]
        }
      ],
    },
    // Attribute Meaning Reference widgets/pic/index.vue
    props: ['val', 'h', 'w', 'playState', 'text', 'index', 'uuid', 'widgetIdx'],
    components: {
      WidgetToolbar
    },
    methods: {
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
    }
  };
</script>
