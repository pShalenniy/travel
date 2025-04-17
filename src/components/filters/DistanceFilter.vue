<template>
  <div class="filter-group">
    <div></div>
    <v-slider
      v-model="distanceModel"
      :min="min"
      :max="max"
      step="1"
      thumb-label="always"
      :prepend="min + 'km'"
      :append="max + 'km'"
      @change="onChange($event)"
    >
      <template v-slot:thumb-label="props">
        <div>{{ props.value + 'km' }}</div>
      </template>
      <template v-slot:prepend>
        <div class="v-slider__thumb-label" :class="{ active: showMin }">
          {{ min + 'km' }}
        </div>
      </template>
      <template v-slot:append>
        <div class="v-slider__thumb-label" :class="{ active: showMax }">
          {{ max + 'km' }}
        </div>
      </template>
    </v-slider>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DistanceFilter',
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      showMin: true,
      showMax: true
    };
  },
  computed: {
    distanceModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    onChange(value) {
      this.showMin = value > this.min + (this.max - this.min) * 0.1;
      this.showMax = value < this.max - (this.max - this.min) * 0.1;
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.filter-group ::v-deep .v-input {
  &.v-text-field {
    .v-input__prepend-inner {
      padding-right: 0;
    }
  }
  .v-slider__thumb-container {
    z-index: 1;
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
