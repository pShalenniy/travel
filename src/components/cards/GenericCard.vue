<template>
  <router-link
    :to="getRouterLink"
    :disabled="isPriceNA"
    target="_blank"
    rel="noopener noreferrer"
  >
    <v-hover v-slot:default="{ vHover }" open-delay="5">
      <v-card
        class="card"
        :class="{ active, disabled: isPriceNA }"
        :elevation="(vHover || hover) && !isPriceNA ? 12 : 0"
      >
        <div class="card__img">
          <v-img :src="getImage" height="244"></v-img>
          <v-chip
            class="card__label d-none"
            color="secondary"
            v-if="isPopularWithColleagues"
          >
            Popular with Colleagues
          </v-chip>
          <v-chip class="card__rating d-none" color="white">
            <v-icon size="20" color="primary">
              mdi-map-marker
            </v-icon>
            <span>{{ getRating }}</span>
          </v-chip>
          <v-btn
            icon
            color="white"
            class="card__like d-none"
            large
            @click="likeHandle"
          >
            <v-icon size="24">
              mdi-heart-outline
            </v-icon>
          </v-btn>
          <v-btn
            icon
            color="white"
            class="card__unlike d-none"
            large
            @click="downVoteHandle"
          >
            <v-icon size="24">
              mdi-thumb-down-outline
            </v-icon>
          </v-btn>
        </div>
        <div class="card__body--wrapper">
          <div class="card__body">
            <h3 class="card__title">
              {{ data.name }}
            </h3>
            <div class="card__sub-title" :title="`${data.rating} Star`">
              <v-icon
                v-for="index in data.rating"
                :key="index"
                color="orange"
                small
              >
                mdi-star
              </v-icon>
            </div>
            <div v-if="noActions" class="card__info">
              <price
                v-if="getPrice && !getPrice.loading && getPrice.price"
                :price="getPrice.price"
                :total="data.totalPrice"
                class="card__price"
                :currency="getPrice.currency || ''"
              ></price>

              <v-progress-circular
                v-if="getPrice && getPrice.loading"
                indeterminate
                size="24"
                width="3"
                rotate="25"
                color="grey darken-4"
                class="card__price"
              ></v-progress-circular>
            </div>
            <div v-if="!noActions" class="card__activity">
              <v-btn color="primary" depressed rounded @click="requestHandle">
                Request
              </v-btn>
              <div v-if="data.freeCancellation" class="card__free-cancellation">
                Includes Free Cancellation
              </div>
              <price
                v-if="getPrice && !getPrice.loading && getPrice.price"
                :price="getPrice.price"
                class="card__price"
                :currency="getPrice.currency || ''"
              ></price>
              <v-progress-circular
                v-if="getPrice && getPrice.loading"
                indeterminate
                size="24"
                width="3"
                rotate="25"
                color="grey darken-4"
                class="card__price"
              ></v-progress-circular>
            </div>
          </div>
        </div>
      </v-card>
    </v-hover>
  </router-link>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';

export default {
  name: 'GenericCard',
  props: {
    data: {
      type: [Object, null]
    },
    active: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    noActions: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('destination', ['destinationInfo']),
    ...mapGetters('filter', ['getFilterState']),
    ...mapGetters('hotels', {
      getHotelRoomPrices: 'getHotelRoomPrices'
    }),
    getRouterLink() {
      return {
        name: 'details',
        params: {
          ...this.$route.params,
          hotelId: this.data.extId
        },
        query: {
          ...this.$route.query,
          source: this.data.source,
          checkin: this.getFilterState.dates[0],
          checkout: this.getFilterState.dates[1]
          // guests: this.getFilterState.guests
        }
      };
    },
    getImage() {
      return this.data.thumbnailUrl || '/card_placeholder.png';
    },
    getPrice() {
      return this.getHotelRoomPrices[this.data.extId] || {};
    },
    isPriceNA() {
      return (
        this.getPrice && !this.getPrice.loading && this.getPrice.price === 'N/A'
      );
    },
    getRating() {
      let rating = this.data.rating || 4.9;
      let multiplier = rating >= 1 ? 1 : 100;
      return Math.round(rating * multiplier).toFixed(1);
    },
    isPopularWithColleagues() {
      return this.data.popularWithColleagues;
    }
  },
  methods: {
    ...mapActions('hotels', { setNewHotelPrice: 'setNewHotelPrice' }),
    likeHandle(e) {
      e.preventDefault();
      console.log('like');
    },
    downVoteHandle(e) {
      e.preventDefault();
      console.log('down vote');
    },
    requestHandle(e) {
      e.stopPropagation();
      e.preventDefault();
      const routeData = this.$router.resolve(this.getRouterLink);
      window.open(routeData.href, '_blank');
      console.log('booked');
      logAmplitudeEvent(amplitudeEvents.destination.chooseHotel, {
        hotelName: this.data.name,
        hotelId: this.data.extId,
        hotelStarRating: this.data.rating,
        hotelLatLon: `${this.data.lat}, ${this.data.lng}`,
        hotelDisplayPrice: this.data.price,
        hotelDisplayCurrency: this.data.currencyName,
        hotelCity: this.destinationInfo.text,
        hotelSource: this.data.source
      });
    }
  },
  created() {
    this.setNewHotelPrice(this.data);
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.v-card {
  &.card {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    &.active {
      border-color: $primary;
    }
    &.disabled {
      filter: grayscale(1);
      pointer-events: none;
    }
  }
}
.card {
  &__img {
    position: relative;
  }
  &__body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: 100%;
    &--wrapper {
      flex-basis: 0;
      flex-grow: 1;
    }
  }
  &__label {
    position: absolute;
    left: 8px;
    top: 8px;
  }
  &__rating {
    position: absolute;
    right: 8px;
    top: 8px;
    font-size: 14px;
    line-height: 19px;
    font-weight: bold;
    padding: 0 8px 0 4px;
    border: 1px solid $border;
    span {
      color: $primary;
    }
  }
  &__like {
    position: absolute;
    left: 8px;
    bottom: 8px;
    background-color: rgba($text, 0.5);
  }
  &__unlike {
    position: absolute;
    right: 8px;
    bottom: 8px;
    background-color: rgba($text, 0.5);
  }
  &__title {
    font-size: 24px;
    line-height: 32px;
    font-weight: 800;
    @include text-overflow(2);
    max-height: 64px;
  }
  &__sub-title {
    font-size: 18px;
    line-height: 24px;
    color: $light;
    @include text-overflow(2);
    max-height: 48px;
    margin-bottom: 4px;
    margin-top: auto;
  }
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }
  &__price {
    align-self: flex-end;
    margin-left: auto;
  }
  &__caption {
    font-size: 14px;
    line-height: 19px;
  }
  &__activity {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  &__free-cancellation {
    position: absolute;
    right: 0;
    color: $primary;
    top: -5px;
    font-size: 12px;
  }
  @include query-1199 {
    &__title {
      font-size: 20px;
      line-height: 24px;
      max-height: 48px;
    }
  }
}
</style>
