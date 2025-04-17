<template>
  <v-card class="review-card">
    <v-row>
      <v-col cols="5" class="py-0">
        <div class="review-card__title">
          <v-avatar class="review-card__image" size="32">
            <v-img :src="data.image"></v-img>
          </v-avatar>
          {{ data.name }}
        </div>
        <div class="review-card__rating">
          {{ data.rating }}
          <v-rating
            :value="data.rating"
            class="ml-2"
            color="#ffc255"
            size="18"
            background-color="#fff2dd"
            empty-icon="mdi-star"
            half-increments
            readonly
          ></v-rating>
        </div>
      </v-col>
      <v-col cols="7" class="py-0">
        <icons-list :data="data.goodies"></icons-list>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import IconsList from '@/components/lists/IconsList';
export default {
  name: 'ReviewCard',
  components: {
    IconsList
  },
  props: {
    data: {
      type: [Object, null]
    }
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.v-card {
  &.review-card {
    overflow: hidden;
    background-color: #fff;
    color: $text;
    transition: all 0.2s;
    padding: 16px;
    margin-bottom: 16px;
    border: 1px solid $border;
    box-shadow: none !important;
    &.selected {
      border-color: $text;
    }
  }
}
.review-card {
  &__title {
    margin-bottom: 24px;
    color: $light;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    font-weight: 600;
    .v-icon {
      margin-right: 8px;
      border: 1px solid $border;
      border-radius: 100%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
  }
  &__image {
    margin-right: 8px;
    border: 1px solid $border;
  }
  &__rating {
    font-size: 24px;
    line-height: 1;
    display: flex;
    font-weight: 600;
    align-items: flex-end;
    .v-rating .v-icon {
      padding: 0;
    }
  }
}
</style>
