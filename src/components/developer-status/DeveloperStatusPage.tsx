import type { DeveloperStatusEvolutionVisual, DeveloperStatusPageContent } from '../../content/content-types.ts'
import ReusableWhatCasePage from '../product-case/ReusableWhatCasePage.tsx'
import DeveloperStatusProductView from './DeveloperStatusProductView.tsx'

function DeveloperStatusEvolutionFragment({ visual }: { readonly visual: DeveloperStatusEvolutionVisual }) {
  if (visual === 'identity') return <div className="qa-evolution-fragment"><span>PERSON</span><i>↔</i><strong>LOGIN</strong><i>≠</i><span>BOT</span></div>
  if (visual === 'time-window') return <div className="qa-evolution-fragment"><span>07:30</span><i>→</i><strong>13:00 KST</strong></div>
  if (visual === 'batch') return <div className="qa-evolution-fragment"><span>6 SETS</span><i>→</i><span>DIGEST</span><i>→</i><strong>ROLLUP</strong></div>
  if (visual === 'partial') return <div className="qa-evolution-fragment"><span>READY</span><i>/</i><strong>PARTIAL</strong><i>/</i><span>STALE</span></div>
  return <div className="qa-evolution-fragment"><span>EVENT × N</span><i>→</i><strong>DAILY 1×</strong></div>
}

function DeveloperStatusPage({ content }: { readonly content: DeveloperStatusPageContent }) {
  return <ReusableWhatCasePage content={content} pageClassName="developer-status-page" titleId="developer-status-title" surfaceLabel="개발자 현황의 공개 재구성 화면과 설계 설명" workflowLabel="개발자 현황 집계 흐름" evolutionTargetId="developer-status-evolution" relatedLabel="개발자 현황과 연결된 시스템" renderProduct={({ fixture, activeId, onActivate }) => <DeveloperStatusProductView fixture={fixture} activeId={activeId} onActivate={onActivate} />} renderEvolutionFragment={(visual) => <DeveloperStatusEvolutionFragment visual={visual} />} />
}

export default DeveloperStatusPage
