import { v4 as uuidv4 } from 'uuid';

export const state = () => ({
  uuid: null,
  widgets: [],
  activeElement: {}
});

export const mutations = {
  add(state, { item }) {
    let itemData = item.data ? item.data() : null;

    let counter = state.widgets.length;
    let def = { uuid: uuidv4(), counter };
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

    state.widgets.push({ ...copied, uuid: uuidv4() });
  },

  updateWidgets(state, newArray) {
    state.widgets = newArray;
  },
  select(state, { uuid }) {
    state.uuid = uuid;
    console.log(state.widgets, uuid);
    state.activeElement = state.widgets.find(w => w.uuid === uuid);
    // const obj = state.widgets.find(w => w.uuid === uuid);
    // console.log(obj);
    // state.activeElement = { ...obj };
    // console.log('1', uuid, state);
  },
  updateData(state, data) {
    let widget = state.widgets.find(w => w.uuid === data.uuid);

    widget[data.key] = data.value;

    // let widget = state.widgets.find(w => w.uuid === data.uuid);
  },
  addMultipleChoiceQuestionRow(state) {
    state.activeElement.choiceRows.push({ id: uuidv4(), value: '' });
  },
  updateMultipleChoiceRows(state, value) {
    state.activeElement.choiceRows = value;
  },

  updateMultipleChoiseQuestionRows(state, value) {
    const elementIndexToUpdate = state.activeElement.choiceRows.findIndex(
      row => row.id === value.id
    );
    state.activeElement.choiceRows[elementIndexToUpdate].value = value.value;
  },
  updateRankingRows(state, value) {
    state.activeElement.rankingRows = value;
  },
  updateRankingRow(state, value) {
    const elementIndexToUpdate = state.activeElement.rankingRows.findIndex(
      row => row.id === value.id
    );
    state.activeElement.rankingRows[elementIndexToUpdate].value = value.value;
  },
  updateTextareaVisibility(state, value) {
    if (!state.activeElement.textarea) return;
    state.activeElement.textarea.isVisible = !state.activeElement.textarea
      .isVisible;
  },
  updateTextareaWidgetWidth(state, value) {
    if (!state.activeElement.textarea) return;
    state.activeElement.textarea.width = value;
  },

  updateSliderValue(state, { id, value, key }) {
    const widget = state.widgets.find(w => w.uuid === id);
    widget.slider[key] = Number(value);
  },
  // updateSliderStepValue(state, { id, value }) {
  //   const widget = state.widgets.find(w => w.uuid === id);
  //   widget.slider.step = value;
  //   // if (!state.activeElement.slider) return;
  //   // const widgetUuid = state.activeElement.uuid;
  //   // const widget = state.widgets.find(w => w.uuid === widgetUuid);
  //   // state.activeElement.slider.step = Number(stepValue);
  // },
  // updateSliderMinValue(state, { id, value }) {
  //   // if (!state.activeElement.slider) return;
  //   // const widgetUuid = state.activeElement.uuid;
  //   // const widget = state.widgets.find(w => w.uuid === widgetUuid);
  //   // state.activeElement.slider.min = Number(minValue);
  //   const widget = state.widgets.find(w => w.uuid === id);
  //   widget.slider.min = value;
  // },
  // updateSliderMaxValue(state, { id, value }) {
  //   // if (!state.activeElement.slider) return;
  //   // const widgetUuid = state.activeElement.uuid;
  //   // const widget = state.widgets.find(w => w.uuid === widgetUuid);
  //   // state.activeElement.slider.max = Number(maxValue);
  //   const widget = state.widgets.find(w => w.uuid === id);
  //   widget.slider.max = value;
  // },
  // updateMultipleChoiceCheckedRow(state, id) {
  //   const elementIndexToUpdate = state.activeElement.choiceRows.findIndex(
  //     row => row.id === id
  //   );

  //   state.activeElement.choiceRows[elementIndexToUpdate].isChecked = true;
  // },
  deleteMultipleChoiceQuestionRow(state, rowId) {
    const elementIndexToDelete = state.activeElement.choiceRows.findIndex(
      row => row.id === rowId
    );
    state.activeElement.choiceRows.splice(elementIndexToDelete, 1);
  }
};
export const actions = {
  add({ state, commit }, item) {
    commit('add', { item });
    // commit('select', {
    //   uuid: state.widgets[state.widgets.length - 1].uuid
    // });
    // commit('select', {
    //   uuid: state.widgets[state.widgets.length - 1].uuid
    // });
    // commit("select")
  },
  delete({ commit }, uuid) {
    commit('delete', uuid);
  },
  copy({ commit }, uuid) {
    commit('copy', uuid);
  },
  updateWidgets({ commit }, newArray) {
    commit('updateWidgets', newArray);
  },
  // select({ commit }, uuid) {
  //   commit('select', { uuid });
  // },
  updateData({ commit }, data) {
    commit('updateData', data);
  }
};

export const getters = {
  widgets: state => state.widgets,
  widgetsUuid: state => {
    let widgetIds = [];
    state.widgets.map(w => widgetIds.push({ uuid: w.uuid }));
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
  uuid: state => state.uuid
};
