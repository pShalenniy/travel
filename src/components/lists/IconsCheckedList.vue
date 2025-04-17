<template>
  <v-list flat dense>
    <v-list-item-group>
      <v-list-item
        v-for="(item, i) in data"
        :key="i"
        :class="`col-${12 / columns}`"
      >
        <v-list-item-icon>
          <v-icon size="18" :color="item.checked ? 'primary' : 'error'">
            {{ item.checked ? 'mdi-check' : 'mdi-close' }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-icon v-if="item.icon">
          <v-icon size="18" v-text="item.icon" color="light"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            v-html="item.title || item.name"
          ></v-list-item-title>
          <v-chip v-if="item.label" color="lightBg" small>
            {{ item.label }}
          </v-chip>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  name: 'IconsCheckedList',
  props: {
    data: {
      type: [Array, null]
    },
    columns: {
      type: [Number, null],
      default: 1
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/scss/utils/__utils';
.v-application {
  .v-list {
    padding: 0;
  }
  .v-list-item-group {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0 -6px;
    max-width: calc(100% + 12px);
  }
  .v-list--dense .v-list-item {
    padding: 0;
    align-items: center;
    min-height: auto;
    &.col-12,
    &.col-6 {
      padding-left: 6px;
      padding-right: 6px;
    }
    &.col-6 {
      @include flex-col(50%);
    }
    margin-bottom: 16px;
    .v-list-item__icon {
      min-width: 18px;
      height: 18px;
      margin-top: 0;
      margin-bottom: 0;
      margin-right: 4px;
    }
    .v-list-item__content {
      padding: 0;
    }
    .v-list-item__title {
      font-size: 14px;
      line-height: 18px;
      white-space: normal;
      font-weight: 600;
      flex: 0 0 auto;
      margin: 0;
      color: $light;
      max-width: 100%;

      &:not(:last-child) {
        margin-right: 6px;
      }
    }
    .v-chip {
      flex: 0 0 auto;
      margin-top: -3px;
      margin-bottom: -3px;
      font-size: 11px;
      color: $light;
      font-weight: 600;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
}
</style>
