// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Ticker for VCT",
      meta: [
        {
          name: "description",
          content: "Follow the matches of the Valorant Champions Tour live",
        },
        {
          name: "msapplication-TileColor",
          content: "#da532c",
        },
        {
          name: "theme-color",
          content: "#47b3ff",
        },
      ],
      script: [
        {
          src: "https://onesignal-proxy.jamescullum.workers.dev/sdks/OneSignalSDK.js",
          defer: true,
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/img/apple-touch-icon.png",
        },
        { rel: "icon", sizes: "32x32", href: "/img/favicon-32x32.png" },
        { rel: "icon", sizes: "16x16", href: "/img/favicon-16x16.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        {
          rel: "mask-icon",
          href: "/img/safari-pinned-tab.svg",
          color: "#47b3ff",
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxt/image"],
  css: ["@/assets/css/bootstrap.min.css"],
  nitro: {
    preset: "cloudflare-pages",
  },
});