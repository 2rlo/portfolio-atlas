import type { RagAssistantEvolutionVisual, RagAssistantPageContent } from '../../content/content-types.ts'
import ReusableWhatCasePage from '../product-case/ReusableWhatCasePage.tsx'
import RagAssistantProductView from './RagAssistantProductView.tsx'

function RagAssistantEvolutionFragment({ visual }: { readonly visual: RagAssistantEvolutionVisual }) {
  const fragments: Record<RagAssistantEvolutionVisual, readonly string[]> = {
    deterministic: ['QUESTION', '→', 'FILTERED DB', '→', 'STATE'],
    'vector-support': ['STATE', '+', 'PGVECTOR', '+', 'SOURCE'],
    'trust-order': ['CANONICAL', '>', 'REVIEWED', '>', 'RAW'],
    'context-tool': ['AUTO SEARCH', 'EMPTY', '→', 'LIMITED TOOL'],
    'memory-boundary': ['HUMAN TURN', '→', 'PRIVATE MEMORY', '≠', 'KNOWLEDGE'],
  }

  return (
    <div className="rag-evolution-fragment" data-visual={visual} aria-hidden="true">
      {fragments[visual].map((fragment, index) => <span key={`${fragment}-${index}`}>{fragment}</span>)}
    </div>
  )
}

function RagAssistantPage({ content }: { readonly content: RagAssistantPageContent }) {
  return (
    <ReusableWhatCasePage
      content={content}
      pageClassName="rag-assistant-page"
      titleId="rag-assistant-title"
      surfaceLabel="RAG 어시스턴트 답변과 출처 검토"
      workflowLabel="RAG 어시스턴트 조회·검색·검토 흐름"
      evolutionTargetId="rag-assistant-evolution"
      relatedLabel="RAG 어시스턴트와 연결된 시스템"
      renderProduct={({ fixture, activeId, onActivate }) => (
        <RagAssistantProductView fixture={fixture} activeId={activeId} onActivate={onActivate} />
      )}
      renderEvolutionFragment={(visual) => <RagAssistantEvolutionFragment visual={visual} />}
    />
  )
}

export default RagAssistantPage
