import { createApp } from "./main";
import { renderToString } from "vue/server-renderer";

export async function render(url, manifest) {
  const { app, router, pinia } = createApp();

  await router.push(url);
  await router.isReady();

  const ctx = {};
  const html = await renderToString(app, ctx);

  console.log("---->", ctx.modules);

  // Get styles from SSR context
  let preloadLinks = [];
  // Add CSS preload links
  const seen = new Set();
  ctx.modules.forEach((id) => {
    const files = manifest ? Array.from(manifest[id] || []) : [];

    files.forEach((file) => {
      if (!seen.has(file)) {
        seen.add(file);
        if (file.endsWith(".css")) {
          preloadLinks += `<link rel="stylesheet" href="${file}">\n`;
        }
        // if (file.endsWith(".js")) {
        //   preloadLinks += `<script type="module" defer src="${file}">\n`;
        // }
      }
    });
  });

  return { html, preloadLinks, pinia: pinia.state.value };
}
