// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  path: '~/components',
  pathPrefix: false,
  css: [
    '@/assets/styles/main.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/mixins.scss";' +
              '@import "@/assets/styles/variables/typography.scss";'
        }
      }
    }
  },
  modules: [
    '@pinia/nuxt'
  ]
})
