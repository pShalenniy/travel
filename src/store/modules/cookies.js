import Cookies from 'js-cookie';
import { amplitudeEvents } from '@/utils/amplitude';
import sendEventToAmplitude from '@/mutations/sendEventToAmplitude';
import apolloClient from '@/vue-apollo';
import _get from 'lodash/get';

const cookiesNames = {
  isCookiesPopup: 'COOKIES_POPUP',
  amplitudeAnalytics: 'AMPLITUDE_ANALYTICS',
  googleAnalytics: 'GOOGLE_ANALYTICS'
};

const state = {
  isCookiesDialog: false,
  isCookiesPopup: Cookies.getJSON(cookiesNames.isCookiesPopup),
  amplitudeAnalytics: Cookies.getJSON(cookiesNames.amplitudeAnalytics),
  googleAnalytics: Cookies.getJSON(cookiesNames.googleAnalytics)
};

const getters = {
  getCookiesDialog: state => state.isCookiesDialog,
  getCookiesPopup: state => {
    if (state.isCookiesPopup === undefined) {
      return true;
    }

    return state.isCookiesPopup;
  },
  isAmplitudeAnalyticsCookies: state =>
    state.amplitudeAnalytics === undefined || state.amplitudeAnalytics,
  isGoogleAnalyticsCookies: state =>
    state.googleAnalytics === undefined || state.googleAnalytics
};

const mutations = {
  updateCookiesDialogs(state, payload) {
    state.isCookiesDialog = payload;
  },
  updateCookiesPopup(state, payload) {
    Cookies.set(cookiesNames.isCookiesPopup, payload);
    state.isCookiesPopup = payload;
  },
  updateAmplitudeAnalytics(state, payload) {
    Cookies.set(cookiesNames.amplitudeAnalytics, payload);
    state.amplitudeAnalytics = payload;
  },
  updateGoogleAnalytics(state, payload) {
    Cookies.set(cookiesNames.googleAnalytics, payload);
    state.googleAnalytics = payload;
  }
};

const actions = {
  setCookiesDialogs({ commit }, value) {
    commit('updateCookiesDialogs', value);
  },
  setCookiesPopup({ commit }, value) {
    commit('updateCookiesPopup', value);
  },
  setAmplitudeAnalytics({ commit }, value) {
    commit('updateAmplitudeAnalytics', value);
  },
  setGoogleAnalytics({ commit }, value) {
    commit('updateGoogleAnalytics', value);
  },
  closeCookieWidget({ commit, dispatch }) {
    commit('updateCookiesPopup', false);
    dispatch('logAmplitudeEvent', {
      event: amplitudeEvents.cookies.closeCookieWidget
    });
  },
  logAmplitudeEvent({ getters }, { event_name, event_properties }) {
    if (getters.isAmplitudeAnalyticsCookies) {
      this._vm.$amplitude.getInstance().logEvent(event_name, event_properties);
    }
  },
  logAmplitudeEventOnBack({ rootGetters }, event) {
    if (getters.isAmplitudeAnalyticsCookies) {
      const encoded = btoa(
        unescape(
          encodeURIComponent(
            JSON.stringify({
              ...event,
              user_email: rootGetters['user/userEmail']
            })
          )
        )
      );
      sendEventToAmplitude({
        apollo: apolloClient.defaultClient,
        json: encoded
      })
        .then(response => _get(response, 'data.sendEventToAmplitude', {}))
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
