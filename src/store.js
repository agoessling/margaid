import Vuex from 'vuex';

function getStore() {
  return new Vuex.Store({
    state: {
      activeTool: 'select',
      activeSheet: null,
    },

    mutations: {
      SET_ACTIVE_TOOL(state, tool) {
        state.activeTool = tool;
      },

      SET_ACTIVE_SHEET(state, sheet) {
        state.activeSheet = sheet;
      },
    },

    actions: {
      setActiveTool({ state, commit }, tool) {
        commit('SET_ACTIVE_TOOL', tool);

        const sheet = state.activeSheet;
        sheet.activateTool(tool);
      },

      setActiveSheet({ commit }, sheet) {
        commit('SET_ACTIVE_SHEET', sheet);
      },
    },
  });
}

export default getStore;
