export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  sui: {
    theme: 'light',
    themes: {
      light: {
        presetColors: {
          primary: '#203e76',
          secondary: '#333333',
          warning: '#ff6f61',
          toolbar: '#ffffff',
          sheet: '#f5f5f5',
          primaryText: '#203e76',
        },
        appColors: {
          background: '#ffffff',
        },
      },
      dark: {
        presetColors: {
          secondary: '#000000',
          sheet: '#222222',
          toolbar: '#333333',
          primaryText: '#ffffff',
        },
      },
    },
  },
})
