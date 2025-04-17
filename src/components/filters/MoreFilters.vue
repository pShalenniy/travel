<template>
  <v-menu
    ref="moreFiltersMenu"
    v-model="moreFiltersMenu"
    :close-on-content-click="false"
    transition="fade-transition"
    offset-y
    left
    min-width="360px"
    content-class="filter-menu-wrapper"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        data-test="destination-more-filter-btn"
        value="Filters"
        class="filters-more filter-menu__field"
        readonly
        outlined
        prepend-inner-icon="mdi-tune"
        :suffix="getMoreFilterLength.toString() || null"
        v-bind="attrs"
        v-on="on"
        @click="logAmplitudeEvent"
      ></v-text-field>
    </template>
    <v-card
      data-test="destination-more-filter"
      class="filter-menu filter-more pa-0"
    >
      <v-card-title>Filters</v-card-title>
      <v-card-text>
        <!--<v-subheader>Popular filters</v-subheader>
        <div class="filter-group">
          <v-checkbox
            v-for="item in popularItems"
            :key="item.value"
            :value="item.value"
            :label="item.label"
            v-model="form.mostBooked"
          ></v-checkbox>
        </div>-->
        <!--<v-subheader>
          <template v-if="travelPolicyMax">
            Your travel policy price range
            <v-icon class="ml-1" color="light" size="18">
              mdi-information-outline
            </v-icon>
          </template>
          <template v-else>
            Price range
          </template>
        </v-subheader>
        <price-filters
          v-if="getPriceMinMaxRange && getPriceMinMaxRange[0]"
          v-model="formPrice"
          :travel-policy-max="travelPolicyMax"
          :min="getPriceMinMaxRange[0]"
          :max="getPriceMinMaxRange[1]"
          :currency="getCardsCurrency"
        >
          <v-checkbox
            v-model="form.freeCancellation"
            class="pb-0 pt-3"
            label="Properties with Free Cancellation"
          ></v-checkbox>
        </price-filters>-->
        <v-subheader>Hotel star rating</v-subheader>
        <div
          class="filter-group filter-star-rating"
          data-test="destination-more-filter-star"
        >
          <v-checkbox
            v-for="index in 5"
            :key="index"
            :value="index"
            v-model="form.starRating"
          >
            <template v-slot:label>
              {{ index }}<v-icon size="18">mdi-star</v-icon>
            </template>
          </v-checkbox>
        </div>
        <!--<v-subheader>Amenities</v-subheader>-->
        <div class="filter-group">
          <v-checkbox
            v-model="form.freeCancellation"
            label="Properties with Free Cancellation"
          ></v-checkbox>
          <v-checkbox
            v-model="form.breakfastIncluded"
            label="Breakfast Included"
          ></v-checkbox>
          <!--<v-checkbox
            v-for="(item, index) in getAmenitiesItems"
            :key="index"
            :value="item.value"
            :label="item.label"
            v-model="form.amenities"
          ></v-checkbox>
          <a
            class="more-link"
            @click="moreAmenitiesItems = !moreAmenitiesItems"
          >
            {{ moreAmenitiesItems ? 'Hide amenities' : 'Show all amenities' }}
          </a>-->
        </div>
        <div
          v-if="getDistanceMinMaxRange && getDistanceMinMaxRange[0]"
          class="filter-group"
        >
          <v-subheader class="mb-5">Distance from centre (km)</v-subheader>
          <distance-filter
            v-model="formDistance"
            :min="getDistanceMinMaxRange[0] || 0"
            :max="getDistanceMinMaxRange[1] || 10"
          ></distance-filter>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="lightBg"
          depressed
          rounded
          light
          @click="resetMoreFilters"
        >
          Reset
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          data-test="destination-more-filter-submit"
          color="black"
          depressed
          dark
          rounded
          @click="updateFilters"
        >
          Apply
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import PriceFilters from '@/components/filters/PriceFilters';
import DistanceFilter from '@/components/filters/DistanceFilter';
import { logAmplitudeEvent, amplitudeEvents } from '@/utils/amplitude';
import { filterFacilities } from '@/utils/facilities';

