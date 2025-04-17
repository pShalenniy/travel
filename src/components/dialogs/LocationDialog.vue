<template>
  <dialog-full-size title="Location">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        color="primary"
        v-bind="attrs"
        v-on="on"
        @click="viewMoreDetails()"
      >
        View more about the location
      </v-btn>
    </template>
    <div class="location-dialog">
      <v-row :class="$mq | mq({ sm: 'ma-2', md: 'ma-4', lg: 'ma-12' })">
        <v-col md="4">
          <h3 class="location-dialog__title">
            {{ getPlaceInfo.extendedName }}
          </h3>
          <div v-if="getPlaceInfo.description" class="location-dialog__desc">
            {{ getPlaceInfo.description }}
          </div>
          <icons-list :data="getPlaceFacilities"></icons-list>
        </v-col>
        <v-col md="8">
          <div>
            <custom-map
              class="location-map"
              :center="getHotelMapCenter"
              :zoom="9"
              :markers-bounds="getMarkersBounds"
            >
              <!--<map-circle-area :center="getPlaceCenter" :radius="500000" />-->
              <mgl-marker :coordinates.sync="getPlaceCenter">
                <div slot="marker">
                  <div class="marker-circle"></div>
                </div>
              </mgl-marker>
              <mgl-marker
                color="#5B8CB1"
                anchor="bottom"
                :coordinates.sync="getHotelMapCenter"
              ></mgl-marker>
            </custom-map>
          </div>
        </v-col>
      </v-row>
    </div>
  </dialog-full-size>
</template>

<script>
import { mapGetters } from 'vuex';
import { MglMarker } from 'vue-mapbox';
import DialogFullSize from './DialogFullSize';
import CustomMap from '@/components/elements/map/CustomMap';
import IconsList from '@/components/lists/IconsList';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import { getMarkersBounds } from '@/utils/map';
export default {
  name: 'LocationDialog',
  components: {
    IconsList,
    DialogFullSize,
    CustomMap,
    MglMarker
  },
  computed: {
    ...mapGetters('details', [
      'getHotelAddress',
      'getHotelMapCenter',
      'getPlaceInfo',
      'getPlaceCenter',
      'getHotelAmplitudeOptions',
      'getPlaceFacilities'
    ]),
    getMarkersBounds() {
      return getMarkersBounds(this.getHotelMapCenter, this.getPlaceCenter);
    }
  },
  methods: {
    viewMoreDetails() {
      logAmplitudeEvent(
        amplitudeEvents.hotelDetails.viewMoreLocationDetails,
        this.getHotelAmplitudeOptions
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.location-dialog {
  &__title {
    font-size: 24px;
    line-height: 33px;
    margin-bottom: 40px;
  }
  &__desc {
    margin-top: -32px;
    margin-bottom: 40px;
  }
}
</style>
