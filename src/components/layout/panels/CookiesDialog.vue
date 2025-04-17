<template>
  <v-dialog v-model="dialogModule" scrollable max-width="600px">
    <v-card class="cookies-dialog">
      <h2>Your privacy</h2>
      <p>
        Cookies are small text files that are placed on your computer by
        websites that you visit. They are widely used in order to make websites
        work, or work more efficiently, as well as to provide information to the
        owners of the site. Because we respect your right to privacy, you can
        choose not to allow some kinds of cookies. Below you can find out about
        the types of cookies that we use, and change your default settings.
        Blocking some types of cookies may affect your experience of the site
        and the services we are able to offer.
      </p>

      <h3>Necessary Cookies</h3>
      <p>
        These cookies are necessary for our site to function and cannot be
        switched off in our system. They are set in response to provide our core
        service, ensure the security of our site and record your cookie
        preferences.
      </p>

      <h4>Security</h4>
      <v-switch
        v-model="userExperience"
        inset
        label="User experience"
        readonly
      ></v-switch>
      <v-switch
        v-model="cookiePreferences"
        inset
        label="Cookie Preferences"
        readonly
      ></v-switch>

      <h3>Analytics Cookies</h3>
      <p>
        These cookies allow us to identify the most and least popular sections
        of the site and see how users move around on the site so that we can
        measure and improve the performance of our site . All of the information
        we gather is aggregated and anonymous.
      </p>
      <v-switch
        v-model="cookies.amplitudeAnalytics"
        inset
        label="Amplitude Analytics"
      ></v-switch>
      <v-switch
        v-model="cookies.googleAnalytics"
        inset
        label="Google Analytics"
      ></v-switch>

      <v-divider class="my-5"></v-divider>
      <v-card-actions>
        <v-btn color="text" outlined depressed rounded @click="close()">
          Cancel
        </v-btn>
        <v-btn color="primary" depressed rounded class="ml-4" @click="save()">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CookiesDialog',
  data() {
    return {
      userExperience: true,
      cookiePreferences: true,
      cookies: {
        amplitudeAnalytics: true,
        googleAnalytics: true
      }
    };
  },
  computed: {
    ...mapGetters('cookies', [
      'getCookiesDialog',
      'isAmplitudeAnalyticsCookies',
      'isGoogleAnalyticsCookies'
    ]),
    dialogModule: {
      get() {
        return this.getCookiesDialog;
      },
      set(value) {
        this.setCookiesDialogs(value);
      }
    }
  },
  methods: {
    ...mapActions('cookies', [
      'setCookiesDialogs',
      'setAmplitudeAnalytics',
      'setGoogleAnalytics',
      'setCookiesPopup'
    ]),
    save() {
      this.setAmplitudeAnalytics(this.cookies.amplitudeAnalytics);
      this.setGoogleAnalytics(this.cookies.googleAnalytics);
      this.setCookiesPopup(false);
      this.setCookiesDialogs(false);
    },
    close() {
      this.setCookiesDialogs(false);
    }
  },
  created() {
    if (this.isAmplitudeAnalyticsCookies !== null) {
      this.cookies.amplitudeAnalytics = this.isAmplitudeAnalyticsCookies;
    }

    if (this.isGoogleAnalyticsCookies !== null) {
      this.cookies.googleAnalytics = this.isGoogleAnalyticsCookies;
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 12px;
}
h3 {
  margin-top: 16px;
}
h4 {
  margin: 4px 0;
}
p,
h3 {
  margin-bottom: 8px;
}
.cookies-dialog {
  max-height: 100%;
  overflow: auto;
  .v-btn {
    min-width: 130px;
  }
  ::v-deep {
    .v-input {
      margin: 0 !important;
      padding: 0;
      &.v-input--is-readonly {
        .v-label,
        .v-input__slot {
          cursor: not-allowed;
        }
        .v-input--selection-controls__input {
          pointer-events: none;
        }
      }
      &--selection-controls__input {
        order: 2;
        margin: 0 0 0 12px;
      }
      .v-messages {
        display: none;
      }
      .v-label {
        color: $text;
        font-weight: 600;
      }
    }
  }
}
</style>
