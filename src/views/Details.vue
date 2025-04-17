<template>
  <div class="pb-12">
    <div v-if="loading" class="text-center pa-5">
      <v-progress-circular
        :indeterminate="true"
        width="5"
        rotate="25"
        color="grey darken-4"
      ></v-progress-circular>
    </div>
    <div v-if="!loading && getHotelDetails">
      <page-bread-crumbs :breadcrumbs="getBreadcrumbItems"></page-bread-crumbs>
      <detail-page-tabs></detail-page-tabs>
      <div class="details-page">
        <masonry-gallery
          v-if="this.selectedTabKey === 'overview' && getMasonry.length > 4"
          :data="getMasonry"
        ></masonry-gallery>
        <v-container class="mt-10">
          <v-row justify="center" no-gutters>
            <v-col class="col-420">
              <v-tabs-items v-model="selectedTabKeyModel">
                <v-tab-item
                  key="overview"
                  value="overview"
                  transition="fade"
                  reverse-transition="fade"
                >
                  <overview-panel></overview-panel>
                </v-tab-item>
                <v-tab-item
                  key="photos"
                  value="photos"
                  transition="fade"
                  reverse-transition="fade"
                >
                  <photos-panel></photos-panel>
                </v-tab-item>
                <v-tab-item
                  key="rooms"
                  value="rooms"
                  transition="fade"
                  reverse-transition="fade"
                >
                  <rooms-panel show-all></rooms-panel>
                </v-tab-item>
                <v-tab-item
                  key="recommendations"
                  value="recommendations"
                  transition="fade"
                  reverse-transition="fade"
                >
                  <recommendations-panel
                    :data="getHotelDetails"
                  ></recommendations-panel>
                </v-tab-item>
                <v-tab-item
                  key="facilities"
                  value="facilities"
                  transition="fade"
                  reverse-transition="fade"
                >
                  <facilities-panel show-all></facilities-panel>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
            <v-col class="col-320">
              <!--<v-row
                v-if="this.selectedTabKey === 'overview'"
                no-gutters
                class="mb-6 d-none"
              >
                <v-col class="mr-2">
                  <v-menu
                    offset-y
                    open-on-hover
                    content-class="details-page__popover"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-card
                        outlined
                        class="pa-0 details-page__card-small"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-card-title class="pa-3 align-center justify-center">
                          <v-icon left size="36" color="primary">
                            mdi-map-marker
                          </v-icon>
                          <span class="details-page__rating-title">
                            {{ getRating }}
                          </span>
                        </v-card-title>
                      </v-card>
                    </template>
                    <div>
                      We highly recommended this hotel, you will not be
                      disappointed. With a Travel score of {{ getRating }},
                      it's a top choise
                    </div>
                  </v-menu>
                </v-col>
                <v-col class="ml-2">
                  <v-card
                    outlined
                    class="pa-3 text-center details-page__card-small"
                  >
                    <v-progress-circular
                      :indeterminate="false"
                      :size="48"
                      :value="92"
                      :width="3"
                      :rotate="270"
                      color="primary"
                    >
                      <span class="details-page__score-title">
                        92
                      </span>
                    </v-progress-circular>
                  </v-card>
                </v-col>
              </v-row>-->
              <filter-panel class="side-filter"></filter-panel>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import DetailPageTabs from '../components/DetailPageTabs';
import { amplitudeEvents } from '@/utils/amplitude';
import { capitalizeDestination } from '@/utils/destination';
import { connectors } from '@/utils/connectors';

export default {
  name: 'Details',
  components: {
    DetailPageTabs,
    OverviewPanel: () => import('../components/panels/OverviewPanel'),
    PhotosPanel: () => import('../components/panels/PhotosPanel'),
    MasonryGallery: () =>
      import('../components/panels/subpanels/MasonryGallery'),
    FilterPanel: () => import('../components/panels/subpanels/FilterPanel'),
    RoomsPanel: () => import('../components/panels/subpanels/RoomsPanel'),
    RecommendationsPanel: () =>
      import('../components/panels/subpanels/RecommendationsPanel'),
    FacilitiesPanel: () =>
      import('../components/panels/subpanels/FacilitiesPanel')
  },
  computed: {
    ...mapState('details', ['selectedTabKey', 'loading']),
    ...mapGetters('details', [
      'getHotelDetails',
      'getMasonry',
      'getName',
      'getCity'
    ]),
    selectedTabKeyModel: {
      get() {
        return this.selectedTabKey;
      },
      set(value) {
        this.setSelectedKey(this.items[value].key);
      }
    },
    getBreadcrumbItems() {
      const humanizedTabKey = capitalizeDestination(this.selectedTabKey);

      const navigateToDestinationOptions = {
        to: {
          name: 'destination',
          params: this.$route.params,
          query: this.$route.query
        },
        amplitude: {
          event: amplitudeEvents.hotelDetails.detailsBreadcrumbClick,
          options: {
            travellingTo: this.getCity,
            hotelName: this.getName
          }
        },
        target: '_blank'
      };

      const country = capitalizeDestination(
        decodeURI(this.$route.params.country)
      );

      return [
        {
          text: country,
          ...navigateToDestinationOptions
        },
        {
          text: this.getCity,
          ...navigateToDestinationOptions
        },
        {
          text: this.getName,
          disabled: true
        },
        {
          text: humanizedTabKey,
          disabled: true
        }
      ];
    },
    getRating() {
      let rating = this.getHotelDetails.rating || 4.9;
      let multiplier = rating >= 1 ? 1 : 100;
      return Math.round(rating * multiplier).toFixed(1);
    }
  },
  methods: {
    ...mapActions('details', {
      loadHotelDetails: 'loadHotelDetails',
      setCity: 'setCity'
    }),
    ...mapActions('hotelDetails', {
      loadHotelPolicies: 'loadHotelPolicies',
      loadHotelFacilities: 'loadHotelFacilities'
    }),
    ...mapActions('detailsFilter', ['setDetailsFiltersValues'])
  },
  created() {
    this.setDetailsFiltersValues(this.$route.query);
    this.setCity(decodeURI(this.$route.params.place));
    this.loadHotelDetails({
      ...this.$route.params,
      source: this.$route.query.source
    });
    if (this.$route.query.source === connectors.zentrumhub) {
      this.loadHotelPolicies(this.$route.params.hotelId);
      this.loadHotelFacilities(this.$route.params.hotelId);
    }
  }
};
</script>
