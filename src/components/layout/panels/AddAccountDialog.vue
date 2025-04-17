<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on" class="add-another-account">
        <v-list-item-title>Add another account</v-list-item-title>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add Account</span>
        <v-btn color="text" icon text @click="dialog = false" class="btn-close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-subheader>Their email address</v-subheader>
        <v-text-field v-model="email" outlined required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="text" dark large @click="handleAddAccount">
          Send request to add account
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'AddAccountDialog',
  data() {
    return {
      email: '',
      dialog: false
    };
  },
  methods: {
    ...mapActions('user', {
      addAccount: 'addAccount'
    }),
    handleAddAccount() {
      this.addAccount();
    }
  }
};
</script>
