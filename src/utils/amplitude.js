import store from '@/store';

export const amplitudeEvents = {
  authentication: {
    loginUser: 'login user',
    emailVerification: 'email verification',
    emailVerificationRetry: 'email verification retry',
    passwordSet: 'password set',
    userVerified: 'user verified'
  },
  staticPages: {
    viewPrivacy: 'view privacy policy page',
    viewTerms: 'view terms and conditions page',
    viewCookies: 'view cookies policy page',
    viewAcceptable: 'view acceptable use policy page',
    viewConfirmationPage: 'view request confirmation page'
  },
  home: {
    viewHomepage: 'view homepage',
    clickTripBooked: 'click trip booked',
    clickNewTo: 'click new to'
  },
  destination: {
    viewMoreHotelsInDestination: 'view hotels in destination',
    searchLocation: 'search location',
    searchLocationNoResults: 'search location no results',
    viewMoreHotels: 'view more hotels',
    viewMap: 'view map',
    clickHotelTile: 'click hotel tile',
    chooseHotel: 'choose hotel'
  },
  destinationFilters: {
    clickFilters: 'click filters',
    useStarFilter: 'use star filter',
    useAmenitiesFilter: 'use amenities filter',
    freeCancellation: 'use free cancellation filter',
    breakfastIncluded: 'use breakfast included filter',
    usePriceFilter: 'use price filter',
    useDistanceFromCenterFilter: 'use distance from center filter'
  },
  hotelDetails: {
    viewHotel: 'view hotel',
    noHotelById: 'no hotel by id',
    clickRoomsTab: 'click rooms tab',
    clickPhotosTab: 'click photos tab',
    clickFacilitiesTab: 'click facilities tab',
    viewMoreFacilities: 'view more facilities',
    viewMoreRooms: 'view more rooms',
    viewMoreRoomDetails: 'view more details for room',
    viewMoreLocationDetails: 'view more about the location',
    showMoreHotelDescription: 'show more hotel description',
    detailsBreadcrumbClick: 'details breadcrumb click',
    detailsSearchWidgetClick: 'details search widget click'
  },
  hotelDetailsCheckout: {
    addRoomToBasket: 'add room to basket',
    removeRoomFromBasket: 'remove room from basket',
    reserveRoom: 'reserve room',
    changeDates: 'change dates'
  },
  subscribe: {
    userUnsubscribed: 'user unsubscribed',
    userClicksResubscribe: 'user clicks resubscribe'
  },
  cookies: {
    closeCookieWidget: 'close cookie widget'
  },
  email: {
    bookNow1: 'Book Now 1',
    bookNow2: 'Book Now 2',
    bookNow3: 'Book Now 3',
    bookNow4: 'Book Now 4',
    seeMore: 'See More'
  }
};

const getAmplitudeOptions = (event, options) => {
  const amOptions = store.getters['user/activeTripId']
    ? {
        ...options,
        tripId: store.getters['user/activeTripId']
      }
    : options;

  return {
    event_name: event,
    event_properties: {
      ...amOptions,
      tmc: 'GDG travel'
    }
  };
};

export const logAmplitudeEvent = (event, options = null) => {
  store.dispatch(
    'cookies/logAmplitudeEvent',
    getAmplitudeOptions(event, options)
  );
};
