import RagAssistantPage from '../components/rag-assistant/RagAssistantPage.tsx'
import { ragAssistantContent } from '../content/rag-assistant.ts'
import '../styles/qa.css'
import '../styles/rag-assistant.css'

function RagAssistantRoute() {
  return <RagAssistantPage content={ragAssistantContent} />
}

export default RagAssistantRoute
