<template>
  <div class="details-page__panel">
    <h1 class="details-page__title" data-test="details-title">{{ getName }}</h1>
    <div class="location-address">{{ getHotelAddress }}, {{ getCity }}</div>
    <div class="details-page__title-light" :title="`${getRating}-star hotel`">
      <v-icon v-for="index in getRating" :key="index" color="orange" small>
        mdi-star
      </v-icon>
    </div>
    <div v-if="getDescription || getHotelDetailsInfo.hotelier_welcome_message">
      <div class="details-page__text" :class="{ 'text-full': showAll }">
        <p v-if="getDescription">
          {{ getDescription }}
        </p>
        <p v-if="getHotelDetailsInfo.hotelier_welcome_message">
          {{ getHotelDetailsInfo.hotelier_welcome_message }}
        </p>
      </div>

      <span class="details-page__link mb-4" @click="showMore()">
        <span v-text="showAll ? 'Show less' : 'Show more'"></span>
        <v-icon left size="18">
          {{ showAll ? 'mdi-menu-up' : 'mdi-menu-down' }}
        </v-icon>
      </span>
    </div>
    <div class="details-page__hr"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';

export default {
  name: 'AttrsPanel',
  data: () => ({
    showAll: false
  }),
  computed: {
    ...mapGetters('details', [
      'getHotelDetailsInfo',
      'getName',
      'getRating',
      'getDescription',
      'getHotelAddress',
      'getCity',
      'getHotelAmplitudeOptions'
    ])
  },
  methods: {
    showMore() {
      logAmplitudeEvent(
        amplitudeEvents.hotelDetails.showMoreHotelDescription,
        this.getHotelAmplitudeOptions
      );
      this.showAll = !this.showAll;
    }
  }
};
</script>
<style>
.location-address {
  font-weight: 600;
  font-size: 14px;
}
</style>
