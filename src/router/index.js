import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import _get from 'lodash/get';
import apolloClient from '@/vue-apollo';
import decodeLink from '@/queries/decodeLink';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import { capitalizeDestination } from '@/utils/destination';
const Home = () => import('../views/Home.vue');
const Destination = () => import('../views/Destination.vue');
// const Profile = () => import('../views/Profile.vue');
const Details = () => import('../views/Details.vue');
// const Itinerary = () => import('../views/Itinerary.vue');
const Confirmation = () => import('../views/Confirmation.vue');
const CookiesView = () => import('../views/CookiesView');
const PrivacyView = () => import('../views/PrivacyView');
const TermsView = () => import('../views/TermsView');
const AcceptableUseView = () => import('../views/AcceptableUseView');
const Unsubscribe = () => import('../views/Unsubscribe');

Vue.use(VueRouter);

const routeParams = [
  {
    param: 'corporation_id',
    dispatch: 'user/setCorporationId',
    handler: param => param.toString(),
    delete: true
  },
  {
    param: 'active_trip_id',
    dispatch: 'user/setActiveTripId',
    handler: param => param.toString(),
    delete: true
  },
  {
    param: 'coming_from_email_ml',
    dispatch: 'user/setComingFromEmailML',
    delete: true
  },
  {
    param: 'destinationUnsubscribe',
    dispatch: 'user/setDestinationUnsubscribe',
    delete: true
  },
  {
    param: 'source',
    dispatch: 'detailsFilter/setSource'
  },
  {
    param: 'gdg_trip_id',
    delete: true
  },
  {
    param: 'freeCancellation',
    // dispatch: 'details/setFreeCancellation',
    delete: true
  },
  {
    param: 'freeBreakfast',
    // dispatch: 'details/setFreeBreakfast',
    delete: true
  },
  {
    param: 'contractedRateExists',
    // dispatch: 'details/setContractedRateExists',
    delete: true
  },
  {
    param: 'payAtHotel',
    // dispatch: 'details/setPayAtHotel',
    delete: true
  },
  {
    param: 'refundable',
    // dispatch: 'details/setRefundable',
    delete: true
  }
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/destination/:country?/:place?',
    name: 'destination',
    component: Destination,
    meta: { requiresUser: true }
  },
  {
    path: '/destination/:country?/:place?/:hotelId',
    name: 'details',
    component: Details,
    meta: { requiresUser: true }
  },
  {
    path: '/confirmation/:country?/:place?/:hotelId',
    name: 'confirmation',
    component: Confirmation,
    meta: { requiresUser: true }
  },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   component: Profile,
  //   meta: { requiresUser: true }
  // },
  // {
  //   path: '/itinerary',
  //   name: 'itinerary',
  //   component: Itinerary,
  //   meta: { requiresUser: true }
  // },
  {
    path: '/cookies-policy',
    name: 'cookies',
    component: CookiesView
  },
  {
    path: '/privacy-notice',
    name: 'privacy',
    component: PrivacyView
  },
  {
    path: '/terms-and-conditions',
    name: 'terms',
    component: TermsView
  },
  {
    path: '/acceptable-use-policy',
    name: 'acceptableUse',
    component: AcceptableUseView
  },
  {
    path: '/unsubscribe',
    name: 'unsubscribe',
    component: Unsubscribe,
    meta: { requiresUser: true }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const user = store.getters['user/user'];

  const requiresUser = to.matched.some(record => record.meta.requiresUser);

  let query = Object.assign({}, to.query);
  let params = Object.assign({}, to.params);

  if (query.mlt) {
    store.dispatch('destination/setDestinationInfoLoading', true);
    decodeLink({
      apollo: apolloClient.defaultClient,
      encodedLink: query.mlt
    })
      .then(response => _get(response, 'data.decodeLink.decodedValue', {}))
      .then(response => {
        if (response.startDate && response.endDate) {
          store.dispatch('filter/setTopFiltersValues', {
            dates: [response.startDate, response.endDate],
            guests: 1
          });
        }

        routeParams.map(item => {
          if (response[item.param] && item.dispatch) {
            store.dispatch(
              item.dispatch,
              item.handler
                ? item.handler(response[item.param])
                : response[item.param]
            );
          }
        });

        if (response.coming_from_email_ml) {
          logAmplitudeEvent(amplitudeEvents.email.seeMore, {
            destination: `${response.destination}, ${response.country}`
          });
        }

        if (response.destination) {
          store.dispatch('destination/setDestination', {
            searchTerm: `${response.destination}, ${response.country}`,
            types: 'place'
          });
        }

        if (response.lng && response.lat) {
          store.dispatch('filter/setCoordinates', [response.lng, response.lat]);
          store.dispatch('hotels/getCardsContent');
        }

        if (
          response.uid ||
          (response.dummyUid && JSON.parse(process.env.VUE_APP_TEST_USER))
        ) {
          if (response.dummyUid === process.env.VUE_APP_TEST_USER_UID) {
            store.dispatch('user/setTestUser');
            next();
          } else {
            store
              .dispatch('user/fetchUser', response.uid.toString())
              .then(() => {
                next();
              })
              .catch(error => {
                console.log(error);
                next('/');
              });
          }
        } else {
          store.dispatch('user/clearUser');
          console.log('No User Id');
          delete query.mlt;
          next({ name: to.name, params: to.params, query: query });
        }
      });
  } else if (query.uid) {
    if (user && query.uid !== user.userId) {
      store.dispatch('user/clearUser');
    }
    store.dispatch('user/fetchUser', query.uid.toString()).then(() => {
      delete query.uid;
      next({ name: to.name, params: to.params, query: query });
    });
  } else if (query.dummyUid && JSON.parse(process.env.VUE_APP_TEST_USER)) {
    if (user && query.dummyUid !== user.userId) {
      store.dispatch('user/clearUser');
    }

    if (query.dummyUid === process.env.VUE_APP_TEST_USER_UID) {
      store.dispatch('user/setTestUser');
      delete query.dummyUid;
      next({ name: to.name, params: to.params, query: query });
    }
  } else if (requiresUser && !user) {
    next('/');
  } else if (query.index) {
    const destination = `${capitalizeDestination(
      params.country
    )} ${capitalizeDestination(params.place)}`;
    logAmplitudeEvent('Book Now' + query.index, {
      destination: destination,
      optionPosition: query.index
    });
    delete query.index;
    next({ name: to.name, params: to.params, query: query });
  } else {
    let updateRoute = false;

    routeParams.map(item => {
      if (query[item.param]) {
        if (item.dispatch) {
          store.dispatch(item.dispatch, query[item.param].toString());
        }
        if (item.delete) {
          delete query[item.param];
          updateRoute = true;
        }
      }
    });

    if (updateRoute) {
      next({ name: to.name, params: to.params, query: query });
      updateRoute = false;
    } else next();
  }
});

export default router;
