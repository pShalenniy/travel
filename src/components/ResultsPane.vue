<template>
  <div class="results">
    <div class="results__title">
      <h2 v-if="!isHeadingLoading" v-html="getCaptionForPanel()"></h2>
    </div>
    <destination-heading v-if="!isHeadingLoading">
      <v-btn
        v-if="!getEndOfResults && isMap"
        color="primary"
        class="ml-auto mr-2"
        text
        :loading="getLoadingMore"
        :disabled="getCardsLoading"
        @click="handleViewMore()"
      >
        View more
      </v-btn>
    </destination-heading>
    <div v-if="getCardsLoading" class="row-loading">
      <v-progress-circular
        indeterminate
        width="5"
        rotate="25"
        color="grey darken-4"
      ></v-progress-circular>
    </div>
    <div v-else class="results-row">
      <v-row>
        <v-col :md="isMap ? 4 : 12" :sm="isMap ? 6 : 12" cols="12">
          <v-row>
            <v-col
              v-for="(item, i) in getItemsToShow"
              :key="item.extId + ' ' + i"
              :md="isMap ? 12 : 4"
              :sm="isMap ? 12 : 6"
              cols="12"
            >
              <!--<food-and-drink-card
                :data="item"
                v-if="getSelectedTabKey === 'restaurants'"
              ></food-and-drink-card>
              <car-rental-card
                :data="item"
                v-if="getSelectedTabKey === 'transport'"
              >
              </car-rental-card>-->
              <generic-card
                v-if="getSelectedTabKey !== 'restaurants'"
                data-test="destination-results-card"
                class="results-row__link"
                :data="item"
                :active="isActiveCard(item.extId)"
                :hover="isHoverCard(item.extId)"
                :id="item.extId"
                @mouseover.native="setHoverCard(item.extId)"
                @mouseleave.native="setHoverCard()"
                @click.native="hotelTileClick(item)"
              ></generic-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="isMap" class="results__map">
          <custom-map
            data-test="destination-map"
            class="results__mapbox"
            :center="centerMapPoint"
            :zoom="11"
            :markers-bounds="getMarkersBounds"
          >
            <div
              v-for="(item, i) in getItemsToShow"
              :key="item.extId + ' ' + i"
              :class="{ active: isActiveCard(item.extId) }"
            >
              <mgl-marker :coordinates="[item.lng, item.lat]" anchor="bottom">
                <div
                  slot="marker"
                  @mouseover="setHoverCard(item.extId)"
                  @mouseleave="setHoverCard()"
                  @click="setActiveCard($event, item.extId)"
                >
                  <map-marker
                    data-test="destination-map-pin"
                    :id="'hotel-marker-' + item.extId"
                    :price="getMarkerPrice(item)"
                  ></map-marker>
                </div>
              </mgl-marker>
            </div>
          </custom-map>
        </v-col>
      </v-row>
    </div>
    <div
      v-if="!getCardsLoading && getItemsToShow.length > 0"
      class="d-flex align-center mt-4 col-12 pa-0"
    >
      <div>
        *Includes taxes & fees
      </div>
      <v-btn
        v-if="!getEndOfResults && !isMap"
        color="primary"
        class="ml-auto"
        text
        :loading="getLoadingMore"
        @click="handleViewMore()"
      >
        View more
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import DestinationHeading from '@/components/destination/DestinationHeading';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import { getMapBounds, getCenterBounds } from '@/utils/map';
import { getCaptionForTab } from '@/utils/destination';
import { connectors } from '@/utils/connectors';