export default {
  name: 'MoreFilters',
  components: {
    // PriceFilters,
    DistanceFilter
  },
  data() {
    return {
      travelPolicyMax: null,
      form: {
        mostBooked: [],
        price: [],
        starRating: [],
        breakfastIncluded: null,
        amenities: [],
        freeCancellation: null,
        distanceFromCenter: null
      },
      moreFiltersMenu: false,
      moreAmenitiesItems: false,
      popularItems: [
        {
          value: 'colleagues',
          label: 'Most booked with colleagues'
        },
        {
          value: 'industry',
          label: 'Most booked in the industry'
        },
        {
          value: 'business',
          label: 'Most booked in business'
        }
      ]
    };
  },
  computed: {
    ...mapGetters('filter', [
      'getMoreFilter',
      'getDistanceMinMaxRange',
      'getMoreFilterLength'
    ]),
    ...mapGetters('hotels', ['getAllItems']),
    formDistance: {
      get() {
        return (
          this.getMoreFilter.distanceFromCenter ||
          this.getDistanceMinMaxRange[1]
        );
      },
      set(value) {
        this.form.distanceFromCenter = value;
      }
    },
    getAmenitiesItems() {
      if (this.moreAmenitiesItems) {
        return filterFacilities;
      } else {
        return filterFacilities.slice(0, 4);
      }
    }
  },
  methods: {
    ...mapActions('hotels', {
      getCardsContent: 'getCardsContent'
    }),
    ...mapActions('filter', {
      logMoreFiltersEvents: 'logMoreFiltersEvents',
      resetMoreFiltersValues: 'resetMoreFiltersValues',
      setMoreFiltersValues: 'setMoreFiltersValues',
      setPriceMinMaxRange: 'setPriceMinMaxRange'
    }),
    resetMoreFilters() {
      this.moreFiltersMenu = false;
      this.resetMoreFiltersValues();
      this.setValues();
    },
    updateFilters() {
      this.moreFiltersMenu = false;
      this.setMoreFiltersValues(this.form);
      this.logMoreFiltersEvents();
    },
    setValues() {
      if (this.getMoreFilter.price || this.getPriceMinMaxRange) {
        this.form.price = this.getMoreFilter.price || this.getPriceMinMaxRange;
      }
      this.form.starRating = this.getMoreFilter.starRating;
      this.form.breakfastIncluded = this.getMoreFilter.breakfastIncluded;
      this.form.amenities = this.getMoreFilter.amenities;
      this.form.distanceFromCenter = this.getMoreFilter.distanceFromCenter;
    },
    logAmplitudeEvent() {
      if (!this.moreFiltersMenu) {
        logAmplitudeEvent(amplitudeEvents.destinationFilters.clickFilters);
      }
    }
  },
  created() {
    this.setValues();
  }
};
</script>
<style lang="scss">
@import 'src/scss/variables';
.v-input.v-text-field.filters-more {
  font-size: 18px;
  line-height: 24px;
  font-weight: 800;
  fieldset {
    border-color: $border;
  }
  input {
    text-align: center;
    color: $light;
  }
  .v-icon {
    color: $text;
  }
  .v-text-field__details {
    display: none;
  }
  .v-input__slot {
    padding: 0 16px !important;
    min-height: 48px;
  }
  &.v-input--is-focused {
    fieldset {
      border: 1px solid $primary;
    }
  }
  &.filter-menu__field {
    .v-input__prepend-inner {
      @media (min-width: 661px) {
        margin-top: 12px;
        padding-right: 0;
      }
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
  @media (max-width: 660px) {
    font-size: 14px;
    input {
      font-weight: 800;
      text-align: left;
    }
  }
}
.v-text-field.v-text-field--enclosed {
  .v-text-field__details {
    padding: 0 16px;
  }
}
.filter-menu-wrapper {
  box-shadow: 0 2px 30px 0 rgba($text, 0.2);
  border-radius: 10px;
  .v-card.filter-menu {
    padding: 0;
    box-shadow: none;
  }
  @media (max-width: 660px) {
    min-width: 290px !important;
  }
}
.filter {
  &-menu {
    &.v-card {
      max-width: 400px;
      border-radius: 10px;
    }
    .v-card__actions {
      border-top: 1px solid $border;
      padding: 16px;
    }
    .v-card__title {
      font-size: 18px;
      line-height: 24px;
      font-weight: 600;
      padding: 24px 24px 16px;
    }
    .v-card__text {
      padding-left: 24px;
      padding-right: 24px;
    }
    .v-label {
      font-size: 14px;
      font-weight: 600;
    }
    .v-text-field__details,
    .v-messages {
      display: none;
    }
    .v-subheader {
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      padding: 0;
      height: auto;
      margin-bottom: 8px;
    }
    .v-input {
      margin-top: 0;
      &__slot {
        margin: 0;
      }
      &.v-input--checkbox {
        padding: 0 0 10px;
      }
    }
  }
  &-group {
    &:not(:last-child) {
      border-bottom: 1px solid $border;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
    .v-input.v-input--checkbox {
      .v-label {
        color: $text;
      }
    }
    .row {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &-star-rating {
    display: flex;
    .v-input.v-input--checkbox {
      background-color: #fff;
      border: 1px solid $border;
      border-radius: 10px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      transition: all 0.2s;
      flex: 1 1 64px;
      padding-top: 0;
      padding-bottom: 0;
      &:not(:last-child) {
        margin-right: 8px;
      }
      .v-input__slot {
        margin: 0;
      }
      .v-input--selection-controls__input {
        opacity: 0;
        position: absolute;
      }
      .v-label {
        color: $text;
        text-align: center;
        justify-content: center;
        font-size: 18px;
        line-height: 24px;
        transition: all 0.2s;
      }
      .v-icon {
        color: currentColor;
        margin-left: 4px;
        transition: none;
      }
      &.v-input--is-label-active {
        background-color: $primary;
        border-color: $primary;
        .v-label {
          color: #fff;
        }
      }
    }
  }
  &-amenities {
    display: flex;
    flex-wrap: wrap;
    .v-radio,
    > .v-input {
      flex: 0 0 50%;
      max-width: 50%;
      width: 50%;
      margin: 0;
    }
    .more-link {
      color: $light;
      text-decoration: underline;
      font-weight: 600;
    }
    .v-input--radio-group {
      flex: 0 0 100%;
      width: 100%;
      max-width: 100%;
      padding: 0;
      .v-input--radio-group__input {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
      }
      .v-radio {
        margin-bottom: 10px;
      }
      .v-label {
        color: $text;
      }
    }
  }
}
</style>
