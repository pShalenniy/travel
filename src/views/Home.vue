<template>
  <div>
    <hero-panel class="home-page-hero" :data="hero" small-heading>
      <div class="text-center mt-2">
        <got-a-trip-booked></got-a-trip-booked>
        <new-to-gray-dawes v-if="homeNewToButton"></new-to-gray-dawes>
      </div>
    </hero-panel>
  </div>
</template>

<script>
import HeroPanel from '@/components/HeroPanel';
import GotATripBooked from '@/components/dialogs/home/GotATripBooked';
import NewToGrayDawes from '@/components/dialogs/home/NewToGrayDawes';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import { getRandomAbstractImage } from '@/utils/destinationImages';
import { theme } from '@/utils/theme';

export default {
  name: 'Home',
  components: {
    HeroPanel,
    GotATripBooked,
    NewToGrayDawes
  },
  data: () => ({
    hero: {
      title: `Business travel made<br> just the way you like it`,
      subTitle: `Personalised trip recommendations for the business traveller. Whether you are looking for a hotel, transfer or a restaurant recommendation, we have you covered.`,
      backgroundImgSrc: getRandomAbstractImage()
    },
    homeNewToButton: false
  }),
  created() {
    logAmplitudeEvent(amplitudeEvents.home.viewHomepage);
    this.homeNewToButton = theme.features.homeNewToButton;
  },
  metaInfo() {
    return {
      meta: [
        { name: 'robots', content: 'noindex' },
        { name: 'googlebot', content: 'noindex' }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.home-page-hero {
  height: calc(100vh - 174px);

  ::v-deep {
    .container {
      max-width: 564px;
    }
  }
}
</style>
