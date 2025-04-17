<template>
  <div class="filter-group">
    <div></div>
    <v-range-slider
      v-model="priceModel"
      :min="min"
      :max="max"
      thumb-label="always"
      :prepend="currency + min"
      :append="currency + max"
      :class="{
        'max-error': maxPriceError,
        'min-error': minPriceError
      }"
    >
      <template v-slot:thumb-label="props">
        <div>{{ currency + props.value }}</div>
      </template>
      <template v-slot:prepend>
        <div class="v-slider__thumb-label" :class="{ active: showMin }">
          {{ currency + min }}
        </div>
      </template>
      <template v-slot:append>
        <div class="v-slider__thumb-label" :class="{ active: showMax }">
          {{ currency + max }}
        </div>
      </template>
    </v-range-slider>
    <v-row>
      <v-col class="py-0">
        <v-subheader>Min price</v-subheader>
        <v-text-field
          v-if="value"
          :prefix="currency"
          outlined
          type="number"
          :min="min"
          :max="value[1]"
          :value="value[0]"
          @change="$set(priceModel, 0, $event)"
        ></v-text-field>
      </v-col>
      <v-col class="py-0">
        <v-subheader>Max price</v-subheader>
        <v-text-field
          v-if="value"
          :prefix="currency"
          outlined
          type="number"
          :min="value[0]"
          :max="max"
          :value="value[1]"
          @change="$set(priceModel, 1, $event)"
        ></v-text-field>
      </v-col>
    </v-row>
    <div v-if="maxPriceError" class="price-error">
      £300 is the maximum price set by your travel policy
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PriceFilters',
  props: {
    value: {
      type: Array,
      required: true
    },
    travelPolicyMax: {
      type: [Number, null]
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 500
    },
    currency: {
      type: String,
      default: '$'
    }
  },
  computed: {
    priceModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    maxPriceError() {
      return this.travelPolicyMax
        ? this.priceModel[1] > this.travelPolicyMax
        : false;
    },
    minPriceError() {
      return this.travelPolicyMax
        ? this.priceModel[0] > this.travelPolicyMax
        : false;
    },
    showMin() {
      return this.priceModel[0] > this.min + (this.max - this.min) * 0.1;
    },
    showMax() {
      return this.priceModel[1] < this.max - (this.max - this.min) * 0.1;
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.price-error {
  color: #e2442d;
  font-weight: 600;
  margin-top: 8px;
}
::v-deep .v-input--range-slider {
  &.max-error {
    .v-slider__thumb-container {
      &:last-child {
        color: #e2442d !important;

        .v-slider__thumb {
          border-color: #fdecea !important;
          background-color: #e2442d !important;
        }

        .v-slider__thumb-label {
          background-color: #fdecea !important;
          color: #e2442d !important;
        }
      }
    }
    .v-slider__track-container {
      .v-slider__track-background.primary:last-child {
        background-color: #e2442d !important;
      }
    }
  }
  &.min-error {
    .v-slider__thumb-container {
      color: #e2442d !important;

      .v-slider__thumb {
        border-color: #fdecea !important;
        background-color: #e2442d !important;
      }

      .v-slider__thumb-label {
        background-color: #fdecea !important;
        color: #e2442d !important;
      }
    }

    .v-slider__track-container {
      .v-slider__track-fill.primary {
        background-color: #e2442d !important;
      }
    }
  }
}

.filter-group ::v-deep .v-input {
  &.v-text-field {
    .v-input__prepend-inner {
      padding-right: 0;
    }
  }
  .v-input__prepend-outer,
  .v-input__append-outer {
    position: relative;
    margin: 0;
    align-self: center;
    .v-slider__thumb-label {
      opacity: 0;
      transition: $transition;
      background: none !important;
      color: $light;
      &.active {
        opacity: 1;
      }
    }
  }
  .v-input__prepend-outer {
    .v-slider__thumb-label {
      transform: translate(-25%, -14px) !important;
    }
  }
  .v-input__append-outer {
    .v-slider__thumb-label {
      transform: translate(-75%, -14px) !important;
    }
  }
}
</style>
