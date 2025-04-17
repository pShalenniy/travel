<template>
  <v-app :class="`page-${$route.name}`">
    <app-bar></app-bar>
    <v-main>
      <router-view :key="$route.path"></router-view>
    </v-main>
    <footer-bar></footer-bar>
    <cookie></cookie>
    <cookies-dialog></cookies-dialog>
    <notifications></notifications>
  </v-app>
</template>

<script>
import AppBar from '@/components/layout/AppBar';
import Notifications from '@/components/layout/Notifications';
import { theme } from '@/utils/theme';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    AppBar,
    Notifications,
    FooterBar: () => import('@/components/layout/FooterBar'),
    Cookie: () => import('@/components/layout/Cookie'),
    CookiesDialog: () => import('@/components/layout/panels/CookiesDialog')
  },
  methods: {
    ...mapActions('facilities', ['setHotelFacilities'])
  },
  created() {
    document.title = theme.title;
    this.setHotelFacilities();
  }
};
</script>

<style lang="scss">
@import 'src/scss/utils/__utils';
@media (min-width: 1200px) {
  .v-application {
    .container {
      max-width: 1144px;
    }
  }
}
@media (max-width: 767px) {
  .v-main {
    padding-top: $header-height-m !important;
  }
  .page-details {
    padding-bottom: 68px;
    .v-main {
      padding-top: $header-height-m-details !important;
    }
  }
}
</style>
