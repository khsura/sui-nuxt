import type { AppStateOptions } from '@khsura/sui'
import {
  addImports,
  defineNuxtModule,
  createResolver,
  addPlugin,
  addComponent,
} from '@nuxt/kit'
import { suiComponentNames, suiTypeImports, suiValueImports } from './components'

// Type `runtimeConfig.public.sui` as the module's options. Without this, Nuxt infers the type
// from the app's literal config (e.g. `theme: string`), which `createSUI` does not accept.
declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    sui: AppStateOptions
  }
}

export default defineNuxtModule<AppStateOptions>({
  meta: {
    name: 'sui',
    configKey: 'sui',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },
  setup: (options, nuxt) => {
    nuxt.options.runtimeConfig.public.sui = options

    const resolver = createResolver(import.meta.url)

    for (const componentName of suiComponentNames) {
      addComponent({
        name: componentName,
        export: componentName,
        filePath: '@khsura/sui',
      })
    }

    addImports([
      ...suiValueImports.map(name => ({ from: '@khsura/sui', name })),
      ...suiTypeImports.map(name => ({ from: '@khsura/sui', name, type: true })),
    ])

    addPlugin(resolver.resolve('./runtime/plugin'))

    nuxt.options.css.unshift('@khsura/sui/style.scss')
    nuxt.options.css.unshift('@khsura/sui/style.css')
  },
})
