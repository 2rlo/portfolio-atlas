import type { MeetingLogEvolutionVisual, MeetingLogPageContent } from '../../content/content-types.ts'
import ReusableWhatCasePage from '../product-case/ReusableWhatCasePage.tsx'
import MeetingLogProductView from './MeetingLogProductView.tsx'

function MeetingLogEvolutionFragment({ visual }: { readonly visual: MeetingLogEvolutionVisual }) {
  const fragments: Record<MeetingLogEvolutionVisual, readonly string[]> = {
    'transcript-path': ['TRANSCRIPT', '→', 'MEETING SUMMARY', '→', 'REPORT'],
    'candidate-gate': ['MEETING RECORD', '→', 'PENDING', '→', 'REVIEW'],
    'capture-paused': ['COMPANY MEETING', '×', 'PERSONAL PLAN', '→', 'PAUSED'],
    'current-sync': ['07:00', '→', 'MEETINGS', '+', 'SEARCH DATA'],
  }

  return (
    <div className="meeting-evolution-fragment" data-visual={visual} aria-hidden="true">
      {fragments[visual].map((fragment, index) => <span key={`${fragment}-${index}`}>{fragment}</span>)}
    </div>
  )
}

function MeetingLogPage({ content }: { readonly content: MeetingLogPageContent }) {
  return (
    <ReusableWhatCasePage
      content={content}
      pageClassName="meeting-log-page"
      titleId="meeting-log-title"
      surfaceLabel="회의록·AI 후보·사람 검토의 연결"
      workflowLabel="회의록에서 AI 후보와 사람 검토로 이어지는 흐름"
      evolutionTargetId="meeting-log-evolution"
      relatedLabel="회의록과 연결된 시스템"
      renderProduct={({ fixture, activeId, onActivate }) => (
        <MeetingLogProductView fixture={fixture} activeId={activeId} onActivate={onActivate} />
      )}
      renderEvolutionFragment={(visual) => <MeetingLogEvolutionFragment visual={visual} />}
    />
  )
}

export default MeetingLogPage
