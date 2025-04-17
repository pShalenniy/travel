import Vue from 'vue';
import router from '@/router';
import { createNamespacedHelpers } from 'vuex';
import apolloClient from '@/vue-apollo';
import AES256 from 'aes-everywhere';
import availableRoomsInfo from '@/queries/availableRoomsInfo';
import fetchAboutPlace from '@/queries/fetchAboutPlace';
import fetchHotel from '@/queries/fetchHotel';
import checkoutCart from '@/mutations/checkoutCart';
import _get from 'lodash/get';
import _union from 'lodash/union';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import { getDecryptedValue, storeEncryptedValue } from '@/utils/crypto';
import { getLengthKm } from '@/utils/mapUtils';
import { capitalizeDestination } from '@/utils/destination';
import { getRoomsBooking, getRoomsZentrumhub } from '@/utils/roomsAvailable';
import { connectors } from '@/utils/connectors';

export const namespacedHelper = createNamespacedHelpers('details');

const policyIcons = {
  POLICY_HOTEL_GROUPS: 'mdi-account-multiple',
  POLICY_HOTEL_INTERNET: 'mdi-wifi',
  POLICY_HOTEL_PARKING: 'mdi-car',
  POLICY_HOTEL_PETS: 'mdi-paw',
  POLICY_CHILDREN: 'mdi-human-child'
};

const state = {
  selectedTabKey: 'overview',
  loading: false,
  currency: null,
  city: null,
  hotelDetails: null,
  hotelRoomsAvailable: [],
  placeInfo: null,
  checkoutInfo: null,
  roomsLoading: false,
  sendingRequest: false
};

const getters = {
  getCheckoutInfo: state => {
    return getDecryptedValue(
      state.checkoutInfo || Vue.localStorage.get('CHECKOUT_INFO')
    );
  },
  getCurrency(state) {
    return state.currency;
  },
  getSelectedTabKey(state) {
    return state.selectedTabKey;
  },
  getHotelDetails(state) {
    return state.hotelDetails;
  },
  getHotelDetailsInfo(state) {
    if (!state.hotelDetails) {
      return null;
    }

    let decryptedHotelInfo = AES256.decrypt(
      state.hotelDetails.jsonDetailedInfo,
      process.env.VUE_APP_GRAPHQL_ATTR_ENC_KEY
    ).toString();
    return JSON.parse(decryptedHotelInfo);
  },
  getHotelRooms(state) {
    if (!state.hotelDetails) {
      return null;
    }

    let decryptedHotelInfo = AES256.decrypt(
      state.hotelDetails.jsonDetailedInfo,
      process.env.VUE_APP_GRAPHQL_ATTR_ENC_KEY
    ).toString();
    return JSON.parse(decryptedHotelInfo).room_data;
  },
  getHotelRoomsAvailable(state) {
    return state.hotelRoomsAvailable;
  },
  getPlaceInfo(state) {
    return state.placeInfo;
  },
  getPlaceCenter(state) {
    if (
      state.placeInfo &&
      state.placeInfo.longitude &&
      state.placeInfo.latitude
    ) {
      return [state.placeInfo.longitude, state.placeInfo.latitude];
    }

    return false;
  },
  getPlaceFacilities(state, getters) {
    if (!state.placeInfo) {
      return null;
    }

    const lengthKm = getLengthKm(
      getters.getPlaceCenter,
      getters.getHotelMapCenter
    );

    return [
      {
        icon: 'mdi-map-marker',
        title: `<strong>${lengthKm}</strong> kilometers from hotel to <strong>${getters.getCity}</strong> city center`
      }
    ];
  },
  getName(state) {
    if (!state.hotelDetails) {
      return '';
    }
    return state.hotelDetails.name;
  },
  getCity(state) {
    return state.city ? capitalizeDestination(state.city) : null;
  },
  getRating(state, getters) {
    if (!state.hotelDetails) {
      return '';
    }
    return state.hotelDetails.rating || getters.getHotelDetailsInfo.class;
  },
  getDescription(state) {
    if (state.hotelDetails && state.hotelDetails.shortDescription) {
      return state.hotelDetails.shortDescription;
    }

    return '';
  },
  getHotelAddress(state /*, getters*/) {
    if (!state.hotelDetails) {
      return '';
    }
    return state.hotelDetails.address;
  },
  getHotelMapCenter(state /*, getters*/) {
    if (!state.hotelDetails) {
      return '';
    }
    //const location = getters.hotelDetails.location;
    return [state.hotelDetails.lng, state.hotelDetails.lat];
  },
  getPlaceLoadOptions(state, getters) {
    return {
      place: getters.getCity,
      lat: state.hotelDetails.lat,
      lng: state.hotelDetails.lng
    };
  },
  getMasonry(state /*, getters*/) {
    const images = JSON.parse(JSON.stringify(state.hotelDetails.pictures));
    let hotelImages = [];
    let roomImages = [];

    if (state.hotelDetails.source === connectors.zentrumhub) {
      const standardSizedImages = images.filter(
        res => res['size'] === 'Standard'
      );
      hotelImages = standardSizedImages.map(item => item.url);
    } else {
      hotelImages = images.map(item => item.url_original);
    }

    let imagesLength = hotelImages.length;

    if (imagesLength > 4) {
      return hotelImages;
    }

    // const roomImages = getters.getHotelRooms
    //   .filter(item => {
    //     let images = imagesLength;
    //     if (item.room_photos) {
    //       imagesLength += item.room_photos.length;
    //     }
    //     return images < 5;
    //   })
    //   .map(item => {
    //     return item.room_photos.map(item => item.url_original);
    //   })
    //   .flat();

    return _union(hotelImages, roomImages);
  },
  getGallery(state) {
    const images = JSON.parse(JSON.stringify(state.hotelDetails.pictures));
    const XLSizedImages = images.filter(res => res['size'] === 'Xl');

    return XLSizedImages.map(item => ({
      src: item.url,
      thumb: item.url,
      caption: ''
    }));
  },
  getHotelAmplitudeOptions(state /*, getters*/) {
    if (!state.hotelDetails) {
      return '';
    }

    return {
      hotelName: state.hotelDetails.name,
      hotelStarRating: state.hotelDetails.rating,
      hotelCoordinatesLonLat: [
        state.hotelDetails.lng,
        state.hotelDetails.lat
      ].join(', '),
      hotelChainId: state.hotelDetails.id,
      hotelId: state.hotelDetails.extId,
      hotelCity: state.hotelDetails.city,
      hotelSource: state.hotelDetails.source
    };
  },
  isRoomExist: (state, getters) => chosenRoom => {
    if (getters.getHotelRoomsAvailable.length === 0 || !chosenRoom) {
      return false;
    }

    return (
      getters.getHotelRoomsAvailable.filter(item => {
        return !!item.rooms.find(
          room =>
            (room.id || room.block_id) ===
            (chosenRoom.selectedType.id || chosenRoom.selectedType.block_id)
        );
      }).length > 0
    );
  },
  getRoomsLoading: state => state.roomsLoading,
  getSendingRequest: state => state.sendingRequest,
  getThingsToKnow(state, getters) {
    if (
      !state.hotelDetails ||
      state.hotelDetails.source === connectors.zentrumhub
    ) {
      console.log(getters.getHotelDetailsInfo);
      return '';
    }

    const checkOptions =
      getters.getHotelDetailsInfo.hotel_data.checkin_checkout_times;

    const policies = getters.getHotelDetailsInfo.hotel_data.hotel_policies.map(
      item => ({
        icon: policyIcons[item.type],
        title: item.content
      })
    );

    return [
      {
        icon: 'mdi-clock-outline',
        title: `Check in: From <strong>${checkOptions.checkin_from}</strong>`
      },
      {
        icon: 'mdi-clock-outline',
        title: `Check out: By <strong>${checkOptions.checkout_to}</strong>`
      },
      ...policies
    ];
  }
};

