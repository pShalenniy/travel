import { createNamespacedHelpers } from 'vuex';
import moment from 'moment';
import { completeDate, getNights, viewDate } from '@/utils/date';
import _isEqual from 'lodash/isEqual';
import _minBy from 'lodash/minBy';
import _maxBy from 'lodash/maxBy';
import _min from 'lodash/min';
import _max from 'lodash/max';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import { getLengthKm } from '@/utils/mapUtils';

export const namespacedHelper = createNamespacedHelpers('filter');

const state = {
  dates: [],
  coordinates: [],
  guests: 2,
  priceMinMaxRange: null,
  distanceMinMaxRange: null,
  moreFilters: {
    price: null,
    starRating: [],
    breakfastIncluded: null,
    amenities: [],
    freeCancellation: null,
    distanceFromCenter: null
  }
};

const getters = {
  getPriceMinMaxRange: state => state.priceMinMaxRange,
  getDistanceMinMaxRange: state => state.distanceMinMaxRange,
  getCoordinates: state => state.coordinates,
  getFilterState: state => state,
  getMoreFilter: state => state.moreFilters,
  getMoreFilterActive: state =>
    !!state.moreFilters.starRating.length ||
    state.moreFilters.breakfastIncluded ||
    state.moreFilters.freeCancellation ||
    state.moreFilters.distanceFromCenter,
  getFormatDates(state) {
    return state.dates
      .map(item => {
        return moment(item).format(viewDate);
      })
      .join(' - ');
  },
  getSearchQueryOptions(state) {
    return {
      longitude: state.coordinates[0],
      latitude: state.coordinates[1],
      // guests: state.guests,
      travelStarting: state.dates[0],
      travelEnding: state.dates[1]
    };
  },
  getSearchAmplitudeOptions(state) {
    return {
      numberOfNights: getNights(state.dates[0], state.dates[1]),
      numberOfGuests: state.guests,
      fromDate: state.dates[0],
      toDate: state.dates[1],
      minPrice: null,
      maxPrice: null
    };
  },
  getMoreFilterLength(state) {
    const starRating = Number(state.moreFilters.starRating.length > 0);
    const breakfastIncluded = Number(state.moreFilters.breakfastIncluded);
    const freeCancellation = Number(state.moreFilters.freeCancellation);
    const distanceFromCenter = Number(state.moreFilters.distanceFromCenter > 0);

    return (
      starRating + breakfastIncluded + freeCancellation + distanceFromCenter
    );
  },
  getSuggestMoreFilter(state) {
    const starRating =
      state.moreFilters.starRating.length > 0
        ? state.moreFilters.starRating.join(',')
        : null;

    return {
      breakfastIncluded: state.moreFilters.breakfastIncluded,
      distanceFromCenter: state.moreFilters.distanceFromCenter,
      starRating: starRating,
      cancellation: state.moreFilters.freeCancellation
    };
  },
  getFilterQuery(state) {
    return {
      checkin: state.dates[0],
      checkout: state.dates[1]
    };
  }
};

const mutations = {
  updatePriceMinMaxRange(state, payload) {
    state.priceMinMaxRange = payload;
  },
  updateDistanceMinMaxRange(state, payload) {
    state.distanceMinMaxRange = payload;
  },
  updateDates(state, payload) {
    state.dates = payload;
  },
  updateCoordinates(state, payload) {
    state.coordinates = payload;
  },
  updateGuests(state, payload) {
    state.guests = payload;
  },
  updateMostBooked(state, payload) {
    state.moreFilters.mostBooked = payload;
  },
  updatePrice(state, payload) {
    if (!_isEqual(payload, state.priceMinMaxRange)) {
      state.moreFilters.price = payload;
    } else {
      state.moreFilters.price = null;
    }
  },
  updateFreeCancellation(state, payload) {
    state.moreFilters.freeCancellation = payload;
  },
  updateStarRating(state, payload) {
    state.moreFilters.starRating = payload;
  },
  updateAmenities(state, payload) {
    state.moreFilters.amenities = payload;
  },
  updateBreakfastIncluded(state, payload) {
    state.moreFilters.breakfastIncluded = payload;
  },
  updateDistanceFromCenter(state, payload) {
    state.moreFilters.distanceFromCenter = payload;
  },
  updateProvider(state, payload) {
    state.moreFilters.provider = payload;
  }
};

