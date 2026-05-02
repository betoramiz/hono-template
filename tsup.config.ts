// import { defineConfig } from "tsup";
// import alias from "esbuild-plugin-alias";
// import { resolve } from "path";
//
// export default defineConfig({
//   entry: ["src/index.ts"],
//   format: ["esm"],
//   outDir: "dist",
//   esbuildPlugins: [
//     alias({
//       "@": resolve(__dirname, "src"),
//     }),
//   ],
// });

import { defineConfig } from "tsup";
import { resolve } from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  esbuildOptions(options) {
    options.alias = {
      "@": resolve(__dirname, "src"),
    };
  },
});