import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";

const entry = "./app/server.ts";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [client()],
      build: {
        rollupOptions: {
          output: {
            // _renderer.tsxから固定パスで読み込むため、エントリはハッシュなしで出力する
            entryFileNames: "static/client.js",
            chunkFileNames: "static/chunks/[name]-[hash].js",
          },
        },
      },
    };
  }
  return {
    build: {
      emptyOutDir: false,
    },
    plugins: [honox(), ssg({ entry })],
  };
});
