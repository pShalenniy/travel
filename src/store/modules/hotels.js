import apolloClient from '../../vue-apollo';
import suggest from '../../queries/suggest';
import minimumHotelsPrices from '../../queries/minimumHotelsPrices';
import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import { getLengthKm } from '@/utils/mapUtils';

const state = {
  items: [],
  page: 1,
  showItemsPerPage: 9,
  endOfResults: false,
  loading: false,
  loadingMore: false,
  filtered: false,
  hotelRoomPrices: {}
};

const getters = {
  getAllItems: state => state.items,
  getItems: (state, getters, rootState, rootGetters) => {
    const filtered = state.items.filter(card => {
      const filters = rootGetters['filter/getMoreFilter'];
      const cardOptions = card.options ? JSON.parse(card.options) : {};
      let byStar = true;
      let byCancellation = true;
      let byBreakfast = true;
      let byDistance = true;

      if (filters.starRating.length) {
        byStar = filters.starRating.includes(card.rating);
      }

      if (filters.freeCancellation) {
        byCancellation = filters.freeCancellation === card.freeCancellation;
      }

      if (filters.breakfastIncluded) {
        byBreakfast = filters.breakfastIncluded === cardOptions.freeBreakfast;
      }

      if (filters.distanceFromCenter) {
        const cityCenter = rootGetters['filter/getSearchQueryOptions'];

        const lengthKm = getLengthKm(
          [card.lng, card.lat],
          [cityCenter.longitude, cityCenter.latitude]
        );

        byDistance = lengthKm < filters.distanceFromCenter;
      }

      return byStar && byCancellation && byBreakfast && byDistance;
    });

    return _sortBy(filtered, [
      item => {
        let sortByPriceExist = false;

        const price = getters.getHotelRoomPrices[item.extId];

        if (price && price.loading === false && price.price === 'N/A') {
          sortByPriceExist = true;
        }

        return sortByPriceExist;
      }
    ]);
  },
  getEndOfResults: (state, getters) => getters.endOfResults,
  getPage: state => state.page,
  getShowItemsLength: state => state.showItemsPerPage * state.page,
  getItemsToShow: (state, getters) =>
    getters.getItems.slice(0, getters.getShowItemsLength),
  getLoading: state => state.loading,
  getLoadingMore: state => state.loadingMore,
  getFiltered: state => state.filtered,
  getHotelRoomPrices: state => state.hotelRoomPrices,
  getHotelRoomPricesArray: state => Object.values(state.hotelRoomPrices)
};

const mutations = {
  setItems(state, payload) {
    state.items = payload;
    state.endOfResults = false;
  },
  increaseItems(state, payload) {
    const preLength = state.items.length;
    state.items = state.items.concat(payload);
    state.endOfResults = preLength === state.items.length;
  },
  setLoading(state, value) {
    state.loading = value;
  },
  setLoadingMore(state, value) {
    state.loadingMore = value;
  },
  setFiltered(state, value) {
    state.filtered = value;
  },
  increasePage(state) {
    state.page = state.page + 1;
  },
  resetPage(state) {
    state.page = 1;
  },
  updateHotelRoomPrices(state, { id, value }) {
    state.hotelRoomPrices = {
      ...state.hotelRoomPrices,
      [id]: value
    };
  }
};

const actions = {
  async getCardsContent({ commit, getters, rootGetters, dispatch }) {
    let mutationToCall = getters.getPage > 1 ? 'increaseItems' : 'setItems';
    let loadingSpinnerToCall =
      getters.getPage > 1 ? 'setLoadingMore' : 'setLoading';

    commit(loadingSpinnerToCall, true);

    let options = {
      type: rootGetters['home/getSelectedTabKey'],
      offset: getters.getPage - 1,
      corporationId: rootGetters['user/corporationId'],
      userId: rootGetters['user/userId'],
      activeTripId: rootGetters['user/activeTripId'],
      comingFromEmailML: rootGetters['user/comingFromEmailML'],
      ...rootGetters['filter/getSearchQueryOptions']
    };

    if (rootGetters['user/comingFromEmailML']) {
      dispatch('user/setComingFromEmailML', false, {
        root: true
      });
    }

    return suggest({
      apollo: apolloClient.defaultClient,
      ...options
    })
      .then(response => _get(response, 'data.suggest', {}))
      .then(response => {
        commit(mutationToCall, response);
        commit(loadingSpinnerToCall, false);

        dispatch('filter/setDistanceMinMaxRange', getters.getAllItems, {
          root: true
        });

        return response;
      })
      .catch(error => {
        commit(loadingSpinnerToCall, false);
        console.log(error);
      });
  },
  resetItems({ commit }) {
    commit('setItems', []);
    commit('resetPage');
  },
  handleViewMore({ getters, commit, dispatch }) {
    commit('increasePage');
    if (getters.getShowItemsLength > getters.getItemsToShow.length) {
      dispatch('getCardsContent');
    }
    logAmplitudeEvent(amplitudeEvents.destination.viewMoreHotels);
  },
  setNewHotelPrice({ rootGetters, commit }, hotel) {
    commit('updateHotelRoomPrices', {
      id: hotel.extId,
      value: {
        loading: true
      }
    });

    minimumHotelsPrices({
      apollo: apolloClient.defaultClient,
      hotelIds: hotel.extId.toString(),
      source: hotel.source,
      ...rootGetters['filter/getFilterQuery']
    })
      .then(response => _get(response, 'data.minimumHotelsPrices', {}))
      .then(response => {
        if (response) {
          const hotelRate = response.hotelMinimumRates[0];
          commit('updateHotelRoomPrices', {
            id: hotel.extId,
            value: {
              price:
                hotelRate.minimumRate > 0
                  ? Math.round(hotelRate.minimumRate)
                  : 'N/A',
              currency: hotelRate.minimumRate > 0 ? hotelRate.currency : '',
              loading: false
            }
          });
          // dispatch(
          //   'filter/setPriceMinMaxRange',
          //   getters.getHotelRoomPricesArray,
          //   {
          //     root: true
          //   }
          // );
        }
      })
      .catch(error => {
        console.warn(error);
        commit('updateHotelRoomPrices', {
          id: hotel.extId,
          value: {
            price: 'N/A',
            currency: '',
            loading: false
          }
        });
        return null;
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
