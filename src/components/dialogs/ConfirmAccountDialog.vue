<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title>
        <span class="headline">Please confirm your account</span>
        <v-btn color="text" icon text @click="dialog = false" class="btn-close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-subheader>First name</v-subheader>
            <v-text-field
              outlined
              readonly
              :value="user.firstName"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-subheader>Last name</v-subheader>
            <v-text-field
              :value="user.lastName"
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-subheader>Email</v-subheader>
            <v-text-field outlined readonly :value="user.email"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-subheader>Create password*</v-subheader>
            <v-form ref="form">
              <v-text-field
                data-test="details-room-confirm-password"
                v-model="password"
                outlined
                placeholder="At least 8 characters"
                :type="showPassword ? 'text' : 'password'"
                :rules="[
                  userPasswordRules.required,
                  userPasswordRules.length,
                  userPasswordRules.password
                ]"
                validate-on-blur
                hint="Password should be a minimum of eight characters, at least one upper case, one lower case and one number"
                autocomplete="new-password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
        <v-subheader>
          After clicking Confirm your account you will receive an email with
          instructions to continue
        </v-subheader>
      </v-card-text>
      <v-card-actions>
        <v-btn
          data-test="details-room-confirm-submit"
          :loading="confirmLoading"
          color="text"
          block
          dark
          large
          @click="handleConfirm"
        >
          Confirm your account
        </v-btn>
      </v-card-actions>
      <v-card-text v-if="confirmErrors" class="mt-4 mb-0 error--text">
        {{ confirmErrors }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ConfirmAccountDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      confirmLoading: false,
      confirmErrors: null,
      showPassword: false,
      password: ''
    };
  },
  computed: {
    ...mapGetters('user', ['userPasswordRules', 'user']),
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    ...mapActions('user', {
      confirmUser: 'confirmUser'
    }),
    ...mapActions('detailsFilter', [
      'setVerificationDialog',
      'setResendEmailTimer'
    ]),
    handleConfirm() {
      if (!this.$refs.form.validate()) {
        return false;
      }

      this.confirmErrors = null;
      this.confirmLoading = true;

      const args = {
        uId: this.$route.query.uid || this.user.userId,
        password: this.password,
        callbackUrl: this.$route.path
      };
      this.confirmUser(args)
        .then(() => {
          this.confirmLoading = false;
          this.dialog = false;
          this.setResendEmailTimer();
          this.setVerificationDialog(true);
        })
        .catch(error => {
          this.confirmLoading = false;
          this.confirmErrors = [error][0].message;
        });
    }
  }
};
</script>
