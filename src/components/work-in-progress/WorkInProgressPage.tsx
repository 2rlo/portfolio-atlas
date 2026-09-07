import { Link } from 'react-router'
import WorkInProgressVideo from './WorkInProgressVideo.tsx'

interface WorkInProgressPageProps {
  backHref?: string
  eyebrow?: string
  primaryCopy?: string
  secondaryCopy?: string
}

function WorkInProgressPage({
  backHref = '/',
  eyebrow = 'WORK IN PROGRESS',
  primaryCopy = 'The squirrel crew is still building this page.',
  secondaryCopy = '',
}: WorkInProgressPageProps) {
  return (
    <main className="wip-page" id="main-content">
      <div className="wip-page__copy">
        <p className="wip-page__eyebrow">{eyebrow}</p>
        <h1>{primaryCopy}</h1>
        {secondaryCopy ? (
          <p className="wip-page__secondary" lang="ko">
            {secondaryCopy}
          </p>
        ) : null}
        <Link className="wip-page__back-link" to={backHref}>
          <span aria-hidden="true">←</span> 홈으로
        </Link>
      </div>

      <WorkInProgressVideo />
    </main>
  )
}

export default WorkInProgressPage
