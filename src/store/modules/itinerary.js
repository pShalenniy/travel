import { createNamespacedHelpers } from 'vuex';

export const namespacedHelper = createNamespacedHelpers('itinerary');

const state = {
  itinerary: {
    startDate: '16 June',
    endDate: '20 June',
    location: 'Porto International',
    totalNights: 3,
    totalPrice: 1093,
    items: [
      {
        order: 0,
        date: '16 june',
        time: '08:20',
        category: 'plane_ticket',
        title: 'Transport, Private transfer',
        location: 'Porto International',
        canEdit: false,
        canUpdate: false,
        addButton: 'Add breakfast',
        info: {
          company: '/card_placeholder.png',
          number: 'BA1X993',
          startPlace: 'LGW',
          startTime: '06:00',
          duration: '2 hrs 20 mins',
          endPlace: 'POR',
          endTime: '08:20'
        }
      },
      {
        order: 1,
        date: '16 june',
        time: '08:20',
        category: 'car_rental',
        title: 'Transport, Private transfer',
        location: 'Porto International',
        canEdit: true,
        options: [
          {
            image: '/card_placeholder.png',
            title: 'Premium saloon',
            info: '4 people, 3 bags',
            price: 10
          },
          {
            image: '/card_placeholder.png',
            title: 'Premium saloon',
            info: '4 people, 3 bags',
            price: 15
          }
        ]
      },
      {
        order: 2,
        date: '16 june',
        time: '09:20',
        category: 'hotel_room',
        title: 'Hotel, Hotel Porto Santo',
        location: 'Porto International',
        canEdit: true,
        canUpdate: true,
        addButton: 'Add Lunch',
        message: 'Price change. Was £45, now 98.',
        info: {}
      },
      {
        order: 2,
        date: '16 june',
        time: '09:20',
        category: 'car_rental',
        title: 'Hotel, Hotel Porto Santo',
        location: 'Porto International',
        canEdit: true,
        unavailable: true,
        info: {
          image: '/card_placeholder.png',
          title: 'Premium saloon',
          info: '4 people, 3 bags',
          price: 10
        }
      }
    ],
    errors: [
      `You have 2 options for <strong>Activity</strong>, on <strong>16 June</strong> at <strong>14:00</strong>. Please remove the one you don’t wish to proceed with.`,
      `<strong>Breakfast</strong>, on <strong>17 June</strong> at <strong>09:00</strong> is no longer available.`
    ]
  }
};

const getters = {
  getItinerary(state) {
    return state.itinerary;
  },
  getItineraryItems(state) {
    return state.itinerary.items;
  },
  getItineraryErrors(state) {
    return state.itinerary.errors;
  }
};

const mutations = {
  updateItineraryItems(state, payload) {
    state.itinerary.items = payload;
  },
  updateItineraryStartDate(state, payload) {
    state.itinerary.startDate = payload;
  },
  updateItineraryEndDate(state, payload) {
    state.itinerary.endDate = payload;
  }
};

const actions = {
  getItinerary({ commit }) {
    commit('updateItinerary', []);
  },
  deleteItem({ commit }, id) {
    console.log(`removed ${id} item from itinerary`);
    commit('updateItineraryItems', state.itinerary.items);
  },
  updateItem({ commit }, id) {
    console.log(`updated ${id} item from itinerary`);
    commit('updateItineraryItems', state.itinerary.items);
  },
  swapItem({ commit }, id) {
    console.log(`swapped ${id} item from itinerary`);
    commit('updateItineraryItems', state.itinerary.items);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
