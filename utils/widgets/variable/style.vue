<template>
  <div>
    <h5 class="fw-b tac">Basic settings</h5>
    <vs-divider/>
    <input
      class="custom-input mb-1"
      type="text"
      :value="activeElement.questionTitle"
      placeholder="Question title"
      v-on:input="updateWidgetData($event, activeElement.uuid, 'questionTitle')"
    />

    <input
      class="custom-input"
      type="text"
      placeholder="Question description"
      :value="activeElement.questionDescription"
      v-on:input="
        updateWidgetData($event, activeElement.uuid, 'questionDescription')
      "
    />

    <vs-divider/>
    <h5 class="fw-b tac">Advanced settings</h5>
    <vs-divider/>

    <div class="variable-options">
      <div class="mb-2" :key="opt.id" v-for="(opt, index) in activeElement.variableOptions">

        <div class="">
          <div class="d-flex ai-c jcsb">
            <h5 class="fw-m">Option {{ index + 1}}</h5>
            <vs-button
              @click="handleDelete(opt.id)"
              color="danger"
              type="flat"
              icon="delete"
            ></vs-button>
          </div>
          <vs-divider/>
        </div>


        <div>
          <h6 class="fw-b mb-1">Option Title</h6>
          <input placeholder="Answer option" @input="updateTitleForVariableOption($event, opt.id)"
                 :value="opt.label" class="custom-input mb-1" type="text">


          <div class="mb-2">
            <h6 class="fw-b mb-1">Choose question type</h6>
            <v-select placeholder="Select question type" @input="setSelectedVariableOption($event, opt.id)"
                      :options="options">
            </v-select>
          </div>

          <div v-if="opt.selectedVariableOption === 'dnd-numbers'">

            <input @change="handleVarValue($event, opt.id, 'varMinNumber')" :value="getVarValue(opt.id, 'varMinNumber')"
                   type="number">
            <input @change="handleVarValue($event, opt.id, 'varMaxNumber')" :value="getVarValue(opt.id, 'varMaxNumber')"
                   type="number">
          </div>


          <div class="d-flex fd-c" style="clear: both;" v-if="opt.selectedVariableOption === 'dnd-text'">
            <div class="d-flex ai-c jcsb">
              <h6 class="fw-b">Selections</h6>
              <div class="ml-a">
                <vs-button class="mr-1" @click="handleAddVariableSelectOption(opt.id)" color="primary" type="line"
                           icon="add"></vs-button>
                <vs-button @click="handleDeleteVariableSelectOption(opt.id)" color="danger" type="line"
                           icon="delete"></vs-button>
              </div>
            </div>
            <vs-divider/>
            <div class="mb-1" :key="variableSelectOption.id" v-for="variableSelectOption in opt.variableSelectOptions">
              <input @input="handleVarDndText($event, opt.id, variableSelectOption.id)" placeholder="Enter Selection"
                     class="custom-input" type="text">
            </div>
          </div>

          <div class="d-flex fd-c" style="clear: both;" v-if="opt.selectedVariableOption === 'single-answer'">
            <div class="d-flex ai-c jcsb">
              <h6 class="fw-b">Single Answer</h6>
              <div class="ml-a">
                <vs-button class="mr-1" @click="handleAddVariableRadioOption(opt.id)" color="primary" type="line"
                           icon="add"></vs-button>
                <vs-button @click="handleDeleteVariableRadioOption(opt.id)" color="danger" type="line"
                           icon="delete"></vs-button>
              </div>
            </div>
            <vs-divider/>
            <div class="mb-1" :key="variableRadioOption.id" v-for="variableRadioOption in opt.variableRadioOptions">
              <input @input="handleVarRadioText($event, opt.id, variableRadioOption.id)" placeholder="Enter Radio Text"
                     class="custom-input" type="text">

            </div>
          </div>


          <div class="d-flex fd-c" style="clear: both;" v-if="opt.selectedVariableOption === 'multiple-answer'">
            <div class="d-flex ai-c jcsb">
              <h6 class="fw-b">Multiple Answer</h6>
              <div class="ml-a">
                <vs-button class="mr-1" @click="handleAddVariableCheckboxOption(opt.id)" color="primary" type="line"
                           icon="add"></vs-button>
                <vs-button @click="handleDeleteVariableCheckboxOption(opt.id)" color="danger" type="line"
                           icon="delete"></vs-button>
              </div>
            </div>
            <vs-divider/>
            <div class="mb-1" :key="variableCheckboxOption.id" v-for="variableCheckboxOption in opt.variableCheckboxOptions">
              <input @input="handleVarCheckboxText($event, opt.id, variableCheckboxOption.id)" placeholder="Enter Checkbox Text"
                     class="custom-input" type="text">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;">
      <vs-divider/>
      <vs-button @click="addVariableOption(activeElement.uuid)"> Add row</vs-button>
    </div>
  </div>
