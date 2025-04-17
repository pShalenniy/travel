<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <mq-layout mq="md+">
        <v-btn text depressed v-bind="attrs" v-on="on">
          Build my itinerary
        </v-btn>
      </mq-layout>
      <mq-layout mq="sm">
        <v-list-item v-bind="attrs" v-on="on">
          <v-list-item-title>Build my itinerary</v-list-item-title>
        </v-list-item>
      </mq-layout>
    </template>
    <v-card v-if="!success">
      <v-card-title>
        <span class="headline">Build my itinerary</span>
        <v-btn color="text" icon text @click="dialog = false" class="btn-close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <radio-group
          v-model="travelFocusModel"
          :data="travelFocus"
          title="What’s the focus of the travel?"
        ></radio-group>
        <radio-group
          v-model="moodModel"
          :data="mood"
          title="What’s the mood?"
        ></radio-group>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="First name*"
              required
              v-model="form.firstName"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Last name*"
              required
              v-model="form.lastName"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Email*"
              required
              v-model="form.email"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Company*"
              v-model="form.company"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Destination*"
              v-model="form.itineraryDestination"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Itinerary start (YYYY-MM-DD HH:mm:ss)*"
              v-model="form.itineraryStart"
              required
              >2020-07-03 08:00:00</v-text-field
            >
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Itinerary start (YYYY-MM-DD HH:mm:ss)**"
              v-model="form.itineraryEnd"
              required
              >2020-07-23 08:00:00</v-text-field
            >
          </v-col>
        </v-row>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="text" dark large @click="handleSendItinerary">
          Build my itinerary
        </v-btn>
      </v-card-actions>
    </v-card>
    <div v-else class="success-card">
      <v-card>
        <v-btn
          color="white"
          icon
          text
          @click="dialog = false"
          class="btn-close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-icon>mdi-wrench</v-icon>
        <v-card-title>
          Building your itinerary
        </v-card-title>
        <v-card-text>
          Give us a minute, our minions are frantically putting things together…
        </v-card-text>
      </v-card>
    </div>
  </v-dialog>
</template>
<script>
import _get from 'lodash/get';
import sendItinerary from '../../mutations/sendItinerary';
import RadioGroup from '../filters/RadioGroup';

export default {
  name: 'BuildItinerary',
  components: {
    RadioGroup
  },
  data() {
    return {
      errors: [],
      form: {},
      dialog: false,
      success: false,
      travelFocusModel: null,
      moodModel: null,
      travelFocus: [
        { label: 'Business', value: 'business' },
        { label: 'Leisure', value: 'leisure' },
        { label: 'Both', value: 'both' }
      ],
      mood: [
        { label: 'Client entertainment', value: 'clientEntertainment' },
        { label: 'Team building', value: 'teamBuilding' },
        { label: 'Adventure', value: 'adventure' },
        { label: 'Romantic', value: 'romantic' },
        { label: 'Surprise me!', value: 'surpriseMe' }
      ]
    };
  },
  methods: {
    handleSendItinerary() {
      sendItinerary({
        apollo: this.$apollo,
        ...this.form
      })
        .then(response => _get(response, 'data.result', {}))
        .then(response => {
          if (response.errors) {
            this.errors = this.errorMessages(
              response.data.sendItinerary.errors
            );
          } else {
            this.success = true;
          }
        })
        .catch(error => {
          this.errors = [error];
        });
    }
  }
};
</script>
