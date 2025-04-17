<template>
  <v-list flat dense>
    <v-list-item-group>
      <v-list-item v-for="(item, i) in data" :key="i">
        <v-list-item-icon>
          <v-icon
            v-if="item.icon"
            size="18"
            v-text="item.icon"
            color="light"
          ></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-html="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  name: 'IconsList',
  props: {
    data: {
      type: [Array, null]
    }
  }
};
</script>
<style lang="scss" scoped>
.v-application {
  .v-list {
    padding: 0;
  }
  .v-list--dense .v-list-item {
    padding: 0;
    align-items: center;
    min-height: auto;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    .v-list-item__icon {
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
    }
  }
}
</style>
