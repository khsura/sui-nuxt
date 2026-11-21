// Publishes this package to public npm unless that version is already there.
// Used by `yarn release` in CI. npm >= 11.5.1 authenticates through npm Trusted Publishing (GitHub OIDC),
// so no token is needed, and provenance is attached automatically.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const REGISTRY = 'https://registry.npmjs.org/'
const { name, version } = JSON.parse(readFileSync('package.json', 'utf8'))

const isPublished = () => {
  try {
    execFileSync('npm', ['view', `${name}@${version}`, 'version', `--registry=${REGISTRY}`], { stdio: 'pipe' })

    return true
  }
  catch {
    return false
  }
}

if (isPublished()) {
  process.stderr.write(`${name}@${version} is already on npm, skipping.\n`)
}
else {
  execFileSync('npm', ['publish', '--access', 'public', `--registry=${REGISTRY}`], { stdio: 'inherit' })
}
