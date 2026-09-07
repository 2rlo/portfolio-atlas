import AiCandidateReviewPage from '../components/ai-candidate-review/AiCandidateReviewPage.tsx'
import { aiCandidateReviewContent } from '../content/ai-candidate-review.ts'
import '../styles/ai-candidate-review.css'

function AiCandidateReviewRoute() {
  return <AiCandidateReviewPage content={aiCandidateReviewContent} />
}

export default AiCandidateReviewRoute
