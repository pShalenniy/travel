<template>
  <div class="text-center">
    <div class="filter-panel-wrapper" :class="{ open: isOpen }">
      <div class="filter-panel">
        <div class="filter-panel__heading">
          <div class="filter-panel__title">
            {{ getName }}
          </div>
          <v-btn icon text color="text" class="" @click="toggle(false)">
            <v-icon size="18">mdi-close</v-icon>
          </v-btn>
        </div>
        <v-card outlined class="card-filter">
          <date-filter
            v-if="datesModel"
            v-model="datesModel"
            apply-text="Check Availability"
            label="Check in - Check out"
            :error-message="error"
            :loading="datesLoading"
            @apply-event="checkAvailableRooms"
          ></date-filter>
          <v-tooltip bottom :open-on-click="true">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                outlined
                readonly
                :value="getRoomsAndGuests"
                prepend-inner-icon="mdi-account"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <span>
              We currently only support bookings for one guest
            </span>
          </v-tooltip>

          <editable-field
            v-if="isReference"
            v-model="reference"
            label="cost center / project code"
          >
            <strong class="mr-0">
              Cost Allocation Reference
            </strong>
            <v-tooltip top :open-on-click="true">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="text"
                  icon
                  small
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </template>
              <span>
                The Cost Allocation Reference helps make sure the cost of your
                trip goes to the right place in your business - it might be a
                Cost Centre, Project Code or Business Unit
              </span>
            </v-tooltip>
          </editable-field>

          <editable-field v-if="user" nowrap>
            <div class="text-ellipsis mr-4">
              Email:
              <strong :title="user.email">{{ user.email }}</strong>
            </div>
            <span
              v-if="user && user.userStatus === 'verified'"
              class="editable-field__button disabled"
            >
              verified

              <v-icon color="success">
                mdi-check-circle
              </v-icon>
            </span>
            <button v-else class="editable-field__button" @click="verifyUser()">
              Verify
            </button>
          </editable-field>

          <room-card
            v-if="getChosenRoom && isRoomExist(getChosenRoom)"
            :data="getChosenRoom"
            :currency="getCurrency"
            small
            class="room-card"
          ></room-card>

          <div
            v-if="getChosenRoomPrice && isRoomExist(getChosenRoom)"
            v-touch="{ up: () => toggle(true) }"
            class="card-filter__footer"
          >
            <v-btn
              data-test="details-request-btn"
              depressed
              rounded
              color="primary"
              dark
              :loading="getSendingRequest"
              @click="handleRequest()"
            >
              Request
            </v-btn>
            <price
              class="card-filter__price mt-0"
              :total="getTotalPrice"
              :price="getChosenRoomPrice"
              currency="£"
              @click.native="toggle()"
            ></price>
          </div>

          <div
            v-else
            v-touch="{ up: () => toggle(true) }"
            class="card-filter__footer hide-desktop"
          >
            <v-btn
              depressed
              rounded
              color="primary"
              dark
              outlined
              class="ml-auto my-auto"
              @click.native="toggle()"
            >
              filter
            </v-btn>
          </div>
        </v-card>
      </div>
    </div>
    <v-chip class="mx-auto mt-4 filter-chip d-none" color="secondary">
      This hotel is popular with your colleagues!
    </v-chip>
    <confirm-account-dialog
      v-model="conformationDialog"
    ></confirm-account-dialog>
    <user-verification-dialog
      v-model="verificationDialog"
    ></user-verification-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DateFilter from '../../filters/DateFilter';
import EditableField from '../../filters/EditableField';
import ConfirmAccountDialog from '../../dialogs/ConfirmAccountDialog';
import UserVerificationDialog from '@/components/dialogs/UserVerificationDialog';
import RoomCard from '@/components/cards/RoomCard';
import { getRangeDatesFormatted } from '@/utils/date';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';
import { theme } from '@/utils/theme';

