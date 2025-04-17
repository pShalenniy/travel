<template>
  <div>
    <transition :name="filterAnimationSlide ? 'slade-top' : 'fade-bottom'">
      <div v-if="isFilterOpen" class="destination-filter">
        <v-container>
          <v-row justify="center" align="center" no-gutters>
            <v-col cols="12" sm="5" lg="4">
              <search-destination
                v-model="destinationModel"
                data-test="destination-filter-location"
                outlined
                label="Destination"
                prepend-inner-icon="mdi-map-marker-outline"
              ></search-destination>
            </v-col>
            <v-col cols="12" sm="auto">
              <div class="destination-filter__dates">
                <date-filter
                  v-model="form.dates"
                  :value="[]"
                  label="Check in - Check out"
                ></date-filter>
              </div>
            </v-col>
            <v-col cols="12" sm="auto">
              <v-tooltip bottom :open-on-click="true">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.guests"
                    outlined
                    readonly
                    prepend-inner-icon="mdi-account"
                    label="Guests"
                    class="destination-filter__guests"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <span>
                  We currently only support bookings for one guest
                </span>
              </v-tooltip>
            </v-col>
            <v-col cols="12" sm="auto">
              <v-btn
                data-test="destination-filter-submit"
                rounded
                color="text"
                large
                :disabled.sync="disabledSearch"
                @click="updateSelectedTabKey()"
              >
                <v-icon class="mr-2">mdi-magnify</v-icon>
                Search
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="isFilterOpen"
        class="backdrop"
        @click="toggleFilter(false)"
      ></div>
    </transition>
  </div>
</template>

<script>
import DateFilter from '@/components/filters/DateFilter';
import { mapState, mapGetters, mapActions } from 'vuex';
import SearchDestination from '@/components/destination/SearchDestination';
import {
  extractPlaceDestination,
  getNavigateToDestinationParams
} from '@/utils/destinationSearchUtils';
import _isEqual from 'lodash/isEqual';
import { getNights } from '@/utils/date';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import router from '@/router';

