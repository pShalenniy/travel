import Vue from 'vue';
import { getNights, getRangeDatesFormatted } from '@/utils/date';
import { getDecryptedValue, storeEncryptedValue } from '@/utils/crypto';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import moment from 'moment';
import router from '@/router';

const state = {
  conformationDialog: false,
  verificationDialog: false,
  resendEmailTimer: false,
  requestClicked: false,
  filter: {
    checkin: null,
    checkout: null,
    source: null,
    guests: 1,
    rooms: 1
  },
  chosenRoom: null,
  roomsItems: [1, 2, 3, 4],
  guestsItems: [1, 2, 3, 4, 5, 6, 7]
};

const getters = {
  getConformationDialog(state) {
    return state.conformationDialog;
  },
  getVerificationDialog(state) {
    return state.verificationDialog;
  },
  getResendEmailTimer(state) {
    return getDecryptedValue(
      state.resendEmailTimer || Vue.localStorage.get('RESEND_EMAIL_TIMER')
    );
  },
  getRequestClicked(state) {
    return state.requestClicked;
  },
  getDetailsFiltersValues(state) {
    return state.filter;
  },
  getFilter(state) {
    return state.filter;
  },
  getSource(state) {
    return state.filter.source;
  },
  getDates(state) {
    return [state.filter.checkin, state.filter.checkout];
  },
  getDatesFormatted(state) {
    return getRangeDatesFormatted(state.filter.checkin, state.filter.checkout);
  },
  getRoomsAndGuests(state) {
    const rooms = `${state.filter.rooms} ${
      state.filter.rooms > 1 ? 'rooms' : 'room'
    }`;
    const guests = `${state.filter.guests} ${
      state.filter.guests > 1 ? 'guests' : 'guest'
    }`;
    return `${rooms}, ${guests}`;
  },
  getTotalNights(state) {
    return state.filter.checkin
      ? getNights(state.filter.checkin, state.filter.checkout)
      : null;
  },
  getChosenRoom: state => {
    return getDecryptedValue(
      state.chosenRoom || Vue.localStorage.get('CHOSEN_ROOM')
    );
  },
  getChosenRoomPrice(state, getters) {
    if (getters.getChosenRoom) {
      return getters.getChosenRoom.selectedType.dailyRate;
    }

    return null;
  },
  getTotalPrice(state, getters) {
    if (getters.getChosenRoom) {
      return getters.getChosenRoomPrice * getters.getTotalNights;
    }

    return null;
  },
  getDetailsFilterAmplitude(state, getters) {
    if (!getters.getChosenRoom) {
      return null;
    }

    return {
      totalPrice: getters.getTotalPrice,
      numberOfNights: getters.getTotalNights,
      numberOfGuests: state.filter.guests
    };
  },
  getChosenRoomAmplitude(state, getters) {
    if (!getters.getChosenRoom) {
      return null;
    }

    const price = `${getters.getChosenRoomPrice} ${getters.getChosenRoom.currency}`;
    const facilities = getters.getChosenRoom.facilities
      .map(item => item.name)
      .join(', ');

    return {
      roomType: getters.getChosenRoom.name,
      perNightRoomPrice: price,
      roomFacilities: facilities
    };
  },
  getCheckoutCartRoom(state, getters) {
    if (!getters.getChosenRoom) {
      return null;
    }

    return {
      roomId: getters.getChosenRoom.room_id,
      roomTypeId: getters.getChosenRoom.selectedType.id,
      roomName: getters.getChosenRoom.name,
      roomMaxOccupancy: getters.getChosenRoom.selectedType.occupancy,
      roomRate: getters.getChosenRoomPrice
    };
  }
};

const mutations = {
  updateConformationDialog(state, payload) {
    state.conformationDialog = payload;
  },
  updateVerificationDialog(state, payload) {
    state.verificationDialog = payload;
  },
  updateResendEmailTimer(state, payload) {
    state.resendEmailTimer = storeEncryptedValue('RESEND_EMAIL_TIMER', payload);
  },
  updateRequestClicked(state, payload) {
    state.requestClicked = payload;
  },
  updateCheckin(state, payload) {
    state.filter.checkin = payload;
  },
  updateCheckout(state, payload) {
    state.filter.checkout = payload;
  },
  updateGuests(state, payload) {
    state.filter.guests = payload;
  },
  updateRooms(state, payload) {
    state.filter.rooms = payload;
  },
  updateSource(state, payload) {
    state.filter.source = payload;
  },
  updateChosenRoom(state, payload) {
    state.chosenRoom = storeEncryptedValue('CHOSEN_ROOM', payload);
  }
};

const actions = {
  setSource({ commit }, value) {
    commit('updateSource', value);
  },
  setConformationDialog({ commit }, value) {
    commit('updateConformationDialog', value);
  },
  setVerificationDialog({ commit }, value) {
    commit('updateVerificationDialog', value);
  },
  setRequestClicked({ commit }, value) {
    commit('updateRequestClicked', value);
  },
  setDetailsFiltersValues({ commit }, options) {
    const checkin = options.checkin;
    const checkout = options.checkout;
    const isDatesInFuture = moment(checkin).diff(moment(), 'days') >= 0;

    if (checkin && checkout && isDatesInFuture) {
      commit('updateCheckin', checkin);
      commit('updateCheckout', checkout);
    } else {
      let params = router.currentRoute.params;
      delete params.hotelId;

      router.push({
        name: 'destinatmion',
        params: params,
        query: router.currentRoute.query
      });
    }

    commit('updateSource', options.source);
    commit('updateGuests', 1);
    // commit('updateRooms', options.rooms);
  },
  setChosenRoom({ getters, rootGetters, commit }, value) {
    if (value) {
      commit('updateChosenRoom', value);
      logAmplitudeEvent(amplitudeEvents.hotelDetailsCheckout.addRoomToBasket, {
        ...getters.getChosenRoomAmplitude,
        ...rootGetters['details/getHotelAmplitudeOptions']
      });
    } else if (getters.getChosenRoom) {
      logAmplitudeEvent(
        amplitudeEvents.hotelDetailsCheckout.removeRoomFromBasket,
        {
          ...getters.getChosenRoomAmplitude,
          ...rootGetters['details/getHotelAmplitudeOptions']
        }
      );
      commit('updateChosenRoom', null);
    }
  },
  setResendEmailTimer({ commit }, value = new Date()) {
    commit('updateResendEmailTimer', value);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
