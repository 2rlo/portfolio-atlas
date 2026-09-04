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
      surfaceLabel="Weekly report source inspection"
      workflowLabel="Weekly report source authority workflow"
      evolutionTargetId="report-evolution"
      relatedLabel="Report related systems"
      renderProduct={({ fixture, activeId, onActivate }) => (
        <ReportProductView fixture={fixture} activeId={activeId} onActivate={onActivate} />
      )}
      renderEvolutionFragment={(visual) => <ReportEvolutionFragment visual={visual} />}
    />
  )
}

export default ReportPage
