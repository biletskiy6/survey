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

    console.log(answerToUpdate);

    if (answerToUpdate) {
      answerToUpdate.value = value;
    } else {
      state.answers.push({questionId: uuid, value });
    }
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
          questionId, answers: selectedRows
        })
      } else {
        const answerToUpdate = state.answers.find(a => a.questionId === questionId);
        answerToUpdate.answers = selectedRows;
      }
    }
  },

  setAdditionalTextareaValue: (state, payload) => {
    const {questionId, textareaValue} = payload;
    let answerToUpdate = state.answers.find(a => a.questionId === questionId);

    console.log(answerToUpdate);

    if (answerToUpdate) {
      answerToUpdate['additionalTextareaValue'] = textareaValue;
      //   state.answers.push({
      //     questionId,
      //     ...answerToUpdate,
      //     additionalTextareaValue: textareaValue
      //   })
      // }

    } else {
      // answerToUpdate['additionalTextareaValue'] = textareaValue;
    }
  },

  setOpinionScaleValue(state, payload) {
    const {questionId, value} = payload;
    const answer = state.answers.find(a => a.questionId === questionId);

    if (answer) {
      answer.value = value;
      return;
    }

    state.answers.push({
      questionId, value
    })
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
    const question =  state.answers.find(a => a.questionId === uuid);
    console.log(question);
    if(question && question.additionalTextareaValue) {
      return question.additionalTextareaValue;
    }
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
