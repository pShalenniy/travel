import { createNamespacedHelpers } from 'vuex';

export const namespacedHelper = createNamespacedHelpers('profile');

const state = {
  preferences: {
    hotels: ['Near office', 'Luxury', '5 star'],
    transport: [],
    restaurants: ['Trendy', 'Client friendly'],
    activities: ['Client friendly']
  },
  communications: {
    messages: {
      email: true,
      sms: false,
      whatsApp: false,
      phone: false
    },
    promotional: {
      email: false,
      sms: false,
      whatsApp: false,
      phone: false
    }
  },
  photo: '',
  companyName: 'Fello Studio',
  offices: ['Soho, London', 'Foz do Douro, Porto', 'Manhattan, New York']
};

const getters = {
  preferences: state => {
    return state.preferences;
  },
  hotels: state => {
    return state.preferences.hotels;
  },
  transport: state => {
    return state.preferences.transport;
  },
  restaurants: state => {
    return state.preferences.restaurants;
  },
  activities: state => {
    return state.preferences.activities;
  },
  communicationsMessages: state => {
    return state.communications.messages;
  },
  communicationsPromotional: state => {
    return state.communications.promotional;
  },
  companyName: state => {
    return state.companyName;
  },
  offices: state => {
    return state.offices;
  }
};

const mutations = {
  updateHotels: (state, value) => {
    state.preferences.hotels = value;
  },
  updateTransport: (state, value) => {
    state.preferences.transport = value;
  },
  updateRestaurants: (state, value) => {
    state.preferences.restaurants = value;
  },
  updateActivities: (state, value) => {
    state.preferences.activities = value;
  },
  updateMessagesItem(state, { item, value }) {
    state.communications.messages[item] = value;
  },
  updatePromotionalItem(state, { item, value }) {
    state.communications.promotional[item] = value;
  },
  updateCompanyName(state, value) {
    state.companyName = value;
  },
  addNewOffice(state, value) {
    state.offices.push(value);
  }
};

const actions = {
  setMessagesItem(context, { item, value }) {
    context.commit('updateMessagesItem', { item, value });
  },
  setPromotionalItem(context, { item, value }) {
    context.commit('updatePromotionalItem', { item, value });
  },
  setCompanyName(context, value) {
    context.commit('updateCompanyName', value);
  },
  addOffice(context, value) {
    context.commit('addNewOffice', value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
