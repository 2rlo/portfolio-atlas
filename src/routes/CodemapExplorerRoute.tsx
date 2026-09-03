import CodemapExplorerPage from '../components/codemap/CodemapExplorerPage.tsx'
import { publicCodemapContent } from '../content/fixtures/public-codemap.ts'
import '../styles/codemap-explorer.css'

function CodemapExplorerRoute() {
  return <CodemapExplorerPage content={publicCodemapContent} />
}

export default CodemapExplorerRoute
