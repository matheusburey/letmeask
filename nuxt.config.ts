// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-mongoose", "nuxt-lucide-icons"],
  srcDir: "src/",
  app: {
    head: {
      title: "Cruel Doubt",
      meta: [{ name: "description", content: "Cruel Doubt" }],
      link: [{ rel: "icon", href: "/favicon.ico" }],
    },
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: "models",
    devtools: false,
  },
});