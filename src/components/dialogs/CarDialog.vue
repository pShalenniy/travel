<template>
  <div class="car-dialog">
    <v-row>
      <v-col class="col-350">
        <icons-list
          :data="getData.goodies"
          class="car-dialog__goodies"
        ></icons-list>

        <div class="car-dialog__list">
          <div class="car-dialog__list--title">Total price includes</div>
          <div
            v-for="(item, index) in getData.priceIncludes"
            :key="index"
            class="car-dialog__list--item"
          >
            {{ item }}
          </div>
        </div>

        <div class="car-dialog__list">
          <div class="car-dialog__list--title">Total price excludes</div>
          <div
            v-for="(item, index) in getData.priceExcludes"
            :key="index"
            class="car-dialog__list--item"
          >
            {{ item }}
          </div>
        </div>

        <div class="car-dialog__actions">
          <price
            class="mr-auto"
            :price="getData.totalPrice"
            currency="£"
            :label="`<strong>Total</strong> for ${getData.days} days`"
          ></price>
          <v-btn color="border" outlined rounded depressed>
            Add to itinerary
          </v-btn>
          <v-btn color="primary" rounded depressed>
            Book
          </v-btn>
        </div>
      </v-col>
      <v-col>
        <v-img class="car-dialog__gallery" :src="getData.image"></v-img>
        <div class="car-dialog__title">
          {{ getData.title }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import fakeData from '@/fake-data';
import IconsList from '@/components/lists/IconsList';
export default {
  name: 'CarDialog',
  mixins: [fakeData],
  props: {
    data: {
      type: Object,
      required: true
    },
    subTitle: {
      type: [String, null]
    }
  },
  components: {
    IconsList
  },
  computed: {
    getData() {
      return {
        ...this.fakeCar,
        ...this.data
      };
    }
  }
};
</script>

<style lang="scss">
@import 'src/scss/utils/__utils';
.car-dialog {
  font-size: 14px;
  line-height: 18px;
  .col-350 {
    flex: 0 0 380px;
    max-width: 380px;
    & + .col {
      max-width: calc(100% - 380px);
      align-self: flex-start;
    }
  }
  &__title {
    margin: 16px 0;
    text-align: center;
  }
  &__goodies {
    margin-bottom: 24px;
    .v-item-group {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      .v-list-item {
        flex: 0 0 50%;
        width: 50%;
        max-width: 50%;
        padding-right: 12px;
        &:nth-child(2n) {
          padding-right: 0;
          padding-left: 12px;
        }
      }
    }
  }
  &__list {
    margin-bottom: 32px;
    &--title {
      margin-bottom: 8px;
      font-weight: 600;
    }
    &--item {
      color: $light;
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
  &__actions {
    padding: 8px 0 16px;
    display: flex;
    align-items: flex-end;
    .v-btn {
      margin-left: 8px;
    }
  }
  &__gallery {
    border-radius: 10px;
    .v-btn {
      width: 48px;
      height: 48px;
      background-color: #fff;
      border: 1px solid $border;
      &.theme--dark {
        color: $text;
      }
      .v-icon {
        font-size: 24px !important;
      }
      &:hover {
        background-color: rgba(#fff, 0.8);
      }
    }
  }
  @include queryMax(959px) {
    .col-350 {
      flex: 0 0 100%;
      max-width: 100%;
      order: 2;
      & + .col {
        flex: 0 0 100%;
        max-width: 100%;
        align-self: flex-start;
        padding: 0;
      }
    }
    &__gallery {
      border-radius: 0;
      margin-bottom: 24px;
      max-height: 70vw;
      .v-window__container {
        max-height: 100%;
      }
      .v-image {
        max-height: 70vw;
      }
      .v-btn {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
