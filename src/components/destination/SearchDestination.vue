<template>
  <v-combobox
    v-model="destinationModel"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    hide-no-data
    no-filter
    :label="label"
    item-text="placeName"
    v-bind="$attrs"
  ></v-combobox>
</template>
<script>
import apolloClient from '../../vue-apollo';
import searchPlaces from '../../queries/searchPlaces';
import _get from 'lodash/get';

export default {
  name: 'SearchDestination',
  props: {
    value: {
      type: [String, Object]
    },
    label: {
      type: [String, Object]
    }
  },
  data: () => ({
    entries: [],
    isLoading: false,
    model: null,
    search: null
  }),
  computed: {
    destinationModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    items() {
      return this.entries.map(entry => {
        const Description = entry.placeName;
        const Place = entry.text;
        return Object.assign({}, entry, { Description, Place });
      });
    }
  },
  watch: {
    search(val) {
      // Items have already been requested
      if (this.isLoading) return;
      // Start searching after 2th character
      if (val && val.length > 2) {
        this.isLoading = true;

        searchPlaces({
          apollo: apolloClient.defaultClient,
          searchTerm: val
        })
          .then(response => _get(response, 'data.searchPlaces', {}))
          .then(response => {
            this.entries = response;
          })
          .finally(() => (this.isLoading = false));
      }
    }
  }
};
</script>
<style lang="scss"></style>
