import { createElement, useEffect, useState } from "react";
import type { PageRoute } from "../types";

export function AppRouter({ routes }: { routes: PageRoute }): React.JSX.Element {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname,
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const Component = routes[currentPath as keyof typeof routes]

  if (!Component) return <div>Not found!</div>

  return createElement(Component);
}
