<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <mq-layout mq="md+">
        <v-btn text depressed v-bind="attrs" v-on="on" class="button-with-chip">
          Build my itinerary
          <v-chip small color="third" dark class="v-chip-label">
            Plus
          </v-chip>
        </v-btn>
      </mq-layout>
      <mq-layout mq="sm">
        <v-list-item v-bind="attrs" v-on="on" class="button-with-chip">
          <v-list-item-title>
            Build my itinerary
            <v-chip small color="third" dark class="v-chip-label">
              Plus
            </v-chip>
          </v-list-item-title>
        </v-list-item>
      </mq-layout>
    </template>
    <AccessCard
      title="Build my itinerary"
      sub-title="Use the power of machine learning to build the perfect itinerary."
    ></AccessCard>
    <v-btn
      color="text"
      icon
      text
      @click="dialog = false"
      class="btn-close mt-4 mr-4"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-dialog>
</template>
<script>
import AccessCard from '@/components/layout/panels/AccessCard';

export default {
  name: 'BuildItineraryAccess',
  components: {
    AccessCard
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>
