<template>
  <div>
    <mq-layout mq="md+">
      <v-menu
        offset-y
        transition="slide-y-transition"
        bottom
        right
        content-class="header__menu-dropdown"
        min-width="180"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="text" text depressed v-bind="attrs" v-on="on">
            {{ `${user.firstName} ${user.lastName} ` }}
            <v-avatar class="ml-2" color="white" size="40">
              <v-img
                :src="user.photoUrl || '/imgs/placeholders/avatar_img.png'"
              ></v-img>
            </v-avatar>
            <v-icon size="24">
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <profile-menu-list></profile-menu-list>
      </v-menu>
    </mq-layout>
    <mq-layout mq="sm">
      <profile-menu-list></profile-menu-list>
    </mq-layout>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ProfileMenuList from './ProfileMenuList';

export default {
  name: 'ProfileMenu',
  components: {
    ProfileMenuList
  },
  computed: {
    ...mapGetters('user', ['user'])
  }
};
</script>
