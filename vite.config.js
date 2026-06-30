import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// IMPORTANT: change "human-design-notes" below to match your GitHub repo name
// e.g. if your repo is github.com/yourname/hd-notes, set base: "/hd-notes/"
export default defineConfig({
  base: "/human-design-notes/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "人類圖學習筆記",
        short_name: "人類圖筆記",
        description: "Human Design Study Notes — 閘門通道學習與溫習",
        theme_color: "#7a5c3c",
        background_color: "#f0ece4",
        display: "standalone",
        orientation: "portrait",
        start_url: "/human-design-notes/",
        scope: "/human-design-notes/",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: { cacheName: "google-fonts-cache", expiration: { maxEntries: 10, maxAgeSeconds: 60*60*24*365 } }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: { cacheName: "gstatic-fonts-cache", expiration: { maxEntries: 10, maxAgeSeconds: 60*60*24*365 } }
          }
        ]
      }
    })
  ]
});
