<template>
  <div class="masonry">
    <mq-layout mq="md+">
      <div class="masonry-gallery">
        <div
          v-for="(image, i) in data.slice(0, 5)"
          :key="i"
          class="masonry-gallery__item"
        >
          <img :src="image" alt="" />
        </div>
      </div>
    </mq-layout>
    <mq-layout mq="sm">
      <v-carousel :show-arrows="false" class="masonry-slider" height="66vw">
        <v-carousel-item
          v-for="(image, i) in data.slice(0, 10)"
          :key="i"
          :src="image"
        ></v-carousel-item>
      </v-carousel>
    </mq-layout>
  </div>
</template>
<script>
export default {
  name: 'MasonryGallery',
  props: {
    data: {
      type: [Array, null]
    }
  }
};
</script>
<style lang="scss">
.masonry {
  margin-bottom: -20px;
}
.masonry-gallery {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-auto-rows: 1fr;
  max-width: 100%;
  max-height: calc(100vh - 210px);
  height: 50vw;
  grid-gap: 4px;
  margin-bottom: 4px;
  &__item {
    min-width: 1px;
    min-height: 1px;
    &:first-child {
      grid-row-start: 1;
      grid-row-end: 3;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      vertical-align: top;
    }
  }

  @media (min-width: 1200px) {
    max-width: 1120px;
    margin-left: auto;
    margin-right: auto;
    height: 450px;
  }
}
.masonry-slider {
  max-height: 100vh;
}
.v-carousel__controls {
  background-color: transparent;
  height: 40px;
  .v-btn {
    margin: 0;
    height: 24px;
    width: 24px;
    &:before {
      display: none;
    }
    .v-icon {
      font-size: 12px !important;
    }
    &.v-item--active {
      .v-icon {
        opacity: 1;
      }
    }
  }
}
</style>
