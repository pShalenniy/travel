s<template>
  <v-radio-group class="form-chips" v-model="vModel">
    <v-subheader v-if="title">{{ title }}</v-subheader>
    <v-radio
      v-for="(item, index) in data"
      :key="index"
      :value="item.value"
      :label="item.label"
    ></v-radio>
  </v-radio-group>
</template>
<script>
export default {
  name: 'RadioGroup',
  props: {
    data: {
      type: [Array],
      required: true
    },
    title: {
      type: [String, null],
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    vModel: {
      get() {
        return this.value;
      },
      set(localState) {
        this.$emit('input', localState);
      }
    }
  }
};
</script>
