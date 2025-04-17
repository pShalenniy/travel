<template>
  <div class="details-page__panel gallery">
    <h3 class="details-page__sub-title">{{ title }}</h3>
    <div class="card-gallery-items">
      <div
        v-for="(item, index) in data.slice(0, showItems)"
        :key="index"
        class="card-gallery"
        @click="openGallery(index)"
      >
        <v-img
          class="card-gallery__img"
          :class="{ 'card-gallery__img--video': item.sources }"
          :src="item.thumb || item.src"
          :aspect-ratio="1"
        >
          <v-icon v-if="item.sources" size="24" color="white">
            mdi-play
          </v-icon>
        </v-img>
        <div class="card-gallery__caption">
          {{ item.caption }}
        </div>
      </div>
    </div>
    <light-box
      ref="lightbox"
      class="gallery-light-box"
      :media="data"
      :show-light-box="false"
      :show-thumbs="false"
      :showCaption="true"
    ></light-box>
    <div class="mt-10 text-center" v-if="data.length > showItems">
      <v-btn text color="primary" @click="viewMore()">
        View more
      </v-btn>
    </div>
    <div class="details-page__hr"></div>
  </div>
</template>
<script>
import LightBox from 'vue-image-lightbox';

export default {
  name: 'GalleryPanel',
  components: {
    LightBox
  },
  props: {
    data: {
      type: [Array, null]
    },
    title: {
      type: [String, null]
    }
  },
  data: () => ({
    showItems: 6
  }),
  methods: {
    openGallery(index = 0) {
      this.$refs.lightbox.showImage(index);
    },
    viewMore() {
      this.showItems += 6;
    }
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.card-gallery-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  @include query-767 {
    grid-column-gap: 10px;
  }
}
.card-gallery {
  cursor: pointer;
  min-width: 1px;
  &__img {
    width: 100%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    .v-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: rgba($text, 0.7);
      position: relative;
      z-index: 2;
    }
    &.card-gallery__img--video {
      position: relative;
      &:after {
        position: absolute;
        content: '';
        background-color: $text;
        opacity: 0.3;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  }
  &__caption {
    font-size: 14px;
    line-height: 19px;
    margin-top: 8px;
    @include text-overflow();
  }
}

.vue-lb {
  &-container {
    background-color: #fff;
    display: flex;
    height: 100%;
    justify-content: center;
    flex-wrap: wrap;
    left: 0;
    padding: 16px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2000;
  }
  &-content {
    max-width: 100%;
    width: 1344px;
    padding: 0 16px;
    position: relative;
    display: flex;
    align-items: center;
  }
  &-button-close {
    position: absolute;
    right: 16px;
    top: 16px;
    outline: none;
    height: 40px;
    padding: 10px;
    width: 40px;
    color: $text;
    path {
      fill: currentColor;
    }
  }
  &-figure {
    width: 900px;
    max-width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    video {
      max-width: 100%;
      height: auto;
    }
  }
  &-modal-image {
    max-height: calc(100vh - 140px);
    display: block;
    height: auto;
    margin: 0 auto;
    max-width: 100%;
    user-select: none;
    border-radius: 10px;
  }
  &-info {
    height: 40px;
    width: 100%;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
  }
  &-footer-count {
    top: 16px;
    left: 16px;
    position: absolute;
    font-size: 14px;
    line-height: 40px;
    font-weight: 600;
  }
  &-arrow {
    border-radius: 50%;
    outline: none;
    padding: 10px;
    position: absolute;
    top: calc(50% - 24px);
    user-select: none;
    width: 48px;
    height: 48px;
    border: 1px solid #f6f6f6;
    transition: $transition;
    svg {
      width: 14px;
    }
    path {
      fill: currentColor;
    }
    &:hover {
      border-color: $border;
      box-shadow: 0 2px 4px 0 rgba($text, 0.1);
    }
  }
  &-left {
    left: calc((100% - 1312px) / 2);
  }
  &-right {
    right: calc((100% - 1312px) / 2);
  }
  &-open {
    overflow: hidden;
  }
  @media (max-width: 1376px) {
    &-left {
      left: 32px;
    }
    &-right {
      right: 32px;
    }
  }
  @media (max-width: 1023px) {
    &-container {
      padding-left: 0;
      padding-right: 0;
    }
    &-content {
      padding: 0 72px;
    }
    &-left {
      left: 16px;
    }
    &-right {
      right: 16px;
    }
  }
  @media (max-width: 767px) {
    &-content {
      padding: 0;
    }
    &-footer-count {
      left: 50%;
      transform: translateX(-50%);
    }
    &-figure {
      margin-top: 80px;
    }
    &-modal-image {
      border-radius: 0;
    }
    &-arrow {
      position: static;
      margin: auto 16px 16px;
    }
    &-left {
      margin-right: auto;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.no-scroll {
  overflow-y: hidden;
}
</style>
