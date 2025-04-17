<template>
  <v-container class="confirmation">
    <div v-if="getHotelDetails" class="confirmation__top">
      <h1 class="confirmation__title" data-test="confirmation-title">
        Thanks, request sent.
      </h1>
      <div class="confirmation__text">
        <p>
          Your reservation request for
          <strong>{{ getHotelDetails.name }}</strong> in
          <strong>{{ getCity }}</strong> checking in on
          <strong>{{ getDatesFormatted[0] }}</strong> and checking out on
          <strong>{{ getDatesFormatted[1] }}</strong>
          has been sent to our team.
        </p>

        <p>
          Once your booking is confirmed, we will send a confirmation email to:
          <strong>{{ user.email }}</strong>
        </p>
      </div>
      <generic-card
        class="confirmation__card"
        no-actions
        :data="getCardDetails"
      ></generic-card>
      <div class="confirmation__check">
        Check out more about {{ getCity }} below.
      </div>
    </div>

    <hr />

    <v-row v-if="getPlaceInfo" class="confirmation__place">
      <v-col v-if="isPlaceInfo" cols="12" sm="6" lg="5">
        <h2>
          About your trip to
          <span class="text-primary">{{ getPlaceInfo.name }}</span>
        </h2>
        <p>
          {{ getPlaceInfo.description }}
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="5"
        class="ml-auto"
        :class="{ 'mr-auto': !isPlaceInfo }"
      >
        <custom-map
          :center="getPlaceCenter"
          :zoom="11"
          center-marker
          circle-marker
          class="confirmation__map"
        ></custom-map>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import GenericCard from '@/components/cards/GenericCard';
import CustomMap from '@/components/elements/map/CustomMap';
import { viewDate } from '@/utils/date';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';

export default {
  name: 'Confirmation',
  components: {
    GenericCard,
    CustomMap
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('details', [
      'getHotelDetails',
      'getPlaceLoadOptions',
      'getPlaceInfo',
      'getCity'
    ]),
    ...mapGetters('detailsFilter', [
      'getDates',
      'getTotalPrice',
      'getChosenRoomPrice'
    ]),
    getPlaceCenter() {
      return [this.getPlaceInfo.longitude, this.getPlaceInfo.latitude];
    },
    getHotelCoordinates() {
      return [this.getHotelDetails.lng, this.getHotelDetails.lat];
    },
    getCardDetails() {
      return {
        ...this.getHotelDetails,
        totalPrice: this.getTotalPrice,
        price: this.getChosenRoomPrice
      };
    },
    getDatesFormatted() {
      return [
        moment(this.getDates[0]).format(viewDate),
        moment(this.getDates[1]).format(viewDate)
      ];
    },
    isPlaceInfo() {
      return this.getPlaceInfo.name && this.getPlaceInfo.description;
    }
  },
  methods: {
    ...mapActions('details', {
      loadHotelDetails: 'loadHotelDetails',
      setCity: 'setCity'
    }),
    ...mapActions('detailsFilter', ['setDetailsFiltersValues', 'setChosenRoom'])
  },
  created() {
    logAmplitudeEvent(amplitudeEvents.staticPages.viewConfirmationPage);
    if (!this.getHotelDetails) {
      this.setDetailsFiltersValues(this.$route.query);
      this.setCity(decodeURI(this.$route.params.place));
      this.loadHotelDetails({
        ...this.$route.params,
        source: this.$route.query.source
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.confirmation {
  padding-top: 80px;
  padding-bottom: 80px;
  &__top {
    text-align: center;
  }
  &__title {
    font-size: 32px;
    line-height: 33px;
    font-weight: 900;
    margin-bottom: 16px;
    color: #000;
  }
  &__text {
    font-size: 18px;
    line-height: 24px;
    width: 580px;
    max-width: 100%;
    margin: 0 auto 48px;
    strong {
      font-weight: 800;
    }
  }
  &__card {
    display: flex;
    width: 350px;
    max-width: 100%;
    margin: 0 auto;
  }
  &__check {
    margin-top: 40px;
    color: $light;
  }
  &__place {
    h2 {
      margin-bottom: 16px;
      font-size: 32px;
      line-height: 33px;
    }
    p {
      font-size: 18px;
      line-height: 24px;
      margin: 0;
    }
  }
  &__map {
    min-height: 200px;
    height: 100%;
  }
  hr {
    margin: 60px 0;
  }
  @include query-767 {
    padding-top: 40px;
    padding-bottom: 40px;
    hr {
      margin: 40px 0;
    }
  }
}
</style>
