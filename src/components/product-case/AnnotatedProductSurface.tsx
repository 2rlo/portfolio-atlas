import type { ReactNode } from 'react'
import type {
  ProductEditorialAnnotation,
  ProductWorkflowStep,
} from '../../content/content-types.ts'

type ProductActivationIntent = 'pointer' | 'focus' | 'press'
type ProductInteractionMode = 'idle' | 'pointer' | 'focus' | 'pinned'
type ProductActivationHandler<Id extends string> = (
  id: Id,
  intent?: ProductActivationIntent,
) => void

interface ProductHotspotProps<Id extends string> {
  readonly id: Id
  readonly activeId: Id | null
  readonly label: string
  readonly className?: string
  readonly onActivate: ProductActivationHandler<Id>
  readonly children: ReactNode
}

interface ProductInspectionFrameProps {
  readonly activeAnnotation?: ProductEditorialAnnotation
  readonly defaultAnnotation: {
    readonly index: string
    readonly label: string
    readonly title: string
    readonly body: string
  }
  readonly disclosure: string
  readonly surfaceLabel: string
  readonly evolutionTargetId?: string
  readonly interactionMode?: ProductInteractionMode
  readonly onPointerPreviewEnd?: () => void
  readonly onFocusPreviewEnd?: () => void
  readonly children: ReactNode
}

interface ProductWorkflowProps<Id extends string> {
  readonly steps: readonly ProductWorkflowStep<Id>[]
  readonly activeId: Id | null
  readonly onActivate: ProductActivationHandler<Id>
  readonly ariaLabel?: string
  readonly onPointerPreviewEnd?: () => void
  readonly onFocusPreviewEnd?: () => void
}

function ProductHotspot<Id extends string>({
  id,
  activeId,
  label,
  className = '',
  onActivate,
  children,
}: ProductHotspotProps<Id>) {
  const isActive = activeId === id

  return (
    <button
      className={`product-hotspot ${className}`.trim()}
      type="button"
      data-hotspot={id}
      data-active={isActive ? 'true' : 'false'}
      aria-label={`${label} 설계 설명 보기`}
      aria-controls="product-editorial-note"
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') onActivate(id, 'pointer')
      }}
      onFocus={(event) => {
        if (event.currentTarget.matches(':focus-visible')) onActivate(id, 'focus')
      }}
      onClick={() => onActivate(id, 'press')}
    >
      {children}
    </button>
  )
}

function EditorialAnnotation({
  annotation,
  fallback,
  evolutionTargetId,
  interactionMode = 'idle',
}: {
  readonly annotation?: ProductEditorialAnnotation
  readonly fallback: ProductInspectionFrameProps['defaultAnnotation']
  readonly evolutionTargetId?: string
  readonly interactionMode?: ProductInteractionMode
}) {
  const announcesSelection = interactionMode === 'focus' || interactionMode === 'pinned'

  return (
    <aside
      className="product-editorial-note"
      id="product-editorial-note"
      aria-live={announcesSelection ? 'polite' : 'off'}
      aria-atomic="true"
    >
      <div className="product-editorial-heading">
        <span>{annotation?.index ?? fallback.index}</span>
        <p>{annotation?.label ?? fallback.label}</p>
      </div>

      <h3>{annotation?.title ?? fallback.title}</h3>

      {annotation ? (
        <dl className="product-editorial-sections">
          {annotation.sections.map((section) => (
            <div key={section.label}>
              <dt>{section.label}</dt>
              <dd>{section.body}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="product-editorial-prompt">{fallback.body}</p>
      )}

      {annotation?.evolution && evolutionTargetId ? (
        <a className="product-editorial-evolution" href={`#${evolutionTargetId}`}>
          <span>{annotation.evolution.label}</span>
          <strong>{annotation.evolution.date} ↓</strong>
        </a>
      ) : null}

      <p className="product-editorial-interaction">
        <span>{interactionMode === 'pinned' ? 'PINNED' : 'INTERACTION'}</span>
        {interactionMode === 'pinned'
          ? '같은 요소를 다시 선택하거나 Esc를 누르면 전체 보기로 돌아갑니다.'
          : 'Hover 또는 focus로 살펴보고, click이나 tap으로 설명을 고정합니다.'}
      </p>
    </aside>
  )
}

function ProductInspectionFrame({
  activeAnnotation,
  defaultAnnotation,
  disclosure,
  surfaceLabel,
  evolutionTargetId,
  interactionMode = 'idle',
  onPointerPreviewEnd,
  onFocusPreviewEnd,
  children,
}: ProductInspectionFrameProps) {
  return (
    <div
      className="product-inspection-frame"
      data-inspection-active={activeAnnotation ? 'true' : 'false'}
      data-interaction-mode={interactionMode}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'touch') onPointerPreviewEnd?.()
      }}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget as Node | null
        if (!event.currentTarget.contains(nextTarget)) onFocusPreviewEnd?.()
      }}
    >
      <div className="product-inspection-surface" aria-label={surfaceLabel}>
        <p className="product-inspection-disclosure">{disclosure}</p>
        {children}
      </div>

      <EditorialAnnotation
        annotation={activeAnnotation}
        fallback={defaultAnnotation}
        evolutionTargetId={evolutionTargetId}
        interactionMode={interactionMode}
      />
    </div>
  )
}

function ProductWorkflow<Id extends string>({
  steps,
  activeId,
  onActivate,
  ariaLabel = '제품 검토 workflow',
  onPointerPreviewEnd,
  onFocusPreviewEnd,
}: ProductWorkflowProps<Id>) {
  return (
    <ol
      className="product-workflow"
      aria-label={ariaLabel}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'touch') onPointerPreviewEnd?.()
      }}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget as Node | null
        if (!event.currentTarget.contains(nextTarget)) onFocusPreviewEnd?.()
      }}
    >
      {steps.map((step) => {
        const isActive = activeId === step.hotspotId

        return (
          <li key={step.id} data-active={isActive ? 'true' : 'false'}>
            <button
              type="button"
              aria-label={`${step.label}: ${step.summary}`}
              aria-controls="product-editorial-note"
              onPointerEnter={(event) => {
                if (event.pointerType !== 'touch') onActivate(step.hotspotId, 'pointer')
              }}
              onFocus={(event) => {
                if (event.currentTarget.matches(':focus-visible')) {
                  onActivate(step.hotspotId, 'focus')
                }
              }}
              onClick={() => onActivate(step.hotspotId, 'press')}
            >
              <span>{step.index}</span>
              <strong>{step.label}</strong>
              <small>{step.summary}</small>
            </button>
          </li>
        )
      })}
    </ol>
  )
}

export { ProductHotspot, ProductInspectionFrame, ProductWorkflow }
export type {
  ProductActivationHandler,
  ProductActivationIntent,
  ProductInteractionMode,
}
