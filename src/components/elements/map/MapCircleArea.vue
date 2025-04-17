<template>
  <MglGeojsonLayer
    sourceId="mySourceId.data.id"
    :source="geoJsonSource"
    layerId="myLayerId"
    :layer="geoJsonlayer"
  />
</template>

<script>
import { MglGeojsonLayer } from 'vue-mapbox';

export default {
  name: 'MapCircleArea',
  components: {
    MglGeojsonLayer
  },
  props: {
    center: {
      type: [Array, null]
    },
    radius: {
      type: Number
    }
  },
  computed: {
    geoJsonSource() {
      return {
        type: 'geojson',
        data: {
          id: 'thisIsMySource',
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: this.center
              },
              properties: {
                id: 'value0'
              }
            }
          ]
        }
      };
    },
    geoJsonlayer() {
      const layer = {
        type: 'circle',
        paint: {
          'circle-color': '#00C3C3',
          'circle-radius': {
            stops: [
              [0, 0],
              [20, this.radius]
            ],
            base: 2
          },
          'circle-opacity': 0.1
        }
      };
      return layer;
    }
  }
};
</script>

<style lang="scss" scoped></style>
