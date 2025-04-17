<template>
  <v-card
    class="card"
    :class="{ selected: data.selected, 'card--small': small }"
  >
    <div class="card__body">
      <div class="card__img">
        <v-img :src="data.mainPhoto || getMasonry[0]">
          <v-chip
            v-if="(data.photos && !!data.photos.length) || getMasonry"
            class="card__img--length"
            color="text"
            dark
            small
          >
            {{ data.photos.length }}+
          </v-chip>
        </v-img>
        <room-dialog
          :data="{
            ...data,
            photos: data.photos && data.photos.length ? data.photos : getMasonry
          }"
        ></room-dialog>
      </div>
      <h3 class="card__title">
        {{ data.name }}
      </h3>
      <div class="card__info">
        <icons-checked-list :data="getFacilities"></icons-checked-list>
        <div v-if="data.roomsLeft !== null" class="card__rooms-left">
          {{ data.roomsLeft }}
          rooms left
        </div>
      </div>
    </div>

    <div v-if="this.data.selectedType" class="card__footer">
      <icons-list
        :data="getRoomFacilities(this.data.selectedType)"
      ></icons-list>
      <div class="card__footer--col">
        <v-btn
          color="black"
          rounded
          depressed
          dark
          small
          @click="removeSelected()"
        >
          Remove
        </v-btn>
      </div>
    </div>
    <template v-else>
      <div class="card__footer" v-for="(item, i) in data.rooms" :key="i">
        <icons-list :data="getRoomFacilities(item)"></icons-list>
        <div class="card__footer--col">
          <div class="d-flex align-center mb-2">
            <v-tooltip top :open-on-hover="true">
              <template v-slot:activator="{ on, attrs }">
                <div class="mr-auto d-flex align-center">
                  <v-icon
                    v-for="i in item.occupancy"
                    :key="i"
                    size="18"
                    :color="getFilter.guests >= i ? 'text' : 'light'"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{
                      getFilter.guests >= i
                        ? 'mdi-account'
                        : 'mdi-account-outline'
                    }}
                  </v-icon>
                </div>
              </template>
              <span> Room sleeps {{ item.occupancy }} </span>
            </v-tooltip>

            <div class="ml-2 card__price">
              {{ currency }}
              <strong>{{ getPrice(item) }}</strong>
            </div>
          </div>
          <v-btn
            data-test="details-room-choose"
            color="black"
            rounded
            depressed
            dark
            small
            :class="{ selected: isActive(item) }"
            @click="setSelected(item)"
          >
            {{ isActive(item) ? 'Selected' : 'Choose' }}
          </v-btn>
        </div>
      </div>
      <!--<div class="text-center">
        <v-btn
          v-if="!showAllTypes"
          text
          color="primary"
          @click="showAllTypes = true"
        >
          More Room Options
        </v-btn>
      </div>-->
    </template>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import _isEqual from 'lodash/isEqual';
import RoomDialog from '@/components/dialogs/RoomDialog';
import IconsCheckedList from '@/components/lists/IconsCheckedList';
import IconsList from '@/components/lists/IconsList';
import { connectors } from '@/utils/connectors';

