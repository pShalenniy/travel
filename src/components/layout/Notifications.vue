<template>
  <div class="notifications">
    <v-alert
      v-for="notification of getNotifications"
      :key="notification.id"
      :color="notification.color"
      :type="notification.type"
      dense
      dismissible
    >
      {{ notification.message }}
      <template v-slot:close>
        <v-btn
          small
          icon
          color="white"
          @click="removeNotification(notification)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-alert>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Notifications',
  computed: {
    ...mapGetters('notifications', ['getNotifications'])
  },
  methods: {
    ...mapActions('notifications', ['removeNotification'])
  }
};
</script>

<style lang="scss" scoped>
.notifications {
  position: fixed;
  top: 92px;
  right: 20px;
  z-index: 100;
  min-width: 290px;
  max-width: 45%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
