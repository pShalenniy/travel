<template>
  <div class="editable-field">
    <div class="editable-field__text" :class="{ 'flex-nowrap': nowrap }">
      <slot></slot>

      <button
        v-if="value !== undefined && !isEdit"
        class="editable-field__button"
        @click="isEdit = true"
      >
        {{ value ? 'Edit' : 'Add' }}
      </button>
      <v-btn v-if="isEdit" icon small class="mr-2" @click="clear()">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <div v-if="value && !isEdit" class="mt-2">
        <span v-if="label"> {{ label }}: </span>
        <strong class="editable-field__value">{{ value }}</strong>
      </div>
    </div>
    <v-text-field
      v-if="isEdit"
      v-model="vModel"
      :label="label"
      outlined
      :prepend-inner-icon="icon"
    >
      <template v-slot:append>
        <button class="isEditable-field__button" @click="handleSubmit">
          Save
        </button>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: 'EditableField',
  props: {
    value: {
      type: [String, null]
    },
    label: {
      type: [String, null]
    },
    icon: {
      type: [String, null]
    },
    open: {
      type: [Boolean, null]
    },
    nowrap: {
      type: [Boolean, null]
    }
  },
  data() {
    return {
      vModel: this.value,
      isEdit: this.open
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('input', this.vModel);
      this.isEdit = false;
    },
    clear() {
      this.isEdit = false;
      this.vModel = '';
      this.$emit('input', '');
    }
  }
};
</script>

<style lang="scss" scoped>
.editable-field {
  &__text {
    display: flex;
    align-items: center;
    min-height: 32px;
    font-size: 14px;
    padding: 4px 0;
    flex-wrap: wrap;
  }
  &__button {
    margin-left: auto;
    color: $light;
    font-weight: 600 !important;
    text-decoration: underline;
    line-height: 24px;
    white-space: nowrap;
    .v-icon {
      vertical-align: top;
    }
    &.disabled {
      text-decoration: none;
    }
    &:focus {
      outline: none;
    }
  }
  &__value {
    display: inline-block;
  }
  ::v-deep {
    .v-input {
      margin-top: 8px;
    }
    .isEditable-field__button {
      color: $light;
      &:hover {
        color: $primary;
      }
    }
    .v-btn--icon.v-size--small {
      width: 24px;
      height: 24px;
      margin-left: auto;
    }
    .v-input__append-inner {
      margin-top: 20px;
    }
  }
}
</style>
