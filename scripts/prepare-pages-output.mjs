import { copyFile, mkdir, readFile } from 'node:fs/promises'
import { collectPagesRoutes } from './pages-routes.mjs'

const outputRoot = new URL('../dist/', import.meta.url)
const builtIndex = new URL('index.html', outputRoot)

// GitHub Pages has no rewrite rules, so each public BrowserRouter route needs
// its own static entry point for direct visits and refreshes.
const routerSource = await readFile(new URL('../src/app/router.tsx', import.meta.url), 'utf8')
const publicRoutes = collectPagesRoutes(routerSource)

await copyFile(builtIndex, new URL('404.html', outputRoot))

await Promise.all(
  publicRoutes.map(async (route) => {
    const routeDirectory = new URL(route, outputRoot)

    await mkdir(routeDirectory, { recursive: true })
    await copyFile(builtIndex, new URL('index.html', routeDirectory))
  }),
)
