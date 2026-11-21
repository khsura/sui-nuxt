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

Both packages are on the public npm registry. No registry config or token is needed. Install them together with the icon font that `SIcon` uses:

```bash
npm i @khsura/sui-nuxt @khsura/sui @mdi/font   # or: yarn add / pnpm add
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

### Migrating from GitHub Packages

Versions up to 1.1.6 were published to GitHub Packages. If your project still points the `@khsura` scope there, remove that config. Otherwise installs keep going to the old registry and fail with 404 or 401 for new versions:

- `.npmrc` (npm / pnpm): delete the `@khsura:registry=...` line that points at `npm.pkg.github.com`, and its `//npm.pkg.github.com/:_authToken=...` line.
- `.yarnrc.yml` (Yarn 4): delete the `npmScopes.khsura` block (`npmRegistryServer`, `npmAlwaysAuth`, `npmAuthToken`). Yarn also reads `.yarnrc.yml` files in parent folders and in your home folder, so check `~/.yarnrc.yml` too.
- CI: you no longer need the GitHub token secret that your install step used for `@khsura` packages.

Then reinstall so the lockfile resolves `@khsura/*` from npmjs.com.

## Development

```bash
yarn install
yarn dev:prepare     # generate type stubs
yarn dev             # playground
yarn lint
yarn test:types      # vue-tsc for the module and the playground
yarn test
yarn dev:build       # build the playground
```

## Release

Releases are automated by [release-please](https://github.com/googleapis/release-please). When conventional commits (`feat:`, `fix:` and so on) are merged to `main`, it opens a release PR that bumps the version and updates `CHANGELOG.md`. Merging that PR tags the release and publishes `@khsura/sui-nuxt` to public npm through **npm Trusted Publishing** (GitHub OIDC, configured on npmjs.com for `khsura/sui-nuxt` and `release-please.yaml`). No npm token or secret is involved, and npm attaches provenance automatically. `scripts/publishIfNew.mjs` skips a version that is already on npm.

The registered components live in `src/components.ts`. `test/components.test.ts` fails when that list and the exports of the installed `@khsura/sui` differ, so update the list when you upgrade `@khsura/sui`.
