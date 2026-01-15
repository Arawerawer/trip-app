import path from "path";
import tailwindcss from "@tailwindcss/vite";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "旅遊App",
        short_name: "旅遊App",
        description: "輕鬆規劃你的旅遊行程",
        theme_color: "#2F7AF0",
        icons: [
          {
            src: "/plane-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/plane-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
