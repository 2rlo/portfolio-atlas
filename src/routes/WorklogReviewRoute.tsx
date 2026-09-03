import WorklogReviewPage from '../components/worklog-review/WorklogReviewPage.tsx'
import { worklogReviewContent } from '../content/worklog-review.ts'
import '../styles/worklog-review.css'

function WorklogReviewRoute() {
  return <WorklogReviewPage content={worklogReviewContent} />
}

export default WorklogReviewRoute
