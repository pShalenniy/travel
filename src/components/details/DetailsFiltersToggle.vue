<template>
  <v-tooltip bottom :open-on-hover="true">
    <template v-slot:activator="{ on, attrs }">
      <button v-bind="attrs" v-on="on" class="tooltip-btn header-filter">
        <router-link
          class="filter-toggle show ma-0"
          :to="getRouterLink"
          target="_blank"
          @click.native="logAmplitude"
        >
          <span>
            <span class="text-ellipsis">{{ getCity }}</span>
          </span>
          <span class="divider"></span>
          <span>
            {{ getDatesFormatted }}
          </span>
          <span class="divider"></span>
          <span>1 guest</span>
          <v-btn class="ml-2" fab dark x-small depressed color="primary">
            <v-icon dark>mdi-magnify</v-icon>
          </v-btn>
        </router-link>
      </button>
    </template>
    <span>
      See other Recommendations for your Trip
    </span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from 'vuex';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';

export default {
  name: 'DetailsFiltersToggle',
  computed: {
    ...mapGetters('details', ['getCity', 'getName']),
    ...mapGetters('detailsFilter', ['getDatesFormatted']),
    getRouterLink() {
      return {
        name: 'destination',
        params: {
          ...this.$route.params,
          hotelId: null
        },
        query: {
          ...this.$route.query
        }
      };
    }
  },
  methods: {
    logAmplitude() {
      logAmplitudeEvent(amplitudeEvents.hotelDetails.detailsSearchWidgetClick, {
        travellingTo: this.getCity,
        hotelName: this.getName
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.tooltip-btn {
  padding: 0;
  border: 0;
  background: none;
  @include queryMax(374px) {
    .filter-toggle {
      max-width: 100%;
      border-bottom: 0;
    }
  }
}
</style>
