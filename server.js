import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import compression from "compression";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

const isProd = process.env.NODE_ENV === "production";

async function createServer() {
  const app = express();
  app.use(compression());

  let vite;
  if (isProd) {
    app.use(express.static(resolve("dist/client")));
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
    app.use(express.static(resolve("src")));
  }

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      // Read the template file
      let template = fs.readFileSync(
        path.resolve(
          __dirname,
          isProd ? "dist/client/index.html" : "index.html"
        ),
        "utf-8"
      );

      let render;
      let cssLinks = "";
      let manifest;

      if (isProd) {
        // Production: Handle CSS via manifest.json
        render = (await import("./dist/server/entry-server.js")).render;

        manifest = JSON.parse(
          fs.readFileSync(resolve("dist/client/ssr-manifest.json"), "utf-8")
        );
      } else {
        // Development: Manually add CSS
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.js")).render;

        // Add a link to styles.css (ensure it's in /public)
        cssLinks = `<link rel="stylesheet" href="/styles.css">`;
      }

      const {
        html: appHtml,
        preloadLinks,
        pinia,
      } = await render(url, manifest);

      console.log(preloadLinks);

      const html = template
        .replace("<!--preload-links-->", `${preloadLinks}\n${cssLinks}`)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`'<!--pinia-state-->'`, JSON.stringify(pinia));

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  // app.use("*", async (req, res) => {
  //   try {
  //     const url = req.originalUrl;
  //     let template;
  //     let render;
  //     let manifest;
  //     let cssLinks;

  //     if (isProd) {
  //       template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");
  //       render = (await import("./dist/server/entry-server.js")).render;

  //       manifest = JSON.parse(
  //         fs.readFileSync(
  //           path.resolve(__dirname, "dist/client/ssr-manifest.json"),
  //           "utf-8"
  //         )
  //       );
  //     } else {
  //       template = fs.readFileSync(resolve("index.html"), "utf-8");
  //       template = await vite.transformIndexHtml(url, template);
  //       render = (await vite.ssrLoadModule("/src/entry-server.js")).render;
  //       cssLinks = `<link rel="stylesheet" href="/styles.css">`;
  //     }

  //     const {
  //       html: appHtml,
  //       pinia,
  //       preloadLinks,
  //     } = await render(url, manifest);

  //     const html = template
  //       .replace(`<!--preload-links-->`, `${preloadLinks}\n${cssLinks}`)
  //       .replace(`<!--app-html-->`, appHtml)
  //       .replace(`'<!--pinia-state-->'`, JSON.stringify(pinia));

  //     res.status(200).set({ "Content-Type": "text/html" }).end(html);
  //   } catch (e) {
  //     !isProd && vite.ssrFixStacktrace(e);
  //     console.log(e.stack);
  //     res.status(500).end(e.stack);
  //   }
  // });

  return { app };
}

createServer().then(({ app }) => {
  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
});
