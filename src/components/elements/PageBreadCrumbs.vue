<template>
  <div class="breadcrumbs-sticky">
    <v-container class="py-0">
      <v-breadcrumbs :items="getItems">
        <template v-slot:divider>
          <v-icon size="18">mdi-chevron-right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="item.to"
            active-class="active"
            :target="item.target"
            :disabled="item.disabled"
            @click.native="handleAmplitude(item)"
          >
            <v-icon v-if="item.icon" size="18">{{ item.icon }}</v-icon>
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-container>
  </div>
</template>
<script>
import { logAmplitudeEvent } from '@/utils/amplitude';

export default {
  name: 'PageBreadCrumbs',
  props: {
    breadcrumbs: {
      type: Array,
      required: true
    }
  },
  computed: {
    getItems() {
      return [
        {
          icon: 'mdi-home',
          disabled: false,
          to: '/'
        },
        ...this.breadcrumbs
      ];
    }
  },
  methods: {
    handleAmplitude(item) {
      if (item.amplitude) {
        logAmplitudeEvent(item.amplitude.event, item.amplitude.options);
      }
    }
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.v-application {
  .v-breadcrumbs {
    padding: 16px 0;
    font-weight: 600;
    .v-breadcrumbs__divider {
      padding: 0;
    }
  }
  a.v-breadcrumbs__item {
    color: $light;

    &.v-breadcrumbs__item--disabled {
      color: $text;
    }

    .v-icon {
      color: $border;
      transition: $transition;
    }

    &:not(.v-breadcrumbs__item--disabled):hover {
      color: $primary;

      .v-icon {
        color: $primary;
      }
    }
  }
}

.breadcrumbs-sticky {
  position: sticky;
  background-color: #fff;
  z-index: 5;
  top: $header-height;

  @include query-767 {
    top: $header-height-m;
  }

  .page-details & {
    position: static;
  }
}
</style>
