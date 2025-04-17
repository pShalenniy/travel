<template>
  <mgl-map
    ref="map"
    map-style="mapbox://styles/mapbox/streets-v11?optimize=true"
    :access-token="mapBoxToken"
    :center="center"
    :zoom="zoom"
    :scrollZoom="false"
    id="map"
    :initial-bounds="markersBounds"
    class="mapbox"
    @load="mapFitBounds()"
  >
    <MglNavigationControl position="top-right" />
    <mgl-marker
      v-if="centerMarker"
      :coordinates.sync="center"
      :anchor="circleMarker ? 'center' : 'bottom'"
    >
      <div slot="marker">
        <div v-if="circleMarker" class="marker-circle"></div>
        <map-marker v-else active animated></map-marker>
      </div>
    </mgl-marker>
    <slot></slot>
  </mgl-map>
</template>
<script>
import { MglMap, MglMarker, MglNavigationControl } from 'vue-mapbox';
import MapMarker from '@/components/elements/map/MapMarker';

export default {
  name: 'CustomMap',
  props: {
    circleMarker: {
      type: Boolean,
      default: false
    },
    centerMarker: {
      type: Boolean,
      default: false
    },
    center: {
      type: Array,
      default: () => [0.6455, 51.6136]
    },
    zoom: {
      type: Number,
      default: 13
    },
    markersBounds: {
      type: [Array, null]
    }
  },
  components: {
    MglNavigationControl,
    MglMap,
    MglMarker,
    MapMarker
  },
  computed: {
    mapBoxToken() {
      return `${process.env.VUE_APP_MAPBOX_TOKEN}`;
    }
  },
  methods: {
    mapFitBounds() {
      if (this.markersBounds) {
        this.$refs['map'] &&
          this.$refs['map'].map.fitBounds(this.markersBounds, {
            padding: { top: 54, bottom: 30, left: 30, right: 30 },
            maxZoom: 15
          });
      }
    }
  },
  watch: {
    markersBounds() {
      setTimeout(() => {
        this.mapFitBounds();
      }, 0);
    }
  }
};
</script>
<style lang="scss" scoped>
@import url('https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css');

.mapbox {
  height: 40vh;
}
</style>
