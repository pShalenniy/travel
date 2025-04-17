<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <v-subheader v-if="subTitle">{{ subTitle }}</v-subheader>
      <div>This is a <strong>Plus</strong> feature, upgrade to access it.</div>
    </v-card-text>
    <v-card-actions>
      <dialog-full-size title="Pricing plans" footer>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            block
            color="primary"
            dark
            large
            depressed
            v-bind="attrs"
            v-on="on"
          >
            Try for free
          </v-btn>
        </template>
        <price-dialog></price-dialog>
      </dialog-full-size>
    </v-card-actions>
  </v-card>
</template>

<script>
import PriceDialog from '@/components/price/PriceDialog';
import DialogFullSize from '@/components/dialogs/DialogFullSize';
export default {
  name: 'AccessCard',
  components: {
    PriceDialog,
    DialogFullSize
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: [String, null]
    }
  },
  data: () => ({
    dialog: false
  })
};
</script>

<style lang="scss" scoped>
.v-card {
  .v-card__title {
    margin-bottom: 16px;
  }
  .v-subheader {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 16px;
    font-weight: 800;
  }
}
</style>
