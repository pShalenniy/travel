<template>
  <div>
    <div v-if="getDestinationInfoLoading" class="row-loading">
      <v-progress-circular
        indeterminate
        width="5"
        rotate="25"
        color="grey darken-4"
      ></v-progress-circular>
    </div>
    <div v-if="getDestinationInfo.text">
      <page-bread-crumbs
        :breadcrumbs="getDestinationBreadcrumbs"
      ></page-bread-crumbs>
      <hero-panel :data="getDestinationHero" small>
        <destination-filters-toggle></destination-filters-toggle>
      </hero-panel>
      <!--<main-tabs class="d-none"></main-tabs>-->
      <v-container class="mb-12 col-12 py-0">
        <destination-filters></destination-filters>
        <results-pane></results-pane>
      </v-container>
    </div>
  </div>
</template>

<script>
import DestinationFiltersToggle from '@/components/destination/DestinationFiltersToggle';
// import MainTabs from '@/components/MainTabs';
import HeroPanel from '@/components/HeroPanel';
import { mapState, mapGetters, mapActions } from 'vuex';
import { capitalizeDestination } from '@/utils/destination';

export default {
  name: 'Destination',
  components: {
    // MainTabs,
    DestinationFilters: () =>
      import('@/components/destination/DestinationFilters'),
    DestinationFiltersToggle,
    ResultsPane: () => import('@/components/ResultsPane'),
    HeroPanel
  },
  computed: {
    ...mapState('filter', ['dates']),
    ...mapGetters('filter', ['getCoordinates', 'getFilterState']),
    ...mapGetters('destination', [
      'getDestinationInfo',
      'getDestinationInfoLoading',
      'getDestinationParams',
      'getDestinationHero',
      'getDestinationBreadcrumbs'
    ])
  },
  methods: {
    ...mapActions('filter', ['setTopFiltersValues']),
    ...mapActions('destination', ['setDestination'])
  },
  created() {
    const mlt = this.$route.query.mlt;

    if (mlt) {
      this.$router.push({
        ...this.$route,
        params: this.getDestinationParams,
        query: {
          checkin: this.getFilterState.dates[0],
          checkout: this.getFilterState.dates[1]
        }
      });
    } else {
      const place = this.$route.params.place;
      const country = this.$route.params.country;
      const checkin = this.$route.query.checkin || this.dates[0];
      const checkout = this.$route.query.checkout || this.dates[1];

      if (checkin && checkout) {
        this.setTopFiltersValues({
          dates: [checkin, checkout],
          guests: 1,
          destination: capitalizeDestination(`${decodeURI(place)}`)
        });
      }

      if (place && country) {
        this.setDestination({
          searchTerm: `${decodeURI(country)} ${decodeURI(place)}`,
          types: 'place'
        }).then(newRoute => {
          if (newRoute) {
            this.$router.push(newRoute);
          }
        });
      }
    }
  }
};
</script>
