<template>
  <v-card class="add-itinerary-item" @click="handleClick">
    <v-icon size="24" color="light">
      mdi-plus
    </v-icon>
    <v-card-title>
      {{ title }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'AddItineraryItem',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick() {
      console.log(this.title);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.v-card.add-itinerary-item {
  background-color: $lightBg;
  border: 2px dashed $border;
  border-radius: 10px;
  min-height: 84px;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:after {
    display: none;
  }
  .v-card__title {
    padding: 0;
    margin-top: 8px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    color: $light;
  }
}
</style>
