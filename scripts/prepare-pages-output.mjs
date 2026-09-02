import { copyFile, mkdir } from 'node:fs/promises'

const outputRoot = new URL('../dist/', import.meta.url)
const builtIndex = new URL('index.html', outputRoot)

// GitHub Pages has no rewrite rules, so each public BrowserRouter route needs
// its own static entry point for direct visits and refreshes.
const publicRoutes = ['how/documentation-system/']

await copyFile(builtIndex, new URL('404.html', outputRoot))

await Promise.all(
  publicRoutes.map(async (route) => {
    const routeDirectory = new URL(route, outputRoot)

    await mkdir(routeDirectory, { recursive: true })
    await copyFile(builtIndex, new URL('index.html', routeDirectory))
  }),
)
