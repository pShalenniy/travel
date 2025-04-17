<template>
  <v-menu
    v-model="datePicker"
    :close-on-content-click="false"
    transition="fade-transition"
    offset-y
    min-width="290px"
    :disabled="loading"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateRangeText"
        data-test="destination-filter-dates"
        readonly
        :loading="loading"
        outlined
        class="filter-menu__field"
        prepend-inner-icon="mdi-calendar-today"
        :error="totalNights > 30"
        :error-messages="errorMessage"
        :label="label"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <div class="range-picker">
      <v-date-picker
        v-model="vModel"
        no-title
        scrollable
        :min="minDate[0]"
        :max="maxDate[0]"
        range
        next-icon=""
        :picker-date.sync="startMonth"
      ></v-date-picker>
      <v-date-picker
        v-model="vModel"
        no-title
        scrollable
        :min="minDate[1]"
        :max="maxDate[1]"
        range
        prev-icon=""
        :picker-date.sync="endMonth"
      >
      </v-date-picker>
      <div class="range-picker__footer">
        <div v-if="totalNights <= 30">
          {{ dateRangeText }}
          <strong v-if="totalNights" class="ml-2">
            ({{ totalNights }} total nights)
          </strong>
        </div>

        <div v-if="totalNights > 30" class="error--text mr-3">
          Sorry, reservations for more than 30 nights are not possible
        </div>

        <v-btn
          class="ml-auto"
          color="black"
          depressed
          dark
          rounded
          :disabled="!vModel[1]"
          @click="apply()"
        >
          {{ applyText }}
        </v-btn>
      </div>
    </div>
  </v-menu>
</template>

<script>
import moment from 'moment';
import { viewDate, completeDate, monthYearDate, getNights } from '@/utils/date';

export default {
  name: 'DateFilter',
  props: {
    value: {
      type: Array
    },
    loading: {
      type: [Boolean, null]
    },
    errorMessage: {
      type: [String, null]
    },
    applyText: {
      type: [String, null],
      default: 'Apply'
    },
    label: {
      type: [String, null]
    }
  },
  data() {
    return {
      datePicker: false,
      startMonth: null,
      endMonth: null
    };
  },
  watch: {
    startMonth(newVal) {
      if (newVal) {
        this.endMonth = moment(newVal)
          .add(1, 'month')
          .format(monthYearDate);
      }
    },
    endMonth(newVal) {
      if (newVal) {
        this.startMonth = moment(newVal)
          .subtract(1, 'month')
          .format(monthYearDate);
      }
    }
  },
  computed: {
    dateRangeText() {
      const start = this.vModel[0]
        ? moment(this.vModel[0]).format(viewDate)
        : 'Check in';
      const ens = this.vModel[1]
        ? moment(this.vModel[1]).format(viewDate)
        : 'Check out';
      return `${start} - ${ens}`;
    },
    minDate() {
      const resultStart = moment().format(completeDate);
      const resultEnd = moment()
        .add(1, 'month')
        .format(monthYearDate);
      return [resultStart, resultEnd];
    },
    maxDate() {
      const resultStart = moment()
        .add(16, 'month')
        .format(monthYearDate);
      const resultEnd = moment()
        .add(16, 'month')
        .format(completeDate);
      return [resultStart, resultEnd];
    },
    vModel: {
      get() {
        return this.value;
      },
      set(value) {
        if (value[0] === value[1]) {
          this.$emit('input', [
            value[0],
            moment(value[1])
              .add(1, 'day')
              .format(completeDate)
          ]);

          return;
        }

        if (moment(value[0]) > moment(value[1])) {
          this.$emit('input', value.reverse());
        } else {
          this.$emit('input', value);
        }
      }
    },
    totalNights() {
      return this.vModel[1] ? getNights(this.vModel[0], this.vModel[1]) : null;
    }
  },
  methods: {
    apply() {
      this.$emit('apply-event');
      this.datePicker = false;
    }
  },
  created() {
    if (this.value[1]) {
      this.endMonth = moment(this.value[1])
        .add(1, 'month')
        .format(monthYearDate);
    }
  }
};
</script>
<style lang="scss" scoped>
.range-picker {
  border: 1px solid $border;
  border-radius: 4px;
  background-color: #fff;
  &__footer {
    display: flex;
    align-items: center;
    flex-basis: 0;
    flex-grow: 1;
    padding: 12px 16px 16px 28px;
    font-weight: 600;
    font-size: 14px;
  }
  ::v-deep {
    .v-btn.theme--light:not(.v-btn--active) {
      color: $text;
    }
    .v-card {
      border: 0;
      width: 50%;
      padding: 0 4px 0;
      min-width: 250px;
      margin: 0 auto;
      &:first-child {
        .v-date-picker-header > .v-btn:last-child {
          opacity: 0;
          pointer-events: none;
        }
      }
      &:last-child {
        .v-date-picker-header > .v-btn:first-child {
          opacity: 0;
          pointer-events: none;
        }
      }
    }
    .v-date-picker-header {
      padding-left: 12px;
      padding-right: 12px;
      &__value {
        pointer-events: none;
      }
    }
  }
  @media (max-width: 767px) {
    display: flex;
    flex-wrap: wrap;
    max-height: calc(100vh - 24px);
    overflow: auto;
    &__footer {
      min-width: 100%;
      padding-left: 16px;
    }
    ::v-deep {
      .v-card {
        flex-basis: 0;
        flex-grow: 1;
      }
    }
  }
}
</style>
