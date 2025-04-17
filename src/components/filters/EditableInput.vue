<template>
  <v-text-field
    v-model="valueModel"
    :readonly="!isEdit"
    :label="label"
    :type="password ? 'password' : 'text'"
    class="input-editable"
  >
    <template v-slot:append>
      <v-btn
        v-if="isEdit"
        color="primary"
        text
        class="pa-0"
        @click="handleSubmit"
      >
        Submit
      </v-btn>
      <v-btn v-else color="primary" text class="pa-0" @click="isEdit = true">
        Edit
      </v-btn>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'EditableInput',
  props: {
    value: {
      type: String,
      required: true
    },
    submit: {
      type: [Function, null]
    },
    label: {
      type: [String, null]
    },
    password: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valueModel: this.value,
      isEdit: false,
      showPassword: false
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.valueModel);
      this.isEdit = false;
    }
  }
};
</script>

<style lang="scss">
.v-input.input-editable {
  margin: 0 0 24px;
  min-height: 71px;
  .v-btn {
    min-width: auto;
    height: auto;
  }
  .v-text-field__details {
    display: none;
  }
  .v-input__slot {
    margin: 0;
  }
  .v-label {
    font-size: 18px;
    font-weight: 600;
  }
  .v-input__append-inner {
    margin-top: 17px;
  }
  input {
    font-size: 18px;
    line-height: 24px;
    min-height: 52px;
  }
}
</style>
