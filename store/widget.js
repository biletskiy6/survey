import {v4 as uuidv4} from 'uuid';

export const state = () => ({
  uuid: null,
  widgets: [],
  activeElement: {}
});

export const mutations = {
  add(state, {item}) {
    let itemData = item.data ? item.data() : null;

    let counter = state.widgets.length;
    let def = {uuid: uuidv4(), counter};
    let setting = JSON.parse(JSON.stringify(item.setting));
    state.widgets.push(Object.assign(setting, def, itemData));
    state.activeElement = state.widgets.find(
      w => w.uuid === state.widgets[state.widgets.length - 1].uuid
    );
    state.uuid = state.widgets[state.widgets.length - 1].uuid;

    // this.$commit('select', {
    //   uuid: state.widgets[state.widgets.length - 1].uuid
    // });
  },
  delete(state, uuid) {
    const indexToDelete = state.widgets.findIndex(el => el.uuid === uuid);
    state.widgets.splice(indexToDelete, 1);
    state.activeElement = {};
    state.uuid = -1;
  },

  copy(state, uuid) {
    let widgetToCopy = state.widgets.find(w => w.uuid === uuid);
    let copied = JSON.parse(JSON.stringify(widgetToCopy));

    if (copied.type === 'multiple-choice') {
      for (let i = 0; i < copied.choiceRows.length; i++) {
        copied.choiceRows[i] = {
          ...copied.choiceRows[i],
          id: uuidv4()
        };
      }

      // widgetToCopy = {
      //   ...widgetToCopy,
      //   choiceRows: [
      //     ...widgetToCopy.choiceRows,

      //   ]
      // }
    }

    state.widgets.push({...copied, uuid: uuidv4()});
  },

  updateWidgets(state, newArray) {
    state.widgets = newArray;
  },
  select(state, {uuid}) {
    state.uuid = uuid;
    console.log(state.widgets, uuid);
    state.activeElement = state.widgets.find(w => w.uuid === uuid);
  },
  updateData(state, data) {
    let widget = state.widgets.find(w => w.uuid === data.uuid);
    widget[data.key] = data.value;
  },

  // ======================================================================================
  // Multiple Choice
  // ======================================================================================

  addMultipleChoiceQuestionRow(state) {
    state.activeElement.choiceRows.push({id: uuidv4(), value: ''});
  },
  updateMultipleChoiceRows(state, value) {
    state.activeElement.choiceRows = value;
  },
  updateMultipleChoiceQuestionRow(state, value) {
    const elementIndexToUpdate = state.activeElement.choiceRows.findIndex(
      row => row.id === value.id
    );
    state.activeElement.choiceRows[elementIndexToUpdate].value = value.value;
  },
  deleteMultipleChoiceQuestionRow(state, rowId) {
    const elementIndexToDelete = state.activeElement.choiceRows.findIndex(
      row => row.id === rowId
    );
    state.activeElement.choiceRows.splice(elementIndexToDelete, 1);
  },


  // ======================================================================================
  // Opinion Scale

  // updateNumberOfScales(state, {id, value}) {
  //   const widget = state.widgets.find(w => w.uuid === id);
  //   widget.scaleNumber = value;
  // },
  //
  // updateScaleNumberCount(state, {id, value}) {
  //   let {scales} = state.widgets.find(w => w.uuid === id);
  //   let items = scales.slice(0, value);
  // },


  // ======================================================================================
  // Slider
  // ======================================================================================

  // ======================================================================================
  updateSliderValue(state, {id, value, key}) {
    const widget = state.widgets.find(w => w.uuid === id);
    if (widget.slider[key]) {
      widget.slider[key] = Number(value);
    }
  },


  // ======================================================================================
  // Ranking rows
  // ======================================================================================

  updateRankingRows(state, value) {
    if (state.activeElement.rankingRows) {
      state.activeElement.rankingRows = value;
    }
  },
  updateRankingRow(state, value) {
    const elementIndexToUpdate = state.activeElement.rankingRows.findIndex(
      row => row.id === value.id
    );
    const rankingRow = state.activeElement.rankingRows ? state.activeElement.rankingRows[elementIndexToUpdate] : null;

    if (rankingRow) {
      state.activeElement.rankingRows[elementIndexToUpdate].value = value.value;
    }
  },


  // ======================================================================================
  // Variable rows
  // ======================================================================================

  setSelectedVariableOption(state, {rowUuid, value}) {

    const elementIndexToUpdate = state.activeElement.variableOptions.findIndex(
      row => row.id === rowUuid
    );
    state.activeElement.variableOptions[elementIndexToUpdate].selectedVariableOption = value;
    //
    // const widget = state.widgets.find(w => w.uuid === widgetUuid);
    // if (widget.selectedVariableOption) {
    //   widget.selectedVariableOption = value;
    // }
  },

  addVariableOption(state, widgetUuid) {
    const widget = state.widgets.find(w => w.uuid === widgetUuid);
    if (widget.variableOptions) {
      widget.variableOptions.push({
        id: uuidv4(),
        label: '',
        selectedVariableOption: '',
        varMinNumber: 1,
        varMaxNumber: 10,
        variableSelectOptions: [{id: uuidv4(), label: "", value: ""},],
        variableRadioOptions: [{id: uuidv4(), label: "", value: ""},],
        variableCheckboxOptions: [{id: uuidv4(), label: "", value: ""},],
      })
    }
  },


  updateVarMinValue(state, {id, value}) {
    const widget = state.widgets.find(w => w.uuid === id);
    widget.varMinNumber = value;
  },
  updateVarMaxValue(state, {id, value}) {
    const widget = state.widgets.find(w => w.uuid === id);
    widget.varMaxNumber = value;
  },
  updateVarValue(state, {id, value, key}) {
    const elementIndexToUpdate = state.activeElement.variableOptions.findIndex(
      row => row.id === id
    );
    state.activeElement.variableOptions[elementIndexToUpdate][key] = Number(value);
  },

  updateVarDndText(state, {value, variableOptionId, variableSelectOptionId}) {
    const variableOptionElement = state.activeElement.variableOptions.find(row => row.id === variableOptionId);
    const variableSelectOption = variableOptionElement.variableSelectOptions.find(row => row.id === variableSelectOptionId);
    variableSelectOption.value = value.replace(/ /g, "-");
    variableSelectOption.label = value;
    // const variableSelectOptionIndex = state.activeElement.variableOptions[variableOptionIndex].findIndex(row => row.id === variableSelectOptionId);
    // const elementIndexToUpdate = state.activeElement.variableOptions.findIndex(
    //   row => row.id === id
    // );
  },

  addVariableSelectOption(state, optionId) {
    const variableOptionElement = state.activeElement.variableOptions.find(row => row.id === optionId);
    variableOptionElement.variableSelectOptions.push({id: uuidv4(), label: "", value: ""});
  },

  deleteVariableSelectOption(state, optionId) {
    const variableOptionElementIndex = state.activeElement.variableOptions.findIndex(row => row.id === optionId);
    const variableOptionElement = state.activeElement.variableOptions.find(row => row.id === optionId);
    variableOptionElement.variableSelectOptions.pop();
  },

  updateVarRadioText(state, {value, variableOptionId, variableRadioOptionId}) {
    const variableOptionElement = state.activeElement.variableOptions.find(row => row.id === variableOptionId);
    const variableRadioOption = variableOptionElement.variableRadioOptions.find(row => row.id === variableRadioOptionId);
    variableRadioOption.value = value;
    // const variableSelectOptionIndex = state.activeElement.variableOptions[variableOptionIndex].findIndex(row => row.id === variableSelectOptionId);
    // const elementIndexToUpdate = state.activeElement.variableOptions.findIndex(
    //   row => row.id === id
    // );
  },

  addVariableRadioOption(state, optionId) {
    const variableOptionElement = state.activeElement.variableOptions.find(row => row.id === optionId);
    variableOptionElement.variableRadioOptions.push({id: uuidv4(), label: "", value: ""});
  },

  deleteVariableRadioOption(state, optionId) {
    const variableOptionElementIndex = state.activeElement.variableOptions.findIndex(row => row.id === optionId);
    const variableOptionElement = state.activeElement.variableOptions.find(row => row.id === optionId);
    variableOptionElement.variableRadioOptions.pop();
  },


  updateVarCheckboxText(state, {value, variableOptionId, variableCheckboxOptionId}) {
    const variableOptionElement = state.activeElement.variableOptions.find(row => row.id === variableOptionId);
    const variableCheckboxOption = variableOptionElement.variableCheckboxOptions.find(row => row.id === variableCheckboxOptionId);
    variableCheckboxOption.value = value;
    // const variableSelectOptionIndex = state.activeElement.variableOptions[variableOptionIndex].findIndex(row => row.id === variableSelectOptionId);
    // const elementIndexToUpdate = state.activeElement.variableOptionsF.findIndex(
    //   row => row.id === id
    // );
  },

  addVariableCheckboxOption(state, optionId) {
    const variableOptionElement = state.activeElement.variableOptions.find(row => row.id === optionId);
    variableOptionElement.variableCheckboxOptions.push({id: uuidv4(), label: "", value: ""});
  },

  deleteVariableCheckboxOption(state, optionId) {
    const variableOptionElementIndex = state.activeElement.variableOptions.findIndex(row => row.id === optionId);
    const variableOptionElement = state.activeElement.variableOptions.find(row => row.id === optionId);
    variableOptionElement.variableCheckboxOptions.pop();
  },

  deleteVarRow(state, id) {
    const elementIndex = state.activeElement.variableOptions.findIndex(
      row => row.id === id
    );
    state.activeElement.variableOptions.splice(elementIndex, 1);
  },

  updateTitleForVariableOption(state, {id, value}) {
    const elementIndexToUpdate = state.activeElement.variableOptions.findIndex(
      row => row.id === id
    );
    state.activeElement.variableOptions[elementIndexToUpdate].label = value;
  },


  // ======================================================================================
  // Other
  // ======================================================================================

  updateTextareaVisibility(state, value) {
    if (!state.activeElement.textarea) return;
    state.activeElement.textarea.isVisible = !state.activeElement.textarea
      .isVisible;
  },
  updateTextareaWidgetWidth(state, value) {
    if (!state.activeElement.textarea) return;
    state.activeElement.textarea.width = value;
  },


};
export const actions = {
  add({state, commit}, item) {
    commit('add', {item});
    // commit('select', {
    //   uuid: state.widgets[state.widgets.length - 1].uuid
    // });
    // commit('select', {
    //   uuid: state.widgets[state.widgets.length - 1].uuid
    // });
    // commit("select")
  },
  delete({commit}, uuid) {
    commit('delete', uuid);
  },
  copy({commit}, uuid) {
    commit('copy', uuid);
  },
  updateWidgets({commit}, newArray) {
    commit('updateWidgets', newArray);
  },
  updateData({commit}, data) {
    commit('updateData', data);
  }
};

