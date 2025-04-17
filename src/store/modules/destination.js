import { createNamespacedHelpers } from 'vuex';
import searchPlaces from '@/queries/searchPlaces';
import apolloClient from '@/vue-apollo';
import _get from 'lodash/get';
import {
  extractPlaceParams,
  extractPlaceDestination,
  extractPlaceNameByType,
  getNavigateToDestinationParams
} from '@/utils/destinationSearchUtils';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import { getDestinationImage } from '@/utils/destinationImages';
import router from '@/router';

export const namespacedHelper = createNamespacedHelpers('destination');

const state = {
  isMap: false,
  isFilterOpen: false,
  filterAnimationSlide: false,
  destinationInfo: {},
  destinationInfoLoading: false
};

const getters = {
  getDestinationInfo(state) {
    return state.destinationInfo;
  },
  getDestinationInfoLoading(state) {
    return state.destinationInfoLoading;
  },
  getDestinationParams(state) {
    return extractPlaceParams(state.destinationInfo);
  },
  getDestinationInfoPlace(state) {
    if (!(state.destinationInfo && state.destinationInfo.mbId)) {
      return null;
    }

    const place = extractPlaceNameByType(state.destinationInfo, 'place');

    return place && place.text;
  },
  getDestinationBreadcrumbs(state, getters) {
    if (!(state.destinationInfo && state.destinationInfo.mbId)) {
      return [];
    }

    const country =
      extractPlaceNameByType(state.destinationInfo, 'country') ||
      extractPlaceNameByType(state.destinationInfo, 'region');

    if (!country) {
      return [
        {
          text: getters.getDestinationInfoPlace,
          disabled: true
        }
      ];
    } else {
      return [
        {
          text: country.text,
          disabled: true
        },
        {
          text: getters.getDestinationInfoPlace,
          disabled: true
        }
      ];
    }
  },
  getDestinationHero(state, getters) {
    if (!(state.destinationInfo && state.destinationInfo.mbId)) {
      return {};
    }

    return {
      title: getters.getDestinationInfoPlace,
      backgroundImgSrc: getDestinationImage(getters.getDestinationInfoPlace)
    };
  },
  getDestinationFilterText(state) {
    if (!(state.destinationInfo && state.destinationInfo.mbId)) {
      return '';
    }
    return extractPlaceDestination(state.destinationInfo);
  }
};

const mutations = {
  updateMapView(state) {
    state.isMap = !state.isMap;
    if (state.isMap) {
      logAmplitudeEvent(amplitudeEvents.destination.viewMap);
    }
  },
  updateFilterOpen(state, payload) {
    state.isFilterOpen = payload;
  },
  updateFilterAnimation(state, payload) {
    state.filterAnimationSlide = payload;
  },
  updateDestinationInfo(state, payload) {
    state.destinationInfo = payload;
  },
  updateDestinationInfoLoading(state, payload) {
    state.destinationInfoLoading = payload;
  }
};

const actions = {
  toggleMap({ commit }) {
    commit('updateMapView');
  },
  toggleFilter({ commit }, options) {
    commit('updateFilterOpen', options);
  },
  setDestinationInfo({ commit }, options) {
    commit('updateDestinationInfo', options);
  },
  setDestinationInfoLoading({ commit }, options) {
    commit('updateDestinationInfoLoading', options);
  },
  setFilterAnimation({ commit }, options) {
    commit('updateFilterAnimation', options);
  },
  async searchPlaces({ commit }, options) {
    commit('updateDestinationInfoLoading', true);
    return searchPlaces({
      apollo: apolloClient.defaultClient,
      ...options
    })
      .then(response => _get(response, 'data.searchPlaces', {}))
      .then(response => {
        commit('updateDestinationInfo', response[0]);
      });
  },
  setDestination({ getters, rootGetters, commit, dispatch }, options) {
    return searchPlaces({
      apollo: apolloClient.defaultClient,
      ...options
    })
      .then(response => _get(response, 'data.searchPlaces', {}))
      .then(response => {
        commit('updateDestinationInfo', response[0]);
        if (getters.getDestinationInfo && getters.getDestinationInfo.center) {
          dispatch('filter/setCoordinates', getters.getDestinationInfo.center, {
            root: true
          });
        }
        commit('updateDestinationInfoLoading', false);
        logAmplitudeEvent(
          amplitudeEvents.destination.viewMoreHotelsInDestination,
          {
            travellingTo: getters.getDestinationInfo.text,
            fromDate: rootGetters['filter/getFilterState'].dates[0],
            toDate: rootGetters['filter/getFilterState'].dates[1]
          }
        );

        return getNavigateToDestinationParams(
          router.currentRoute,
          getters.getDestinationInfo,
          {
            ...router.currentRoute.query,
            ...rootGetters['filter/getFilterQuery']
          }
        );
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
