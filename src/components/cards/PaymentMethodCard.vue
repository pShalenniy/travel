<template>
  <v-card class="payment-card">
    <v-img
      class="payment-card__img"
      :src="data.image"
      height="46"
      width="66"
    ></v-img>
    <div>
      <div class="payment-card__holder">
        {{ data.holder }}
      </div>
      <div class="payment-card__title">
        {{ data.title }}
      </div>
      <div class="payment-card__expires">
        {{ data.expires }}
      </div>
    </div>

    <div v-if="data.type" class="payment-card__type">
      {{ data.type }}
    </div>
    <v-btn color="primary" text class="px-0">
      Edit
    </v-btn>
  </v-card>
</template>
<script>
export default {
  name: 'PaymentMethodCard',
  props: {
    data: {
      type: [Object, null]
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.payment-card {
  display: grid;
  grid-gap: 12px 16px;
  grid-template-columns: auto 1fr;
  font-size: 14px;
  line-height: 19px;
  &.v-card {
    box-shadow: none;
  }
  &__img {
    border-radius: 0 !important;
  }
  &__holder {
    font-weight: 800;
    margin-bottom: 2px;
  }
  &__title {
    font-weight: 600;
    margin-bottom: 3px;
  }
  &__expires {
    color: $light;
  }
  &__type {
    color: $light;
    align-self: flex-end;
  }
  .v-btn {
    margin-left: auto;
    height: auto;
    min-width: auto;
    grid-column-start: 2;
  }
}
</style>
