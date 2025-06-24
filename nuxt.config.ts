// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ['@nuxt/icon'],
    css: ['assets/scss/index.scss'],
    nitro: {},
    app: {
        head: {
            script: [
                {src: 'https://accounts.google.com/gsi/client',},
            ],
        }
    },
})