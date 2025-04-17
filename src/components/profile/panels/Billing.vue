<template>
  <div>
    <div class="details-page__panel">
      <v-subheader>Your pricing plan</v-subheader>
      <v-row>
        <v-col cols="12" md="6" class="py-0">
          <v-card class="current-plan-card">
            <div class="current-plan-card">Plus</div>
            <div class="current-plan-card__price">
              <span>£<strong>195</strong></span>
              / month
            </div>
            <div class="current-plan-card__text">
              You are on the <strong>Plus plan</strong>, at £2,340 per year.
            </div>
            <dialog-full-size footer title="Pricing plans">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  rounded
                  depressed
                  v-bind="attrs"
                  v-on="on"
                >
                  Change plan
                </v-btn>
              </template>
              <price-dialog></price-dialog>
            </dialog-full-size>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="details-page__panel">
      <v-subheader>Payment methods</v-subheader>
      <v-row>
        <v-col
          v-for="(item, index) in fakePaymentsCards"
          :key="index"
          cols="12"
          md="6"
          class="py-0 mb-3"
        >
          <payment-method-card :data="item"></payment-method-card>
        </v-col>
        <v-col cols="12" md="6" class="py-0 mb-3">
          <payment-method-card-add
            title="Add new payment method"
          ></payment-method-card-add>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import fakeData from '@/fake-data';
import DialogFullSize from '@/components/dialogs/DialogFullSize';
import PaymentMethodCard from '@/components/cards/PaymentMethodCard';
import PriceDialog from '@/components/price/PriceDialog';
import PaymentMethodCardAdd from '@/components/cards/PaymentMethodCardAdd';
export default {
  name: 'Billing',
  mixins: [fakeData],
  components: {
    DialogFullSize,
    PaymentMethodCard,
    PriceDialog,
    PaymentMethodCardAdd
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.v-subheader {
  padding: 0;
  margin-bottom: 8px;
  height: auto;
}
.current-plan-card {
  display: grid;
  grid-gap: 24px 40px;
  grid-template-columns: 1fr auto;
  font-size: 14px;
  line-height: 19px;
  &.v-card {
    box-shadow: none;
  }
  &__price {
    text-align: right;
    span {
      font-size: 18px;
    }
    strong {
      font-weight: 800;
    }
  }
  &__text {
    color: $light;
    strong {
      font-weight: 600;
    }
  }
}
</style>
