import WikiPage from '../components/wiki/WikiPage.tsx'
import { wikiContent } from '../content/wiki.ts'
import '../styles/qa.css'
import '../styles/wiki.css'

function WikiRoute() {
  return <WikiPage content={wikiContent} />
}

export default WikiRoute
