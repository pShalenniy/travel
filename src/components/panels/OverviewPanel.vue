<template>
  <div>
    <attrs-panel></attrs-panel>
    <facilities-panel></facilities-panel>
    <location-panel></location-panel>
    <rooms-panel></rooms-panel>
    <!--<reviews-panel :providers="[]" class="d-none"></reviews-panel>-->
    <div v-if="getThingsToKnow" class="details-page__panel">
      <h3 class="details-page__sub-title">Things to know</h3>
      <icons-list :data="getThingsToKnow"></icons-list>
    </div>
    <div
      v-if="
        getHotelPoliciesLoading ||
          (getHotelPolicies && !!getHotelPolicies.length)
      "
      class="details-page__panel"
    >
      <h3 class="details-page__sub-title">Things to know</h3>
      <v-progress-circular
        v-if="getHotelPoliciesLoading"
        :indeterminate="true"
        width="5"
        rotate="25"
        color="grey darken-4"
      ></v-progress-circular>
      <icons-list v-else :data="getHotelZHPolicies"></icons-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'OverviewPanel',
  props: {
    data: {
      type: [Object, null]
    }
  },
  components: {
    AttrsPanel: () => import('./subpanels/AttrsPanel'),
    FacilitiesPanel: () => import('./subpanels/FacilitiesPanel'),
    LocationPanel: () => import('./subpanels/LocationPanel'),
    // ReviewsPanel: () => import('./subpanels/ReviewsPanel'),
    RoomsPanel: () => import('./subpanels/RoomsPanel'),
    IconsList: () => import('@/components/lists/IconsList')
  },
  computed: {
    ...mapGetters('details', ['getThingsToKnow', 'getHotelRoomsAvailable']),
    ...mapGetters('hotelDetails', {
      getHotelPolicies: 'getHotelPolicies',
      getHotelPoliciesLoading: 'getHotelPoliciesLoading'
    }),
    getHotelZHPolicies() {
      if (!this.getHotelRoomsAvailable.length) {
        return this.getHotelPolicies;
      }

      const policyIcons = {
        'Check-in': 'mdi-clock-outline',
        'Check-out': 'mdi-clock-outline'
        // 'Check-in Instruction': 'mdi',
        // 'Special Check-in Instruction': 'mdi',
        // 'Know Before You Go': 'mdi',
        // 'Mandatory Fee': 'mdi',
        // 'Optional Fee': 'mdi'
      };

      const checkinPolicies = this.getHotelRoomsAvailable[0].rooms[0].rateInfo
        .policies;

      return [
        ...checkinPolicies
          .map(item => {
            return {
              icon: policyIcons[item.type],
              title: item.text
            };
          })
          .filter(item => item.icon),
        ...this.getHotelPolicies
      ];
    }
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.v-application {
  .details-page {
    &__card-small {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__links {
      margin-bottom: 56px;
      padding: 12px 0;
    }
    &__link {
      cursor: pointer;
      font-size: 14px;
      line-height: 19px;
      font-weight: 600;
      color: $text;
      display: inline-flex;
      align-items: center;
      &:not(:last-child) {
        margin-right: 14px;
      }
      > span {
        transition: $transition;
        text-decoration: underline;
      }
      &:hover {
        > span {
          text-decoration-color: transparent;
        }
      }
    }
    &__title {
      font-size: 32px;
      line-height: 33px;
      font-weight: 800;
      margin-bottom: 8px;
    }
    &__title-light {
      color: $light;
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 24px;
    }
    &__text {
      font-size: 14px;
      line-height: 19px;
      margin-bottom: 4px;
      &:not(.text-full) {
        max-height: 57px;
        @include text-overflow(3);
      }
      p:last-child {
        margin-bottom: 0;
      }
    }
    &__panel {
      margin-bottom: 56px;
    }
    &__rating-title {
      color: $primary;
      font-size: 32px;
      line-height: 48px;
      font-weight: bold;
    }
    &__score-title {
      color: $primary;
      font-size: 24px;
      line-height: 1;
      font-weight: bold;
    }
    &__hr {
      border-bottom: 1px solid $border;
      margin: 8px 0 0;
    }
    &__sub-title {
      font-size: 18px;
      line-height: 24px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    &__popover {
      padding: 16px;
      max-width: 200px;
      background-color: #fff;
      font-size: 14px;
      line-height: 19px;
      margin-top: -5px;
      font-weight: 600;
    }
    .v-progress-circular__underlay {
      stroke-width: 2px;
    }
    .v-progress-circular__overlay {
      stroke-linecap: round;
    }
    @include query-660 {
      .filter-chip {
        display: none;
      }
      &__links {
        text-align: center;
        margin-bottom: 32px;
        padding-top: 0;
      }
      &__title {
        font-size: 24px;
        line-height: 32px;
      }
    }
  }
}
</style>
