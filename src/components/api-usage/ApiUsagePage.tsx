import type { ApiUsageEvolutionVisual, ApiUsagePageContent } from '../../content/content-types.ts'
import ReusableWhatCasePage from '../product-case/ReusableWhatCasePage.tsx'
import ApiUsageProductView from './ApiUsageProductView.tsx'

function ApiUsageEvolutionFragment({ visual }: { readonly visual: ApiUsageEvolutionVisual }) {
  if (visual === 'disconnect') return <div className="qa-evolution-fragment"><span>STREAM</span><i>×</i><strong>LAST SNAPSHOT</strong></div>
  if (visual === 'dashboard') return <div className="qa-evolution-fragment"><span>LEDGER</span><i>→</i><span>VIEW</span><i>→</i><strong>GUARD</strong></div>
  if (visual === 'batch-rate') return <div className="qa-evolution-fragment"><span>STANDARD 1×</span><i>/</i><strong>BATCH 0.5×</strong></div>
  if (visual === 'retry-ledger') return <div className="qa-evolution-fragment"><span>POLL</span><i>→</i><strong>TERMINAL</strong><i>≠</i><span>RETRY</span></div>
  return <div className="qa-evolution-fragment"><span>CACHE WRITE</span><i>+</i><span>READ</span><i>→</i><strong>NET</strong></div>
}

function ApiUsagePage({ content }: { readonly content: ApiUsagePageContent }) {
  return <ReusableWhatCasePage content={content} pageClassName="api-usage-page" titleId="api-usage-title" surfaceLabel="API 사용량·비용 원장의 공개 재구성 화면과 설계 설명" workflowLabel="AI 사용량 기록·비용 계산·예산 제어 흐름" evolutionTargetId="api-usage-evolution" relatedLabel="API 사용량과 연결된 시스템" renderProduct={({ fixture, activeId, onActivate }) => <ApiUsageProductView fixture={fixture} activeId={activeId} onActivate={onActivate} />} renderEvolutionFragment={(visual) => <ApiUsageEvolutionFragment visual={visual} />} />
}

export default ApiUsagePage
