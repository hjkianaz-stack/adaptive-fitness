import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    // Next.js generated files
    ".next/**",

    // OpenNext Cloudflare generated files
    ".open-next/**",

    // Build outputs
    "out/**",
    "build/**",

    // Generated TypeScript files
    "next-env.d.ts",

    // Dependencies
    "node_modules/**",
  ]),
]);

export default eslintConfig;