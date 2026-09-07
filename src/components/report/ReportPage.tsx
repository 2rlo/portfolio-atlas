import type { ReportEvolutionVisual, ReportPageContent } from '../../content/content-types.ts'
import ReusableWhatCasePage from '../product-case/ReusableWhatCasePage.tsx'
import ReportProductView from './ReportProductView.tsx'

function ReportEvolutionFragment({ visual }: { readonly visual: ReportEvolutionVisual }) {
  const fragments: Record<ReportEvolutionVisual, readonly string[]> = {
    'multi-source': ['WORKLOG', '+', 'QA', '→', 'WEEK'],
    'reviewed-first': ['AI DRAFT', '→', 'REVIEW', '→', 'SOURCE'],
    'visible-fallback': ['0 REVIEWED', '→', 'DRAFT + LABEL'],
    'date-window': ['MESSAGE DATE', '≠', 'RECEIVED AT'],
    'manual-locale': ['AUTO / MANUAL', '·', 'KO ON', '·', 'EN GATED'],
  }

  return (
    <div className="report-evolution-fragment" data-visual={visual} aria-hidden="true">
      {fragments[visual].map((fragment, index) => <span key={`${fragment}-${index}`}>{fragment}</span>)}
    </div>
  )
}

function ReportPage({ content }: { readonly content: ReportPageContent }) {
  return (
    <ReusableWhatCasePage
      content={content}
      pageClassName="report-page"
      titleId="report-title"
      surfaceLabel="주간보고 입력 자료 검토"
      workflowLabel="주간보고 수집·검토·입력 선택·저장 흐름"
      evolutionTargetId="report-evolution"
      relatedLabel="주간보고와 연결된 시스템"
      renderProduct={({ fixture, activeId, onActivate }) => (
        <ReportProductView fixture={fixture} activeId={activeId} onActivate={onActivate} />
      )}
      renderEvolutionFragment={(visual) => <ReportEvolutionFragment visual={visual} />}
    />
  )
}

export default ReportPage
