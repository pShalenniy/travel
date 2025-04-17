<template>
  <div>
    <multi-select
      v-model="hotelsModel"
      :data="fakePreferenceItems.hotels"
      :popular="fakePreferenceItemsPopular.hotels"
      title="Hotels"
    ></multi-select>
    <multi-select
      v-model="transportModel"
      :data="fakePreferenceItems.transport"
      :popular="fakePreferenceItemsPopular.transport"
      title="Transport"
      color="secondary"
    ></multi-select>
    <multi-select
      v-model="restaurantsModel"
      :data="fakePreferenceItems.restaurants"
      :popular="fakePreferenceItemsPopular.restaurants"
      title="Restaurants"
      color="third"
    ></multi-select>
    <multi-select
      v-model="activitiesModel"
      :data="fakePreferenceItems.activities"
      :popular="fakePreferenceItemsPopular.activities"
      title="Activities"
      color="fourth"
    ></multi-select>
  </div>
</template>

<script>
import fakeData from '@/fake-data';
import { mapGetters, mapMutations } from 'vuex';
import MultiSelect from '@/components/filters/MultiSelect';

export default {
  name: 'Preferences',
  mixins: [fakeData],
  components: {
    MultiSelect
  },
  computed: {
    ...mapGetters('profile', [
      'hotels',
      'transport',
      'restaurants',
      'activities'
    ]),
    hotelsModel: {
      get() {
        return this.hotels;
      },
      set(value) {
        this.updateHotels(value);
      }
    },
    transportModel: {
      get() {
        return this.transport;
      },
      set(value) {
        this.updateTransport(value);
      }
    },
    restaurantsModel: {
      get() {
        return this.restaurants;
      },
      set(value) {
        this.updateRestaurants(value);
      }
    },
    activitiesModel: {
      get() {
        return this.activities;
      },
      set(value) {
        this.updateActivities(value);
      }
    }
  },
  methods: {
    ...mapMutations('profile', {
      updateHotels: 'updateHotels',
      updateTransport: 'updateTransport',
      updateRestaurants: 'updateRestaurants',
      updateActivities: 'updateActivities'
    })
  }
};
</script>
