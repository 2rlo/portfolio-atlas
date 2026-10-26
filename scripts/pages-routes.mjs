import ts from 'typescript'

// The router is the route inventory. Keep Pages direct visits in sync with it.
export function collectPagesRoutes(source) {
  const file = ts.createSourceFile('router.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  if (file.parseDiagnostics.length) throw new Error('Unable to parse the application router')
  let routeArray
  function findRouter(node) {
    if (ts.isCallExpression(node) && node.expression.getText(file) === 'createBrowserRouter') {
      routeArray = node.arguments[0]
    }
    ts.forEachChild(node, findRouter)
  }
  findRouter(file)
  if (!routeArray || !ts.isArrayLiteralExpression(routeArray)) throw new Error('Expected a static createBrowserRouter route array')

  const paths = new Set()
  function walk(routes, parent = '') {
    for (const route of routes.elements) {
      if (!ts.isObjectLiteralExpression(route)) throw new Error('Expected a static route object')
      const property = name => route.properties.find(item => ts.isPropertyAssignment(item) && item.name.getText(file).replaceAll(/['"]/g, '') === name)?.initializer
      const pathNode = property('path')
      if (pathNode && !ts.isStringLiteralLike(pathNode)) throw new Error('Expected a literal route path')
      const path = pathNode?.text ?? ''
      if (/[:*]/.test(path)) continue
      const combined = path.startsWith('/') ? path : [parent, path].filter(Boolean).join('/')
      const segments = combined.split('/').filter(Boolean)
      if (segments.some(segment => segment === '.' || segment === '..')) throw new Error('Route escapes the Pages output directory')
      const normalized = segments.join('/')
      if (normalized) paths.add(`${normalized}/`)
      const children = property('children')
      if (children) {
        if (!ts.isArrayLiteralExpression(children)) throw new Error('Expected static route children')
        walk(children, normalized)
      }
    }
  }
  walk(routeArray)
  return [...paths]
}
