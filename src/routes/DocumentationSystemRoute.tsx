import DocumentationSystemPage from '../components/documentation-system/DocumentationSystemPage.tsx'
import { documentationSystemContent } from '../content/fixtures/documentation-system.ts'
import '../styles/documentation-system.css'

function DocumentationSystemRoute() {
  return <DocumentationSystemPage content={documentationSystemContent} />
}

export default DocumentationSystemRoute
