<template>
  <div class="profile-communications">
    <div class="profile-communications__list">
      <v-subheader>Receive messages by:</v-subheader>
      <v-checkbox
        v-model="emailCommunications"
        label="Email"
        disabled
      ></v-checkbox>
      <hr />
      <v-checkbox v-model="smsCommunications" label="SMS"></v-checkbox>
      <hr />
      <v-checkbox
        v-model="whatsAppCommunications"
        label="WhatsApp"
      ></v-checkbox>
      <hr />
      <v-checkbox v-model="phoneCommunications" label="Phone call"></v-checkbox>
      <hr />
    </div>
    <div class="profile-communications__list">
      <v-subheader>
        Receive promotional content by:
      </v-subheader>
      <v-checkbox v-model="emailPromotional" label="Email"></v-checkbox>
      <hr />
      <v-checkbox v-model="smsPromotional" label="SMS"></v-checkbox>
      <hr />
      <v-checkbox v-model="whatsAppPromotional" label="WhatsApp"></v-checkbox>
      <hr />
      <v-checkbox v-model="phonePromotional" label="Phone call"></v-checkbox>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Communications',
  computed: {
    ...mapGetters('profile', [
      'communicationsMessages',
      'communicationsPromotional'
    ]),
    emailCommunications: {
      get() {
        return this.communicationsMessages.email;
      },
      set(value) {
        this.setMessagesItem({ item: 'email', value });
      }
    },
    smsCommunications: {
      get() {
        return this.communicationsMessages.sms;
      },
      set(value) {
        this.setMessagesItem({ item: 'sms', value });
      }
    },
    whatsAppCommunications: {
      get() {
        return this.communicationsMessages.whatsApp;
      },
      set(value) {
        this.setMessagesItem({ item: 'whatsApp', value });
      }
    },
    phoneCommunications: {
      get() {
        return this.communicationsMessages.phone;
      },
      set(value) {
        this.setMessagesItem({ item: 'phone', value });
      }
    },
    emailPromotional: {
      get() {
        return this.communicationsPromotional.email;
      },
      set(value) {
        this.setPromotionalItem({ item: 'email', value });
      }
    },
    smsPromotional: {
      get() {
        return this.communicationsPromotional.sms;
      },
      set(value) {
        this.setPromotionalItem({ item: 'sms', value });
      }
    },
    whatsAppPromotional: {
      get() {
        return this.communicationsPromotional.whatsApp;
      },
      set(value) {
        this.setPromotionalItem({ item: 'whatsApp', value });
      }
    },
    phonePromotional: {
      get() {
        return this.communicationsPromotional.phone;
      },
      set(value) {
        this.setPromotionalItem({ item: 'phone', value });
      }
    }
  },
  methods: {
    ...mapActions('profile', {
      setMessagesItem: 'setMessagesItem',
      setPromotionalItem: 'setPromotionalItem'
    })
  }
};
</script>

<style lang="scss">
@import 'src/scss/variables';
.profile-communications {
  &__list {
    margin-bottom: 40px;
  }
  .v-subheader {
    padding: 0;
    font-weight: 600;
    margin-bottom: 8px;
    height: auto;
  }
  .v-input {
    margin: 0;
    padding: 16px 0;
  }
  .v-input__slot {
    flex-direction: row-reverse;
    margin: 0;
  }
  .v-input--selection-controls__input {
    margin: 0 0 0 8px;
  }
  .v-label {
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
    color: $text;
    &.v-label--is-disabled {
      color: $light;
    }
  }
  .v-messages {
    display: none;
  }
}
</style>
