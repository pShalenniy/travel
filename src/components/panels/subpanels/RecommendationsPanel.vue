<template>
  <div>
    <div class="details-page__panel">
      <big-review-card></big-review-card>
    </div>
    <div class="details-page__panel">
      <h3 class="details-page__sub-title">Articles</h3>
      <article-card></article-card>
    </div>
    <reviews-panel :providers="getProviders" show-all></reviews-panel>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import fakeData from '@/fake-data';
import ReviewsPanel from './ReviewsPanel';
import ArticleCard from '@/components/cards/ArticleCard';
import BigReviewCard from '@/components/cards/BigReviewCard';
export default {
  name: 'RecommendationsPanel',
  mixins: [fakeData],
  components: {
    ReviewsPanel,
    ArticleCard,
    BigReviewCard
  },
  props: {
    data: {
      type: [Object, null]
    }
  },
  computed: {
    getProviders() {
      return this.data.providers || this.fakeProviders;
    }
  },
  methods: {
    ...mapActions('details', ['setSelectedKey'])
  }
};
</script>
