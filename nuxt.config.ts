// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['vuetify-nuxt-module', '@pinia/nuxt'],
  devtools: { enabled: true },
  css: ['/src/app/global.scss'],
  dir: {
    pages: 'src/pages/',
    layouts: 'src/layouts/',
  },
  components: ['src/shared/', 'src/entities/'],
  runtimeConfig: {
    apiURL: process.env.VITE_APP_API_URL || 'https://stage.magicub.ru/cube/',
    public: {
      apiURL: process.env.VITE_APP_API_URL || 'https://stage.magicub.ru/cube/',
    },
  },
})