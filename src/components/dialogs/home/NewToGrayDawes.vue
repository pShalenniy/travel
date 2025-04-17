<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="white"
        depressed
        rounded
        class="ml-4"
        v-bind="attrs"
        v-on="on"
        @click="dialogOpen()"
      >
        New to {{ info.companyName }}
      </v-btn>
    </template>
    <v-card>
      <v-btn color="text" icon text @click="dialog = false" class="btn-close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-text class="mb-0">
        <h2 class="v-dialog__title">New to {{ info.companyName }}</h2>

        <p class="v-dialog__text">
          You will need to book a flight to get started. Get in touch with
          {{ info.companyName }} Group to book personalised business travel made
          just for you.
        </p>

        <div v-if="info.site" class="text-highlighted">
          {{ info.site }}
        </div>
        <div v-if="info.email" class="text-highlighted">
          {{ info.email }}
        </div>
        <div v-if="info.phone" class="text-highlighted">
          {{ info.phone }}
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import { theme } from '@/utils/theme';

export default {
  name: 'NewToGrayDawes',
  data() {
    return {
      dialog: false,
      info: null
    };
  },
  created() {
    this.info = theme.info;
  },
  methods: {
    dialogOpen() {
      logAmplitudeEvent(amplitudeEvents.home.clickNewTo);
    }
  }
};
</script>
<style lang="scss" scoped>
.text-highlighted {
  margin-top: 16px;
  font-size: 18px;
  line-height: 24px;
  color: $primary;
  font-weight: 700;
}
.v-btn {
  &.white {
    color: $text;
  }
}
</style>
