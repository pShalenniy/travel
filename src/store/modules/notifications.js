import { createNamespacedHelpers } from 'vuex';

export const namespacedHelper = createNamespacedHelpers('notifications');

const state = {
  notifications: []
};

const getters = {
  getNotifications: state => state.notifications
};

const mutations = {
  updateNotifications(state, payload) {
    state.notifications = payload;
  }
};

const actions = {
  addNotification({ getters, commit }, notification) {
    commit('updateNotifications', [
      ...getters.getNotifications,
      {
        type: 'info',
        color: 'green',
        ...notification,
        id: new Date().getTime()
      }
    ]);
  },
  removeNotification({ getters, commit }, notification) {
    commit('updateNotifications', [
      ...getters.getNotifications.filter(item => item.id !== notification.id)
    ]);
  },
  clearNotifications({ commit }) {
    commit('updateNotifications', []);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
