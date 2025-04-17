<template>
  <div>
    <hero-panel :data="hero" small-heading>
      <search-destination
        v-model="destinationModel"
        solo
        outlined
        placeholder="Start typing to Search"
        prepend-inner-icon="mdi-magnify"
        class="search-input"
      ></search-destination>
    </hero-panel>
    <v-container class="mb-12">
      <h2 class="homepage-grid__title">
        Top destinations for you
      </h2>
      <div class="homepage-grid">
        <destination-card
          v-for="card in fakeDestination"
          :key="card.id"
          :data="card"
        ></destination-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import HeroPanel from '@/components/HeroPanel';
import SearchDestination from '@/components/destination/SearchDestination';
import DestinationCard from '@/components/cards/DestinationCard';
import { getNavigateToDestinationParams } from '@/utils/destinationSearchUtils';
import { getRandomAbstractImage } from '@/utils/destinationImages';
import router from '@/router';

export default {
  name: 'HomeDestination',
  components: {
    HeroPanel,
    SearchDestination,
    DestinationCard
  },
  data: () => ({
    hero: {
      title: `Where’s business<br> taking you next?`,
      backgroundImgSrc: getRandomAbstractImage()
    }
  }),
  computed: {
    destinationModel: {
      get() {
        return '';
      },
      set(value) {
        const params = getNavigateToDestinationParams(this.$route, value);
        if (params) {
          router.push(params);
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.homepage-grid {
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(4, 1fr);
  > * {
    min-width: 1px;
  }
  &__title {
    font-size: 32px;
    line-height: 33px;
    font-weight: 600;
    margin: 68px 0 48px;
    text-align: center;
  }
  @include query-1199 {
    grid-gap: 20px;
  }
  @include query-991 {
    grid-gap: 12px;
  }
  @include query-767 {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    &__title {
      font-size: 24px;
      line-height: 32px;
      margin: 32px 0 32px;
      text-align: center;
    }
  }
}
.search-input {
  width: 420px;
  max-width: 100%;
  &.v-text-field {
    margin: 40px auto 0;
  }
  .v-input__prepend-inner {
    margin-top: 4px !important;
  }
}
</style>
