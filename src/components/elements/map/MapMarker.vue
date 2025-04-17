<template>
  <div class="marker" :class="{ active, animated, disabled: price === 'N/A' }">
    <MarkerIcon class="marker__icon" />
    <div class="marker__price">
      <span v-if="price">{{ price }}</span>
      <v-progress-circular
        v-else
        indeterminate
        size="24"
        width="2"
        rotate="25"
        color="white darken-4"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import MarkerIcon from '@/images/map/marker.svg';

export default {
  name: 'MapMarker',
  components: {
    MarkerIcon
  },
  props: {
    marker: {
      type: [Object, null]
    },
    active: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    price: {
      type: [String, null]
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../scss/utils/_utils';
@keyframes fromTop {
  0% {
    transform: translateY(-50vw);
  }
  100% {
    transform: translateY(0);
  }
}
.marker {
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
    filter: grayscale(1);
  }

  &__price {
    position: absolute;
    left: 0;
    right: 0;
    top: 12px;
    color: #fff;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    .v-progress-circular {
      vertical-align: top;
    }
  }

  &__icon {
    transition: $transition;
    vertical-align: top;
  }

  &.active,
  .mapboxgl-marker:hover &,
  .mapboxgl-marker.hover &,
  .mapboxgl-marker.active & {
    .marker__icon {
      color: $primary;
    }
  }
  &.animated .marker__icon {
    animation: fromTop forwards 0.5s;
  }
}
</style>
