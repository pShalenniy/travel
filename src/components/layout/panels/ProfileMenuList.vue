<template>
  <v-list>
    <v-list-item v-for="(item, index) in menuList" :key="index" :to="item.to">
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
    <template v-if="usersList.length > 1">
      <v-divider class="mb-2"></v-divider>
      <v-list-item
        v-for="item in usersList"
        :key="item.id"
        class="v-list-item__user"
        :active="getUser.id === item.id"
        :class="{ active: getUser.id === item.id }"
      >
        <v-list-item-avatar class="mr-2" color="white" size="24">
          <v-img :src="item.photoUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.fullName"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action @click="removeAccount(item.id)">
          <v-btn icon color="border" small>
            <v-icon size="18">mdi-delete-forever</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>
    <add-account-dialog></add-account-dialog>
  </v-list>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import AddAccountDialog from './AddAccountDialog';

export default {
  name: 'ProfileMenuList',
  components: {
    AddAccountDialog
  },
  data() {
    return {
      menuList: [
        { title: 'Trips', to: '/trips' },
        { title: 'Favourites', to: '/favourites' },
        { title: 'Profile', to: '/profile' }
      ],
      usersList: [
        {
          id: 'user1',
          fullName: 'Emma Browne',
          photoUrl: 'imgs/placeholders/avatar_img.png'
        },
        {
          id: 'user2',
          fullName: 'Joseph Adams',
          photoUrl: 'imgs/placeholders/avatar_img.png'
        },
        {
          id: 'user3',
          fullName: 'Mary Laura-Jane',
          photoUrl: 'imgs/placeholders/avatar_img.png'
        }
      ]
    };
  },
  computed: {
    ...mapGetters('user', ['user', 'isPlusAccess']),
    getUser() {
      return {
        ...this.user,
        id: 'user1',
        name: 'Emma',
        fullName: 'Emma Browne',
        location: 'Fello Studio. London, Porto, Sydney.',
        reviews: 2,
        photoUrl: '/imgs/travel_place_holder.jpg'
      };
    }
  },
  methods: {
    ...mapActions('user', {
      removeAccount: 'removeAccount'
    })
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.header__menu-dropdown {
  &.v-menu__content {
    border: 1px solid $border;
    border-radius: 10px;
    box-shadow: 0 2px 30px 0 rgba(52, 52, 57, 0.2);
    margin-top: 8px;
    min-width: 180px;
  }
  .v-list {
    box-shadow: none;
  }
  .v-list-item {
    min-height: 36px;
    font-weight: 800;
    &__user {
      min-width: 270px;
      color: $light;
      min-height: 40px;
      text-align: left;
      &.active {
        font-weight: 800;
        .v-avatar {
          border-color: $primary !important;
        }
        .v-list-item__title {
          color: $primary;
        }
      }
    }
    &.add-another-account {
      margin-top: 8px;
      font-weight: 600;
    }
    &.v-list-item--active {
      color: rgba($text, 0.5);
      &:before {
        opacity: 0;
      }
    }
  }
  .v-list-item__title {
    font-size: 14px;
  }
  .v-list-item__icon {
    margin: 11px 0 11px 8px;
    min-width: 18px;
  }
  .v-list-item__action {
    margin: 6px 0 6px 8px;
  }
  @include query-767 {
    width: 100%;
    text-align: center;
    .v-list-item {
      min-height: 48px;
      &__user {
        min-height: 40px;
      }
      &.v-list-item--active {
        color: rgba($text, 0.5);
        &:before {
          opacity: 0;
        }
      }
    }
  }
}
.header__menu-dropdown-mobile.v-menu__content {
  top: 0 !important;
  left: 0 !important;
  width: 100%;
  max-width: 100%;
  margin: 0;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  background-color: rgba($text, 0.3);
  height: 100% !important;
  pointer-events: none;
  .close-btn {
    height: 48px;
    width: 48px;
    display: block;
    margin-left: auto;
  }
  .header__menu-dropdown--wrapper {
    background-color: #fff;
    padding: 12px 0 8px;
    pointer-events: auto;
  }
  .v-list {
    padding: 0;
  }
}
.v-application .white.v-avatar {
  border: 1px solid $border !important;
}
</style>
