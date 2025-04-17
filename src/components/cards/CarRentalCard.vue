<template>
  <dialog-full-size :title="data.title">
    <template v-slot:activator="{ on, attrs }">
      <v-card class="card" v-bind="attrs" v-on="on">
        <v-img class="card__img" :src="getData.image" height="185"></v-img>
        <div class="card__footer">
          <div class="card__title">
            {{ getData.title }}
          </div>
          <div class="card__info">
            {{ getData.info }}
          </div>
          <div class="card__price">
            £
            <strong>{{ getData.price }}</strong>
          </div>
        </div>
      </v-card>
    </template>
    <car-dialog :data="data"></car-dialog>
  </dialog-full-size>
</template>
<script>
import DialogFullSize from '@/components/dialogs/DialogFullSize';
import CarDialog from '@/components/dialogs/CarDialog';
export default {
  name: 'CarRentalCard',
  props: {
    data: {
      type: [Object, null]
    }
  },
  components: {
    DialogFullSize,
    CarDialog
  },
  computed: {
    getData() {
      return {
        image: '/card_placeholder.png',
        title: 'Premium saloon',
        info: '4 people, 3 bags',
        price: 10,
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
    overflow: hidden;
    background-color: #fff;
    color: $text;
    transition: all 0.2s;
    padding: 0;
    margin-bottom: 16px;
    border: 1px solid $border;
    box-shadow: none;
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
  &__footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 16px;
  }
  &__title {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 0;
    font-weight: 800;
    @include text-overflow();
  }
  &__info {
    margin-right: auto;
    color: $light;
  }
  &__price {
    display: flex;
  }
}
</style>
