import { createNamespacedHelpers } from 'vuex';
import _get from 'lodash/get';
import apolloClient from '../../vue-apollo';
import signUp from '../../mutations/registerUser';
import signInMutation from '../../mutations/signIn';
import fetchUser from '../../queries/fetchUser';
import updateUser from '../../mutations/updateUser';
import confirmUser from '../../mutations/confirmUser';
import validateUser from '../../mutations/validateUser';
import unsubscribe from '../../mutations/unsubscribe';
import resubscribe from '../../mutations/resubscribe';
import resendVerificationCode from '../../mutations/resendVerificationCode';
import { getEncryptedValue, getDecryptedValue } from '@/utils/crypto';
import setUserPropertiesToAmplitude from '@/mutations/setUserPropertiesToAmplitude';
export const namespacedHelper = createNamespacedHelpers('user');

const state = {
  user: null,
  isAuth: true,
  isPlusAccess: true,
  validateError: null,
  corporationId: null,
  reference: null,
  activeTripId: null,
  destinationUnsubscribe: null,
  comingFromEmailML: false
};

const getters = {
  user: state => {
    return getDecryptedValue(state.user);
  },
  userEmail: state => {
    return state.user && getDecryptedValue(state.user).email;
  },
  userId: state => {
    return state.user && getDecryptedValue(state.user)['userId'];
  },
  corporationId: state => {
    return getDecryptedValue(state.corporationId);
  },
  activeTripId: state => {
    return getDecryptedValue(state.activeTripId);
  },
  comingFromEmailML: state => {
    return state.comingFromEmailML;
  },
  getReference(state) {
    return getDecryptedValue(state.reference);
  },
  isAuth: state => {
    return state.user != undefined;
  },
  isPlusAccess: state => {
    return state.isPlusAccess;
  },
  getValidateError: state => {
    return state.validateError;
  },
  getDestinationUnsubscribe: state => {
    return state.destinationUnsubscribe;
  },
  userPasswordRules: () => ({
    required: value => !!value || 'Password is required',
    length: value =>
      value.length >= 8 || 'Password should be a minimum of eight characters',
    password: value => {
      const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      return (
        pattern.test(value) ||
        'Password should have at least one upper case, one lower case and one number'
      );
    }
  })
};

const mutations = {
  signIn(state, form) {
    signInMutation({
      apollo: apolloClient.defaultClient,
      ...form
    })
      .then(response => _get(response, 'data.signIn', {}))
      .then(response => {
        state.user = getEncryptedValue(response.user);
      });
  },
  updateUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = null;
  },
  registerUser(state, form) {
    signUp({
      apollo: apolloClient.defaultClient,
      ...form
    })
      .then(response => _get(response, 'data.registerUser', {}))
      .then(response => {
        state.user = getEncryptedValue(response.user);
      });
  },
  updateUserAttr(state, value) {
    updateUser({
      apollo: apolloClient.defaultClient,
      userId: getters.user(state).userId || '',
      userModifications: value
    })
      .then(response => _get(response, 'data.updateUser', {}))
      .then(response => {
        state.user = getEncryptedValue(response.user);
      });
  },
  setValidateError(state, value) {
    state.validateError = value;
  },
  updateCorporationId(state, value) {
    state.corporationId = getEncryptedValue(value);
  },
  updateActiveTripId(state, value) {
    state.activeTripId = getEncryptedValue(value);
  },
  updateComingFromEmailML(state, value) {
    state.comingFromEmailML = value;
  },
  updateReference(state, payload) {
    state.reference = getEncryptedValue(payload);
  },
  updateDestinationUnsubscribe(state, value) {
    state.destinationUnsubscribe = value;
  }
};

