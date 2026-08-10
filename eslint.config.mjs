import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Shared flat config for the whole workspace — ESLint resolves this by
// walking up from each package's cwd, so no per-package config is needed.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Module-boundary rule: no reaching into another package's internals.
      // Cross-package data must go through that package's public entry point.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@saqi/*/src/*"],
              message: "Import from the package's public entry point, not its src internals.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "**/dist/**",
    "**/node_modules/**",
    "**/next-env.d.ts",
  ]),
]);
