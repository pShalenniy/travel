<template>
  <app-tabs
    background-color="lightBg"
    :tabs="getTabsOptions"
    @tab-click="updateSelectedTabKey"
  ></app-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainTabs',
  computed: {
    ...mapGetters('home', ['getTabsOptions'])
  },
  methods: {
    ...mapActions('home', {
      setSelectedTabKey: 'setSelectedTabKey'
    }),
    updateSelectedTabKey(tabKey) {
      let options = {
        type: tabKey
      };
      this.setSelectedTabKey(options);
    }
  }
};
</script>
