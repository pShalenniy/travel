<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed rounded color="primary" dark v-bind="attrs" v-on="on">
        Sign up
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Sign up</span>
        <v-btn color="text" icon text @click="dialog = false" class="btn-close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-subheader>Email*</v-subheader>
            <v-text-field v-model="form.email" outlined required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-subheader>Password*</v-subheader>
            <v-text-field
              v-model="form.password"
              outlined
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="text" dark large @click="handleSignIn">
          Sign in
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'SignInDialog',
  data() {
    return {
      showPassword: false,
      errors: [],
      form: {},
      dialog: false
    };
  },
  methods: {
    ...mapMutations('user', ['signIn', 'registerUser']),
    handleSignIn() {
      this.registerUser(this.form);
      this.dialog = false;
    }
  }
};
</script>