const actions = {
  signOut(context) {
    context.commit('clearUser');
  },
  signIn(context, user) {
    context.commit('signIn', user);
  },
  setUser({ commit }, user) {
    commit('updateUser', getEncryptedValue(user));
    const encoded = btoa(
      unescape(
        encodeURIComponent(
          JSON.stringify({
            user_email: user && user.email
          })
        )
      )
    );
    setUserPropertiesToAmplitude({
      apollo: apolloClient.defaultClient,
      json: encoded
    })
      .then(response => _get(response, 'data.setUserPropertiesToAmplitude', {}))
      .catch(error => console.log(error));
  },
  setTestUser({ commit }) {
    commit(
      'updateUser',
      getEncryptedValue({
        firstName: 'Test',
        lastName: 'Test',
        email: 'test_user@moethennessy.com',
        userId: process.env.VUE_APP_TEST_USER_UID,
        userStatus: 'verified'
      })
    );
  },
  addAccount() {
    console.log('add account');
  },
  removeAccount(id) {
    console.log(`remove account ${id}`);
  },
  setNewFirstName(context, value) {
    context.commit('updateUserAttr', JSON.parse(`{ "first_name":"${value}" }`));
  },
  setNewLastName(context, value) {
    context.commit('updateUserAttr', JSON.parse(`{ "last_name":"${value}" }`));
  },
  setNewEmail(context, value) {
    context.commit('updateUserAttr', JSON.parse(`{ "email":"${value}" }`));
  },
  setNewPassword(context, value) {
    context.commit('updateUserAttr', JSON.parse(`{ "password":"${value}" }`));
  },
  setNewPhone(context, value) {
    context.commit('updateUserAttr', JSON.parse(`{ "phone":"${value}" }`));
  },
  setPhotoUrl(context, value) {
    context.commit('updateUserAttr', JSON.parse(`{ "photoUrl":"${value}" }`));
  },
  clearUser(context) {
    context.commit('clearUser');
  },
  fetchUser({ dispatch }, uId) {
    return fetchUser({
      apollo: apolloClient.defaultClient,
      uId: uId
    })
      .then(response => _get(response, 'data.fetchUser', {}))
      .then(response => {
        dispatch('setUser', response);
      });
  },
  async confirmUser({ dispatch }, args) {
    return confirmUser({
      apollo: apolloClient.defaultClient,
      ...args
    })
      .then(response => _get(response, 'data.confirmUser', {}))
      .then(response => {
        dispatch('setUser', response.user);
      });
  },
  validateUser({ getters, commit, dispatch }, args) {
    return validateUser({
      apollo: apolloClient.defaultClient,
      ...args
    })
      .then(response => _get(response, 'data.validateUser', {}))
      .then(response => {
        if (response.errors) {
          commit('setValidateError', response.errors[0]);
          return false;
        }

        if (response.success && getters.user.email === response.user.email) {
          dispatch('setUser', response.user);
          return response;
        }
      });
  },
  async resendVerificationCode({ getters, commit }) {
    return resendVerificationCode({
      apollo: apolloClient.defaultClient,
      uId: getters.userId
    })
      .then(response => _get(response, 'data.resendVerificationCode', {}))
      .then(response => {
        if (response.errors) {
          commit('setValidateError', response.errors[0]);
          return false;
        }

        return response.success;
      });
  },
  setCorporationId(context, value) {
    context.commit('updateCorporationId', value);
  },
  setActiveTripId(context, value) {
    context.commit('updateActiveTripId', value);
  },
  setComingFromEmailML(context, value) {
    context.commit('updateComingFromEmailML', value);
  },
  setReference({ commit }, value) {
    commit('updateReference', value);
  },
  setDestinationUnsubscribe(context, value) {
    context.commit('updateDestinationUnsubscribe', value);
  },
  async unsubscribe({ getters }) {
    return unsubscribe({
      apollo: apolloClient.defaultClient,
      email: getters.user.email
    })
      .then(response => _get(response, 'data.unsubscribe', {}))
      .then(response => {
        return response;
      });
  },
  async resubscribe({ getters }) {
    return resubscribe({
      apollo: apolloClient.defaultClient,
      email: getters.user.email
    })
      .then(response => _get(response, 'data.resubscribe', {}))
      .then(response => {
        return response;
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
