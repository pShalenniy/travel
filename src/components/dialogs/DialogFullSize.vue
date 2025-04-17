<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    persistent
    content-class="dialog-full-size"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" v-bind:attrs="attrs" v-bind:on="on"></slot>
    </template>
    <div class="dialog-full-size__label">
      {{ title }}
    </div>
    <v-btn color="text" icon text @click="dialog = false" class="btn-close">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <div class="dialog-full-size__wrapper">
      <v-container class="py-0">
        <slot></slot>
      </v-container>
      <footer-bar v-if="footer" class="mt-auto"></footer-bar>
    </div>
  </v-dialog>
</template>

<script>
import FooterBar from '@/components/layout/FooterBar';
export default {
  name: 'DialogFullSize',
  components: {
    FooterBar
  },
  props: {
    title: {
      type: String
    },
    footer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style lang="scss">
@import 'src/scss/utils/__utils';
.v-application .dialog-full-size {
  background-color: #fff;
  padding-top: 120px;
  .row {
    margin-top: 0;
    margin-bottom: 0;
  }
  &.v-dialog {
    .btn-close {
      top: 32px;
      right: 64px;
    }
  }
  &__label {
    top: 32px;
    left: 64px;
    line-height: 24px;
    position: absolute;
    width: auto;
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
  }
  @media (max-height: 700px) {
    padding-top: 80px;
  }
  @include queryMax(959px) {
    padding-top: 60px;
    &.v-dialog {
      .btn-close {
        top: 16px;
        right: 16px;
      }
    }
    &__label {
      top: 30px;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      width: calc(100% - 90px);
    }
  }
}
</style>
