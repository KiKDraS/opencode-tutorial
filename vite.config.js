import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  return {
    base: "/opencode-tutorial/",
    publicDir: "favicon",
    build: {
      outDir: "dist",
      cssMinify: "lightningcss",
    },
    css: {
      transformer: "lightningcss",
    },
  };
});
