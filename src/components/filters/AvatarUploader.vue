<template>
  <div>
    <label class="photo-upload">
      <input type="file" @change="onFileChange" />
      <v-avatar size="72">
        <v-img v-if="getImageUrl" :src="getImageUrl">
          <v-icon v-if="!this.photoUrl" color="primary">mdi-camera-plus</v-icon>
        </v-img>
      </v-avatar>
    </label>
  </div>
</template>

<script>
export default {
  name: 'AvatarUploader',
  props: {
    value: {
      type: String,
      required: true
    },
    currentUrl: {
      type: [String, null]
    }
  },
  data() {
    return {
      photoUrl: null
    };
  },
  computed: {
    getImageUrl() {
      return this.photoUrl || this.currentUrl;
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.photoUrl = URL.createObjectURL(file);
      this.$emit('input', this.photoUrl);
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-upload {
  display: inline-flex;
  position: relative;
  cursor: pointer;
  margin-bottom: 24px;
  input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    max-width: 100%;
    opacity: 0;
  }
  .v-icon {
    background-color: rgba(#fff, 0.5);
    border-radius: 50%;
  }
}
</style>