const actions = {
  logMoreFiltersEvents({ getters, rootGetters }) {
    const travelTo = rootGetters['destination/getDestinationInfo'];
    const moreFilterOptions = getters.getSuggestMoreFilter;

    if (moreFilterOptions.breakfastIncluded) {
      logAmplitudeEvent(amplitudeEvents.destinationFilters.breakfastIncluded, {
        breakfastIncluded: true,
        travellingTo: travelTo.text
      });
    }

    if (moreFilterOptions.cancellation) {
      logAmplitudeEvent(amplitudeEvents.destinationFilters.freeCancellation, {
        freeCancellation: true,
        travellingTo: travelTo.text
      });
    }

    if (moreFilterOptions.starRating) {
      logAmplitudeEvent(amplitudeEvents.destinationFilters.useStarFilter, {
        starRating: moreFilterOptions.starRating,
        travellingTo: travelTo.text
      });
    }

    if (moreFilterOptions.distanceFromCenter) {
      logAmplitudeEvent(
        amplitudeEvents.destinationFilters.useDistanceFromCenterFilter,
        {
          distanceFromCenter: moreFilterOptions.distanceFromCenter,
          travellingTo: travelTo.text
        }
      );
    }
  },
  setPriceMinMaxRange({ commit }, response) {
    const minPrice = _minBy(response, item => item.price);
    const maxPrice = _maxBy(response, item => item.price);
    const priceMinMaxRange = [
      Math.round(minPrice.price),
      Math.round(maxPrice.price)
    ];

    commit('updatePriceMinMaxRange', priceMinMaxRange);
  },
  setDistanceMinMaxRange({ commit, getters }, response) {
    const responseDistances = response.map(item => {
      return getLengthKm(
        [item.lng, item.lat],
        [
          getters.getSearchQueryOptions.longitude,
          getters.getSearchQueryOptions.latitude
        ]
      );
    });

    const minDistance = Math.floor(_min(responseDistances)) || 1;
    const maxDistance = Math.ceil(_max(responseDistances));

    commit('updateDistanceMinMaxRange', [minDistance, maxDistance]);
  },
  setPriceRange({ commit }, value) {
    commit('updatePrice', value);
  },
  setDestination({ commit }, options) {
    commit('updateDestination', options);
  },
  setCoordinates({ commit }, options) {
    commit('updateCoordinates', options);
  },
  resetMoreFiltersValues({ commit }) {
    commit('updateMostBooked', []);
    commit('updatePrice', null);
    commit('updateFreeCancellation', null);
    commit('updateStarRating', []);
    commit('updateAmenities', []);
    commit('updateBreakfastIncluded', null);
    commit('updateProvider', '');
    commit('updateDistanceFromCenter', null);
  },
  resetFiltersValues({ commit }) {
    commit('updateDates', []);
    commit('updateDestination');
    commit('updateGuests');
    commit('resetMoreFiltersValues');
  },
  setTopFiltersValues({ commit, dispatch }, options) {
    const checkin = options.dates[0];
    const checkout = options.dates[1];
    const isDatesInFuture = moment(checkin).diff(moment(), 'days') >= 0;

    if (checkin && checkout && isDatesInFuture) {
      commit('updateDates', options.dates);
    } else {
      const startDate = moment().format(completeDate);
      const endDate =
        moment(checkout) > moment()
          ? checkout
          : moment()
              .add(2, 'days')
              .format(completeDate);
      commit('updateDates', [startDate, endDate]);

      dispatch(
        'notifications/addNotification',
        {
          message: `Thanks for trying our personalised recommendations service. Your trip to ${
            options.destination
          } from ${moment(checkin).format(
            viewDate
          )} has passed - if you have another upcoming trip check your email for more great recommendations from us, or try our search`
        },
        { root: true }
      );
    }

    commit('updateGuests', options.guests || '1');
  },
  setMoreFiltersValues({ commit }, options) {
    commit('updateMostBooked', options.mostBooked);
    commit('updatePrice', options.price);
    commit('updateFreeCancellation', options.freeCancellation);
    commit('updateStarRating', options.starRating);
    commit('updateAmenities', options.amenities);
    commit('updateBreakfastIncluded', options.breakfastIncluded);
    commit('updateProvider', options.provider);
    commit('updateDistanceFromCenter', options.distanceFromCenter);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
