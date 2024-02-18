export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: '@nuxt-themes/docus',
  //ßdevtools: { enabled: true },
  modules: [
    // Remove it if you don't use Plausible analytics
    // https://github.com/nuxt-modules/plausible
    '@nuxt/content',
    // '@nuxtjs/plausible',
    // '@nuxthq/studio'
  ]
})
