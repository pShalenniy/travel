<template>
  <router-link to="/destination/france/paris" class="">
    <v-hover v-slot:default="{ hover }" open-delay="5">
      <v-card class="card-destination" :elevation="hover ? 3 : 0">
        <v-img
          :src="data.image"
          aspect-ratio="1"
          class="white--text align-center justify-center"
          gradient="to bottom, rgba(52,52,57,.3), rgba(52,52,57,.3)"
        >
          <v-card-title v-text="data.title"></v-card-title>
        </v-img>
      </v-card>
    </v-hover>
  </router-link>
</template>
<script>
export default {
  name: 'DestinationCard',
  props: {
    data: {
      type: [Object, null]
    }
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.card-destination {
  &.v-card {
    padding: 0;
    border: 0;
  }
  .v-responsive__content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .v-card__title {
    font-weight: 800;
    font-size: 32px;
    line-height: 43px;
    text-align: center;
    word-break: normal;
    @include query-1199 {
      font-size: 24px;
      line-height: 28px;
    }
    @include query-991 {
      font-size: 20px;
      line-height: 24px;
    }
  }
}
</style>
