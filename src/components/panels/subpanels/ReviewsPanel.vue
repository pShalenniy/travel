<template>
  <div class="details-page__panel">
    <h3 class="details-page__sub-title">Recommendations</h3>
    <review-card
      v-for="(provider, i) in showItems"
      :key="i"
      :data="provider"
    ></review-card>
    <div v-if="!showAll" class="mt-10 text-center">
      <v-btn text color="primary" @click="setSelectedKey('recommendations')">
        View more recommendations
      </v-btn>
    </div>
    <div v-if="!showAll" class="details-page__hr"></div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import ReviewCard from '../../cards/ReviewCard';
export default {
  name: 'ReviewsPanel',
  components: {
    ReviewCard
  },
  props: {
    providers: {
      type: [Array, null]
    },
    showAll: {
      type: [Boolean, null]
    }
  },
  computed: {
    showItems() {
      return this.showAll ? this.providers : this.providers.slice(0, 2);
    }
  },
  methods: {
    ...mapActions('details', ['setSelectedKey'])
  }
};
</script>
