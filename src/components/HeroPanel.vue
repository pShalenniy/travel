<template>
  <div
    class="hero-panel"
    :class="{ 'hero-panel--small': small }"
    v-bg-image="data.backgroundImgSrc"
  >
    <div class="container">
      <h1
        v-html="data.title"
        data-test="page-title"
        :class="{ 'hero-heading--small': smallHeading }"
      ></h1>
      <h2 v-if="data.subTitle">
        <a v-if="data.subTitleLink" :href="data.subTitleLink">
          {{ data.subTitle }}
          <v-icon size="24">mdi-chevron-right</v-icon>
        </a>
        <span v-else>
          {{ data.subTitle }}
        </span>
      </h2>
      <v-btn
        v-if="data.anotherLocation"
        to="/"
        color="#000"
        depressed
        rounded
        class="common-cased-btn"
      >
        Explore another location
      </v-btn>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroPanel',
  props: {
    data: {
      type: [Object, null]
    },
    small: {
      type: [Boolean, null]
    },
    smallHeading: {
      type: [Boolean, null]
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.hero-panel {
  min-height: 620px;
  padding: 100px 0;
  text-align: center;
  background: {
    size: cover;
    position: center;
    repeat: no-repeat;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  overflow: hidden;
  position: relative;
  &:after {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.6) 56.79%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }
  .container {
    position: relative;
    z-index: 1;
  }
  h1 {
    font-weight: 800;
    font-size: 100px;
    line-height: 1;
    margin: 0 0 10px;
  }
  h2 {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    a {
      color: #fff;

      &:hover {
        color: $primary;
      }
    }
    .v-icon {
      color: currentColor;
      vertical-align: top;
      margin-right: -24px;
    }
  }
  .v-btn {
    &:not(.white) {
      color: #fff;
    }

    &.white {
      color: $text;
    }
  }
  .common-cased-btn {
    text-transform: none !important;
    font-weight: 600;
  }
  &.hero-panel--small {
    min-height: 200px;
  }
  h1.hero-heading--small,
  &.hero-panel--small h1 {
    font-size: 48px;
    line-height: 53px;
    margin: 0 0 10px;
  }
  @include query-1439 {
    min-height: 45vw;
  }
  @media (max-width: 767px) {
    min-height: 248px;
    h1 {
      font-size: 48px;
      line-height: 64px;
    }
    h1.hero-heading--small,
    &.hero-panel--small h1 {
      font-size: 32px;
      line-height: 42px;
    }

    &.hero-panel--small {
      min-height: 180px;
      padding: 12px 0 0;
    }
  }
  @include queryMax(374px) {
    .container {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      padding-bottom: 0;
      h1 {
        margin-top: auto;
      }
    }
  }
}
</style>
