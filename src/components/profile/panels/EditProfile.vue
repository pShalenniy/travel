<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        color="primary"
        height="24"
        class="pa-0"
        v-bind="attrs"
        v-on="on"
      >
        Edit
      </v-btn>
    </template>
    <v-card class="card card-edit-profile">
      <v-card-title>
        <span class="headline">Edit profile</span>
        <v-btn color="text" icon text @click="dialog = false" class="btn-close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <avatar-uploader
          :current-url="userPhotoUrl"
          v-model="imageUrl"
        ></avatar-uploader>
        <div>
          <v-subheader>Company name</v-subheader>
          <v-text-field
            v-model="company"
            :value="companyName"
            outlined
          ></v-text-field>
        </div>

        <div>
          <v-subheader>Offices</v-subheader>
          <v-text-field
            v-for="(item, index) in offices"
            :key="index"
            :value="item"
            prepend-inner-icon="mdi-map-marker-outline"
            outlined
            readonly
            class="mb-2"
          ></v-text-field>
          <v-text-field
            v-model="newOffice"
            placeholder="Add address"
            prepend-inner-icon="mdi-map-marker-outline"
            outlined
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="text" dark large @click="handleSave">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import AvatarUploader from '@/components/filters/AvatarUploader';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EditProfile',
  components: {
    AvatarUploader
  },
  data() {
    return {
      imageUrl: '',
      company: '',
      newOffice: '',
      errors: [],
      form: {},
      dialog: false
    };
  },
  computed: {
    ...mapGetters('profile', ['companyName', 'offices']),
    ...mapGetters('user', ['userPhotoUrl'])
  },
  methods: {
    ...mapActions('profile', ['setCompanyName', 'addOffice']),
    ...mapActions('user', ['setPhotoUrl']),
    handleSave() {
      if (this.company !== this.companyName) {
        this.setCompanyName(this.company);
      }

      if (this.newOffice) {
        this.addOffice(this.newOffice);
        this.newOffice = '';
      }

      if (this.imageUrl) {
        this.setPhotoUrl(this.imageUrl);
        this.imageUrl = '';
      }

      this.dialog = false;
    }
  },
  mounted() {
    this.company = this.companyName;
  }
};
</script>
<style lang="scss">
.card-edit-profile {
  .v-input {
    font-size: 14px;
    &.v-text-field > .v-input__control > .v-input__slot {
      padding: 0 16px;
    }
    .v-input__prepend-inner {
      margin-left: -4px;
    }
  }
}
</style>
