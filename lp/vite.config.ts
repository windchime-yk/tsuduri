import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [honox(), ssg({ entry: "./app/server.ts" })],
});
