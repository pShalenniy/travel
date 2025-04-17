<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item
        v-bind="attrs"
        v-on="on"
        class="add-another-account button-with-chip"
      >
        <v-list-item-title>
          Add another account
          <v-chip small color="third" dark class="v-chip-label">
            Plus
          </v-chip>
        </v-list-item-title>
      </v-list-item>
    </template>
    <access-card
      title="Add account"
      sub-title="Booking for others or a team? This feature makes it a breeze."
    ></access-card>
    <v-btn
      color="text"
      icon
      text
      @click="dialog = false"
      class="btn-close mt-4 mr-12"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-dialog>
</template>
<script>
import AccessCard from './AccessCard';

export default {
  name: 'AddAccountDialogAccess',
  components: {
    AccessCard
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>
