/**
 * Shared ESLint preset for every app/package in the workspace.
 * Apps extend this and add their own framework-specific rules (e.g. next/core-web-vitals).
 */
module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: { es2022: true, node: true, browser: true },
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            // Module-boundary rule: no reaching into another module's internals.
            // Cross-module data must go through that module's typed package export.
            group: ["@saqi/*/src/*"],
            message: "Import from the package's public entry point, not its src internals.",
          },
        ],
      },
    ],
  },
};
