<template>
  <v-app-bar app color="primary" flat :height="72">
    <v-container class="d-flex align-center flex-wrap">
      <Logo
        v-if="typeof logo !== 'string'"
        class="logo ml-auto ml-sm-0"
        height="40px"
      ></Logo>
      <div v-else class="logo ml-auto ml-sm-0">{{ logo }}</div>
      <destination-filters-toggle
        v-if="$route.matched.some(({ name }) => name === 'destination')"
        show-on-scroll
        class="header-filter"
      ></destination-filters-toggle>
      <details-filters-toggle
        v-if="$route.matched.some(({ name }) => name === 'details')"
      ></details-filters-toggle>
      <v-btn icon class="ml-1 btn-case d-none" color="light">
        <v-icon>mdi-briefcase-outline</v-icon>
      </v-btn>
      <!--
      <mq-layout mq="md+" class="d-none align-center">
        <v-btn text depressed @click="isAuth = !isAuth">
          Retrieve booking
        </v-btn>
        <build-itinerary-access v-if="isPlusAccess"></build-itinerary-access>
        <build-itinerary v-else></build-itinerary>
        <profile-menu v-if="isAuth"></profile-menu>
        <sign-up-dialog v-else></sign-up-dialog>
      </mq-layout>
      <mq-layout mq="sm" class="d-none">
        <v-menu
          offset-y
          bottom
          right
          content-class="header__menu-dropdown header__menu-dropdown-mobile"
          min-width="180"
          v-model="headerMenu"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="light" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <div class="header__menu-dropdown--wrapper">
            <v-btn class="close-btn" color="light" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-list width="100%">
              <v-list-item @click="isAuth = !isAuth">
                <v-list-item-title>Retrieve booking</v-list-item-title>
              </v-list-item>
              <build-itinerary-access
                v-if="isPlusAccess"
              ></build-itinerary-access>
              <build-itinerary v-else></build-itinerary>
              <profile-menu v-if="isAuth"></profile-menu>
            </v-list>
            <sign-up-dialog v-if="!isAuth"></sign-up-dialog>
          </div>
        </v-menu>
      </mq-layout>
      -->
    </v-container>
  </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex';
// import SignUpDialog from './panels/SignUpDialog';
// import ProfileMenu from './panels/ProfileMenu';
// import BuildItinerary from '@/components/itinerary/BuildItinerary';
// import BuildItineraryAccess from '@/components/itinerary/BuildItineraryAccess';
import { theme } from '@/utils/theme';

const Logo = theme.logo;

export default {
  name: 'AppBar',
  components: {
    DestinationFiltersToggle: () =>
      import('@/components/destination/DestinationFiltersToggle'),
    DetailsFiltersToggle: () =>
      import('@/components/details/DetailsFiltersToggle'),
    // SignUpDialog,
    // ProfileMenu,
    // BuildItinerary,
    // BuildItineraryAccess,
    Logo
  },
  data: () => ({
    headerMenu: false,
    logo: null
  }),
  created() {
    this.logo = theme.logo;
  },
  computed: {
    ...mapGetters('user', ['isAuth', 'isPlusAccess'])
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.v-application {
  .v-app-bar {
    &.v-toolbar {
      .v-toolbar__content {
        padding: 0;
      }
    }
    .logo {
      color: #fff;
      font-weight: bold;
      font-size: 24px;
      text-transform: uppercase;
    }
    @media (min-width: 768px) {
      .btn-case {
        order: 2;
      }
      .logo {
        height: 48px;
        line-height: 48px;
      }
      .header-filter {
        margin-left: auto;
      }
    }
    @media (min-width: 992px) {
      .header-filter {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    @media (max-width: 767px) {
      .logo {
        color: $primary;
      }
      .header-filter {
        order: 3;
        margin-top: 8px;
        width: 100%;
      }
      &.v-toolbar {
        border-bottom: 1px solid $border !important;
        background-color: #fff !important;
        min-height: $header-height-m;
        height: auto !important;
        z-index: 10;
        .v-toolbar__content {
          height: auto !important;
        }
        .container {
          min-height: $header-height-m;
        }

        .page-details & {
          min-height: $header-height-m-details;

          .container {
            min-height: $header-height-m-details;
          }
        }
      }
    }
    @include queryMax(374px) {
      .header-filter {
        width: calc(100% + 24px);
        border-bottom: 0;
        margin: 12px -12px -12px;
      }
    }
  }

  .filter-toggle {
    cursor: pointer;
    align-items: center;
    position: relative;
    transition: opacity 0.3s;
    background-color: #fff;
    padding: 0 40px 0 24px;
    font-size: 14px;
    line-height: 24px;
    font-weight: 600 !important;
    border-radius: 24px;
    border: 1px solid $border;
    color: $text;
    width: auto;
    display: inline-flex;
    min-height: 48px;

    .v-btn {
      position: absolute;
      right: 7px;
      top: 7px;
    }

    &.filter-hide {
      opacity: 0;
    }

    &:last-child {
      margin-top: 32px;
    }

    &.show {
      display: inline-flex;
    }

    &:not(.show) {
      display: none;
    }

    > span {
      margin: 0 8px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &.divider {
        border-right: 1px solid $border;
        height: 24px;
      }
    }

    &:focus {
      outline: none;
    }

    @media (max-width: 767px) {
      width: 100%;
      justify-content: center;
      padding-left: 16px;

      &:last-child {
        margin-top: 16px;
      }

      > span {
        &:not(.divider) {
          white-space: nowrap;
          min-width: 1px;
        }
      }
    }

    @include queryMax(374px) {
      border-width: 1px 0;
      border-radius: 0;
      width: calc(100% + 24px);
      margin: auto -12px 0;
      padding-left: 12px;
      justify-content: space-between;
    }
  }
}
</style>
