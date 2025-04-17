<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed rounded color="primary" dark v-bind="attrs" v-on="on">
        Sign up
      </v-btn>
    </template>
    <v-card v-if="!hasAccount">
      <v-card-title>
        <span class="headline">Sign up</span>
        <v-btn color="text" icon text @click="dialog = false" class="btn-close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-subheader>First name*</v-subheader>
            <v-text-field
              v-model="form.firstName"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-subheader>Last name*</v-subheader>
            <v-text-field
              v-model="form.lastName"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-subheader>Email*</v-subheader>
            <v-text-field v-model="form.email" outlined required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-subheader>Create password*</v-subheader>
            <v-text-field
              v-model="form.password"
              outlined
              placeholder="At least 6 characters"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-subheader>
          By clicking Sign up you confirm that you agree to our Terms and
          Privacy Policy
        </v-subheader>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="text" dark large @click="handleSignUp">
          Sign up
        </v-btn>
        <v-btn
          color="primary"
          text
          class="mt-6"
          height="24"
          @click="hasAccount = !hasAccount"
        >
          Already have an account?
        </v-btn>
        <sign-in-dialog v-if="hasAccount"></sign-in-dialog>
      </v-card-actions>
    </v-card>
    <v-card v-if="hasAccount">
      <v-card-title>
        <span class="headline">Sign in</span>
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
        <v-btn
          color="primary"
          text
          class="mt-6"
          height="24"
          @click="hasAccount = !hasAccount"
        >
          Create my account
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'SignUpDialog',
  data() {
    return {
      showPassword: false,
      errors: [],
      form: {},
      dialog: false,
      hasAccount: false
    };
  },
  methods: {
    ...mapMutations('user', ['signIn', 'registerUser']),
    handleSignUp() {
      this.registerUser(this.form);
      this.dialog = false;
    },
    handleSignIn() {
      this.signIn(this.form);
      this.dialog = false;
    }
  }
};
</script>
