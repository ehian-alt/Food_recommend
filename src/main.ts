import { createSSRApp } from "vue";
import App from "./App.vue";

import pinia from './stores/index'

export function createApp() {

  const app = createSSRApp(App);

  // 使用pinia
  app.use(pinia)

  return {
    app,
  };
}
