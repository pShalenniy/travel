<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        color="white"
        class="card__share"
        large
        v-bind="attrs"
        v-on="on"
      >
        <v-icon size="24">
          mdi-share-variant
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Share your itinerary</span>
        <v-btn color="text" icon text @click="dialog = false" class="btn-close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <app-tabs
        v-model="shareTab"
        :tabs="tabOptions"
        class="dialog-tabs"
      ></app-tabs>
      <v-tabs-items v-model="shareTab">
        <v-tab-item
          key="share"
          value="share"
          transition="fade"
          reverse-transition="fade"
        >
          <v-subheader class="mb-6">
            Share this exact itinerary for people to see.
          </v-subheader>
          <v-subheader>
            Share by email address
          </v-subheader>
          <v-text-field
            v-model="form.email"
            placeholder="Email address"
            outlined
            required
          ></v-text-field>
          <v-subheader>
            Or send invite link
          </v-subheader>
          <v-text-field
            v-model="form.inviteLink"
            outlined
            readonly
            id="invite-link"
          >
            <template slot="append">
              <v-btn
                text
                color="primary"
                height="24"
                class="px-1"
                @click="copyInviteLink"
              >
                Copy link
              </v-btn>
            </template>
          </v-text-field>
          <v-btn block color="text" dark large @click="handleShare">
            Share
          </v-btn>
        </v-tab-item>
        <v-tab-item
          key="approve"
          value="approve"
          transition="fade"
          reverse-transition="fade"
        >
          <v-subheader class="mb-6">
            Share this itinerary for people to review and approve.
          </v-subheader>
          <v-subheader>
            Share by email address
          </v-subheader>
          <v-text-field
            v-model="form.email"
            placeholder="Email address"
            outlined
            required
          ></v-text-field>
          <v-subheader>
            Or send invite link
          </v-subheader>
          <v-text-field
            v-model="form.inviteLink"
            outlined
            readonly
            id="invite-link"
          >
            <template slot="append">
              <v-btn
                text
                color="primary"
                height="24"
                class="px-1"
                @click="copyInviteLink"
              >
                Copy link
              </v-btn>
            </template>
          </v-text-field>
          <v-btn block color="text" dark large @click="handleSendForApproval">
            Send for approval
          </v-btn>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'ShareItinerary',
  data() {
    return {
      shareTab: 'share',
      errors: [],
      form: {
        email: '',
        inviteLink: 'https://exampleurl/itinerary-normal'
      },
      dialog: false,
      tabOptions: [
        { key: 'share', label: 'Share' },
        { key: 'approve', label: 'Approve' }
      ]
    };
  },
  methods: {
    handleShare() {
      this.dialog = false;
      console.log('Share itinerary');
    },
    handleSendForApproval() {
      this.dialog = false;
      console.log('Send for approval');
    },
    copyInviteLink() {
      let textToCopy = document.querySelector('#invite-link');
      textToCopy.select();

      document.execCommand('copy');

      window.getSelection().removeAllRanges();
    }
  }
};
</script>
