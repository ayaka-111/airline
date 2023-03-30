import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import './assets/main.css'
import { createPersistedState } from "pinia-plugin-persistedstate";

// pinia永続化
const pinia = createPinia();
pinia.use(createPersistedState());

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  // .use(createPinia())
  .use(pinia)
  .mount('#app')
