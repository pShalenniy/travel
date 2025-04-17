<template>
  <div class="price-dialog">
    <div class="text-center">
      <h1 class="price-dialog__title">Supercharge your business travel ⚡</h1>
      <div class="price-dialog__sub-title">
        Enhance the way you plan and book your business trips.
      </div>
      <div class="light--text">
        Pay with Yearly, and save £480!
      </div>
      <div class="price-dialog__plan-long">
        <span :class="{ 'primary--text': !planYearly }">
          Monthly
        </span>
        <v-switch v-model="planYearly" inset></v-switch>
        <span :class="{ 'primary--text': planYearly }">
          Yearly
        </span>
      </div>
    </div>
    <v-row justify="center" class="mb-12">
      <v-col cols="12" sm="auto" class="py-0">
        <price-card :data="cards.personal"></price-card>
      </v-col>
      <v-col cols="12" sm="auto" class="py-0">
        <price-card :data="cards.plus" :isYearly="planYearly"></price-card>
      </v-col>
      <v-col cols="12" sm="auto" class="py-0">
        <price-card :data="cards.enterprise"></price-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PriceCard from './PriceCard';
export default {
  name: 'PriceDialog',
  components: {
    PriceCard
  },
  data: () => ({
    planYearly: true,
    cards: {
      personal: {
        disabled: true,
        title: 'Personal',
        price: 'Free',
        subTitle: 'Best for individuals',
        advantages: [
          'Personalised travel recommendations',
          'Customise your preferences',
          'Destination guides',
          'Build your own itinerary',
          'Save favourites for later',
          'Review your trips'
        ],
        button: 'Start with Free'
      },
      plus: {
        popular: true,
        active: true,
        title: 'Plus',
        price: '£235',
        priceYearly: '£195',
        priceLabel: '/ business / month',
        subTitle: 'Best for teams and those booking travel for multiple people',
        advantages: [
          `<strong>Everything in Personal</strong>`,
          'Team management and booking',
          'Access to your past trips',
          'Automated itinerary builder',
          'Unlimited team members',
          '30 day free trial'
        ],
        button: 'Try for free'
      },
      enterprise: {
        inactive: true,
        title: 'Enterprise',
        price: 'Coming soon',
        subTitle: 'Best for businesses that need travel insights and reporting',
        advantages: [
          `<strong>Everything in Plus</strong>`,
          'Comprehensive travel analytics and reporting tools for your business.'
        ],
        button: 'Contact us'
      }
    }
  })
};
</script>

<style lang="scss">
@import 'src/scss/utils/__utils';
.price-dialog {
  &__title {
    color: #000;
    font-weight: 800;
    font-size: 32px;
    line-height: 33px;
    margin-bottom: 8px;
  }
  &__sub-title {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 32px;
  }
  &__plan-long {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    margin: 8px 0 44px;
    .primary--text {
      font-weight: bolder;
      color: $primary;
    }
    > .v-input {
      margin: 0 8px 0 16px !important;
      padding: 0;
      .v-messages {
        display: none;
      }
      .v-input--selection-controls__input {
        margin: 0;
      }
    }
  }
  .theme--light.v-input--switch {
    .v-input--switch__track {
      color: $text;
      opacity: 1;
    }
    .v-input--switch__thumb {
      color: #fff !important;
    }
  }
  @include queryMax(959px) {
    &__title {
      font-size: 24px;
      line-height: 32px;
    }
    &__plan-long {
      margin-bottom: 24px;
    }
  }
}
</style>
