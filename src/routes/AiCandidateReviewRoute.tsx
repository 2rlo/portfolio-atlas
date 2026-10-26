import AiCandidateReviewPage from '../components/ai-candidate-review/AiCandidateReviewPage.tsx'
import { aiCandidateReviewContent, recordExecutionContent } from '../content/ai-candidate-review.ts'
import '../styles/ai-candidate-review.css'

function AiCandidateReviewRoute() {
  return <AiCandidateReviewPage content={aiCandidateReviewContent} recordExecution={recordExecutionContent} />
}

export default AiCandidateReviewRoute
