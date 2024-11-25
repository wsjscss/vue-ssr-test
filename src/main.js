import { createApp as createVueApp } from "vue";
import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import { routes } from "./router";
import "./styles.css";

export function createApp() {
  const app = createVueApp(App);
  const pinia = createPinia();

  const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });

  app.use(router);
  app.use(pinia);

  return { app, router, pinia };
}
