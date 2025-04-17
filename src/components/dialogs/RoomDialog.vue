<template>
  <dialog-full-size :title="data.name">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="room-dialog__btn"
        color="primary"
        text
        block
        height="32"
        v-bind="attrs"
        v-on="on"
        @click="viewMoreDetails()"
      >
        More details
        <v-icon size="18">mdi-chevron-right</v-icon>
      </v-btn>
    </template>
    <div class="room-dialog">
      <v-row>
        <v-col class="col-facilities">
          <div
            v-if="data.info.descriptionDetailed"
            class="room-dialog__desc"
            v-html="data.info.descriptionDetailed"
          ></div>
          <icons-list
            v-if="getMainFacilities && !data.info.descriptionDetailed"
            :data="getMainFacilities"
            class="room-dialog__facilities room-dialog__facilities--main"
          ></icons-list>

          <div v-if="getBathFacilities">
            <h4 class="room-dialog__title">
              Bathroom Facilities
            </h4>

            <icons-checked-list
              class="room-dialog__facilities"
              :data="getBathFacilities"
              :columns="2"
            ></icons-checked-list>
          </div>

          <div v-if="getOtherFacilities">
            <h4 class="room-dialog__title">
              Room Facilities
            </h4>

            <icons-checked-list
              class="room-dialog__facilities"
              :data="getOtherFacilities"
              :columns="2"
            ></icons-checked-list>
          </div>
        </v-col>
        <v-col class="col-gallery">
          <div
            v-if="data.info.description"
            class="room-dialog__desc"
            v-html="data.info.description"
          ></div>
          <v-carousel
            v-if="this.data.photos && this.data.photos.length"
            hide-delimiters
            class="room-dialog__gallery"
            height="auto"
          >
            <v-carousel-item
              v-for="(image, i) in this.data.photos"
              :key="i"
              :src="image"
            >
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </div>
  </dialog-full-size>
</template>

<script>
import { mapGetters } from 'vuex';
import DialogFullSize from './DialogFullSize';
import IconsCheckedList from '@/components/lists/IconsCheckedList';
import IconsList from '@/components/lists/IconsList';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
export default {
  name: 'RoomDialog',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    DialogFullSize,
    IconsCheckedList,
    IconsList
  },
  computed: {
    ...mapGetters('details', ['getHotelAmplitudeOptions', 'getCurrency']),
    getMainFacilities() {
      if (
        this.data.info.mainFacilities &&
        !!this.data.info.mainFacilities.length
      ) {
        return this.data.info.mainFacilities;
      }

      return null;
    },
    getBathFacilities() {
      if (
        this.data.info.bathFacilities &&
        !!this.data.info.bathFacilities.length
      ) {
        return this.data.info.bathFacilities.map(item => ({
          checked: true,
          title: item.name
        }));
      }

      return null;
    },
    getOtherFacilities() {
      if (
        this.data.info.otherFacilities &&
        !!this.data.info.otherFacilities.length
      ) {
        return this.data.info.otherFacilities.map(item => ({
          checked: true,
          title: item.name
        }));
      }

      return null;
    }
  },
  methods: {
    viewMoreDetails() {
      logAmplitudeEvent(amplitudeEvents.hotelDetails.viewMoreRoomDetails, {
        ...this.getHotelAmplitudeOptions,
        roomType: this.data.room_type,
        roomPricePerNight: this.data.rooms[0].dailyRate + this.getCurrency
      });
    }
  }
};
</script>

<style lang="scss">
@import 'src/scss/utils/__utils';
.room-dialog {
  height: calc(100vh - 120px);
  .col-facilities {
    flex: 0 0 350px;
    max-width: 350px;
    & + .col {
      max-width: calc(100% - 350px);
      align-self: flex-start;
      position: sticky;
      top: 0;
      height: calc(100vh - 140px);
      max-height: calc(100vh - 140px);

      @media (max-height: 700px) {
        height: calc(100vh - 100px);
        max-height: calc(100vh - 100px);
      }

      @include query-991 {
        height: calc(100vh - 80px);
        max-height: calc(100vh - 80px);
      }
    }

    .room-dialog__desc {
      margin-top: 0;
      font-size: 14px;

      p {
        margin-bottom: 5px;
      }
    }
  }
  .col-gallery {
    display: flex;
    flex-direction: column;

    .room-dialog__desc {
      margin: 0 0 16px;
    }
  }
  &__btn {
    padding: 0 8px !important;
  }
  &__title {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
  }
  &__facilities {
    margin-bottom: 24px;
    .v-list-item {
      margin-bottom: 6px !important;
    }
    &--main {
      .v-list-item {
        margin-bottom: 12px !important;
      }
    }
  }
  &__desc {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  &__gallery {
    border-radius: 10px;
    flex-basis: 0;
    flex-grow: 1;
    min-height: 1px;
    .v-btn {
      width: 48px;
      height: 48px;
      background-color: #fff;
      border: 1px solid $border;
      &.theme--dark {
        color: $text;
      }
      .v-icon {
        font-size: 24px !important;
      }
      &:hover {
        background-color: rgba(#fff, 0.8);
      }
    }
    .v-image__image--cover {
      background-size: contain !important;
      min-height: 100%;
    }
    .v-window__container {
      min-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .v-window-item {
      top: 50%;
      width: auto;
      left: 50%;
      position: absolute !important;
      transform: translate(-50%, -50%) !important;
      border-radius: 10px;
      overflow: hidden;
      max-height: 100%;
    }
    .v-window-x-transition-leave,
    .v-window-x-transition-enter-to,
    .v-window-x-reverse-transition-leave,
    .v-window-x-reverse-transition-enter-to {
      opacity: 1;
    }
    .v-window-x-transition-enter,
    .v-window-x-transition-leave-to,
    .v-window-x-reverse-transition-enter,
    .v-window-x-reverse-transition-leave-to {
      opacity: 0;
    }
  }
  @include queryMax(959px) {
    .col-facilities {
      flex: 0 0 100%;
      max-width: 100%;
      order: 2;
      & + .col {
        flex: 0 0 100%;
        max-width: 100%;
        align-self: flex-start;
        padding: 0;
        position: static;
        margin-bottom: 32px;
        height: auto;
      }
    }
    .col-gallery {
      display: flex;
      flex-direction: column;
      .room-dialog__desc {
        margin: 0;
        order: 2;
      }
    }
    &__desc {
      padding-left: 12px;
      padding-right: 12px;
    }
    &__gallery {
      border-radius: 0;
      margin-bottom: 24px;
      height: 67vw !important;
      max-height: 100%;
      flex: 1 1 auto;
      .v-window__container {
        max-height: 100%;
      }
      .v-btn {
        width: 40px;
        height: 40px;
      }
    }
    &__goodies {
      margin-top: 16px;
    }
    &__goodies-main {
      .v-item-group {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        .v-list-item {
          flex: 0 0 50%;
          width: 50%;
          max-width: 50%;
          padding-right: 12px;
          &:nth-child(2n) {
            padding-right: 0;
            padding-left: 12px;
          }
        }
      }
    }
  }
  @include query-767 {
    &__gallery {
      .v-window__container {
        max-height: 100%;
      }
      .v-image {
      }
      .v-window__container .v-window-item {
        border-radius: 0;
        width: 100%;
        display: flex;
      }
    }
  }
}
</style>
