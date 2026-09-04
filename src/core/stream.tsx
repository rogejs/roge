import type React from "react";
import { Suspense } from "react";

export function Stream({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" >
      <head>
        <meta charSet="UTF-8" />
        <title>Custom Bun Framework </title>
      </head>
      <body>
        <div id="root">
          <Suspense>
            {children}
          </Suspense>
        </div>
        <script type="module" src="/.roge/client.js"></script>
      </body>
    </html>
  )
}