export default {
  name: 'FilterPanel',
  components: {
    DateFilter,
    EditableField,
    ConfirmAccountDialog,
    UserVerificationDialog,
    RoomCard
  },
  data() {
    return {
      isOpen: false,
      dates: null,
      datesLoading: false,
      error: null
    };
  },
  computed: {
    ...mapGetters('user', ['user', 'getReference']),
    ...mapGetters('detailsFilter', [
      'getConformationDialog',
      'getVerificationDialog',
      'getDates',
      'getSource',
      'getRoomsAndGuests',
      'getTotalPrice',
      'getChosenRoom',
      'getChosenRoomPrice'
    ]),
    ...mapGetters('details', [
      'getName',
      'getCurrency',
      'getHotelRoomsAvailable',
      'isRoomExist',
      'getSendingRequest'
    ]),
    conformationDialog: {
      get() {
        return this.getConformationDialog;
      },
      set(value) {
        this.setConformationDialog(value);
      }
    },
    verificationDialog: {
      get() {
        return this.getVerificationDialog;
      },
      set(value) {
        this.setVerificationDialog(value);
      }
    },
    datesModel: {
      get() {
        return this.dates || this.getDates;
      },
      set(value) {
        this.dates = value;
        this.error = null;
      }
    },
    reference: {
      get() {
        return this.getReference || '';
      },
      set(value) {
        this.setReference(value);
      }
    },
    isReference() {
      return theme.features.costAllocationReference;
    }
  },
  methods: {
    ...mapActions('user', ['setReference']),
    ...mapActions('detailsFilter', [
      'setDetailsFiltersValues',
      'setConformationDialog',
      'setRequestClicked',
      'setVerificationDialog',
      'setChosenRoom'
    ]),
    ...mapActions('details', ['loadAvailableRooms', 'reserveRoom']),
    toggle(isOpen = !this.isOpen) {
      this.isOpen = isOpen;
    },
    verifyUser(handleRequestClick = false) {
      this.setRequestClicked(handleRequestClick);

      if (this.user && this.user.userStatus === 'unverified') {
        this.setVerificationDialog(true);
        return;
      }

      this.setConformationDialog(true);
    },
    handleRequest() {
      if (this.user && this.user.userStatus === 'verified') {
        this.reserveRoom();
        return;
      }

      this.verifyUser(true);
    },
    checkAvailableRooms() {
      this.datesLoading = true;
      logAmplitudeEvent(amplitudeEvents.hotelDetailsCheckout.changeDates, {
        newFromDate: this.dates[0],
        newToDate: this.dates[1]
      });
      this.loadAvailableRooms({
        checkin: this.dates[0],
        checkout: this.dates[1],
        source: this.getSource,
        guests: 1,
        rooms: 1
      }).then(response => {
        this.datesLoading = false;
        if (response) {
          this.setDetailsFiltersValues({
            checkin: this.dates[0],
            checkout: this.dates[1]
          });
          this.$router.push({
            ...this.$route,
            query: {
              ...this.$route.query,
              checkin: this.dates[0],
              checkout: this.dates[1]
            }
          });
        } else {
          this.error = `no rooms available for dates ${getRangeDatesFormatted(
            this.dates[0],
            this.dates[1]
          )}`;
          this.setChosenRoom(null);
        }
        this.dates = null;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.filter-panel {
  &__heading {
    display: none;
  }
}
.card-filter {
  max-height: calc(100vh - 72px - 32px);
  overflow: auto;
  &__heading {
    margin-bottom: 16px;
  }
  &__price {
    margin-left: auto;
    &:not(:first-child) {
      margin-top: 32px;
    }
  }
  &__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: sticky;
    bottom: -16px;
    margin: -1px -16px -16px;
    padding: 16px;
    border-top: 1px solid $border;
    background-color: #fff;

    @media (max-height: 799px) {
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }
  .v-input__slot {
    margin: 0;
  }
  .v-text-field__details {
    display: none;
  }
  .v-select__selection--comma {
    font-weight: 600;
    font-size: 18px;
  }
  ::v-deep .v-text-field,
  .v-text-field {
    &.v-text-field--enclosed {
      margin-bottom: 16px;
    }
  }
  .room-card {
    border-radius: 0;
    border-width: 1px 0;
    margin: 16px -16px 0;
    max-width: calc(100% + 32px);
  }
}
@include queryMin(661px) {
  .hide-desktop {
    display: none;
  }
}
@include query-660 {
  .filter-panel-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 10;
    height: 68px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    background-color: rgba(#000, 0.4);
    transition: $transition;
    &.open {
      height: 100vh;
    }
    &:not(.open) {
      .card-filter__footer {
        .card-filter__price {
          display: block;

          &.total {
            display: none;
          }
        }
      }
    }
  }
  .filter-panel {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    &__heading {
      margin-bottom: auto;
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 8px 12px;
      border-bottom: 1px solid $border;
      position: relative;
      min-height: 60px;
      .v-btn {
        position: absolute;
        right: 4px;
        top: 10px;
      }
    }
    &__title {
      line-height: 20px;
      margin: 0 auto;
      font-weight: 600;
    }
  }
  .card-filter {
    border-radius: 0 !important;
    border-width: 1px 0 0 !important;
    padding: 16px 12px 0;
    max-height: calc(100vh - 59px);
    margin-top: -1px;
    &__footer {
      position: sticky;
      bottom: 0;
      background-color: #fff;
      border-top: 1px solid $border;
      padding: 8px 12px 8px;
      margin: 0 -12px 0;
      min-height: 68px;
      .v-btn:last-child {
        margin-left: 8px;
      }
    }
    .room-card {
      border-bottom: 0;
      margin-left: -12px;
      margin-right: -12px;
    }
  }
}
</style>
