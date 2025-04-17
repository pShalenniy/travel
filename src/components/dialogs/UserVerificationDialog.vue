<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title>
        <span class="headline">Enter the code sent to your email</span>
        <v-btn color="text" icon text @click="dialog = false" class="btn-close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="mb-0">
        <p class="text--text mt-2">
          Please confirm that this email belongs to you. Enter the code sent to
          <strong>{{ user.email }}.</strong>
        </p>
        <v-row>
          <v-col cols="12">
            <v-subheader>Code</v-subheader>
            <v-text-field
              v-model="code"
              outlined
              required
              :error-messages="getValidateError"
              messages="code will expire in 30 minutes"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          color="text"
          dark
          large
          :disabled="code.length === 0"
          :loading="getSendingRequest"
          @click="handleConfirm"
        >
          <span v-if="getRequestClicked">Request your Hotel</span>
          <span v-else>Confirm your Email Address</span>
        </v-btn>
        <v-btn
          block
          outlined
          color="text"
          dark
          large
          :disabled="!!resendEmailTimer"
          @click="handleResendEmail"
        >
          Resend code
          <span v-if="resendEmailTimer" class="ml-1">
            after {{ resendEmailTimer }}s
          </span>
        </v-btn>
        <v-btn
          class="border-0 d-none"
          block
          outlined
          color="light"
          dark
          @click="handleIncorrectEmail"
        >
          Incorrect email?
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'UserVerificationDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resendEmailTimer: null,
      code: ''
    };
  },
  watch: {
    resendEmailTimer: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.resendEmailTimer--;
          }, 1000);
        } else if (value === 0) {
          this.setResendEmailTimer(false);
        }
      },
      immediate: true
    },
    getResendEmailTimer: {
      handler(started) {
        if (started) {
          const duration = moment().diff(moment(started), 'seconds');

          if (duration > 60) {
            this.resendEmailTimer = null;
          } else {
            this.resendEmailTimer = 60 - duration;
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters('user', ['user', 'getValidateError']),
    ...mapGetters('details', ['getSendingRequest']),
    ...mapGetters('detailsFilter', [
      'getChosenRoom',
      'getRequestClicked',
      'getResendEmailTimer'
    ]),
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
    ...mapActions('user', ['validateUser', 'resendVerificationCode']),
    ...mapActions('details', ['reserveRoom']),
    ...mapActions('detailsFilter', ['setResendEmailTimer']),
    ...mapMutations('details', ['updateSendingRequest']),
    handleConfirm() {
      const args = {
        uId: this.$route.query.uid || this.user.userId,
        verificationCode: this.code
      };

      this.updateSendingRequest(true);

      this.validateUser(args).then(response => {
        if (response.success) {
          this.dialog = false;

          if (this.getRequestClicked && this.getChosenRoom) {
            this.reserveRoom();
          }
        } else {
          this.updateSendingRequest(false);
        }
      });
    },
    handleResendEmail() {
      this.setResendEmailTimer();
      this.resendVerificationCode().then(response => {
        if (!response) {
          this.setResendEmailTimer(false);
        }
      });
    },
    handleIncorrectEmail() {
      this.dialog = false;
    }
  }
};
</script>
