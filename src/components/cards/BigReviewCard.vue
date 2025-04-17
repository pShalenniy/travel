<template>
  <v-card class="card-review">
    <div class="card-review__heading">
      <div class="card-review__rating">
        <v-icon color="primary" class="card__icon">
          mdi-map-marker
        </v-icon>
        {{ getPData.rating }}
      </div>
      <v-progress-circular
        :indeterminate="false"
        :size="48"
        :value="getPData.score"
        :width="3"
        :rotate="270"
        color="primary"
      >
        <span class="details-page__score-title">
          {{ getPData.score }}
        </span>
      </v-progress-circular>
    </div>
    <div class="card-review__title">
      {{ getPData.title }}
    </div>
    <div class="card-review__text">
      {{ getPData.text }}
    </div>
    <div class="card-review__advantages">
      <div v-for="(item, index) in getPData.advantages" :key="index">
        {{ item }}
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'BigReviewCard',
  props: {
    data: {
      type: [Object, null]
    }
  },
  computed: {
    getPData() {
      return {
        title: 'The best in Porto',
        rating: 4.6,
        score: 92,
        text:
          'We highly recommend this hotel, you will not be disappointed. With a Travel score of 4.6, it’s a top choice. With a 92% match, it definitely the right fit! ',
        advantages: [
          '#1 most booked with your colleagues to Porto',
          '#3 most booked with all business trips to Porto',
          '#2 most booked for your industry to Porto'
        ],
        ...this.data
      };
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.card-review {
  font-size: 14px;
  line-height: 19px;
  &.v-card {
    box-shadow: none;
  }
  &__heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    color: $primary;
    margin-bottom: 5px;
  }
  &__rating {
    font-weight: 800;
    font-size: 32px;
    line-height: 44px;
    display: flex;
    align-items: center;
    .v-icon {
      font-size: 36px;
      width: 26px;
      margin-right: 8px;
    }
  }
  &__title {
    font-size: 18px;
    line-height: 19px;
    font-weight: 800;
    margin-bottom: 8px;
  }
  &__text {
  }
  &__advantages {
    margin-top: 16px;
    color: $light;
    > div + div {
      margin-top: 8px;
    }
  }
}
</style>
