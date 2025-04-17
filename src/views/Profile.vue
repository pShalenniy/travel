<template>
  <v-container class="profile">
    <profile-header></profile-header>
    <app-tabs
      v-model="profileTabs"
      :tabs="tabOptions"
      class="profile-tabs"
    ></app-tabs>
    <v-tabs-items v-model="profileTabs">
      <v-tab-item
        key="preferences"
        value="preferences"
        transition="fade"
        reverse-transition="fade"
      >
        <preferences></preferences>
      </v-tab-item>
      <v-tab-item
        key="security"
        value="security"
        transition="fade"
        reverse-transition="fade"
      >
        <security></security>
      </v-tab-item>
      <v-tab-item
        key="billing"
        value="billing"
        transition="fade"
        reverse-transition="fade"
      >
        <billing></billing>
      </v-tab-item>
      <v-tab-item
        key="communications"
        value="communications"
        transition="fade"
        reverse-transition="fade"
      >
        <communications></communications>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import ProfileHeader from '@/components/profile/ProfileHeader';
import Preferences from '@/components/profile/panels/Preferences';
import Security from '@/components/profile/panels/Security';
import Billing from '@/components/profile/panels/Billing';
import Communications from '@/components/profile/panels/Communications';

export default {
  name: 'Profile',
  components: {
    ProfileHeader,
    Preferences,
    Security,
    Billing,
    Communications
  },
  data() {
    return {
      profileTabs: null,
      tabOptions: [
        { key: 'preferences', label: 'Preferences' },
        { key: 'security', label: 'Security' },
        { key: 'billing', label: 'Billing' },
        { key: 'communications', label: 'Communications' }
      ]
    };
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.profile {
  width: 804px;
  max-width: 100%;
  padding-top: 56px;
  padding-bottom: 56px;
  &-tabs {
    margin-bottom: 48px;
    .v-tabs-bar {
      height: 58px !important;
    }
    .v-tab {
      padding: 0 16px;
      margin: 0 !important;
    }
  }
  @include query-767 {
    padding-top: 24px;
    padding-bottom: 32px;
  }
}
</style>
