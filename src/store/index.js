import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Cookies from 'js-cookie';
import user from './modules/user';
import home from './modules/home';
import hotels from './modules/hotels';
import profile from './modules/profile';
import details from './modules/details';
import hotelDetails from './modules/hotelDetails';
import detailsFilter from './modules/detailsFilter';
import filter from './modules/filter';
import itinerary from './modules/itinerary';
import destination from './modules/destination';
import facilities from './modules/facilities';
import cookies from './modules/cookies';
import notifications from './modules/notifications';

const vuexCookie = new VuexPersistence({
  restoreState: key => {
    return Cookies.getJSON(key);
  },
  saveState: (key, state) => {
    return Cookies.set(key, state, {
      expires: 3
    });
  },
  modules: ['user']
});

Vue.use(Vuex);
// Vue.use(require('vue-faker'), { locale: 'en_GB' });

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    profile,
    home,
    hotels,
    details,
    hotelDetails,
    detailsFilter,
    filter,
    itinerary,
    destination,
    facilities,
    cookies,
    notifications
  },
  plugins: [vuexCookie.plugin]
});
