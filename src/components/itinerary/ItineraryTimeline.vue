<template>
  <v-timeline class="timeline" dense align-top>
    <v-timeline-item
      v-for="(item, i) in data"
      :key="i"
      :color="!item.canEdit ? 'text' : 'primary'"
      fill-dot
      small
      :class="{ unavailable: item.unavailable }"
    >
      <template v-slot:icon>
        {{ item.order + 1 }}
      </template>
      <template v-slot:opposite>
        <div class="timeline__date">
          {{ item.date }}
        </div>
        <div class="timeline__time">
          {{ item.time }}
        </div>
      </template>
      <div>
        <div class="timeline__heading">
          <div>
            <div class="timeline__title">
              {{ item.title }}
            </div>
            <div class="timeline__location">
              {{ item.location }}
            </div>
          </div>
          <v-btn
            v-if="item.canEdit"
            icon
            :color="item.unavailable ? 'danger' : 'light'"
            small
            @click="deleteItem(item.order)"
          >
            <v-icon>mdi-delete-forever</v-icon>
          </v-btn>
          <div v-else class="timeline__edit">
            Cannot edit
          </div>
        </div>
        <div class="timeline__card">
          <component
            v-if="item.info"
            :is="getCardComponent(item.category)"
            :data="item.info"
          ></component>
          <div v-else class="timeline__cards">
            <component
              v-for="(option, index) in item.options"
              :key="index"
              :is="getCardComponent(item.category)"
              :data="option"
            ></component>
          </div>
          <v-btn
            v-if="item.canUpdate && !item.unavailable"
            color="text"
            class="timeline__card--update"
            icon
            large
            @click="updateItem(item.order)"
          >
            <v-icon size="24">mdi-reload</v-icon>
          </v-btn>
          <div v-if="item.unavailable" class="timeline__unavailable">
            Unavailable
          </div>
        </div>
        <div v-if="item.unavailable" class="timeline__error">
          This restaurant is unavailable. Choose a different time or book
          another location.
        </div>
        <div
          v-if="item.message"
          class="timeline__message"
          v-html="item.message"
        ></div>
        <add-itinerary-item
          v-if="item.unavailable"
          title="Choose another location"
        ></add-itinerary-item>
        <add-itinerary-item
          v-if="item.addButton"
          :title="item.addButton"
        ></add-itinerary-item>
        <add-itinerary-item
          v-if="i === data.length - 1"
          title="Add Activity"
        ></add-itinerary-item>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import _get from 'lodash/get';
import { mapActions, mapGetters } from 'vuex';
import itineraryFromMagicLink from '../../queries/itinerary';
import GenericCard from '@/components/cards/GenericCard';
import CarRentalCard from '@/components/cards/CarRentalCard';
import PlaneTicketCard from '@/components/cards/PlaneTicketCard';
import AddItineraryItem from './AddItineraryItem';
export default {
  name: 'ItineraryTimeline',
  components: {
    AddItineraryItem
  },
  data() {
    return {
      data: {}
    };
  },
  computed: {
    ...mapGetters('itinerary', ['getItineraryItems'])
  },
  methods: {
    ...mapActions('itinerary', ['deleteItem', 'updateItem']),
    getCardComponent(category) {
      switch (category) {
        case 'plane_ticket':
          return PlaneTicketCard;
        case 'car_rental':
          return CarRentalCard;
        case 'hotel_room':
          return GenericCard;
      }
    }
  },
  created() {
    let magicLink = this.$route.query.ml;
    if (magicLink == undefined) {
      this.data = this.getItineraryItems;
    } else {
      itineraryFromMagicLink({
        apollo: this.$apollo,
        magicLink: magicLink
      })
        .then(response => _get(response, 'data.itineraryFromMagicLink', {}))
        .then(response => {
          if (!response.errors) {
            let items = response['items'];
            let sanitizedItems = [];
            items.forEach(element => {
              element['info'] =
                element['info'] != undefined ? JSON.parse(element['info']) : {};
              sanitizedItems.push(element);
            });
            this.data = sanitizedItems;
          } else {
            this.errors = this.errorMessages(response.data.registerUser.errors);
          }
        })
        .catch(error => {
          this.errors = [error];
        });
    }
  }
};
</script>

<style lang="scss">
@import 'src/scss/utils/_utils';
.v-application {
  .v-timeline {
    padding-top: 0;
    &:before {
      display: none;
    }
  }
  .v-timeline-item {
    padding-bottom: 0;
    .v-timeline-item__opposite {
      display: block;
      align-self: flex-start;
      text-align: right;
      flex: 0 0 70px;
      width: 70px;
      max-width: 70px;
    }
    .v-timeline-item__dot {
      background-color: transparent;
    }
    &:last-child {
      .v-timeline-item__body {
        margin-bottom: 0;
      }
    }
  }
  .v-timeline-item__body {
    margin-bottom: 32px;
    flex-basis: 0;
    flex-grow: 1;
    min-width: 1px;
    max-width: calc(100% - 104px);
    .v-card {
      margin-top: 24px;
    }
  }
  .v-timeline-item__divider {
    min-width: 34px;
    background-image: radial-gradient(
      circle closest-side,
      $primary 100%,
      transparent 100%
    );
    background-repeat: repeat-y;
    background-position: center -8px;
    background-size: 3px 12px;
  }
  .v-timeline-item__dot--small {
    height: 18px;
    width: 18px;
    box-shadow: none;
    font-size: 11px;
    color: #fff;
    font-weight: 600;
    line-height: 19px;
  }
  @include query-660 {
    .v-timeline {
      margin-left: -12px;
    }
    .v-timeline-item {
      flex-wrap: wrap;
      .v-timeline-item__opposite {
        order: -1;
        text-align: left;
        flex: 0 0 100%;
        width: 100%;
        max-width: 100%;
        padding-left: 34px;
      }
    }
    .v-timeline-item__body {
      max-width: calc(100% - 34px) !important;
    }
    .v-timeline-item__divider {
      min-width: 34px;
    }
  }
}
.timeline {
  font-size: 14px;
  line-height: 18px;
  &__date {
    font-size: 18px;
    line-height: 33px;
    font-weight: 800;
    margin-top: -8px;
    white-space: nowrap;
  }
  &__time {
    color: $light;
    .v-timeline-item.unavailable & {
      color: $danger;
    }
  }
  &__heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: -16px;
  }
  &__title {
    font-weight: 800;
    line-height: 19px;
    margin-bottom: 3px;
  }
  &__location {
    color: $light;
  }
  &__edit {
    color: $border;
    font-weight: 800;
  }
  &__card {
    position: relative;
    .v-timeline-item.unavailable & {
      .card {
        opacity: 0.5;
      }
    }
    &--update {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
      z-index: 1;
      background-color: #fff;
      border: 1px solid $border;
      box-shadow: 0 2px 4px 0 rgba($text, 0.1);
    }
  }
  &__cards {
    .card.v-card {
      border: 2px solid $danger;
    }
  }
  &__unavailable {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-size: 18px;
    font-weight: 800;
    line-height: 24px;
    z-index: 1;
  }
  &__error {
    color: $danger;
    margin: 4px 0 16px;
    text-align: center;
  }
  &__message {
    color: $light;
    margin: 4px 0 16px;
    text-align: center;
  }
  @include query-660 {
    &__date,
    &__time {
      display: inline-block;
      margin-right: 8px;
    }
  }
}
</style>
