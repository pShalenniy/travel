<template>
  <app-tabs
    background-color="lightBg"
    :tabs="getTabsItems"
    v-model="selectedTabKeyModel"
  ></app-tabs>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { amplitudeEvents } from '@/utils/amplitude';

export default {
  data() {
    return {
      tab: null
    };
  },
  computed: {
    ...mapState('details', ['selectedTabKey']),
    ...mapGetters('details', [
      'getGallery',
      'getHotelRoomsAvailable',
      'getHotelAmplitudeOptions'
    ]),
    getTabsItems() {
      return [
        { key: 'overview', label: 'Overview' },
        {
          key: 'photos',
          label: 'Photos',
          disabled: this.getGallery && this.getGallery.length === 0,
          amplitude: amplitudeEvents.hotelDetails.clickPhotosTab,
          amplitudeOptions: this.getHotelAmplitudeOptions
        },
        {
          key: 'rooms',
          label: 'Rooms',
          disabled: !this.getHotelRoomsAvailable.length,
          amplitude: amplitudeEvents.hotelDetails.clickRoomsTab,
          amplitudeOptions: this.getHotelAmplitudeOptions
        },
        {
          key: 'facilities',
          label: 'Facilities',
          amplitude: amplitudeEvents.hotelDetails.clickFacilitiesTab,
          amplitudeOptions: this.getHotelAmplitudeOptions
        }
        // { key: 'recommendations', label: 'Recommendations' }
      ];
    },
    selectedTabKeyModel: {
      get() {
        return this.selectedTabKey;
      },
      set(value) {
        this.setSelectedKey(value);
      }
    }
  },
  methods: {
    ...mapActions('details', {
      setSelectedKey: 'setSelectedKey'
    })
  }
};
</script>
<style lang="scss" scoped></style>
