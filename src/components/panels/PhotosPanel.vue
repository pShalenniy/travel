<template>
  <div>
    <gallery-panel :data="getGallery" title="Hotel"></gallery-panel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GalleryPanel from './subpanels/GalleryPanel';

export default {
  name: 'PhotosPanel',
  components: {
    GalleryPanel
  },
  computed: {
    ...mapGetters('details', ['getGallery'])
  }
};
</script>
<style lang="scss"></style>
