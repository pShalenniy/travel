import { createNamespacedHelpers } from 'vuex';
import apolloClient from '@/vue-apollo';
import fetchHotelPolicies from '@/queries/fetchHotelPolicies';
import fetchHotelFacilities from '@/queries/fetchHotelFacilities';
import _get from 'lodash/get';

// const policyIcons = {
//   POLICY_HOTEL_GROUPS: 'mdi-account-multiple',
//   POLICY_HOTEL_INTERNET: 'mdi-wifi',
//   POLICY_HOTEL_PARKING: 'mdi-car',
//   POLICY_HOTEL_PETS: 'mdi-paw',
//   POLICY_CHILDREN: 'mdi-human-child'
// };

export const namespacedHelper = createNamespacedHelpers('hotelDetails');

const state = {
  hotelPolicies: null,
  hotelFacilities: null,
  hotelPoliciesLoading: false,
  hotelFacilitiesLoading: false
};

const getters = {
  getHotelPolicies: state => state.hotelPolicies,
  getHotelFacilities: state => state.hotelFacilities,
  getHotelPoliciesLoading: state => state.hotelPoliciesLoading,
  getHotelFacilitiesLoading: state => state.hotelFacilitiesLoading
};

const mutations = {
  updateHotelPolicies(state, payload) {
    state.hotelPolicies = payload;
  },
  updateHotelFacilities(state, payload) {
    state.hotelFacilities = payload;
  },
  updateHotelPoliciesLoading(state, payload) {
    state.hotelPoliciesLoading = payload;
  },
  updateHotelFacilitiesLoading(state, payload) {
    state.hotelFacilitiesLoading = payload;
  }
};

const actions = {
  setHotelFacilities({ commit }, hotelFacilities) {
    commit('updateHotelFacilities', hotelFacilities);
  },
  loadHotelPolicies({ commit, rootGetters }, hotelId) {
    commit('updateHotelPoliciesLoading', true);
    fetchHotelPolicies({
      apollo: apolloClient.defaultClient,
      hotelId: hotelId,
      source: rootGetters['detailsFilter/getSource']
    })
      .then(response => _get(response, 'data.fetchHotelPolicies', {}))
      .then(response => {
        const policies = response.policies.map(item => {
          const policy = item.text.split(/[.]+/).map(text => {
            return text.split('; ').map((title, i) => ({
              icon: i === 0 ? 'mdi-circle-medium' : '',
              title: title
            }));
          });

          return [].concat.apply([], policy);
        });

        commit(
          'updateHotelPolicies',
          [].concat.apply([], policies).filter(item => item.title.trim())
        );
        commit('updateHotelPoliciesLoading', false);
      })
      .catch(error => {
        commit('updateHotelPoliciesLoading', false);
        console.warn(error);
      });
  },
  loadHotelFacilities({ commit, rootGetters }, hotelId) {
    commit('updateHotelFacilitiesLoading', true);
    fetchHotelFacilities({
      apollo: apolloClient.defaultClient,
      hotelId: hotelId,
      source: rootGetters['detailsFilter/getSource']
    })
      .then(response => _get(response, 'data.fetchHotelFacilities', {}))
      .then(response => {
        commit('updateHotelFacilities', response.facilities);
        commit('updateHotelFacilitiesLoading', false);
      })
      .catch(error => {
        commit('updateHotelFacilitiesLoading', false);
        console.warn(error);
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