const mutations = {
  updateCity(state, payload) {
    state.city = payload;
  },
  updateCurrency(state, payload) {
    state.currency = payload;
  },
  updateSelectedTabKey(state, payload) {
    state.selectedTabKey = payload;
  },
  setHotelDetails(state, payload) {
    state.hotelDetails = payload;
  },
  updateHotelRoomsAvailable(state, payload) {
    state.hotelRoomsAvailable = payload;
  },
  setPlaceInfo(state, payload) {
    state.placeInfo = payload;
  },
  setLoading(state, value) {
    state.loading = value;
  },
  updateCheckoutInfo(state, payload) {
    state.checkoutInfo = storeEncryptedValue('CHECKOUT_INFO', payload);
  },
  updateSendingRequest(state, payload) {
    state.sendingRequest = payload;
  },
  setRoomsLoading(state, payload) {
    state.roomsLoading = payload;
  }
};

const actions = {
  setCity({ commit }, value) {
    commit('updateCity', value);
  },
  setSelectedKey({ commit }, selectedTabKey) {
    commit('updateSelectedTabKey', selectedTabKey);
  },
  loadPlaceInfo({ commit }, options) {
    fetchAboutPlace({
      apollo: apolloClient.defaultClient,
      ...options
    })
      .then(response => _get(response, 'data.fetchInfoAbout', {}))
      .then(response => {
        commit('setPlaceInfo', response);
      });
  },
  setHotelRoomsAvailable({ commit }, val) {
    commit('updateHotelRoomsAvailable', val);
  },
  async loadAvailableRooms(
    { getters, rootGetters, commit, dispatch },
    options
  ) {
    commit('setRoomsLoading', true);
    return availableRoomsInfo({
      apollo: apolloClient.defaultClient,
      ...options,
      hotelId: getters.getHotelDetails.extId,
      corporationId: rootGetters['user/corporationId'],
      userId: rootGetters['user/userId'],
      source: options.source
    })
      .then(response => _get(response, 'data.availableRoomsInfo', {}))
      .then(response => {
        let decrypted = AES256.decrypt(
          response.availableRoomsInfo,
          process.env.VUE_APP_GRAPHQL_ATTR_ENC_KEY
        ).toString();

        commit('updateCurrency', response.currency);
        commit('setRoomsLoading', false);

        let jsonParsedResult = JSON.parse(decrypted);

        if (options.source === connectors.zentrumhub) {
          dispatch(
            'setHotelRoomsAvailable',
            getRoomsZentrumhub(jsonParsedResult)
          );
          return getRoomsZentrumhub(jsonParsedResult);
        } else if (options.source === connectors.booking) {
          const rooms = getRoomsBooking(
            jsonParsedResult.result,
            getters.getHotelRooms
          );
          dispatch('setHotelRoomsAvailable', rooms);
          return rooms;
        }

        return false;
      })
      .catch(error => {
        commit('setRoomsLoading', false);
        console.warn(error);
      });
  },
  loadHotelDetails({ getters, rootGetters, commit, dispatch }, options) {
    commit('setLoading', true);
    return fetchHotel({
      apollo: apolloClient.defaultClient,
      hotelExtId: options.hotelId,
      tripId: rootGetters['user/activeTripId'],
      source: rootGetters['detailsFilter/getSource']
    })
      .then(response => _get(response, 'data.fetchHotel', {}))
      .then(response => {
        commit('setHotelDetails', response);
        commit('setLoading', false);
        dispatch('loadPlaceInfo', getters.getPlaceLoadOptions);
        logAmplitudeEvent(
          amplitudeEvents.hotelDetails.viewHotel,
          getters.getHotelAmplitudeOptions
        );
        if (response.hotelFacilities) {
          dispatch(
            'hotelDetails/setHotelFacilities',
            response.hotelFacilities,
            {
              root: true
            }
          );
        }
        return response;
      })
      .catch(error => {
        dispatch(
          'notifications/addNotification',
          {
            message:
              'The rate you requested is no longer available, so we’ve redirected you to the search results to find something new'
          },
          {
            root: true
          }
        );
        commit('setLoading', false);
        logAmplitudeEvent(amplitudeEvents.hotelDetails.noHotelById, {
          hotelExtId: options.hotelId
        });
        console.warn(error);
        let params = router.currentRoute.params;
        delete params.hotelId;

        router.push({
          name: 'destination',
          params: params,
          query: router.currentRoute.query
        });
      });
  },
  async reserveRoom({ getters, rootGetters, commit }) {
    commit('updateSendingRequest', true);

    const checkoutCard = {
      uid: rootGetters['user/user'].userId,
      tripId: rootGetters['user/activeTripId'],
      hotel: getters.getHotelAmplitudeOptions,
      room: rootGetters['detailsFilter/getCheckoutCartRoom'] && {
        ...rootGetters['detailsFilter/getCheckoutCartRoom'],
        costAllocationReference: rootGetters['user/getReference']
      },
      details: {
        ...rootGetters['detailsFilter/getDetailsFiltersValues'],
        ...rootGetters['detailsFilter/getDetailsFilterAmplitude']
      }
    };
    const encoded = btoa(
      unescape(encodeURIComponent(JSON.stringify(checkoutCard)))
    );

    if (
      JSON.parse(process.env.VUE_APP_TEST_USER) &&
      process.env.VUE_APP_TEST_USER_UID === rootGetters['user/user'].userId
    ) {
      await router.push({
        name: 'confirmation',
        params: router.currentRoute.params,
        query: router.currentRoute.query
      });

      return true;
    }

    return checkoutCart({
      apollo: apolloClient.defaultClient,
      jsonCart: encoded
    })
      .then(response => _get(response, 'data.checkoutCart', {}))
      .then(response => {
        commit('updateSendingRequest', false);
        if (!response.success) {
          console.log(response.errors);
          return false;
        }
        commit('updateCheckoutInfo', checkoutCard);
        commit('updateSendingRequest', false);
        router.push({
          name: 'confirmation',
          params: router.currentRoute.params,
          query: router.currentRoute.query
        });
        logAmplitudeEvent(amplitudeEvents.hotelDetailsCheckout.reserveRoom, {
          ...getters.getHotelAmplitudeOptions,
          ...rootGetters['detailsFilter/getChosenRoomAmplitude'],
          ...rootGetters['detailsFilter/getDetailsFilterAmplitude']
        });
        return response;
      })
      .catch(error => {
        commit('updateSendingRequest', false);
        console.log(error);
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
