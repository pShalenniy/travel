<template>
  <router-link :to="getData.to">
    <v-hover v-slot:default="{ hover }" open-delay="5">
      <v-card class="card" :elevation="hover ? 3 : 0">
        <v-img class="card__img" :src="getData.image" height="185"></v-img>
        <div class="card__body">
          <div class="card__footer">
            <div class="card__author">
              <v-avatar size="32" class="mr-2">
                <v-img :src="getData.authorImage"></v-img>
              </v-avatar>
              {{ getData.author }}
            </div>
            <div class="card__title">
              {{ getData.title }}
            </div>
          </div>
        </div>
      </v-card>
    </v-hover>
  </router-link>
</template>
<script>
export default {
  name: 'ArticleCard',
  props: {
    data: {
      type: [Object, null]
    }
  },
  computed: {
    getData() {
      return {
        image: '/card_placeholder.png',
        title: 'Now, that’s wine!',
        author: 'Now, that’s wine!',
        authorImage: '/card_placeholder.png',
        to: '/',
        ...this.data
      };
    }
  },
  methods: {
    toggleSelected() {
      this.data.selected = !this.data.selected;
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.v-card {
  &.card {
    padding: 0;
    margin-bottom: 16px;
    &.selected {
      border-color: $text;
    }
  }
}
.card {
  font-size: 18px;
  line-height: 24px;
  &__img {
    border-bottom: 1px solid $border;
  }
  &__body {
    padding: 16px;
  }
  &__title {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 0;
    font-weight: 800;
    @include text-overflow();
  }
  &__author {
    display: flex;
    align-items: center;
    color: $light;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
  }
}
</style>
