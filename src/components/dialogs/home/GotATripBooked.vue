<template>
  <v-dialog v-model="dialog" persistent max-width="640">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        depressed
        rounded
        v-bind="attrs"
        v-on="on"
        @click="dialogOpen()"
      >
        Got a trip booked
      </v-btn>
    </template>
    <v-card>
      <v-btn color="text" icon text @click="dialog = false" class="btn-close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-text class="mb-0">
        <v-row align="center">
          <v-col cols="6">
            <h2 class="v-dialog__title">
              Got a trip booked
            </h2>
            <p class="v-dialog__text">
              Head to the recommendations email you received when you booked
              your flight with us. From there you can start planning your trip,
              research and book hotels, transport and even restaurants!
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <img
              src="https://marvel-live.freetls.fastly.net/serve/2020/6/338a074dd5407b9784c10e17cc1321.png?quality=95&fake=.png"
              alt=""
              class="image"
            />
            <p class="v-dialog__text-light">
              You should have a received an email similar to this
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';

export default {
  name: 'UserVerificationDialog',
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    dialogOpen() {
      logAmplitudeEvent(amplitudeEvents.home.clickTripBooked);
    }
  }
};
</script>
<style lang="scss" scoped>
.image {
  height: 300px;
  width: 100%;
  object-fit: cover;
  object-position: top;
  margin-bottom: 8px;
  margin-top: 16px;
}
</style>
