<template>
  <div class="price">
    <div v-if="total" class="price__total">
      <div class="price__label">
        <strong>{{ currency + price.toLocaleString() }}</strong> / night
      </div>
      <strong>{{ currency + total.toLocaleString() }}</strong> total
    </div>
    <div v-else>
      <strong>{{ currency + price.toLocaleString() }}</strong> / per night*
    </div>
  </div>
</template>

<script>
export default {
  name: 'Price',
  props: {
    price: {
      type: [String, Number],
      required: true
    },
    currency: {
      type: [String],
      required: true
    },
    total: {
      type: [String, Number]
    },
    label: {
      type: [String, null]
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.price {
  font-size: 18px;
  line-height: 24px;
  text-align: right;
  white-space: nowrap;
  strong {
    font-weight: 800;
  }
  &__total {
    font-size: 24px;
    line-height: 28px;
  }
  &__label {
    color: $light;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 2px;
    font-weight: 600;
  }
}
</style>
