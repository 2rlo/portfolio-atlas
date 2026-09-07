import type { VersionLogEvolutionVisual, VersionLogPageContent } from '../../content/content-types.ts'
import ReusableWhatCasePage from '../product-case/ReusableWhatCasePage.tsx'
import VersionLogProductView from './VersionLogProductView.tsx'

function VersionLogEvolutionFragment({ visual }: { readonly visual: VersionLogEvolutionVisual }) {
  const fragments: Record<VersionLogEvolutionVisual, readonly string[]> = {
    'normalized-sync': ['WORKSPACE DB', '→', 'STRUCTURED RECORD'],
    'search-source': ['DB FILTER', '+', 'SEARCH INDEX', '+', 'SOURCE'],
    'ambiguous-latest': ['SAME DATE', '≠', 'SAME PURPOSE'],
    'missing-tolerant': ['MISSING FIELD', '→', 'KEEP RECORD', '+', 'BACKFILL'],
    'evidence-axis': ['RELEASE', '≠', 'REQUIREMENT PASS'],
  }

  return (
    <div className="version-evolution-fragment" data-visual={visual} aria-hidden="true">
      {fragments[visual].map((fragment, index) => <span key={`${fragment}-${index}`}>{fragment}</span>)}
    </div>
  )
}

function VersionLogPage({ content }: { readonly content: VersionLogPageContent }) {
  return (
    <ReusableWhatCasePage
      content={content}
      pageClassName="version-log-page"
      titleId="version-log-title"
      surfaceLabel="버전·릴리스 기록의 공개 재구성 예시"
      workflowLabel="버전 기록 수집·구조화·검색·근거 연결 흐름"
      evolutionTargetId="version-log-evolution"
      relatedLabel="버전 기록과 연결된 사례와 시스템"
      renderProduct={({ fixture, activeId, onActivate }) => (
        <VersionLogProductView fixture={fixture} activeId={activeId} onActivate={onActivate} />
      )}
      renderEvolutionFragment={(visual) => <VersionLogEvolutionFragment visual={visual} />}
    />
  )
}

export default VersionLogPage
