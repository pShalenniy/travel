<template>
  <div class="pb-12">
    <div>
      <details-page-bread-crumbs></details-page-bread-crumbs>
      <hero-panel :data="heroPanel" small></hero-panel>
      <div class="itinerary-page">
        <v-container>
          <v-row justify="center" no-gutters>
            <v-col class="col-450">
              <itinerary-timeline></itinerary-timeline>
            </v-col>
            <v-col class="col-320">
              <itinerary-filter class="side-filter"></itinerary-filter>

              <div
                v-for="(item, index) in getItineraryErrors"
                :key="index"
                v-html="item"
                class="itinerary-page__error"
              ></div>
              <add-itinerary-item
                title="Add more to your itinerary"
                class="my-6"
              ></add-itinerary-item>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import HeroPanel from '@/components/HeroPanel';
import DetailsPageBreadCrumbs from '@/components/DetailsPageBreadCrumbs';
import ItineraryTimeline from '@/components/itinerary/ItineraryTimeline';
import ItineraryFilter from '@/components/itinerary/ItineraryFilter';
import AddItineraryItem from '@/components/itinerary/AddItineraryItem';

export default {
  name: 'Itinerary',
  components: {
    HeroPanel,
    DetailsPageBreadCrumbs,
    ItineraryTimeline,
    ItineraryFilter,
    AddItineraryItem
  },
  data() {
    return {
      heroPanel: {}
    };
  },
  created() {
    this.heroPanel = {
      title: 'My itinerary',
      subTitle:
        'You can choose to confirm and checkout, download or save for later.',
      backgroundImgSrc: '/imgs/travel_place_holder.jpg'
    };
  },
  computed: {
    ...mapGetters('itinerary', ['getItineraryErrors'])
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.itinerary-page {
  margin-top: 36px;
  &__error {
    color: $danger;
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    strong {
      font-weight: 800;
    }
  }
  .side-filter {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  @include query-660 {
    overflow: hidden;
    margin-top: 4px;
  }
}
</style>
