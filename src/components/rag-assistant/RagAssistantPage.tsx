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
      surfaceLabel="RAG assistant answer and source inspection"
      workflowLabel="RAG assistant retrieval and review workflow"
      evolutionTargetId="rag-assistant-evolution"
      relatedLabel="RAG assistant related systems"
      renderProduct={({ fixture, activeId, onActivate }) => (
        <RagAssistantProductView fixture={fixture} activeId={activeId} onActivate={onActivate} />
      )}
      renderEvolutionFragment={(visual) => <RagAssistantEvolutionFragment visual={visual} />}
    />
  )
}

export default RagAssistantPage
