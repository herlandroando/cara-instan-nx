// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // ssr: false,
  modules: ['@nuxt/content'],
  // ssr: true,
  typescript: {
    shim: false
  },
  plugins: [{ src: '~/plugins/primevue.ts', ssr: false }],
  devtools: {
    enabled: true
  },
  css: [
    "~/assets/css/main.css",
    "~/assets/scss/content.scss",
    "primeicons/primeicons.css",
  ],
  build: {
    transpile: ["primevue"]
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

})