export default {
  name: 'DestinationFilters',
  components: {
    SearchDestination,
    DateFilter
  },
  data: () => ({
    destinationInfo: null,
    form: {
      destination: '',
      coordinates: [],
      dates: [],
      guests: ''
    },
    guestsItems: ['1', '2', '3', '4', '5', '6', '7']
  }),
  computed: {
    ...mapState('home', ['selectedTabKey']),
    ...mapState('destination', ['isFilterOpen', 'filterAnimationSlide']),
    ...mapState('filter', ['dates', 'coordinates', 'guests']),
    ...mapGetters('filter', ['getSearchAmplitudeOptions', 'getFilterQuery']),
    ...mapGetters('destination', [
      'getDestinationFilterText',
      'getDestinationInfo'
    ]),
    destinationModel: {
      get() {
        return this.destinationInfo;
      },
      set(value) {
        this.destinationInfo = value;
        this.form.destination = extractPlaceDestination(value);

        if (value.center) {
          this.form.coordinates = value.center;
        }
      }
    },
    disabledSearch() {
      return (
        (this.destinationInfo.text === this.getDestinationInfo.text &&
          _isEqual(this.form.dates, this.dates) &&
          this.form.guests === this.guests) ||
        this.totalNights > 30
      );
    },
    totalNights() {
      return this.form.dates[1]
        ? getNights(this.form.dates[0], this.form.dates[1])
        : null;
    }
  },
  methods: {
    ...mapActions('filter', [
      'setTopFiltersValues',
      'setCoordinates',
      'resetMoreFiltersValues'
    ]),
    ...mapActions('destination', ['toggleFilter', 'setDestinationInfo']),
    ...mapActions('hotels', ['getCardsContent', 'resetItems']),
    updateSelectedTabKey() {
      this.setTopFiltersValues({
        destination: this.form.destination,
        guests: this.form.guests,
        dates: [this.form.dates[0], this.form.dates[1]]
      });

      this.setDestinationInfo(this.destinationInfo);

      this.setCoordinates(this.form.coordinates);

      const params = getNavigateToDestinationParams(
        this.$route,
        this.destinationInfo,
        {
          ...this.$route.query,
          ...this.getFilterQuery
        }
      );

      if (params) {
        router.push(params);
      }

      this.resetMoreFiltersValues();
      this.resetItems();

      this.getCardsContent().then(res => {
        if (res.length > 0) {
          logAmplitudeEvent(amplitudeEvents.destination.searchLocation, {
            ...this.getSearchAmplitudeOptions,
            travellingTo: this.destinationInfo && this.destinationInfo.text,
            countOfHotelsReturned: res.length
          });
        } else {
          logAmplitudeEvent(
            amplitudeEvents.destination.searchLocationNoResults,
            {
              travellingTo: this.destinationInfo.text
            }
          );
        }
      });

      this.toggleFilter(false);
    }
  },
  created() {
    this.form.destination = this.getDestinationFilterText;
    this.form.dates = this.dates;
    this.form.guests = this.guests;
    this.form.coordinates = this.coordinates;
    this.destinationInfo = this.getDestinationInfo;
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.destination-filter {
  position: fixed;
  left: 0;
  width: 100%;
  top: $header-height;
  background-color: #fff;
  z-index: 10;
  &__dates {
    width: 200px;
    max-width: 100%;
  }
  &__guests {
    width: 105px;
    max-width: 100%;
  }
  .container {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .row {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    margin: 0 -12px;
    > .col-12 {
      &:not(:last-child) {
        margin-right: 16px;
      }
      &:first-child {
        padding-left: 12px;
      }
      &:last-child {
        padding-right: 12px;
      }
    }
  }
  .v-input.v-text-field {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    fieldset {
      border-color: $border;
    }
    .v-input__prepend-inner {
      padding-right: 16px;
    }
    .v-icon {
      color: $light;
    }
    .v-text-field__details {
      display: none;
    }
    .v-input__slot {
      padding: 0 16px;
    }
    &.v-input--is-focused {
      fieldset {
        border: 1px solid $primary;
      }
    }
    &.v-select {
      .v-input__prepend-inner {
        padding-right: 12px;
      }
      .v-input__slot {
        padding-right: 8px;
      }
    }
    &.filter-menu__field {
      .v-icon {
        color: var(--v-text-base);
      }
      &.v-input--is-focused {
        fieldset {
          border: 1px solid $primary;
          background-color: rgba($primary, 0.2);
        }
        .v-input__prepend-inner,
        .v-icon,
        input {
          color: $primary;
        }
      }
    }
  }
  .v-text-field.v-text-field--enclosed {
    .v-text-field__details {
      padding: 0 16px;
    }
  }

  @media (max-width: 767px) {
    top: $header-height-m;
    border-top: 1px solid $border;

    .row {
      flex-wrap: wrap;
      padding-top: 8px;
      padding-bottom: 8px;
      > .col-12 {
        padding: 0 12px;
        &:not(:last-child) {
          margin: 0 0 16px;
        }
      }
    }

    .v-input.v-text-field,
    &__dates {
      width: 100%;
    }
  }

  @include queryMin(661px) {
    .v-text-field--outlined {
      margin: 4px 0;
      > .v-input__control {
        .v-application & {
          > .v-input__slot,
          .v-select__slot {
            min-height: 48px;
          }

          .v-input__append-inner,
          .v-input__prepend-inner {
            margin-top: 14px;
            font-size: 20px;
          }

          input {
            padding: 10px 0 4px;
          }
        }
      }
    }
  }

  @include query-660 {
    .v-text-field--outlined > .v-input__control {
      .v-application & {
        > .v-input__slot,
        .v-select__slot {
          min-height: 56px;
        }

        .v-input__append-inner,
        .v-input__prepend-inner {
          margin-top: 16px;
        }
      }
    }
  }
}
.backdrop {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: $header-height;
  z-index: 9;
  background-color: $text;
  opacity: 0.3;
  cursor: pointer;

  @media (max-width: 767px) {
    top: $header-height-m;
  }
}
</style>
