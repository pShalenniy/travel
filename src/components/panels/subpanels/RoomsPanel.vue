<template>
  <div class="details-page__panel">
    <h3 class="details-page__sub-title">Rooms</h3>
    <div v-if="getRoomsLoading" class="row-loading">
      <v-progress-circular
        indeterminate
        width="5"
        rotate="25"
        color="grey darken-4"
      ></v-progress-circular>
    </div>
    <template v-else>
      <room-card
        v-for="(room, index) in showItems"
        :key="index"
        :data="room"
        :currency="getCurrency"
      ></room-card>
      <div
        v-if="!showAll && getHotelRoomsAvailable.length > 2"
        class="mt-10 text-center"
      >
        <v-btn text color="primary" @click="viewMoreRooms()">
          View more rooms
        </v-btn>
      </div>
      <div v-if="!showAll" class="details-page__hr"></div>
    </template>
    <div v-if="!getRoomsLoading && getHotelRoomsAvailable.length === 0">
      No rooms available
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import RoomCard from '../../cards/RoomCard';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
export default {
  name: 'RoomsPanel',
  components: {
    RoomCard
  },
  props: {
    showAll: {
      type: [Boolean, null]
    }
  },
  computed: {
    ...mapGetters('details', [
      'getHotelRoomsAvailable',
      'getCurrency',
      'getHotelAmplitudeOptions',
      'getRoomsLoading'
    ]),
    ...mapGetters('detailsFilter', ['getFilter']),
    showItems() {
      return this.showAll
        ? this.getHotelRoomsAvailable
        : this.getHotelRoomsAvailable.slice(0, 2);
    }
  },
  methods: {
    ...mapActions('details', {
      setSelectedKey: 'setSelectedKey',
      loadAvailableRooms: 'loadAvailableRooms'
    }),
    viewMoreRooms() {
      logAmplitudeEvent(
        amplitudeEvents.hotelDetails.viewMoreRooms,
        this.getHotelAmplitudeOptions
      );
      this.setSelectedKey('rooms');
    }
  },
  created() {
    this.loadAvailableRooms(this.getFilter);
  }
};
</script>
