<template>
  <div class="profile-header">
    <v-avatar class="profile" color="white" size="120">
      <v-img
        :src="user.photoUrl || '/imgs/placeholders/avatar_img.png'"
      ></v-img>
    </v-avatar>
    <div class="profile-header__info">
      <div class="profile-header__full-name">
        {{ `${user.firstName} ${user.lastName}` }}
      </div>
      <div class="profile-header__location">
        {{ user.location }}
      </div>
      <div class="profile-header__review">{{ user.reviews }} reviews</div>
      <edit-profile></edit-profile>
    </div>
    <v-btn color="light" outlined rounded @click="handleLogout">
      Log out
      <v-icon size="18" right color="#D9D9D9">
        mdi-logout-variant
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EditProfile from './panels/EditProfile';
export default {
  name: 'ProfileHeader',
  components: {
    EditProfile
  },
  computed: {
    ...mapGetters('user', { user: 'user' })
  },
  methods: {
    ...mapActions('user', { signOut: 'signOut' }),
    handleLogout() {
      this.signOut();
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style lang="scss">
@import 'src/scss/utils/__utils';
.profile-header {
  display: flex;
  margin-bottom: 48px;
  &__info {
    flex: 1 0 auto;
    min-width: 1px;
    padding: 0 32px;
    > .v-btn {
      min-width: auto !important;
    }
  }
  &__full-name {
    font-weight: 800;
    font-size: 32px;
    line-height: 33px;
    margin-bottom: 8px;
  }
  &__location {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 8px;
  }
  &__review {
    color: $light;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 8px;
  }
  @include query-767 {
    flex-wrap: wrap;
    justify-content: center;
    &__info {
      padding: 16px 0;
      text-align: center;
    }
  }
}
</style>
