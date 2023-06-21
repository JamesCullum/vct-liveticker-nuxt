// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Liveticker for VCT",
      meta: [
        {
          name: "description",
          content: "Follow the matches of the Valorant Champions Tour live",
        },
      ],
      script: [
        {
          src: "https://onesignal-proxy.jamescullum.workers.dev/sdks/OneSignalSDK.js",
          defer: true,
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: [],
  css: ["@/assets/css/bootstrap.min.css"],
  nitro: {
    preset: "cloudflare-pages",
  },
});
