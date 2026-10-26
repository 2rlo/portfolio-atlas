import TechnicalWritingPage from '../components/technical-writing/TechnicalWritingPage.tsx'
import { handoverGuideContent, technicalWritingContent } from '../content/technical-writing.ts'
import '../styles/technical-writing.css'

function TechnicalWritingRoute() {
  return <TechnicalWritingPage content={technicalWritingContent} handoverGuide={handoverGuideContent} />
}

export default TechnicalWritingRoute
