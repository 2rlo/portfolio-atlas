import TechnicalWritingPage from '../components/technical-writing/TechnicalWritingPage.tsx'
import { technicalWritingContent } from '../content/technical-writing.ts'
import '../styles/technical-writing.css'

function TechnicalWritingRoute() {
  return <TechnicalWritingPage content={technicalWritingContent} />
}

export default TechnicalWritingRoute
