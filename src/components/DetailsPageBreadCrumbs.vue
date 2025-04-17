<template>
  <v-container class="py-0">
    <page-bread-crumbs :breadcrumbs="getBreadcrumbItems()"></page-bread-crumbs>
  </v-container>
</template>
<script>
import { namespacedHelper as homeNamespacedHelper } from '@/store/modules/home';
const { mapState } = homeNamespacedHelper;

export default {
  name: 'DetailsPageBreadCrumbs',
  computed: {
    ...mapState(['selectedTabKey', 'destination'])
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    getBreadcrumbItems() {
      let humanizedDestinationLabel = `${this.destination
        .charAt(0)
        .toUpperCase() + this.destination.slice(1)}, near your office`;
      let humanizedTabKey = (
        this.selectedTabKey.charAt(0).toUpperCase() +
        this.selectedTabKey.slice(1)
      ).slice(0, -1);
      return [
        {
          text: humanizedDestinationLabel,
          disabled: false,
          href: '/destination'
        },
        {
          text: humanizedTabKey,
          disabled: true,
          href: '#'
        }
      ];
    }
  }
};
</script>
