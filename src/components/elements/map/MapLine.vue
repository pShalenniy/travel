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
  name: 'MapLine',
  components: {
    MglGeojsonLayer
  },
  props: {
    coordinates: {
      type: [Array, null]
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
                type: 'LineString',
                coordinates: this.coordinates
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
        type: 'line',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#000',
          'line-width': 2.5
        }
      };
      return layer;
    }
  }
};
</script>

<style lang="scss" scoped></style>
