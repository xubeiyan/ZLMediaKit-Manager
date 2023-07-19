import { createApp } from 'vue'
import App from './App.vue'

// 全局存储pinia
import { createPinia } from 'pinia';
const pinia = createPinia();

// tanstack vue-query
import { VueQueryPlugin } from "@tanstack/vue-query";

// 路由
import router from './router/index';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import '@mdi/font/css/materialdesignicons.css'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .use(VueQueryPlugin)
  .mount('#app')