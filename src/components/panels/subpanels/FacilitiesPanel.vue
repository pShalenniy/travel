<template>
  <div v-if="getHotelFacilities">
    <div v-if="!showAll" class="details-page__panel">
      <div v-if="getHotelFacilitiesPopular.length" class="facilities">
        <h3 class="details-page__sub-title">
          Popular Facilities
        </h3>
        <icons-checked-list
          :data="getHotelFacilitiesPopular"
          :columns="2"
        ></icons-checked-list>
      </div>

      <div v-if="getSafetyFacilities.length" class="facilities">
        <h3 class="details-page__sub-title">
          Cleaning & Safety Measures
        </h3>
        <icons-checked-list
          :data="getSafetyFacilities"
          :columns="2"
        ></icons-checked-list>
      </div>

      <div
        v-if="!getHotelFacilitiesPopular.length && !getSafetyFacilities.length"
        class="facilities"
      >
        <h3 class="details-page__sub-title">
          Facilities
        </h3>

        <v-row class="facilities__row">
          <v-col
            v-for="(item, index) in getOtherFacilities"
            :key="index"
            cols="6"
          >
            <div class="facilities__title">
              <v-icon v-if="item.icon" size="18">{{ item.icon }}</v-icon>
              {{ item.title }}
            </div>
            <icons-checked-list :data="item.items"></icons-checked-list>
          </v-col>
        </v-row>
      </div>

      <div class="text-center">
        <v-btn text color="primary" @click="viewMoreFacilities()">
          View more facilities
        </v-btn>
      </div>
      <div class="details-page__hr"></div>
    </div>
    <template v-if="showAll">
      <div v-if="getOtherFacilities.length" class="facilities">
        <h3 class="details-page__sub-title">
          All Facilities
        </h3>

        <v-row class="facilities__row">
          <v-col
            v-for="(item, index) in getOtherFacilities"
            :key="index"
            cols="6"
          >
            <div class="facilities__title">
              <v-icon v-if="item.icon" size="18">{{ item.icon }}</v-icon>
              {{ item.title }}
            </div>
            <icons-checked-list :data="item.items"></icons-checked-list>
          </v-col>
        </v-row>
      </div>
      <div v-if="getSafetyFacilities.length" class="facilities">
        <h3 class="details-page__sub-title">
          Cleaning & Safety Measures
        </h3>

        <v-row class="facilities__row">
          <v-col
            v-for="(item, index) in getSafetyFacilities"
            :key="index"
            cols="6"
          >
            <div class="facilities__title">
              <v-icon v-if="item.icon" size="18">{{ item.icon }}</v-icon>
              {{ item.title }}
            </div>
            <icons-checked-list :data="item.items"></icons-checked-list>
          </v-col>
        </v-row>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import IconsCheckedList from '@/components/lists/IconsCheckedList';
import {
  findFacilitiesPopular,
  safetyFacilitiesNumbers
} from '@/utils/facilities';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';
import { connectors } from '@/utils/connectors';

export default {
  name: 'FacilitiesPanel',
  props: {
    showAll: {
      type: [Boolean, null]
    }
  },
  components: {
    IconsCheckedList
  },
  computed: {
    ...mapGetters('details', ['getHotelDetails', 'getHotelAmplitudeOptions']),
    ...mapGetters('facilities', ['getHotelFacilityById']),
    ...mapGetters('hotelDetails', {
      getHotelFacilities: 'getHotelFacilities',
      getHotelFacilitiesLoading: 'getHotelFacilitiesLoading'
    }),
    getAllFacilitiesGrouped() {
      if (this.getHotelDetails.source === connectors.zentrumhub) {
        const hotelFacilityTypes = this.getHotelFacilities.map(item => ({
          ...item,
          checked: true,
          groupId: item.groupId,
          title: item.name,
          label: item.attrs && item.attrs.join(', ')
        }));

        const hotelFacilityTypesGrouped = _groupBy(
          hotelFacilityTypes,
          item => item.groupId
        );

        return Object.values(hotelFacilityTypesGrouped).map(item => {
          const facilityGroup = this.getHotelFacilityById(item[0].groupId);
          return {
            checked: true,
            title: (facilityGroup && facilityGroup.name) || 'General',
            items: item
          };
        });
      } else if (this.getHotelDetails.source === connectors.booking) {
        const hotelFacilityTypes = this.getHotelDetails.hotelFacilities.map(
          item => ({
            ...item,
            checked: true,
            title: item.name,
            label: item.attrs && item.attrs.join(', ')
          })
        );

        const hotelFacilityTypesGrouped = _groupBy(
          hotelFacilityTypes,
          item => item.facility_type.facility_type_id
        );

        return Object.values(hotelFacilityTypesGrouped).map(item => {
          const group = item[0].facility_type;

          return {
            ...group,
            checked: true,
            title: group.name,
            groupId: group.hotel_facility_type_id,
            items: item
          };
        });
      }

      return [];
    },
    getHotelFacilitiesPopular() {
      if (this.getHotelDetails.source === connectors.zentrumhub) {
        return findFacilitiesPopular(
          this.getHotelFacilities,
          connectors.zentrumhub
        );
      } else if (this.getHotelDetails.source === connectors.booking) {
        return findFacilitiesPopular(
          this.getHotelFacilities.map(item => ({
            ...item,
            groupId: item.hotel_facility_type_id
          })),
          connectors.booking
        );
      }
      return [];
    },
    getSafetyFacilities() {
      const facilities = this.getAllFacilitiesGrouped.filter(item =>
        safetyFacilitiesNumbers.includes(item.facility_type_id)
      );

      return _sortBy(facilities, [
        item => {
          return -1 * item.items.length;
        }
      ]);
    },
    getOtherFacilities() {
      const facilities = this.getAllFacilitiesGrouped.filter(
        item => !safetyFacilitiesNumbers.includes(item.facility_type_id)
      );

      const facilitiesGrouped = [
        ...facilities.filter(item => item.items.length > 2),
        {
          ...facilities
            .filter(item => item.items.length <= 2)
            .reduce((accumulator, currentValue) => {
              return {
                ...accumulator,
                items: [...accumulator.items, ...currentValue.items]
              };
            }),
          title: 'Other facilities'
        }
      ];

      return _sortBy(facilitiesGrouped, [
        item => {
          return -1 * item.items.length;
        }
      ]);
    }
  },
  methods: {
    ...mapActions('details', ['setSelectedKey']),
    viewMoreFacilities() {
      logAmplitudeEvent(
        amplitudeEvents.hotelDetails.viewMoreFacilities,
        this.getHotelAmplitudeOptions
      );
      this.setSelectedKey('facilities');
    }
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.facilities {
  &:not(:last-child) {
    margin-bottom: 24px;
  }
  &__title {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 8px;
    font-weight: 600;
    .v-icon {
      margin-right: 8px;
    }
  }
  &__row {
    .v-list {
      margin-left: 16px;
      margin-bottom: 6px;

      .v-list-item {
        margin-bottom: 3px !important;
      }
    }
  }
}
</style>
