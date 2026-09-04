import { StrictMode, Suspense } from "react";
import { hydrateRoot } from "react-dom/client";
import { routes } from "../../app/src/.routerTree.ts"
import { AppRouter } from "../router/client/AppRouter";

function hyrate() {
  const root = document.getElementById("root");
  if (root) {
    hydrateRoot(root, <StrictMode>
      <Suspense>
        <AppRouter routes={routes} />
      </Suspense>
    </StrictMode>)
  }
}

hyrate();
