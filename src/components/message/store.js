import Vue from "vue";

const state = {
  messages: [],
  index: 0
};

const mutations = {
  initMessages(state, payload) {
    state.messages = payload.map((item, index) => {
      return {
        ...item,
        id: index
      };
    });
    state.index = payload.length;
  },

  addMessage(state, payload) {
    let _payload = {
      ...payload,
      date: new Date(),
      id: state.index
    };
    state.messages.push(_payload);
    state.index += 1;
  },

  recallMessage(state, payload) {
    let index = state.messages.findIndex(item => item.id === payload.id);
    if (index >= 0) {
      let _payload = {
        ...payload,
        isRecalled: true
      };
      state.messages.splice(index, 1, _payload);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
