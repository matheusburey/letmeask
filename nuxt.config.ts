// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  srcDir: 'src/',
  app: {
    head: {
      title: 'Cruel Doubt',
      meta: [{ name: 'description', content: 'Cruel Doubt' }],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
})