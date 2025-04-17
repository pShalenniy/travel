<template>
  <v-rating
    v-model="rating"
    color="#ffc255"
    size="18"
    background-color="#fff2dd"
    empty-icon="mdi-star"
    half-increments
  ></v-rating>
</template>

<script>
export default {
  data() {
    return {
      rating: 3
    };
  },
  props: {
    data: {
      type: [Object, null]
    }
  },
  computed: {
    item() {
      return {
        ...this.data
      };
    }
  },
  methods: {
    getRating() {
      let rating = this.item.rating || 4.9;
      return Math.round(rating * 100).toFixed(1);
    }
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.v-application .v-rating .v-icon {
  padding: 0;
  &.mdi-star-half::after {
    content: '\f04ce';
    display: inline-block;
    font-family: 'Material Design Icons';
    font-size: inherit;
    text-rendering: auto;
    line-height: inherit;
    -webkit-font-smoothing: antialiased;
    color: rgb(255, 242, 221);
    position: absolute;
    opacity: 1;
    background-color: transparent;
    z-index: -1;
    transform: none;
  }
}
</style>
