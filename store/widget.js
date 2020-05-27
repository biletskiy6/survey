import {v4 as uuidv4} from 'uuid';

const getWidgets = (state) => {
  if (state.activePageUuid) {
    let page = state.pages.find(p => p.id === state.activePageUuid);
    return page.widgets;
  }
  return [];
}

export const state = () => ({
  uuid: null,
  welcomePageWidgets: [],
  widgets: [],
  activeElement: {},
  activePageUuid: null,
  iterator: 1,
  pages: [
    {id: uuidv4(), widgets: []}
  ],
  settings: {
    isBackButton: "yes",
    statusBar: "percent",
    accessControl: {
      type: "no",
      password: null
    },
    privacyPolicy: {
      is: false,
      content: null,
    },
    isWelcomePageVisible: true,
  },
});


export const mutations = {
  add(state, {item}) {
    const widgets = getWidgets(state);
    // let itemData = item.data ? item.data() : null;
    let def = {uuid: uuidv4(), counter: state.iterator};
    let setting = JSON.parse(JSON.stringify(item.setting));

    widgets.push(Object.assign(setting, def));
    state.activeElement = widgets.find(
      w => w.uuid === widgets[widgets.length - 1].uuid
    );
    state.uuid = widgets[widgets.length - 1].uuid;
  },

  addWelcomePageWidget(state, {item, isWelcomePage}) {
    let setting = JSON.parse(JSON.stringify(item.setting));
    let def = {uuid: uuidv4(), counter: state.iterator, isWelcomePage};
    state.welcomePageWidgets.push(Object.assign(setting, def));
    state.activeElement = state.welcomePageWidgets.find(
      w => w.uuid === state.welcomePageWidgets[state.welcomePageWidgets.length - 1].uuid
    );
    state.uuid = state.welcomePageWidgets[state.welcomePageWidgets.length - 1].uuid;
  },

  delete(state, widget) {
    if (widget.isWelcomePage) {
      const wPageWidgets = state.welcomePageWidgets;
      const wIndexToDelete = wPageWidgets.findIndex(el => el.uuid === widget.uuid);
      wPageWidgets.splice(wIndexToDelete, 1);
      state.activeElement = {};
      state.uuid = -1;
    } else {
      let widgets = getWidgets(state);
      const indexToDelete = widgets.findIndex(el => el.uuid === widget.uuid);
      widgets.splice(indexToDelete, 1);
      state.activeElement = {};
      state.uuid = -1;
    }
  },

  copy(state, widget) {

    if (widget.isWelcomePage) {
      const wPageWidgets = state.welcomePageWidgets;
      const widgetToCopy = wPageWidgets.find(w => w.uuid === widget.uuid);
      const wCopied = JSON.parse(JSON.stringify(widgetToCopy));
      wPageWidgets.push({...wCopied, uuid: uuidv4()})
    } else {
      let widgets = getWidgets(state);
      let widgetToCopy = widgets.find(w => w.uuid === widget.uuid);
      let copied = JSON.parse(JSON.stringify(widgetToCopy));



      if (copied.type === 'multiple-choice') {
        for (let i = 0; i < copied.choiceRows.length; i++) {
          copied.choiceRows[i] = {
            ...copied.choiceRows[i],
            id: uuidv4()
          };
        }
      }

      if(copied.type === 'ranking') {
        for(let i = 0; i < copied.rankingRows.length; i++) {
          copied.rankingRows[i] = {
            ...copied.rankingRows[i],
            id: uuidv4()
          };
        }
      }


      if(copied.type === 'variable') {
        const variableOptions = copied.variableOptions;
        for(let i = 0; i < variableOptions.length; i++) {
          variableOptions[i].id = uuidv4();
        }
      }



      widgets.push({...copied, uuid: uuidv4()});
    }

  },
  updateWidgets(state, widgets) {
    state.widgets = widgets;
  },
  updateStoreWidgets(state, widgets) {
    const which = state.pages.find(p => p.id === state.activePageUuid);
    which.widgets = widgets;
  },
  updatePageStore(state, value) {
    state.pages = value;
  },
  select(state, widget) {
    const wPageWidgets = state.welcomePageWidgets;
    if (widget.isWelcomePage) {
      state.uuid = widget.uuid;
      state.activeElement = wPageWidgets.find(w => w.uuid === widget.uuid);
    } else {
      let widgets = getWidgets(state);
      state.uuid = widget.uuid;
      state.activeElement = widgets.find(w => w.uuid === widget.uuid);
    }

  },
  updateData(state, data) {

    if (data.isWelcomePage) {
      let wWidget = state.welcomePageWidgets.find(w => w.uuid === data.uuid);
      wWidget[data.key] = data.value;
      return;
    }

    let widgets = getWidgets(state);
    let which = widgets.find(w => w.uuid === data.uuid);
    which[data.key] = data.value;
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
  // ======================================================================================
  updateNumberOfScales(state, {id, value}) {
    const widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === id);

    console.log(value);

    for(let i = 0; i < widget.scales.length; i++) {
      widget.scales[i].isVisible = true;
    }

    for(let i = widget.scales.length; i-- > value.value;) {
      widget.scales[i].isVisible = !widget.scales[i].isVisible;
    }

    widget.scaleNumber = value;
    // widget.scaleNumber = value;
  },

  setStartAtZero(state, value) {
    state.activeElement.startAtZero = value;
  },

  // updateScaleNumberCount(state, {id, value}) {
  //   let {scales} = state.widgets.find(w => w.uuid === id);
  //   let items = scales.slice(0, value);
  // },


  // ======================================================================================
  // Slider
  // ======================================================================================


  updateSliderValue(state, {id, value, key}) {


    let widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === id);


    if (value > 0) {
      if (key === 'min') {
        widget.slider.value = Number(value);
      }

      if (widget.slider[key]) {
        widget.slider[key] = Number(value);
      }
    }


  },


  // ======================================================================================
  // Ranking
  // ======================================================================================

  updateRankingRows(state, payload) {


    const widgets = getWidgets(state);
    const {questionId} = payload;


    const widgetToUpdate = widgets.find(w => w.uuid === questionId);
    widgetToUpdate.rankingRows = payload.value;


    // if (state.activeElement.rankingRows) {
    //     state.activeElement.rankingRows = value;
    // }
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

  addVariableOption(state, widgetUuid) {
    let widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === widgetUuid);
    if (widget.variableOptions) {
      widget.variableOptions.push({
        id: uuidv4(),
        label: '',
        selectedVariableOption: '',
        varMinNumber: 1,
        varMaxNumber: 10,
        variableSelectOptions: [{id: uuidv4(), label: "", value: ""}],
        variableRadioOptions: [{id: uuidv4(), label: "", value: ""}],
        variableCheckboxOptions: [{id: uuidv4(), label: "", value: "", isChecked: false}],
      })
    }
  },

  setSelectedVariableOption(state, {rowUuid, value}) {
    const elementIndexToUpdate = state.activeElement.variableOptions.findIndex(
      row => row.id === rowUuid
    );

    const element = state.activeElement.variableOptions[elementIndexToUpdate];

    if (element) {
      element.selectedVariableOption = value;
    }

  },

  updateVarMinValue(state, {id, value}) {
    let widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === id);
    if (widget.varMinNumber) {
      widget.varMinNumber = value;
    }
  },
  updateVarMaxValue(state, {id, value}) {
    let widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === id);
    if (widget.varMaxNumber) {
      widget.varMaxNumber = value;
    }
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


  updateTextEditorContent(state, {id, html}) {
    state.activeElement.content = html;
    // const element = state.widgets.find(w => w.uuid === id);
    // element.content = text;

  },

  // ======================================================================================
  // Pages
  // ======================================================================================

  resetActiveElement(state) {
    state.activeElement = {};
    state.uuid = null;
  },

  addNewPage(state) {
    state.pages.push({
      id: uuidv4(), widgets: []
    })
  },

  selectPage(state, uuid) {
    state.activePageUuid = uuid;
    state.activeElement = {};
  },

  setActivePage(state) {
    state.activePageUuid = state.pages[0].id;
  },

  copyPage(state, uuid) {
    let pageToCopy = state.pages.find(p => p.id === uuid);
    let copiedPage = JSON.parse(JSON.stringify(pageToCopy));
    let copiedPageWidgets = copiedPage.widgets;

    if (copiedPageWidgets) {
      for (let i = 0; i < copiedPageWidgets.length; i++) {
        copiedPageWidgets[i].uuid = uuidv4();


        if (copiedPageWidgets[i].type === 'multiple-choice') {
          let multipleChoiceRows = copiedPageWidgets[i].choiceRows;
          for (let i = 0; i < multipleChoiceRows.length; i++) {
            multipleChoiceRows[i].id = uuidv4();
          }
        }

        if (copiedPageWidgets[i].type === 'ranking') {
          let rankingRows = copiedPageWidgets[i].rankingRows;
          for (let i = 0; i < rankingRows.length; i++) {
            rankingRows[i].id = uuidv4();
          }
        }


      }


      // if (copiedPageWidgets.type === 'multiple-choice') {
      //     for (let i = 0; i < copiedPageWidgets.choiceRows.length; i++) {
      //         copiedPageWidgets.choiceRows[i] = {
      //             ...copiedPageWidgets.choiceRows[i],
      //             id: uuidv4()
      //         };
      //     }
      // }

    }

    state.pages.push({...copiedPage, id: uuidv4()});
  },

  deletePage(state, uuid) {
    const pageIndexToDelete = state.pages.findIndex(p => p.id === uuid);
    const firstPageUuid = state.pages[0].id;
    state.pages.splice(pageIndexToDelete, 1);
    state.activePageUuid = firstPageUuid;
  },

  setFirstActivePage(state) {
    state.activePageUuid = state.pages[0].id;
  },

  toggleActivePageUuid(state, key) {

    const currentActivePageIndex = state.pages.findIndex(p => p.id === state.activePageUuid);
    const pagesLength = state.pages.length;
    const index = key === 'next' ? (currentActivePageIndex + 1) % pagesLength : (currentActivePageIndex - 1) % pagesLength;
    state.activePageUuid = state.pages[index].id;
  },

  // ======================================================================================
  // Settings
  // ======================================================================================

  isBackButton(state, value) {
    state.settings.isBackButton = value;
  },
  statusBar(state, value) {
    state.settings.statusBar = value;
  },
  accessControlType(state, value) {
    state.settings.accessControl.type = value;
  },
  accessControlPassword(state, value) {
    state.settings.accessControl.password = value;
  },

  isPrivacyPolicy(state, value) {
    state.settings.privacyPolicy.is = !state.settings.privacyPolicy.is;
  },
  updatePrivacyPolicyContent(state, html) {
    state.settings.privacyPolicy.content = html;
  },

  updateWelcomePageVisibility(state, value) {
    state.settings.isWelcomePageVisible = value;
  },

  // ======================================================================================
  // Other
  // ======================================================================================

  updateTextareaVisibility(state, value) {
    if (!state.activeElement.textarea) return;
    state.activeElement.textarea.isVisible = value;
  },
  updateTextareaWidgetWidth(state, value) {
    if (!state.activeElement.textarea) return;
    state.activeElement.textarea.width = value;
  },

  updateTextareaWidgetLabel(state, value) {
    if (!state.activeElement.textarea) return;
    state.activeElement.textarea.label = value;
  },

  updateTextareaWidgetRows(state, value) {
    if (!state.activeElement.textarea) return;
    state.activeElement.textarea.rows = value;
  },

  updateWelcomePageWidgets(state, value) {
    state.welcomePageWidgets = value;
  },

  setSeparatorLineForHeaderWidget(state, {value}) {
    state.activeElement.separatorLine = value;
  },
  setWidgetHeaderAlignment(state, {value}) {
    state.activeElement.headerAlignment = value;
  },
  setWidgetHeaderFontSize(state, {value}) {
    state.activeElement.headerFontSize = Number(value);
  },
  setWidgetHeaderColor(state, value) {
    state.activeElement.headerColor = value;
  },
  isWidgetHeaderItalic(state, value) {
    state.activeElement.isHeaderItalic = value;
  },
  setSeparatorColor(state, value) {
    state.activeElement.separatorColor = value;
  },
  setSeparatorLineHeight(state, value) {
    state.activeElement.separatorLineHeight = Number(value);
  },
  setRequiredField(state, value) {
    state.activeElement.isRequired = value;
  }


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
  rankingRows: state => widgetUuid => {
    const widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === widgetUuid);
    return widget.rankingRows || [];
  },
  getSliderStepValue: state => widgetUuid => {
    let widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
    return widget.slider ? widget.slider.step : 1;
  },
  getSliderMinValue: state => widgetUuid => {
    let widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
    return widget.slider.min ? widget.slider.min : 1;
    // return state.activeElement.slider.min;
  },
  getSliderMaxValue: state => widgetUuid => {
    let widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
    return widget.slider ? widget.slider.max : 1;
  },
  getSliderValue: state => widgetUuid => {


    let widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
    return widget.slider ? widget.slider.value : 1;
  },
  numberOfScales: state => widgetUuid => {
    let widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
  },
  getVarMinValue: state => widgetUuid => {
    let widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
    return widget.varMinNumber;
  },
  getVarMaxValue: state => widgetUuid => {
    let widgets = getWidgets(state);
    const widget = widgets.find(w => w.uuid === widgetUuid);
    if (!widget) return 1;
    return widget.varMaxNumber;
  },
  getVarValue: (state) => (id, key) => {
    const element = state.activeElement.variableOptions.find(w => w.id === id);
    return element[key];
  },
  getTextareaWidgetVisibility: (state) => {
    return state.activeElement.textarea.isVisible;
  },
  getTextareaWidgetLabel: (state) => {
    return state.activeElement.textarea.label;
  },
  getTextareaWidgetRows: state => state.activeElement.textarea.rows,
  getTextareaWidgetOptions: (state) => {
    return [];
  },
  getTextEditorContent: state => widgetUuid => {
    return state.activeElement.textEditorContent;
  },

  pageWidgetsLength: state => {
    let isset = [];
    state.pages.map(p => {
      if (p.widgets.length) {
        isset.push(true);
      }
    });

    return isset;
    // return state.pages.reduce((a, b) => a.widgets.length + b.widgets.length, 0);
  },

  uuid: state => state.uuid,
  pages: state => state.pages,
  pageWidgets: state => {
    const page = state.pages.find(p => p.id === state.activePageUuid);
    if (page && page.widgets) {
      return page.widgets;
    }
    return [];
  },
  activePageId: state => state.activePageUuid,
  isBackButton: state => state.settings.isBackButton,
  statusBar: state => state.settings.statusBar,
  accessControlType: state => state.settings.accessControl.type,
  accessControlPassword: state => state.settings.accessControl.password,
  isPrivacyPolicy: state => state.settings.privacyPolicy.is,
  privacyPolicyContent: state => state.settings.privacyPolicy.content,
  welcomePageWidgets: state => state.welcomePageWidgets,
  getSeparatorLineForHeaderWidget: state => {
    if (state.activeElement.separatorLine) {
      return state.activeElement.separatorLine;
    }
    return false;
  },
  getWidgetHeaderAlignment: state => {
    return state.activeElement.headerAlignment
  },
  getWidgetHeaderFontSize: state => Number(state.activeElement.headerFontSize),
  isWelcomePageVisible: state => state.settings.isWelcomePageVisible,
  currentPageArrayIndex: state => state.pages.findIndex(p => p.id === state.activePageUuid),
  getWidgetHeaderColor: state => state.activeElement.headerColor,
  isWidgetHeaderItalic: state => state.activeElement.isHeaderItalic,
  getSeparatorColor: state => state.activeElement.separatorColor,
  getSeparatorLineHeight: state => state.activeElement.separatorLineHeight,
  isRequired: state => state.activeElement.isRequired,
  startAtZero: state => state.activeElement.startAtZero,
};
