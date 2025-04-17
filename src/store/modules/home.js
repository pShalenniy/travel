import { createNamespacedHelpers } from 'vuex';
export const namespacedHelper = createNamespacedHelpers('home');

const state = {
  selectedTabKey: 'hotels',
  tabOptions: [
    { key: 'hotels', label: 'Hotels' }
    // { key: 'transport', label: 'Transport' },
    // { key: 'restaurants', label: 'Food & Drink' },
    // { key: 'activities', label: 'Entertainment' }
  ]
};

const getters = {
  getSelectedTabKey(state) {
    return state.selectedTabKey;
  },
  getTabsOptions(state) {
    return state.tabOptions;
  }
};

const mutations = {
  setSelectedTabKey(state, value) {
    state.selectedTabKey = value;
    state.cardsContent = [];
  }
};

const actions = {
  setSelectedTabKey({ commit, dispatch }, options) {
    commit('setSelectedTabKey', options.type);
    dispatch('getCardsContent');
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
