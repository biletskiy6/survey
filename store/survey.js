export const state = () => ({
    answers: [],
    multipleChoice: [],
    opinionScale: [],
});

export const mutations = {
    updateAnswer(state, { uuid, value }) {
        const answerToUpdate = state.answers.find(a => a.uuid === uuid);
        if(answerToUpdate) {
            answerToUpdate.value = value;
        } else {
            state.answers.push({ uuid, value });
        }
    },
    updateOpinionValue(state, { uuid, value }) {
        const answerToUpdate = state.opinionScale.find(a => a.uuid === uuid);
        if(answerToUpdate) {
            answerToUpdate.value = value;
        } else {
            state.opinionScale.push({ uuid, value });
        }
    },
    updateMultipleChoiceAnswers(state,  payload) {
        const answerExists = state.multipleChoice.find(a => a.id === payload.id);
        if(answerExists) {
           answerExists.isChecked = !answerExists.isChecked;
        } else {
            state.multipleChoice.push({...payload, isChecked: !payload.isChecked});
        }
    }
};


export const actions = {

};

export const getters = {
    answerValue: state => uuid => {
        const answer = state.answers.find(a => a.uuid === uuid);
        if(answer) return answer.value;
        return null;
    },
    opinionValue: state => uuid => {
        const answer = state.opinionScale.find(a => a.uuid === uuid);
        if(answer) return answer.value;
        return null;
    }
};
