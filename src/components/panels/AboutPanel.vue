<template>
  <extended-attrs-panel :data="this.item"></extended-attrs-panel>
</template>
<script>
import ExtendedAttrsPanel from './subpanels/ExtendedAttrsPanel';

export default {
  name: 'AboutPanel',
  props: {
    data: {
      type: [Object, null]
    }
  },
  computed: {
    item() {
      return {
        ...this.data
      };
    }
  },
  components: {
    ExtendedAttrsPanel
  }
};
</script>
