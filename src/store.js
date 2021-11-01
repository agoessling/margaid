import Vuex from 'vuex';

import { getActiveSheet } from './Sheet';

function getStore() {
  return new Vuex.Store({
    state: {
      activeTool: 'select',
      styles: {
        line: {
          strokeColor: '#000000FF',
          fillColor: '#FFFFFF00',
        },
      },
    },

    mutations: {
      SET_ACTIVE_TOOL(state, tool) {
        state.activeTool = tool;
      },

      SET_STYLES_LINE_STROKE_COLOR(state, color) {
        state.styles.line.strokeColor = color;
      },

      SET_STYLES_LINE_FILL_COLOR(state, color) {
        state.styles.line.fillColor = color;
      },
    },

    actions: {
      setActiveTool({ commit }, tool) {
        commit('SET_ACTIVE_TOOL', tool);

        const sheet = getActiveSheet();
        sheet.activateTool(tool);
      },
    },
  });
}

export default getStore;
