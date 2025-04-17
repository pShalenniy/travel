<template>
  <div class="results__heading">
    <slot></slot>
    <div class="results__heading--filters">
      <more-filters></more-filters>
    </div>
    <v-btn
      data-test="destination-map-btn"
      :rounded="!isMap"
      :fab="isMap"
      large
      depressed
      color="lightBg"
      @click="toggleMap"
    >
      <v-icon v-if="isMap">mdi-close</v-icon>
      <span v-else>
        <v-icon left>mdi-map</v-icon>
        Map view
      </span>
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MoreFilters from '@/components/filters/MoreFilters';

export default {
  name: 'DestinationHeading',
  components: {
    MoreFilters
  },
  computed: {
    ...mapState('filter', ['destination']),
    ...mapState('destination', ['isMap'])
  },
  methods: {
    ...mapActions('destination', ['toggleMap'])
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.results__heading {
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 12px 0;
  position: sticky;
  top: $header-height;
  z-index: 6;
  &--filters {
    width: 190px;
  }
  .v-btn {
    margin-left: 16px;
    color: $light;
    &:not(.v-btn--round).v-size--large {
      height: 48px;
    }
    &.v-btn--fab {
      width: 48px;
      height: 48px;
    }
  }
  @media (min-width: 768px) {
    margin-right: -25px;
    padding-right: 25px;
  }
  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    top: 120px;
    margin: 0 -12px;
    padding-left: 12px;
    padding-right: 12px;
    width: calc(100% + 24px);
    &--filters {
      width: 190px;
      margin-right: auto;
    }
    .v-btn {
      &:not(.v-btn--round).v-size--large {
        height: 40px;
      }
      &.v-btn--fab {
        width: 40px;
        height: 40px;
      }
    }
  }
  @include queryMax(374px) {
    top: $header-height-sm;
  }
}
</style>
