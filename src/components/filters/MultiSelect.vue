<template>
  <div class="multi-select">
    <v-subheader>{{ title }}</v-subheader>
    <v-autocomplete
      v-model="vModel"
      :hide-no-data="!search"
      :items="search ? data : getPopular"
      :search-input.sync="search"
      :placeholder="`Add ${title} preferences`"
      :color="color"
      :item-color="color"
      multiple
      outlined
      :menu-props="{
        contentClass: 'multi-select__menu',
        disableKeys: true,
        maxWidth: 400
      }"
    >
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip v-bind="attrs" :color="color" :input-value="selected">
          <span class="pr-2">
            {{ item }}
          </span>
          <v-icon small @click="parent.selectItem(item)">mdi-close</v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
        <div class="multi-select__item">
          <v-icon :color="color" left>
            mdi-plus
          </v-icon>
          {{ item }}
        </div>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'MultiSelect',
  props: {
    data: {
      type: [Array],
      required: true
    },
    popular: {
      type: [Array],
      required: true
    },
    title: {
      type: [String, null],
      required: true
    },
    color: {
      type: [String, null],
      default: 'primary'
    },
    value: {
      type: [Array],
      required: true
    }
  },
  data: () => ({
    search: null
  }),
  computed: {
    vModel: {
      get() {
        return this.value;
      },
      set(localState) {
        this.$emit('input', localState);
      }
    },
    getPopular() {
      return [{ header: 'Popular' }, ...this.popular, ...this.value];
    }
  }
};
</script>

<style lang="scss">
@import 'src/scss/utils/__utils';
.multi-select {
  &__menu {
    margin-top: 4px;
    &.v-autocomplete__content.v-menu__content {
      box-shadow: 0 2px 10px 0 rgba(52, 52, 57, 0.1);
    }
    .v-list {
      padding: 0;
      border-radius: 4px !important;
      border: 1px solid $border;
      box-shadow: none !important;
    }
    .v-list-item {
      font-size: 14px;
      line-height: 18px;
      font-weight: 600;
      min-height: 42px;
      &:not(:last-child) {
        border-bottom: 1px solid $border;
      }
      &:before {
        opacity: 0 !important;
      }
      &.v-list-item--active .multi-select__item {
        opacity: 0.3;
      }
    }
  }
  .v-subheader {
    height: auto;
    padding: 0;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .v-input {
    margin-bottom: 24px;
    input {
      padding-left: 4px;
      padding-right: 4px;
    }
    .v-input__slot {
      margin: 0;
    }
    .v-text-field__details {
      display: none;
    }
    > .v-input__control > {
      .v-input__slot {
        min-height: 48px;
        padding: 0 10px !important;
        .v-select__selections {
          min-height: 48px;
          padding: 4px 0;
          margin: 0 -4px;
          width: calc(100% + 8px);
        }
        .v-input__append-inner {
          margin-top: 13px;
          display: none;
        }
      }
    }
  }
  .v-chip.v-size--default {
    font-weight: 800;
    font-size: 12px;
    color: #fff;
    margin: 4px;
  }
}
</style>
