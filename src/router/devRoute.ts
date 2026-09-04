
import type { Mode } from "../types/dev.type";

export function getBaseDir() {
  const mode = process.env.NODE_ENV as Mode;

  const baseDir = mode === "development" ? "./app" : "./";

  return baseDir
}
