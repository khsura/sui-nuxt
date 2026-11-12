# @khsura/sui-nuxt

Nuxt module for [`@khsura/sui`](https://github.com/khsura/sui), the Vue 3 component framework. Component docs and live examples: [sui.surakh.com](https://sui.surakh.com).

- [Release notes](/CHANGELOG.md)

## What it does

- Calls `createSUI()` with the options under `sui` in `nuxt.config.ts`
- Registers every `@khsura/sui` component globally (`SButton`, `SCard`, `SLayout`, …), so templates need no imports
- Auto-imports `useDisplay`, `useTheme`, `STransition`, and the types `FormInputModelValueRule`, `GroupItemValue`, `MaterialDesignIcon`, `SForm`, `SInput`, `SSelect`, `TableHeader`, `TableItem`
- Loads the SUI styles (`@khsura/sui/style.css` and `@khsura/sui/style.scss`)
- Provides `useNuxtApp().$suiFormRules`, the predefined form rules built from `@nuxtjs/i18n`

Requires Nuxt 4 or later.

## Setup

Both packages are published to **GitHub Packages**, not npmjs.com. Point the `@khsura` scope at that registry and supply a GitHub token with the `read:packages` scope:

```yaml
# .yarnrc.yml (Yarn 4)
npmScopes:
  khsura:
    npmRegistryServer: "https://npm.pkg.github.com"
    npmAlwaysAuth: true
    npmAuthToken: "${NPM_GITHUB_TOKEN}"
```

```ini
# .npmrc (npm / pnpm)
@khsura:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_GITHUB_TOKEN}
```

Install, together with the icon font that `SIcon` uses:

```bash
yarn add @khsura/sui @khsura/sui-nuxt @mdi/font
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@khsura/sui-nuxt'],
  css: ['@mdi/font/css/materialdesignicons.css'],
  sui: {
    // AppStateOptions for createSUI(): theme, themes, components, display
    theme: 'light',
  },
})
```

Wrap the app in `SApp`; it sets the theme colors and holds the container popups render into:

```vue
<!-- app.vue -->
<template>
  <SApp>
    <NuxtPage />
  </SApp>
</template>
```

`$suiFormRules` needs [`@nuxtjs/i18n`](https://i18n.nuxtjs.org/) installed.

## Development

```bash
yarn install         # needs NPM_GITHUB_TOKEN (see .yarnrc.yml)
yarn dev:prepare     # generate type stubs
yarn dev             # playground
yarn lint
yarn test
```

The registered components live in `src/components.ts`. `test/components.test.ts` fails when that list and the exports of the installed `@khsura/sui` differ, so update the list when you upgrade `@khsura/sui`.
