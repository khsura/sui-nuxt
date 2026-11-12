import * as sui from '@khsura/sui'
// Type-only imports: `vue-tsc --noEmit` fails if an auto-imported type is not exported.
import type { FormInputModelValueRule, GroupItemValue, MaterialDesignIcon, TableHeader, TableItem } from '@khsura/sui'
import { describe, expect, it } from 'vitest'
import { suiComponentNames, suiValueImports } from '../src/components'

type AutoImportedTypes = [FormInputModelValueRule, GroupItemValue, MaterialDesignIcon, TableHeader, TableItem]

const isComponent = (value: unknown) =>
  typeof value === 'object' && value !== null && ('setup' in value || 'render' in value || '__name' in value)

const exportedComponents = Object.entries(sui)
  .filter(([name, value]) => /^S[A-Z]/.test(name) && isComponent(value))
  .map(([name]) => name)
  .sort()

describe('component registration', () => {
  it('registers only components @khsura/sui exports', () => {
    const missing = suiComponentNames.filter(name => !exportedComponents.includes(name))

    expect(missing).toEqual([])
  })

  it('registers every component @khsura/sui exports', () => {
    const unregistered = exportedComponents.filter(name => !(suiComponentNames as readonly string[]).includes(name))

    expect(unregistered).toEqual([])
  })

  it('auto-imports values @khsura/sui exports', () => {
    const missing = suiValueImports.filter(name => !(name in sui))

    expect(missing).toEqual([])
  })
})

export type { AutoImportedTypes }
