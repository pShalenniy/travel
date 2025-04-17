import Vue from 'vue';
import apolloClient from '@/vue-apollo';
import AES256 from 'aes-everywhere';
import _get from 'lodash/get';
import bookingHotelFacilityTypes from '@/queries/bookingHotelFacilityTypes';
import fetchFacilityGroups from '@/queries/fetchFacilityGroups';
import { getDecryptedValue, storeEncryptedValue } from '@/utils/crypto';

const state = {
  facilityGroups: null,
  facilityTypes: null,
  hotelFacilitiesTypes: null
};

const getters = {
  facilityGroups: state => {
    return getDecryptedValue(
      state.facilityGroups || Vue.localStorage.get('FACILITIES_GROUPS')
    );
  },
  facilityTypes: state => {
    return getDecryptedValue(
      state.facilityTypes || Vue.localStorage.get('FACILITIES_TYPES')
    );
  },
  hotelFacilitiesTypes: state => {
    return getDecryptedValue(
      state.hotelFacilitiesTypes ||
        Vue.localStorage.get('HOTEL_FACILITIES_TYPES')
    );
  },
  getHotelFacilitiesNamesByTypes: (state, getters) => types => {
    return getters.hotelFacilitiesTypes
      .filter(item => types.includes(item.hotel_facility_type_id))
      .map(item => item.name);
  },
  getHotelFacilityById: (state, getters) => id => {
    return getters.facilityGroups.find(item => item.id === id);
  }
};

const mutations = {
  updateFacilityGroups(state, payload) {
    state.facilityGroups = storeEncryptedValue('FACILITIES_GROUPS', payload);
  },
  updateFacilitiesTypes(state, payload) {
    state.facilityTypes = storeEncryptedValue('FACILITIES_TYPES', payload);
  },
  updateHotelFacilitiesTypes(state, payload) {
    state.hotelFacilitiesTypes = storeEncryptedValue(
      'HOTEL_FACILITIES_TYPES',
      payload
    );
  }
};

const actions = {
  async setHotelFacilities({ getters, commit }) {
    if (getters.facilityGroups) {
      return;
    }

    fetchFacilityGroups({
      apollo: apolloClient.defaultClient
    })
      .then(response => _get(response, 'data.fetchFacilityGroups', {}))
      .then(response => {
        commit('updateFacilityGroups', response);
      });
  },
  async setHotelFacilitiesBooking({ getters, commit }) {
    if (getters.facilityTypes && getters.hotelFacilitiesTypes) {
      return;
    }

    bookingHotelFacilityTypes({
      apollo: apolloClient.defaultClient
    })
      .then(response => _get(response, 'data.bookingHotelFacilityTypes', {}))
      .then(response => {
        const decryptedFacilityTypes = AES256.decrypt(
          response.facilityTypes,
          process.env.VUE_APP_GRAPHQL_ATTR_ENC_KEY
        ).toString();
        const facilityTypes = JSON.parse(decryptedFacilityTypes).result;
        commit('updateFacilitiesTypes', facilityTypes);

        const decryptedHotelFacilityTypes = AES256.decrypt(
          response.hotelFacilityTypes,
          process.env.VUE_APP_GRAPHQL_ATTR_ENC_KEY
        ).toString();
        const hotelFacilityTypes = JSON.parse(decryptedHotelFacilityTypes)
          .result;
        commit('updateHotelFacilitiesTypes', hotelFacilityTypes);
      });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
