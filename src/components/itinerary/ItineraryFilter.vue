<template>
  <v-card outlined class="card-filter">
    <div class="card-filter__heading">
      <v-btn icon color="white" class="card__download" large>
        <v-icon size="24">
          mdi-download
        </v-icon>
      </v-btn>
      <share-itinerary></share-itinerary>
      <v-btn icon color="white" class="card__like ml-auto" large>
        <v-icon size="24">
          mdi-heart-outline
        </v-icon>
      </v-btn>
    </div>
    <v-text-field
      outlined
      readonly
      :value="getItinerary.location"
      prepend-inner-icon="mdi-airplane"
    ></v-text-field>
    <v-text-field
      outlined
      readonly
      :value="getItineraryDate"
      prepend-inner-icon="mdi-calendar-today"
    ></v-text-field>
    <div class="card-filter__footer">
      <price
        :price="getItinerary.totalPrice"
        currency="£"
        :label="`${getItinerary.totalNights} night <strong>total</strong>`"
      ></price>
      <v-btn color="primary" depressed dark rounded>
        checkout
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import ShareItinerary from './ShareItinerary';

export default {
  name: 'ItineraryFilter',
  components: {
    ShareItinerary
  },
  props: {
    data: {
      type: [Object, null]
    }
  },
  data() {
    return {
      guests: 2,
      rooms: 2,
      totalNights: 3,
      price: 88,
      isOpen: false
    };
  },
  computed: {
    ...mapGetters('itinerary', ['getItinerary']),
    getItineraryDate() {
      return this.getItinerary.startDate + ' - ' + this.getItinerary.endDate;
    }
  },
  methods: {
    toggle(isOpen = !this.isOpen) {
      this.isOpen = isOpen;
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/_utils';
.card-filter {
  &__heading {
    margin-bottom: 24px;
  }
  &__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 24px;
  }
  .v-input__slot {
    margin: 0 0 16px;
  }
  .v-text-field__details {
    display: none;
  }
}
@include query-767 {
  .v-card.card-filter {
    border-radius: 0 !important;
    border-width: 0 !important;
    padding: 0;
  }
  .card-filter {
    margin-bottom: 24px;
    &__footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid $border;
      padding: 8px 12px;
      align-items: center;
      min-height: 68px;
      z-index: 99;
      .v-btn:last-child {
        margin-left: 8px;
      }
    }
  }
}
</style>
