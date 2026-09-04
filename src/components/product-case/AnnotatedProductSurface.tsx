import type { ReactNode } from 'react'
import type {
  ProductEditorialAnnotation,
  ProductWorkflowStep,
} from '../../content/content-types.ts'

interface ProductHotspotProps<Id extends string> {
  readonly id: Id
  readonly activeId: Id | null
  readonly label: string
  readonly className?: string
  readonly onActivate: (id: Id) => void
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
  readonly children: ReactNode
}

interface ProductWorkflowProps<Id extends string> {
  readonly steps: readonly ProductWorkflowStep<Id>[]
  readonly activeId: Id | null
  readonly onActivate: (id: Id) => void
  readonly ariaLabel?: string
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
      aria-pressed={isActive}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') onActivate(id)
      }}
      onFocus={() => onActivate(id)}
      onClick={() => onActivate(id)}
    >
      {children}
    </button>
  )
}

function EditorialAnnotation({
  annotation,
  fallback,
  evolutionTargetId,
}: {
  readonly annotation?: ProductEditorialAnnotation
  readonly fallback: ProductInspectionFrameProps['defaultAnnotation']
  readonly evolutionTargetId?: string
}) {
  return (
    <aside
      className="product-editorial-note"
      id="product-editorial-note"
      aria-live="polite"
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
    </aside>
  )
}

function ProductInspectionFrame({
  activeAnnotation,
  defaultAnnotation,
  disclosure,
  surfaceLabel,
  evolutionTargetId,
  children,
}: ProductInspectionFrameProps) {
  return (
    <div
      className="product-inspection-frame"
      data-inspection-active={activeAnnotation ? 'true' : 'false'}
    >
      <div className="product-inspection-surface" aria-label={surfaceLabel}>
        <p className="product-inspection-disclosure">{disclosure}</p>
        {children}
      </div>

      <EditorialAnnotation
        annotation={activeAnnotation}
        fallback={defaultAnnotation}
        evolutionTargetId={evolutionTargetId}
      />
    </div>
  )
}

function ProductWorkflow<Id extends string>({
  steps,
  activeId,
  onActivate,
  ariaLabel = '제품 검토 workflow',
}: ProductWorkflowProps<Id>) {
  return (
    <ol className="product-workflow" aria-label={ariaLabel}>
      {steps.map((step) => {
        const isActive = activeId === step.hotspotId

        return (
          <li key={step.id} data-active={isActive ? 'true' : 'false'}>
            <button
              type="button"
              aria-label={`${step.label}: ${step.summary}`}
              aria-controls="product-editorial-note"
              aria-pressed={isActive}
              onPointerEnter={(event) => {
                if (event.pointerType !== 'touch') onActivate(step.hotspotId)
              }}
              onFocus={() => onActivate(step.hotspotId)}
              onClick={() => onActivate(step.hotspotId)}
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
