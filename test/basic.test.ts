import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders globally registered SUI components', async () => {
    const html = await $fetch<string>('/')

    expect(html).toContain('id="card"')
    expect(html).toContain('basic')
  })

  it('renders an SButton with `to` as a router link', async () => {
    const html = await $fetch<string>('/')

    expect(html).toMatch(/<a[^>]*href="\/about"[^>]*id="router-button"|<a[^>]*id="router-button"[^>]*href="\/about"/)
  })

  it('serves the linked route', async () => {
    const html = await $fetch<string>('/about')

    expect(html).toContain('id="about"')
  })
})
