import WorkInProgressPage from '../components/work-in-progress/WorkInProgressPage.tsx'
import { wikiPlaceholderContent } from '../content/wiki.ts'
import '../styles/work-in-progress.css'

function WikiRoute() {
  return (
    <WorkInProgressPage
      eyebrow={wikiPlaceholderContent.eyebrow}
      primaryCopy={wikiPlaceholderContent.primaryCopy}
      secondaryCopy={wikiPlaceholderContent.secondaryCopy}
    />
  )
}

export default WikiRoute
