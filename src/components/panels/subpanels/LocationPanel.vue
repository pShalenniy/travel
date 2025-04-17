<template>
  <div v-if="getPlaceInfo" class="details-page__panel">
    <div class="mb-3">
      <custom-map
        class="location-map"
        :center="getHotelMapCenter"
        :zoom="9"
        :markers-bounds="getMarkersBounds"
      >
        <mgl-marker v-if="getPlaceCenter" :coordinates.sync="getPlaceCenter">
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
    <v-card v-if="getPlaceCenter" class="mx-auto" outlined>
      <v-row>
        <!--<v-col class="location-rating py-0 col-70">
          <div class="location-rating&#45;&#45;value">{{ location.rating }}</div>
          {{ location.ratingDesc }}
        </v-col>-->
        <v-col class="py-0">
          <icons-list :data="getPlaceFacilities"></icons-list>
        </v-col>
      </v-row>
      <div class="mt-3 text-center">
        <location-dialog></location-dialog>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { MglMarker } from 'vue-mapbox';
import CustomMap from '../../elements/map/CustomMap';
import IconsList from '@/components/lists/IconsList';
import LocationDialog from '@/components/dialogs/LocationDialog';
import { getMarkersBounds } from '@/utils/map';

export default {
  name: 'LocationPanel',
  components: {
    IconsList,
    CustomMap,
    LocationDialog,
    MglMarker
  },
  computed: {
    ...mapGetters('details', [
      'getHotelMapCenter',
      'getPlaceInfo',
      'getPlaceCenter',
      'getPlaceFacilities'
    ]),
    getMarkersBounds() {
      return getMarkersBounds(
        this.getHotelMapCenter,
        this.getPlaceCenter || this.getHotelMapCenter
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.location-rating {
  color: $primary;
  font-size: 14px;
  &--value {
    font-size: 36px;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 4px;
  }
}
.location-map {
  height: 180px;
  ::v-deep .marker {
    &__icon {
      width: 36px;
      height: auto;
    }
  }
}
.col-70 {
  @include flex-col(96px);
}
.v-card {
  padding: 16px 16px 6px;
  @include query-660 {
    padding-left: 0;
    padding-right: 0;
    border-width: 0 0 1px !important;
    border-radius: 0 !important;
  }
}
</style>
