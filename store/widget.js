import {v4 as uuidv4} from 'uuid';

export const state = () => ({
    widgets: [],
    activeElement: {}
})


export const mutations = {
    add(state, {item}) {
        let itemData = item.data ? item.data() : null;

        let counter = state.widgets.length;
        let def = {uuid: uuidv4(), counter};
        let setting = JSON.parse(JSON.stringify(item.setting));
        state.widgets.push(Object.assign(setting, def, itemData));
    },
    delete(state, uuid) {
        const indexToDelete = state.widgets.findIndex(el => el.uuid === uuid);
        state.widgets.splice(indexToDelete, 1);
        state.activeElement = {};

    },
    updateWidgets(state, newArray) {
        state.widgets = newArray;
    },
    select(state, {uuid}) {
        state.activeElement = state.widgets.find(w => w.uuid === uuid);
    },
    updateData(state, data) {
        let widget = state.widgets.find(w => w.uuid === data.uuid)
        widget[data.key] = data.value;
    }
}
export const actions = {
    add({state, commit}, item) {
        commit("add", {item});
        commit("select", {
            uuid: state.widgets[state.widgets.length - 1].uuid
        })
        // commit("select")
    },
    delete({commit}, uuid) {
        commit("delete", uuid);
    },
    updateWidgets({commit}, newArray) {
        commit("updateWidgets", newArray);
    },
    select({ commit }, uuid) {
        commit("select", {uuid})
    },
    updateData({ commit }, data) {
        commit("updateData", data);
    }
}


export const getters = {
    widgets: state => state.widgets,
    activeElement: state => state.activeElement
}