export default {
  name: 'ResultsPane',
  components: {
    DestinationHeading,
    GenericCard: () => import('@/components/cards/GenericCard'),
    // FoodAndDrinkCard: () => import('@/components/cards/FoodAndDrinkCard'),
    // CarRentalCard: () => import('@/components/cards/CarRentalCard'),
    MglMarker: () => import('vue-mapbox/src/components/UI/Marker'),
    CustomMap: () => import('@/components/elements/map/CustomMap'),
    MapMarker: () => import('@/components/elements/map/MapMarker')
  },
  data() {
    return {
      activeCardId: null,
      hoverCardId: null
    };
  },
  computed: {
    ...mapState('destination', ['isMap', 'destinationInfoLoading']),
    ...mapGetters('home', ['getSelectedTabKey']),
    ...mapGetters('hotels', {
      getItemsToShow: 'getItemsToShow',
      getLoading: 'getLoading',
      getEndOfResults: 'getEndOfResults',
      getCardsLoading: 'getLoading',
      getLoadingMore: 'getLoadingMore',
      getFiltered: 'getFiltered',
      getHotelRoomPrices: 'getHotelRoomPrices'
    }),
    ...mapGetters('destination', ['getDestinationInfoPlace']),
    ...mapGetters('filter', ['getMoreFilter', 'getMoreFilterActive']),
    getMarkersBounds() {
      return getMapBounds(this.getItemsToShow);
    },
    centerMapPoint() {
      return getCenterBounds(this.getMarkersBounds);
    },
    isHeadingLoading() {
      return this.destinationInfoLoading || this.getLoading;
    }
  },
  methods: {
    ...mapActions('hotels', {
      getCardsContent: 'getCardsContent',
      handleViewMore: 'handleViewMore'
    }),
    ...mapActions('destination', ['toggleMap']),
    getCaptionForPanel() {
      if (this.getItemsToShow.length > 0 || this.getCardsLoading) {
        return getCaptionForTab(
          this.getSelectedTabKey,
          this.getDestinationInfoPlace
        );
      }

      if (this.getMoreFilterActive) {
        return 'Sorry, we couldn’t find any results. Try adjusting your filter.';
      }

      return 'Sorry, we couldn’t find any results. Try adjusting your search.';
    },
    isActiveCard(id) {
      return id === this.activeCardId;
    },
    isHoverCard(id) {
      return id === this.hoverCardId;
    },
    setHoverCard(id = null) {
      Array.from(
        document.querySelectorAll('.mapboxgl-marker.hover')
      ).forEach(el => el.classList.remove('hover'));

      if (id) {
        const marker = document.getElementById('hotel-marker-' + id);

        if (marker) {
          marker.closest('.mapboxgl-marker').classList.add('hover');
        }
      }

      if (this.hoverCardId !== id) {
        this.hoverCardId = id;
      }
    },
    setActiveCard(e, id = null) {
      Array.from(
        document.querySelectorAll('.mapboxgl-marker.active')
      ).forEach(el => el.classList.remove('active'));

      if (id) {
        const elementById = document.getElementById(id);
        window.scrollTo(0, elementById.offsetTop - 72);
        e.target.closest('.mapboxgl-marker').classList.add('active');
      }

      this.activeCardId = this.activeCardId === id ? null : id;
    },
    getMarkerPrice(hotel) {
      if (hotel.source === connectors.zentrumhub) {
        const hotelRate = this.getHotelRoomPrices[hotel.extId];
        if (!hotelRate || !hotelRate.price) {
          return null;
        }
        return `${hotelRate.currency}${hotelRate.price}`;
      }

      return `${hotel.currency}${Math.round(hotel.price)}`;
    },
    hotelTileClick(hotel) {
      logAmplitudeEvent(amplitudeEvents.destination.clickHotelTile, {
        hotelName: hotel.name,
        hotelStarRating: hotel.rating,
        hotelChainId: hotel.id,
        hotelId: hotel.extId,
        hotelDisplayPrice: this.getMarkerPrice(hotel),
        hotelDisplayCurrency: hotel.currencyName,
        hotelCity: this.getDestinationInfoPlace,
        hotelSource: hotel.source
      });
    }
  },
  created() {
    if (!this.getItemsToShow.length && !this.getCardsLoading) {
      this.getCardsContent();
    }
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.mapboxgl-map {
  width: 100%;
  height: 100%;
}
.row-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  width: 100%;
}
.results {
  display: flex;
  flex-wrap: wrap;
  padding-top: 44px;
  &__title {
    margin-right: auto;
    flex-basis: 0;
    flex-grow: 1;
    background-color: #fff;
  }
  &-row {
    width: 100%;

    &__link {
      display: block;
      height: 100%;
      &[disabled] {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }
  &__map {
    position: sticky;
    top: 132px;
    align-self: flex-start;
    border-radius: 10px;
    overflow: hidden;

    .results__mapbox.mapbox {
      background-color: $light;
      height: calc(100vh - 120px - #{$header-height});
    }
  }
  @include queryMin(768px) {
    &__title {
      margin-left: -25px;
      padding-left: 25px;
      position: sticky;
      top: $header-height;
      z-index: 6;
      display: flex;
      align-items: center;
      padding-right: 16px;

      .text-primary {
        margin-left: 7px;
      }
    }
  }
  @include query-991 {
    h2 {
      font-size: 18px;
      line-height: 24px;
    }
  }
  @include query-767 {
    padding-top: 32px;
    h2 {
      font-size: 18px;
      margin-bottom: 4px;
      width: 100%;
      line-height: 24px;
    }
  }
}
</style>
