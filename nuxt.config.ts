// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // @ts-ignore
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
  runtimeConfig: {
    proxyApi: 'http://0.0.0.0:8000'
  },
  modules: [
    '@pinia/nuxt'
  ]
})
