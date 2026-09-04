import path from "node:path"
import { createElement } from "react";
import { renderToReadableStream } from "react-dom/server";
import { routerGenerate } from "../router";
import type { Mode } from "../types/dev.type";
import { devLog } from "./dev";
import { Stream } from "./stream";
import type { Config } from "./types";

await routerGenerate();

const buildResult = await Bun.build({
  entrypoints: ["./src/core/client.tsx"],
  outdir: "_roge",
  minify: true,
  target: "browser",
})

if (!buildResult.success) {
  devLog({ message: `${buildResult.logs}`, type: "error" });
  process.exit(1);
}

export class Roge {
  private port: number = 3000;
  private mode: Mode = "development";

  public config(configs: Config) {
    const { mode, port } = configs;
    this.mode = mode || "development";
    this.port = port || 3000;
  }

  public start() {
    try {
      const mode = this.mode;
      Bun.serve({
        port: this.port,
        development: this.mode === "development",
        async fetch(req) {
          try {
            const url = new URL(req.url);

            if (url.pathname.includes(".") || url.pathname === "/favicon.ico") {
              return new Response("Not Found", { status: 404 });
            }

            if (url.pathname.startsWith("/.roge")) {
              const filePath = `./_roge/${url.pathname.replace("/.roge", "")}`
              const file = Bun.file(filePath)
              if (await file.exists()) return new Response(file)
              return new Response('Not Found', { status: 404 })
            }

            const publicFilePath = `./public${url.pathname}`;
            const publicFile = Bun.file(publicFilePath);
            if (await publicFile.exists()) {
              return new Response(publicFile);
            }

            const routeFilePath = path.resolve(`app/src/routes${url.pathname === "/" ? "/index" : url.pathname}.tsx`);
            const { default: PageComponent } = await import(routeFilePath);

            if (!PageComponent) {
              return new Response('404 - Roge Page Not Found', { status: 404 });
            }

            const stream = await renderToReadableStream(
              createElement(Stream, null, createElement(PageComponent)),
            );

            return new Response(stream, {
              headers: { "Content-Type": "text/html; charset=utf-8" },
            });
          } catch (error) {
            if (mode === "development")
              devLog({ type: "error", message: `${error}` });
            return new Response("Internal Error!", { status: 500 });
          }
        },
      });

      if (this.mode === "development")
        devLog({
          type: "success",
          message: `Server is running on http://localhost:${this.port}`,
        });
    } catch (error) {
      if (this.mode === "development")
        devLog({ type: "error", message: `${error}` });
      process.exit(1);
    }
  }
}
