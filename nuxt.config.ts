// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-swiper",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/icon",
  ],
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },
  css: ["~/assets/css/global.css"],
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },
  image: {
    domains: ["storage.yandexcloud.net"],
  },
  fonts: {
    families: [
      {
        name: "Esqadero FF CY 4F",
        src: "/fonts/esqaderoffcy4f.woff2",
        weights: [400, 700],
        styles: ["normal"],
      },
    ],
  },
});
