<template>
  <v-tabs
    v-model="vModel"
    :key="tabsKey"
    :height="$mq | mq({ sm: '44', md: '82' })"
    color="text"
    :slider-size="4"
    centered
    v-bind="$attrs"
  >
    <v-tab
      v-for="tab in tabs"
      :key="tab.key"
      :value="tab.key"
      :disabled="tab.disabled"
      :href="`#${tab.key}`"
      :class="{ 'd-none': tab.disabled }"
      @click="tabClickHandle(tab)"
    >
      {{ tab.label }}
    </v-tab>
  </v-tabs>
</template>
<script>
import { logAmplitudeEvent } from '@/utils/amplitude';

export default {
  name: 'AppTabs',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    value: {
      type: [String, null]
    },
    tabClick: {
      type: [Function, null]
    }
  },
  data() {
    return {
      tabOptions: '',
      tabsKey: 1
    };
  },
  watch: {
    tabs() {
      /*Fix tabs bottom slider position on update*/
      this.tabsKey += 1;
    }
  },
  computed: {
    vModel: {
      get() {
        return this.value;
      },
      set(localState) {
        this.$emit('input', localState);
      }
    }
  },
  methods: {
    tabClickHandle(val) {
      if (val.amplitude) {
        logAmplitudeEvent(val.amplitude, val.amplitudeOptions);
      }
      this.$emit('tab-click', val.key);
    }
  }
};
</script>
<style lang="scss">
.v-application {
  .v-tabs {
    .v-slide-group__next,
    .v-slide-group__prev {
      display: none !important;
    }
  }
  .v-tab {
    text-transform: none;
    font-size: 1.125rem;
    letter-spacing: 0.0125em;
    line-height: 2rem;
    font-weight: 800;
    padding: 0 24px;
  }
  @media (max-width: 767px) {
    .v-tabs {
      .v-tabs-bar {
        padding: 0 4px;
        height: 44px !important;
      }
      .v-tabs-slider-wrapper {
        height: 2px !important;
      }
    }
    .v-tab {
      font-size: 14px;
      font-weight: 600;
      padding: 6px 8px 0;
    }
  }
}

.theme--light.v-tabs > .v-tabs-bar {
  .v-tab--disabled,
  .v-tab:not(.v-tab--active),
  .v-tab:not(.v-tab--active) > .v-btn,
  .v-tab:not(.v-tab--active) > .v-icon {
    color: var(--v-light-base);
  }
}
</style>
