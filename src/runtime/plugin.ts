import { createSUI, getFormInputModelValueRules } from '@khsura/sui'
import { defineNuxtPlugin } from 'nuxt/app'

const suiPlugin = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    createSUI(nuxtApp.$config.public.sui ?? {}),
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const suiFormRules = getFormInputModelValueRules(nuxtApp.$i18n as any)

  return {
    provide: {
      suiFormRules,
    },
  }
})

export default suiPlugin
