import { build } from "esbuild";

build({
  entryPoints: ["src/server.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: "dist/server.js",
  minify: true,
  external: ["pg-native", "bcrypt"],
}).then(() => console.log("🚀 Bundle listo"));