export const getters = {
  widgets: state => state.widgets,
  widgetsUuid: state => {
    let widgetIds = [];
    state.widgets.map(w => widgetIds.push({uuid: w.uuid}));
    return widgetIds;
  },
  activeElement: state => state.activeElement,
  multipleChoiceRows: state => state.activeElement.choiceRows || [],
  rankingRows: state => state.activeElement.rankingRows || [],
  getSliderStepValue: state => widgetUuid => {
    const widget = state.widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
    return widget.slider ? widget.slider.step : 1;
  },
  getSliderMinValue: state => widgetUuid => {
    const widget = state.widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
    return widget.slider.min ? widget.slider.min : 1;
    // return state.activeElement.slider.min;
  },
  getSliderMaxValue: state => widgetUuid => {
    const widget = state.widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
    return widget.slider ? widget.slider.max : 1;
  },
  getSliderValue: state => widgetUuid => {
    const widget = state.widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
    return widget.slider ? widget.slider.value : 1;
  },
  numberOfScales: state => widgetUuid => {
    const widget = state.widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
  },
  getVarMinValue: state => widgetUuid => {
    const widget = state.widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
    return widget.varMinNumber;
  },
  getVarMaxValue: state => widgetUuid => {
    const widget = state.widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
    return widget.varMaxNumber;
  },
  getVarValue: (state) => (id, key) => {
    const element = state.activeElement.variableOptions.find(w => w.id === id);
    return element[key];
  },

  uuid: state => state.uuid
};
