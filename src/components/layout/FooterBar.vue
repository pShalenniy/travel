<template>
  <v-footer padless>
    <v-container>
      <v-row align="center" justify="center">
        <v-col v-if="getSocial.length" cols="auto" order-sm="2">
          <v-btn
            v-for="item in getSocial"
            :key="item.icon"
            :href="item.link"
            rel="noopener noreferrer"
            target="_blank"
            icon
            color="primary"
            small
            class="ml-2"
          >
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col sm cols="12" class="py-0">
          <v-breadcrumbs :items="footerLinks">
            <template v-slot:divider>
              |
            </template>
          </v-breadcrumbs>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { getSocial } from '@/utils/social';
import { theme } from '@/utils/theme';
export default {
  data: () => ({
    icons: [],
    footerLinks: [
      {
        text: `Travel ${new Date().getFullYear()}. All rights reserved`,
        disabled: false
      },
      {
        text: 'Privacy Policy',
        disabled: false,
        href: '/privacy-notice'
      },
      {
        text: 'Cookies',
        disabled: false,
        href: '/cookies-policy'
      },
      {
        text: 'Terms',
        disabled: false,
        href: '/terms-and-conditions'
      },
      {
        text: 'Acceptable Use Policy',
        disabled: false,
        href: '/acceptable-use-policy'
      }
    ]
  }),
  computed: {
    getSocial() {
      return getSocial(theme.socialLinks);
    }
  }
};
</script>
<style lang="scss">
@import '../../scss/utils/_utils';
.v-application {
  .v-footer {
    &.theme--light {
      background-color: transparent;
    }
    .container {
      padding-top: 12px;
      padding-bottom: 12px;
      min-height: 102px;
      border-top: 1px solid $border;
      display: flex;
      align-items: center;
    }
    .v-breadcrumbs {
      padding: 0;
      color: $light;
      font-weight: normal;
      .v-breadcrumbs__divider {
        padding: 0 12px !important;
      }
      @include query-767 {
        justify-content: center;
        .v-breadcrumbs__divider:nth-child(2) {
          width: 100%;
          font-size: 0;
        }
      }
    }
  }
}
</style>
