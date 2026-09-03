import type { ScheduleEvolutionVisual, SchedulePageContent } from '../../content/content-types.ts'
import ReusableWhatCasePage from '../product-case/ReusableWhatCasePage.tsx'
import ScheduleProductView from './ScheduleProductView.tsx'

function ScheduleEvolutionFragment({ visual }: { readonly visual: ScheduleEvolutionVisual }) {
  if (visual === 'canonical') return <div className="qa-evolution-fragment"><span>EXCEL</span><i>HISTORY</i><strong>PLAN</strong></div>
  if (visual === 'proposal') return <div className="qa-evolution-fragment"><span>REQUEST</span><i>→</i><strong>STAGE</strong><i>→</i><span>APPLY</span></div>
  if (visual === 'role-scope') return <div className="qa-evolution-fragment"><strong>EDITOR</strong><i>/</i><span>VIEW ONLY</span></div>
  if (visual === 'actual-line') return <div className="qa-evolution-fragment"><span>PLAN ━━━</span><strong>ACTUAL ━</strong></div>
  return <div className="qa-evolution-fragment"><span>FILTER</span><i>URL</i><strong>DISPLAY NAME</strong></div>
}

function SchedulePage({ content }: { readonly content: SchedulePageContent }) {
  return (
    <ReusableWhatCasePage
      content={content}
      pageClassName="schedule-page"
      titleId="schedule-title"
      surfaceLabel="Schedule overview 재구성 제품 화면과 editorial annotation"
      workflowLabel="Schedule change workflow"
      evolutionTargetId="schedule-evolution"
      relatedLabel="Schedule과 연결된 시스템"
      renderProduct={({ fixture, activeId, onActivate }) => <ScheduleProductView fixture={fixture} activeId={activeId} onActivate={onActivate} />}
      renderEvolutionFragment={(visual) => <ScheduleEvolutionFragment visual={visual} />}
    />
  )
}

export default SchedulePage
