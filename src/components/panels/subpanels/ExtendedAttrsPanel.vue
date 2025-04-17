<template>
  <v-row
    :class="$mq | mq({ sm: 'ma-2', md: 'ma-4', lg: 'ma-12' })"
    justify="center"
  >
    <v-col md="10">
      <h1 class="title-1">{{ this.name }}</h1>
      <h3 class="subtitle">{{ this.item.address }}</h3>
      <blockquote>
        {{ this.item.shortDescription }}
      </blockquote>
      <rating></rating>
      <p>
        <button text @click="openPlacePage()">
          Open {{ this.item.name }} main site
        </button>
        |
        {{ `${this.$faker().phone.phoneNumber()}` }}
      </p>
      <v-row dense>
        <v-col
          v-for="(info, index) in checkInAndOutTimes"
          :key="index"
          :cols="info.flex"
        >
          <v-card outlined="">
            <v-card-subtitle v-text="info.caption"></v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col md="2">
      <h3>{{ this.item.email || `${this.$faker().internet.email()}` }}</h3>
      <h3>{{ this.item.phone || `${this.$faker().phone.phoneNumber()}` }}</h3>
      <h3>{{ `${this.$faker().phone.phoneNumber()}` }}</h3>
    </v-col>
    <v-row>
      <v-col
        v-for="(info, index) in infoParagraphs"
        :key="index"
        :cols="info.flex"
      >
        <p>{{ info.caption }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <h1>Amenities</h1>
        <v-list class="mt-8">
          <template v-for="item in amenities">
            <v-list-item :key="item.text">
              <v-list-item-avatar>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-avatar>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
import Rating from '@/components/panels/Rating';

export default {
  name: 'ExtendedAttrsPanel',
  components: {
    Rating
  },
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
  data() {
    return {
      checkInAndOutTimes: [
        { caption: 'Check in 13:00', flex: 2 },
        { caption: 'Check out 11:00', flex: 2 }
      ],
      infoParagraphs: [
        { caption: `${this.$faker().lorem.paragraphs(5)}`, flex: 6 },
        { caption: `${this.$faker().lorem.paragraphs(3)}`, flex: 6 },
        { caption: `${this.$faker().lorem.paragraphs(7)}`, flex: 6 },
        { caption: `${this.$faker().lorem.paragraphs(5)}`, flex: 6 }
      ],
      amenities: [
        {
          text: 'Natural environment',
          icon: 'mdi-nature'
        },
        {
          text: 'Nightlife',
          icon: 'mdi-glass-wine'
        },
        {
          text: 'Swimming Pool',
          icon: 'mdi-pool'
        },
        {
          text: 'Excellent location',
          icon: 'mdi-map-marker'
        },
        {
          text: 'Bike Rental',
          icon: 'mdi-bike'
        }
      ]
    };
  },
  methods: {
    getMainUrl() {
      let refs = this.item.detailed_info.references;
      if (refs === undefined) {
        return this.item.detailed_info.natural_profile_url;
      } else {
        let filtered = refs.filter(res => res.type == 'link:official');
        if (filtered.length > 0) {
          return filtered[0].url;
        } else {
          return '';
        }
      }
    }
  }
};
</script>