export default {
  name: 'RoomCard',
  components: {
    IconsCheckedList,
    IconsList,
    RoomDialog
  },
  props: {
    data: {
      type: [Object, null]
    },
    currency: {
      type: [String, null]
    },
    small: {
      type: [Boolean, null]
    }
  },
  computed: {
    ...mapGetters('detailsFilter', ['getFilter', 'getChosenRoom']),
    ...mapGetters('details', ['getMasonry']),
    getFacilities() {
      if (!this.data.facilities) {
        return [];
      }

      return this.data.facilities
        .map(item => ({
          checked: true,
          title: item.name
        }))
        .slice(0, 4);
    }
  },
  methods: {
    ...mapActions('detailsFilter', ['setChosenRoom']),
    setSelected(room) {
      this.setChosenRoom({
        ...this.data,
        currency: this.currency,
        selectedType: room
      });
    },
    removeSelected() {
      this.setChosenRoom(null);
    },
    isActive(room) {
      return (
        this.getChosenRoom && _isEqual(this.getChosenRoom.selectedType, room)
      );
    },
    getPrice(room) {
      if (room.type === connectors.booking) {
        const price =
          room.min_price.currency === 'GBP'
            ? room.min_price.price
            : room.min_price.other_currency.price;

        return Math.round(price).toLocaleString();
      }
      return Math.round(room.dailyRate).toLocaleString();
    },
    getRoomFacilities(room) {
      if (room.type === connectors.booking) {
        return [
          {
            icon: 'mdi-circle-medium',
            title: room.roomTypeFacilities.refundable
          },
          {
            icon: 'mdi-circle-medium',
            title: room.roomTypeFacilities.breakfast
          }
        ];
      }

      return room.roomTypeFacilities.map(item => ({
        icon: 'mdi-circle-medium',
        title: item
      }));
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.v-card {
  &.card {
    overflow: hidden;
    background-color: #fff;
    color: $text;
    transition: all 0.2s;
    padding: 16px;
    margin-bottom: 16px;
    border: 1px solid $border;
    box-shadow: none;
    &.selected {
      border-color: $text;
    }
  }
}
.card {
  &__img {
    grid-area: image;
    width: 152px;
    max-width: 100%;
    .card__img--length {
      position: absolute;
      right: 4px;
      bottom: 4px;
      background-color: rgba($text, 0.5) !important;
      font-weight: 600;
      font-size: 11px;
    }
    .v-image {
      border-radius: 10px;
    }
    ::v-deep {
      .v-responsive__sizer {
        padding-bottom: 100% !important;
      }
      .v-responsive__content {
        width: 100% !important;
      }
    }
    .v-btn {
      font-weight: 600;
    }
  }
  &__body {
    display: grid;
    grid-template-areas:
      'image title'
      'image info';
    grid-gap: 12px 16px;
    grid-template-columns: 152px 1fr;
    grid-template-rows: auto 1fr;
    max-width: 100%;
    &--wrapper {
      flex-basis: 0;
      flex-grow: 1;
    }
    ::v-deep {
      .v-list--dense .v-list-item {
        margin-bottom: 4px;
      }
    }
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid $border;
    padding-left: 16px;
    padding-right: 16px;
    margin-left: -16px;
    margin-right: -16px;
    .v-btn {
      &.selected {
        background-color: rgba($text, 0.3) !important;
      }
    }
    ::v-deep {
      .v-list--dense .v-list-item {
        &:not(:last-child) {
          margin-bottom: 4px;
        }

        &:last-child {
          margin-bottom: 0;
        }

        .v-list-item__icon {
          margin-right: 0;
          margin-left: -4px;
        }
      }
    }
    &--col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      margin-left: 12px;
      .v-btn {
        margin-top: auto;
      }
    }
  }
  &__title {
    grid-area: title;
    font-size: 18px;
    line-height: 24px;
    font-weight: 800;
    max-height: 48px;
    @include text-overflow(2);
  }
  &__rooms-left {
    margin-top: 8px;
    font-size: 14px;
  }
  &__info {
    grid-area: info;
    //margin-left: 16px;
    &--item {
      margin-bottom: 12px;
      line-height: 18px;
      font-size: 14px;
      .v-icon {
        margin-right: 8px;
      }
    }
  }
  &__price {
    display: flex;
    align-items: baseline;
    font-size: 18px;
    line-height: 24px;
    .text-light {
      font-size: 14px;
      color: $light;
      margin-left: 8px;
    }
  }
  &--small {
    .card__img {
      width: 100%;
    }
    .card__body {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        'title title'
        'image info';
    }
  }
  @include queryMax(380px) {
    .card__img {
      width: 100%;
    }
    .card__body {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        'title title'
        'image info';
    }
  }
}
</style>
