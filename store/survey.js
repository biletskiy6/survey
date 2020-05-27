// const getWidgets = (state) => {
//   if (state.activePageUuid) {
//     let page = state.pages.find(p => p.id === state.activePageUuid);
//     return page.widgets;
//   }
//   return [];
// }

export const state = () => ({
  answers: [],
  multipleChoice: [],
  opinionScale: [],
});


export const mutations = {
  updateAnswer(state, {uuid, value}) {
    let answerToUpdate = state.answers.find(a => a.questionId === uuid);
    if (answerToUpdate) {
      answerToUpdate.value = value;
    } else {
      state.answers.push({questionId: uuid, value, additionalTextareaValue: null});
    }
  },


  updateVariableValues(state, payload) {
    const {questionId, value, optionId, optionLabel} = payload;
    let answerToUpdate = state.answers.find(a => a.questionId === questionId);
    if (answerToUpdate) {
      const isOptionExist = answerToUpdate.options.find(o => o.optionId === optionId)
      if (isOptionExist) {
        isOptionExist.value = value;
      } else {
        answerToUpdate.options.push({optionId, optionLabel, value})
      }
    } else {
      state.answers.push({questionId, additionalTextareaValue: null, options: [{optionId, optionLabel, value}]});
    }
  },


  updateVariableMultipleAnswer(state, payload) {
    const {questionId, optionId, optionLabel, checkboxId, row} = payload;
    let answerToUpdate = state.answers.find(a => a.questionId === questionId);

    console.log(answerToUpdate);

    if (!answerToUpdate) {
      state.answers.push({
        questionId,
        additionalTextareaValue: null,
        options: [{optionId, optionLabel, value: row.value, isChecked: !row.isChecked, checkboxId}]
      })
    } else {
      const isCheckboxValueExists = answerToUpdate.options.find(o => o.checkboxId === checkboxId);
      if (!isCheckboxValueExists) {
        answerToUpdate.options.push({optionId, optionLabel, value: row.value, isChecked: !row.isChecked, checkboxId})
      } else {
        isCheckboxValueExists.isChecked = !isCheckboxValueExists.isChecked;
      }


      // const isCheckboxValue = answerToUpdate.options.find(o => o.checkboxId === checkboxId);
      // console.log(isCheckboxValue);

      // state.answers.options.push({ optionId, optionLabel, value: row.value, isChecked: !row.isChecked, checkboxId  })

    }


    // if(answerToUpdate) {
    //   const isAnswersExists = answerToUpdate.options.find(o => o.checkboxId === checkboxId);
    //
    //   if(isAnswersExists) {
    //     isAnswersExists.isChecked = !isAnswersExists.isChecked;
    //   } else {
    //     answerToUpdate.options.push({  optionId, optionLabel, value: row.value, isChecked: !row.isChecked, checkboxId  })
    //   }
    //
    // } else {
    //   state.answers.push({
    //     questionId, options: { optionId, optionLabel, value: row.value, isChecked: !row.isChecked, checkboxId  }
    //   })
    // }
    //
    //
    // if (answerToUpdate) {
    //   const isOptionExist = answerToUpdate.options.find(o => o.optionId === optionId);
    //   if(isOptionExist) {
    //     let optionValues = isOptionExist.values;
    //     let isOptionValueExists = optionValues.find(o => o.id === checkboxId);
    //     if(isOptionValueExists) {
    //       isOptionValueExists.isChecked = !isOptionValueExists.isChecked
    //     } else {
    //       console.log(answerToUpdate);
    //       // answerToUpdate.options = {
    //       //   ...answerToUpdate.options,
    //       //   values: [
    //       //     {...row, isChecked: !row.isChecked}
    //       //   ]
    //       // }
    //     }
    //   }
    // } else {
    //   state.answers.push({
    //     questionId,
    //     additionalTextareaValue: null,
    //     options: [{optionId, optionLabel, values: [{...row, isChecked: !row.isChecked}]}]
    //   });
    // }


  },


  // updateOpinionValue(state, { uuid, value }) {
  //     const answerToUpdate = state.opinionScale.find(a => a.uuid === uuid);
  //     if(answerToUpdate) {
  //         answerToUpdate.value = value;
  //     } else {
  //         state.opinionScale.push({ uuid, value });
  //     }
  // },
  updateMultipleChoiceAnswers(state, payload) {


    const {questionId, row} = payload;
    const widgetState = this.state.widget;

    if (widgetState.activePageUuid) {
      let page = widgetState.pages.find(p => p.id === widgetState.activePageUuid);
      let pageWidgets = page.widgets;
      let widgetToUpdate = pageWidgets.find(w => w.uuid === questionId);
      let choiceRowToUpdate = widgetToUpdate.choiceRows.find(r => r.id === row.id);
      choiceRowToUpdate.isChecked = !row.isChecked;
      let selectedRows = widgetToUpdate.choiceRows.filter(r => r.isChecked);
      const answerExists = state.answers.find(a => a.questionId === questionId);

      if (!answerExists) {
        state.answers.push({
          questionId, answers: selectedRows, additionalTextareaValue: null
        })
      } else {
        const answerToUpdate = state.answers.find(a => a.questionId === questionId);
        answerToUpdate.answers = selectedRows;
      }
    }


    // const {questionId, row} = payload;
    // const widgetState = this.state.widget;
    //
    // try {
    //   if (widgetState.activePageUuid) {
    //     let page = widgetState.pages.find(p => p.id === widgetState.activePageUuid);
    //     let pageWidgets = page.widgets;
    //     let widgetToUpdate = pageWidgets.find(w => w.uuid === questionId);
    //
    //
    //     let choiceRowToUpdate = {};
    //     let selectedRows = [];
    //     if(payload.isVariable) {
    //
    //       choiceRowToUpdate = widgetToUpdate.variableOptions.find(o => o.id === payload.optionId);
    //       let checkboxRowToUpdate = choiceRowToUpdate.variableCheckboxOptions.find(o => o.id === payload.checkboxId)
    //       checkboxRowToUpdate.isChecked = !row.isChecked;
    //       selectedRows = choiceRowToUpdate.variableCheckboxOptions.filter(r => r.isChecked);
    //
    //     } else {
    //       choiceRowToUpdate = widgetToUpdate.choiceRows.find(r => r.id === row.id);
    //       choiceRowToUpdate.isChecked = !row.isChecked;
    //       selectedRows = widgetToUpdate.choiceRows.filter(r => r.isChecked);
    //     }
    //
    //     const answerExists = state.answers.find(a => a.questionId === questionId);
    //
    //     if (!answerExists) {
    //       state.answers.push({
    //         questionId, answers: selectedRows, additionalTextareaValue: null
    //       })
    //     } else {
    //       const answerToUpdate = state.answers.find(a => a.questionId === questionId);
    //       answerToUpdate.answers = selectedRows;
    //     }
    //   }
    // }
    //
    // catch (e) {
    //   console.log(e);
    // }

  },

  setAdditionalTextareaValue: (state, payload) => {
    const {questionId, textareaValue} = payload;
    let answerToUpdate = state.answers.find(a => a.questionId === questionId);
    if (!answerToUpdate) {
      state.answers.push({questionId, value: '', additionalTextareaValue: textareaValue})
    } else {
      answerToUpdate.additionalTextareaValue = textareaValue;
    }

    //
    // console.log(answerToUpdate);
    //
    // if (answerToUpdate) {
    //   answerToUpdate['additionalTextareaValue'] = textareaValue;
    //   //   state.answers.push({
    //   //     questionId,
    //   //     ...answerToUpdate,
    //   //     additionalTextareaValue: textareaValue
    //   //   })
    //   // }
    //
    // } else {
    //   // answerToUpdate['additionalTextareaValue'] = textareaValue;
    // }
  },

  setOpinionScaleValue(state, payload) {
    const {questionId, value} = payload;
    const answer = state.answers.find(a => a.questionId === questionId);

    if (answer) {
      answer.value = value;
      return;
    }

    state.answers.push({
      questionId, value, additionalTextareaValue: null,
    })
  },
  saveRankingAnswer(state, payload) {
    const { questionId, rankingRows } = payload;

    const exist = state.answers.find(a => a.questionId === questionId);

    if(!exist) {
      state.answers.push({ questionId, rankingRows });
    } else {
      exist.rankingRows = rankingRows;
    }


  }
 };


export const actions = {};

export const getters = {
  answerValue: state => uuid => {
    const answer = state.answers.find(a => a.questionId === uuid);
    console.log(answer);
    if (answer && answer.value) return answer.value;
    return null;
  },
  additionalTextareaValue: state => uuid => {
    const question = state.answers.find(a => a.questionId === uuid);
    if (question) {
      return question['additionalTextareaValue'];
    }
  },
  variableValue: state => (questionId, optionId) => {
    const question = state.answers.find(q => q.questionId === questionId);
    console.log(question);
    if(question && question.options) {
      const answer = question.options.find(a => a.optionId === optionId);
      console.log(answer);
      return '1111111';
    }
  },
  scaleValue: state => questionId => {
    const question = state.answers.find(q => q.questionId === questionId);
    if(question) return question.value;
  },
  // opinionScaleValue: (state, getters, rootState) => {
  //   const activeElement = rootState.widget.activeElement;
  //   return activeElement.scaleValue;
  // },
  //   opinionValue: state => uuid => {
  //       const answer = state.opinionScale.find(a => a.uuid === uuid);
  //       if(answer) return answer.value;
  //       return null;
  //   }
};
