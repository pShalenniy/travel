<template>
  <button
    class="filter-toggle"
    data-test="location-filter-toggle"
    :class="{ show: isShow, 'filter-hide': isFilterOpen }"
    @click="toggleFilter(true)"
  >
    <span v-if="getDestinationInfoPlace">
      <span class="text-ellipsis">{{ getDestinationInfoPlace }}</span>
    </span>
    <span
      v-if="getDestinationInfoPlace && getFormatDates"
      class="divider"
    ></span>
    <span v-if="getFormatDates">
      {{ getFormatDates }}
    </span>
    <span v-if="guests" class="divider"></span>
    <span v-if="guests"> {{ guests }} guest{{ guests > 1 ? 's' : '' }} </span>
    <v-btn class="ml-2" fab dark x-small depressed color="primary">
      <v-icon dark>mdi-magnify</v-icon>
    </v-btn>
  </button>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'DestinationFiltersToggle',
  props: {
    showOnScroll: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isShow: true,
    scrollYToggle: 260
  }),
  computed: {
    ...mapState('filter', ['guests']),
    ...mapState('destination', ['isFilterOpen']),
    ...mapGetters('destination', ['getDestinationInfoPlace']),
    ...mapGetters('filter', ['getFormatDates'])
  },
  mounted() {
    if (this.showOnScroll) {
      this.isShow =
        this.showOnScroll && window.top.scrollY > this.scrollYToggle;
      window.addEventListener('scroll', this.onScroll);
    }
  },
  beforeDestroy() {
    if (this.showOnScroll) {
      window.removeEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    ...mapActions('destination', {
      toggleFilter: 'toggleFilter',
      setFilterAnimation: 'setFilterAnimation'
    }),
    onScroll() {
      this.isShow =
        this.showOnScroll && window.top.scrollY > this.scrollYToggle;
      this.setFilterAnimation(window.top.scrollY > this.scrollYToggle);
    }
  }
};
</script>
<style lang="scss"></style>
