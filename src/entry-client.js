import { createApp } from "./main";

const { app, router, pinia } = createApp();

router.isReady().then(() => {
  app.mount("#app");
});
