<template>
  <v-card class="card fly">
    <v-img
      class="fly__company"
      :src="getData.company"
      height="64"
      width="80"
    ></v-img>
    <div class="fly__number">
      {{ getData.number }}
    </div>
    <div class="fly__start">
      <div class="fly__location">
        {{ getData.startPlace }}
      </div>
      <div class="fly__time">
        {{ getData.startTime }}
      </div>
    </div>
    <div class="fly__duration">
      {{ getData.duration }}
    </div>
    <div class="fly__end">
      <div class="fly__location">
        {{ getData.endPlace }}
      </div>
      <div class="fly__time">
        {{ getData.endTime }}
      </div>
    </div>
    <div class="fly__plane">
      <v-icon color="light">mdi-airplane</v-icon>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'PlaneTicketCard',
  props: {
    data: {
      type: [Object, null]
    }
  },
  computed: {
    getData() {
      return {
        company: '/card_placeholder.png',
        number: 'BA1X993',
        startPlace: 'LGW',
        startTime: '06:00',
        duration: '2 hrs 20 mins',
        endPlace: 'POR',
        endTime: '08:20',
        ...this.data
      };
    }
  },
  methods: {
    toggleSelected() {
      this.data.selected = !this.data.selected;
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.v-card {
  &.card {
    overflow: hidden;
    background-color: #fff;
    color: $text;
    transition: all 0.2s;
    padding: 16px;
    margin-bottom: 16px;
    border: 1px solid $border;
    box-shadow: none;
    &.selected {
      border-color: $text;
    }
  }
}
.fly {
  display: grid;
  grid-template-areas:
    'company . number'
    'start duration end'
    'plane plane plane';
  grid-template-columns: 1fr auto 1fr;
  font-size: 14px;
  line-height: 19px;
  &__company {
    grid-area: company;
    margin-bottom: 24px;
    border-radius: 0 !important;
  }
  &__number {
    grid-area: number;
    text-align: right;
  }
  &__start {
    grid-area: start;
    margin-bottom: 20px;
  }
  &__duration {
    grid-area: duration;
    text-align: center;
    color: $light;
  }
  &__end {
    grid-area: end;
    text-align: right;
    margin-bottom: 20px;
  }
  &__plane {
    grid-area: plane;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-image: radial-gradient(
      circle closest-side,
      $border 100%,
      transparent 100%
    );
    background-repeat: repeat-x;
    background-position: -3px center;
    background-size: 12px 3px;
    &:before,
    &:after {
      position: absolute;
      content: '';
      top: calc(50% - 5px);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $border;
      left: 0;
    }
    &:after {
      left: auto;
      right: 0;
    }
    .v-icon {
      transform: rotate(90deg);
      margin-top: 1px;
    }
  }
  &__location {
    font-size: 18px;
    line-height: 24px;
    font-weight: 800;
  }
  &__time {
    color: $light;
  }
}
</style>
