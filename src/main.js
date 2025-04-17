import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueMq from 'vue-mq';
import VueLazyLoad from 'vue-lazyload';
import VueAmplitude from 'vue-amplitude-js';
import VueGtm from 'vue-gtm';
import '@babel/polyfill';
import './scss/main.scss';
import apolloProvider from './vue-apollo';
import VueMeta from 'vue-meta';
import Price from './components/elements/Price';
import AppTabs from './components/elements/Tabs';
import PageBreadCrumbs from './components/elements/PageBreadCrumbs';
import VueLocalStorage from 'vue-localstorage';
import AsyncComputed from 'vue-async-computed';
import { bgImageDirective } from './directives/bgImageDirective';

Vue.config.productionTip = false;
Vue.use(VueLocalStorage);
Vue.use(VueLazyLoad);
Vue.use(VueMq, {
  breakpoints: {
    sm: 768,
    md: 1200,
    lg: Infinity
  }
});
Vue.use(VueAmplitude, {
  apiKey: `${process.env.VUE_APP_AMPLITUDE_API_KEY}`,
  config: {
    disableCookies: !store.getters['cookies/isAmplitudeAnalyticsCookies']
  },
  userId: store.getters['user/userEmail']
});
Vue.use(VueMeta);
Vue.use(AsyncComputed);
Vue.component('price', Price);
Vue.component('app-tabs', AppTabs);
Vue.component('page-bread-crumbs', PageBreadCrumbs);

Vue.directive('bg-image', bgImageDirective);

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');
