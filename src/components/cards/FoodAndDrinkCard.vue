<template>
  <router-link :to="showDetailsRoute()" class="">
    <v-hover v-slot:default="{ hover }" open-delay="5">
      <v-card class="card" :elevation="hover ? 12 : 0">
        <div class="card__img">
          <v-img :src="getImage()" height="244"></v-img>
          <v-chip
            class="card__label"
            color="secondary"
            v-if="isPopularWithColleagues()"
          >
            Popular with Colleagues
          </v-chip>
          <v-chip class="card__rating" color="white">
            <v-icon size="20" color="primary">
              mdi-map-marker
            </v-icon>
            <span>{{ getRating() }}</span>
          </v-chip>
          <v-btn
            icon
            color="white"
            class="card__like"
            large
            @click="likeHandle"
          >
            <v-icon size="24">
              mdi-heart-outline
            </v-icon>
          </v-btn>
          <v-btn
            icon
            color="white"
            class="card__unlike"
            large
            @click="downVoteHandle"
          >
            <v-icon size="24">
              mdi-thumb-down-outline
            </v-icon>
          </v-btn>
        </div>
        <div class="card__body--wrapper">
          <div class="card__body">
            <h3 class="card__title">
              {{ item.name }}
            </h3>
            <div class="card__sub-title">
              <!--5-star-->
              {{ getCuisineType() }}
            </div>
            <div class="card__info">
              <div class="card__caption">
                {{ getAddress() }}
              </div>
              <div class="card__price card__sub-title">
                {{ getPriceRange() }}
              </div>
            </div>
            <div class="card__activity">
              <v-btn
                color="text"
                outlined
                depressed
                rounded
                @click="addToItineraryHandle"
              >
                Add to itinerary
              </v-btn>
              <v-btn color="primary" depressed rounded @click="bookHandle">
                Book
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-hover>
  </router-link>
</template>
<script>
export default {
  name: 'FoodAndDrinkCard',
  props: {
    data: {
      type: [Object, null]
    }
  },
  computed: {
    item() {
      return {
        ...this.data
      };
    }
  },
  methods: {
    getImage() {
      return this.item.thumbnailUrl || '/card_placeholder.png';
    },
    getAddress() {
      try {
        switch (this.item.source) {
          case 'zomato':
            return JSON.parse(this.item.detailedInfo)['location']['locality'];
          default:
            return this.item.address || 'Foz do Douro';
        }
      } catch (error) {
        return '';
      }
    },
    getRating() {
      let rating = this.item.rating || 4.9;
      let multiplier = rating >= 1 ? 1 : 100;
      return Math.round(rating * multiplier).toFixed(1);
    },
    getDescription() {
      return this.item.shortDescription || 'Excellent place to discover';
    },
    showDetailsRoute() {
      return `/details/${this.item.slug}`;
    },
    likeHandle(e) {
      e.preventDefault();
      console.log('like');
    },
    downVoteHandle(e) {
      e.preventDefault();
      console.log('down vote');
    },
    addToItineraryHandle(e) {
      e.preventDefault();
      console.log('addToItinerary');
    },
    bookHandle(e) {
      e.preventDefault();
      console.log('booked');
    },
    getCuisineType() {
      try {
        switch (this.item.source) {
          case 'zomato':
            return JSON.parse(this.item.detailedInfo)['cuisines'];
          default:
            return '';
        }
      } catch (error) {
        return '';
      }
    },
    getPriceRange() {
      try {
        switch (this.item.source) {
          case 'zomato':
            var parsed = JSON.parse(this.item.detailedInfo);
            var priceRangeNumeric = parsed['price_range'];
            var currency = parsed['currency'];
            var priceRangeCaptioned = currency;
            for (var i = 1; i < priceRangeNumeric; i++) {
              priceRangeCaptioned += currency;
            }
            return priceRangeCaptioned;
          default:
            return '';
        }
      } catch (error) {
        return '';
      }
    },
    isPopularWithColleagues() {
      return this.item.popularWithColleagues;
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.v-card {
  &.card {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    &.active {
      border-color: $primary;
    }
  }
}
.card {
  &__img {
    position: relative;
  }
  &__body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: 100%;
    &--wrapper {
      flex-basis: 0;
      flex-grow: 1;
    }
  }
  &__label {
    position: absolute;
    left: 8px;
    top: 8px;
  }
  &__rating {
    position: absolute;
    right: 8px;
    top: 8px;
    font-size: 14px;
    line-height: 19px;
    font-weight: bold;
    padding: 0 8px 0 4px;
    border: 1px solid $border;
    span {
      color: $primary;
    }
  }
  &__like {
    position: absolute;
    left: 8px;
    bottom: 8px;
    background-color: rgba($text, 0.5);
  }
  &__unlike {
    position: absolute;
    right: 8px;
    bottom: 8px;
    background-color: rgba($text, 0.5);
  }
  &__title {
    font-size: 24px;
    line-height: 32px;
    font-weight: 800;
    @include text-overflow(2);
    max-height: 64px;
  }
  &__sub-title {
    font-size: 18px;
    line-height: 24px;
    color: $light;
    @include text-overflow(2);
    max-height: 48px;
    margin-bottom: 4px;
  }
  &__info {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }
  &__price {
    font-size: 18px;
    line-height: 24px;
  }
  &__caption {
    font-size: 14px;
    line-height: 19px;
  }
  &__activity {
    display: flex;
    justify-content: space-between;
  }
  @include query-1199 {
    &__title {
      font-size: 20px;
      line-height: 24px;
      max-height: 48px;
    }
  }
}
</style>