</template>

<script>
  import InputNumber from "@/components/input-number/InputNumber";

  export default {
    name: 'variable-style',
    props: ['activeElement'],
    computed: {
      varMinValue: {
        get(e) {
          return this.$store.getters['widget/getVarMinValue'](
            this.activeElement.uuid
          );
        },
        set(value) {
          this.$store.commit('widget/updateVarMinValue', {
            id: this.activeElement.uuid,
            value: value,

          });
        }
      },
      varMaxValue: {
        get() {
          return this.$store.getters['widget/getVarMaxValue'](
            this.activeElement.uuid
          );
        },
        set(value) {
          this.$store.commit('widget/updateVarMaxValue', {
            id: this.activeElement.uuid,
            value: value,
          });
        }
      }
    },
    data() {
      return {
        options: [
          {label: "Textbox", value: 'textbox'},
          {label: "Drop-down selection: numbers", value: 'dnd-numbers'},
          {label: "Drop-down selection: text", value: 'dnd-text'},
          {label: "Single answer: radio buttons", value: 'single-answer'},
          {label: "Multiple answer: check boxes", value: 'multiple-answer'},
        ]
      }
    },
    filters: {
      toFixed: function (data) {
        return data.toFixed(1);
      }
    },
    methods: {
      handleDeleteVariableCheckboxOption(variableOptionId) {
        this.$store.commit("widget/deleteVariableCheckboxOption", variableOptionId);
      },
      handleAddVariableCheckboxOption(variableOptionId) {
        this.$store.commit("widget/addVariableCheckboxOption", variableOptionId);
      },
      handleVarCheckboxText(e, variableOptionId, variableCheckboxOptionId) {
        this.$store.commit("widget/updateVarCheckboxText", {
          value: e.target.value,
          variableOptionId,
          variableCheckboxOptionId,
        });
      },
      handleDeleteVariableRadioOption(variableOptionId) {
        this.$store.commit("widget/deleteVariableRadioOption", variableOptionId);
      },
      handleAddVariableRadioOption(variableOptionId) {
        this.$store.commit("widget/addVariableRadioOption", variableOptionId);
      },
      handleVarRadioText(e, variableOptionId, variableRadioOptionId) {
        this.$store.commit("widget/updateVarRadioText", {
          value: e.target.value,
          variableOptionId,
          variableRadioOptionId,
        });
      },
      handleDeleteVariableSelectOption(variableOptionId) {
        this.$store.commit("widget/deleteVariableSelectOption", variableOptionId);
      },
      handleAddVariableSelectOption(variableOptionId) {
        this.$store.commit("widget/addVariableSelectOption", variableOptionId);
      },
      handleVarDndText(e, variableOptionId, variableSelectOptionId) {
        this.$store.commit("widget/updateVarDndText", {
          value: e.target.value,
          variableOptionId,
          variableSelectOptionId,
        });
      },
      handleDelete(id) {
        this.$store.commit("widget/deleteVarRow", id);
      },
      getVarValue(id, key) {
        return this.$store.getters['widget/getVarValue'](id, key);
      },
      handleVarValue(val, id, key) {
        this.$store.commit('widget/updateVarValue', {
          value: val.target.value,
          id,
          key
        })
        // console.log(val.target.value, id, key);
      },
      getVarNumberOptions() {
        let numbers = [];

        for (let i = this.activeElement.varMinNumber; i <= this.activeElement.varMaxNumber; i++) {
          numbers.push(i);
        }

        return numbers;
      },
      addVariableOption(widgetUuid) {
        this.$store.commit("widget/addVariableOption", widgetUuid);
      },
      setSelectedVariableOption(row, id) {

        if (row) {
          this.$store.commit("widget/setSelectedVariableOption", {
            rowUuid: id,
            value: row.value,
          });
        }
      },
      updateTitleForVariableOption(e, id) {
        this.$store.commit("widget/updateTitleForVariableOption", {
          id,
          value: e.target.value
        })
      },
      updateWidgetData(e, uuid, key) {
        this.$store.commit('widget/updateData', {
          uuid,
          value: e.target.value,
          key: [key]
        });
      }
    },
    components: {
      InputNumber
    }

  };
</script>
