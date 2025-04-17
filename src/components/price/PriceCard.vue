<template>
  <v-card
    class="card-plan"
    :class="{
      'card-plan--inactive': data.inactive,
      'card-plan--active': data.active
    }"
  >
    <v-chip v-if="data.popular" color="third" dark>
      Most popular
    </v-chip>
    <v-card-title>
      {{ data.title }}
    </v-card-title>
    <v-card-text>
      <div class="card-plan__price">
        {{ isYearly ? data.priceYearly : data.price }}
        <small v-if="data.priceLabel">
          {{ data.priceLabel }}
        </small>
      </div>
      <v-subheader>
        {{ data.subTitle }}
      </v-subheader>
      <v-list flat dense>
        <v-list-item-group>
          <v-list-item v-for="(item, i) in data.advantages" :key="i">
            <v-list-item-icon>
              <v-icon size="24" color="primary">
                mdi-check
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-html="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :color="data.inactive ? 'black' : 'primary'"
        dark
        depressed
        rounded
        class="ml-auto"
        :class="{ disabled: data.disabled }"
      >
        {{ data.button }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PriceCard',
  props: {
    data: {
      type: [Object, null]
    },
    isYearly: {
      type: [Boolean, null],
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.card-plan {
  height: calc(100% - 16px);
  display: flex;
  flex-direction: column;
  max-width: 252px;
  margin: 0 auto 16px;
  padding: 0;
  overflow: visible;
  .v-card__title {
    font-size: 18px;
    line-height: 24px;
    padding-bottom: 4px;
  }
  .v-card__actions {
    margin-top: auto;
    padding: 16px;
    .v-btn {
      padding: 0 16px;
      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
  > .v-chip {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__price {
    color: $text;
    font-weight: 800;
    font-size: 32px;
    line-height: 48px;
    small {
      font-size: 14px;
      line-height: 19px;
      font-weight: normal;
    }
  }
  .v-subheader {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 18px;
    min-height: 36px;
  }
  .v-list {
    padding: 0;
    background-color: transparent;
  }
  .v-list-item {
    margin: 0 -16px;
    min-height: 34px;
    .v-list-item__icon {
      margin: 5px 8px 5px 0;
    }
    .v-list-item__title {
      font-size: 14px;
      white-space: normal;
    }
  }
  &--active {
    box-shadow: 0 2px 50px 0 rgba($text, 0.1);
  }
  &--inactive {
    background-color: $lightBg;
    .card-plan__price {
      color: $light;
    }
    .v-card__actions {
      .v-btn {
        pointer-events: none;
      }
    }
  }
  @include query-660 {
    max-width: 330px;
    height: auto;
    > .v-chip {
      position: absolute;
      top: 0;
      left: auto;
      right: 0;
      transform: translate(0, -4px);
    }
    .v-subheader {
      min-height: auto;
    }
  }
}
</style>
