import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { collectPagesRoutes } from './pages-routes.mjs'

test('public product, entry, and nested artifact routes get static entries', async () => {
  const source = await readFile(new URL('../src/app/router.tsx', import.meta.url), 'utf8')
  const paths = collectPagesRoutes(source)
  for (const path of ['what/operations/', 'what/api-usage/', 'what/', 'toss/', 'how/documentation-system/artifacts/codemap/']) {
    assert.ok(paths.includes(path), `Missing direct-entry output for ${path}`)
  }
  assert.ok(paths.every(path => !/[:*]/.test(path) && !path.startsWith('/')))
  assert.equal(new Set(paths).size, paths.length)
})

test('nested, pathless, index, absolute, and dynamic routes preserve URL semantics', () => {
  const paths = collectPagesRoutes(`createBrowserRouter([{path:'/',Component:App,children:[
    {path:'what',children:[{index:true},{path:'operations'},{children:[{path:'guide'}]},{path:':id'},{path:'/toss',element:<HomeRoute />} ]},
    {path:'*'}
  ]}])`)
  assert.deepEqual(paths, ['what/', 'what/operations/', 'what/guide/', 'toss/'])
})

test('unsupported or unsafe route definitions fail the build instead of being skipped', () => {
  assert.throws(() => collectPagesRoutes(`createBrowserRouter([{path:routeName}])`), /literal route/)
  assert.throws(() => collectPagesRoutes(`createBrowserRouter([{path:'../outside'}])`), /escapes/)
})
