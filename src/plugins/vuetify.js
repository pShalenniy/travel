import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify, {
  VBtn,
  VImg,
  VIcon,
  VTextField,
  VContainer,
  VRow,
  VCol,
  VProgressCircular,
  VSubheader
} from 'vuetify/lib';
import { theme } from '@/utils/theme';

Vue.use(Vuetify, {
  components: {
    VBtn,
    VImg,
    VIcon,
    VTextField,
    VContainer,
    VRow,
    VCol,
    VProgressCircular,
    VSubheader
  }
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: theme.color,
        secondary: '#299FFF',
        danger: '#F6595D',
        third: '#7673FF',
        fourth: '#FF7F6C',
        error: '#ff7f6b',
        text: '#343439',
        light: '#979797',
        lightBg: '#f6f6f6',
        border: '#dbdbdb'
      }
    }
  },
  breakpoint: {
    thresholds: {
      sm: 768
    }
  }
});
