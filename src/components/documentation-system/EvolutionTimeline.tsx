import { useEffect, useRef, useState } from 'react'
import type {
  DocumentationEvolutionScene,
  DocumentationEvolutionVisual,
  DocumentationSystemContent,
} from '../../content/content-types.ts'

type EvolutionContent = DocumentationSystemContent['evolution']

interface EvolutionTimelineProps {
  readonly eyebrow: EvolutionContent['eyebrow']
  readonly headline: EvolutionContent['headline']
  readonly introduction: EvolutionContent['introduction']
  readonly takeaway: EvolutionContent['takeaway']
  readonly scenes: EvolutionContent['scenes']
  readonly currentRule: EvolutionContent['currentRule']
}

interface EvolutionFrameProps {
  readonly visual: DocumentationEvolutionVisual
}

const evolutionLayers = [
  'DATA MODEL',
  'RESPONSIBILITY TAXONOMY',
  'MULTI-LEVEL MAPS',
  'OPERATIONS + CODE CONTEXT',
  'SAME-CHANGE MAINTENANCE',
] as const

function BoundaryFrame({ visual }: EvolutionFrameProps) {
  if (visual.kind !== 'boundary') return null

  return (
    <div className="evolution-frame-boundary">
      <div className="evolution-frame-boundary-pair">
        {visual.boundaries.map((boundary) => (
          <div key={boundary.label}>
            <strong>{boundary.label}</strong>
            <span>{boundary.responsibility}</span>
          </div>
        ))}
      </div>
      <div className="evolution-frame-artifact">
        <span>{visual.artifact}</span>
        <strong>{visual.status}</strong>
      </div>
    </div>
  )
}

function TaxonomyFrame({ visual }: EvolutionFrameProps) {
  if (visual.kind !== 'taxonomy') return null

  return (
    <div className="evolution-frame-taxonomy">
      <p>PROJECT CONTEXT</p>
      <ol>
        {visual.responsibilities.map((responsibility) => (
          <li key={responsibility.label}>
            <strong>{responsibility.label}</strong>
            <span>{responsibility.answer}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function LevelsFrame({ visual }: EvolutionFrameProps) {
  if (visual.kind !== 'levels') return null

  return (
    <div className="evolution-frame-levels">
      {visual.tracks.map((track) => (
        <section key={track.label}>
          <header>
            <strong>{track.label}</strong>
            <span>{track.question}</span>
          </header>
          <ol>
            {track.levels.map((level, index) => (
              <li key={level}>
                <span>{level}</span>
                {index < track.levels.length - 1 ? <i aria-hidden="true">↓</i> : null}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

function OperationsFrame({ visual }: EvolutionFrameProps) {
  if (visual.kind !== 'operations') return null

  return (
    <div className="evolution-frame-operations">
      <section className="evolution-operation-entry">
        <span>ENTRY / OPERATION</span>
        <ol>
          {visual.entryPath.map((item, index) => (
            <li key={item}>
              <strong>{item}</strong>
              {index < visual.entryPath.length - 1 ? <i aria-hidden="true">→</i> : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="evolution-operation-truth">
        <span>GROUND TRUTH</span>
        <div>
          <strong>{visual.groundTruth.from}</strong>
          <i aria-hidden="true">↓</i>
          <strong>{visual.groundTruth.to}</strong>
        </div>
        <ul>
          {visual.groundTruth.checks.map((check) => (
            <li key={check}>{check}</li>
          ))}
        </ul>
      </section>

      <section className="evolution-operation-codemap">
        <span>CODEMAP / CODE LEVEL</span>
        <dl>
          {visual.codemap.map((artifact) => (
            <div key={artifact.label}>
              <dt>{artifact.label}</dt>
              <dd>{artifact.responsibility}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}

function StalenessFrame({ visual }: EvolutionFrameProps) {
  if (visual.kind !== 'staleness') return null

  return (
    <div className="evolution-frame-staleness">
      <section>
        <span>REPEATED PATTERN</span>
        <ol>
          {visual.backlog.map((item, index) => (
            <li key={item}>
              <strong>{item}</strong>
              {index < visual.backlog.length - 1 ? <i aria-hidden="true">→</i> : null}
            </li>
          ))}
        </ol>
      </section>
      <section>
        <span>CHANGE TRIGGERS</span>
        <ul>
          {visual.triggers.map((trigger) => (
            <li key={trigger}>{trigger}</li>
          ))}
        </ul>
      </section>
      <section>
        <span>SAME-CHANGE CONTEXT</span>
        <ul>
          {visual.context.map((context) => (
            <li key={context}>{context}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function EvolutionFrame({ visual }: EvolutionFrameProps) {
  switch (visual.kind) {
    case 'boundary':
      return <BoundaryFrame visual={visual} />
    case 'taxonomy':
      return <TaxonomyFrame visual={visual} />
    case 'levels':
      return <LevelsFrame visual={visual} />
    case 'operations':
      return <OperationsFrame visual={visual} />
    case 'staleness':
      return <StalenessFrame visual={visual} />
  }
}

interface EvolutionStepProps {
  readonly scene: DocumentationEvolutionScene
  readonly isActive: boolean
  readonly setStepRef: (sceneId: string, node: HTMLLIElement | null) => void
}

function EvolutionStep({ scene, isActive, setStepRef }: EvolutionStepProps) {
  return (
    <li
      className="evolution-step"
      data-active={isActive}
      data-scene={scene.id}
      ref={(node) => setStepRef(scene.id, node)}
    >
      <article className="evolution-step-layout" aria-labelledby={`scene-${scene.id}`}>
        <header className="evolution-scene-meta">
          <span>SCENE {scene.index} / 05</span>
          <time>{scene.time}</time>
        </header>

        <div className="evolution-scene-pressure">
          <span>PRESSURE</span>
          <p>
            {scene.pressureLines.map((line) => (
              <strong key={line}>{line}</strong>
            ))}
          </p>
        </div>

        <div className="evolution-scene-heading">
          <h3 id={`scene-${scene.id}`}>{scene.title}</h3>
          <p>{scene.takeaway}</p>
        </div>

        <dl className="evolution-scene-change">
          <div>
            <dt>STRUCTURE CHANGE</dt>
            <dd>{scene.change}</dd>
          </div>
        </dl>

        <figure className="evolution-inline-frame" aria-hidden="true">
          <span className="evolution-inline-frame-label">ACCUMULATED LAYER {scene.index}</span>
          <EvolutionFrame visual={scene.visual} />
        </figure>
        <p className="visually-hidden">{scene.accessibleVisualSummary}</p>

        <dl className="evolution-scene-evidence">
          <div>
            <dt>{scene.evidence.label}</dt>
            <dd>{scene.evidence.statement}</dd>
          </div>
        </dl>

        {scene.boundary ? (
          <p className="evolution-scene-boundary">
            <span>BOUNDARY</span>
            {scene.boundary}
          </p>
        ) : null}
      </article>
    </li>
  )
}

function CurrentRule({ currentRule }: Pick<EvolutionTimelineProps, 'currentRule'>) {
  return (
    <section className="evolution-current-rule" aria-labelledby="current-rule-title">
      <p>{currentRule.eyebrow}</p>
      <h3 id="current-rule-title">{currentRule.title}</h3>
      <p className="evolution-current-rule-statement">{currentRule.statement}</p>

      <ol className="maintenance-flow" aria-label="Same-change maintenance flow">
        {currentRule.flow.map((step, index) => (
          <li key={step.label}>
            <span>{step.label}</span>
            <ul>
              {step.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {index < currentRule.flow.length - 1 ? (
              <span className="maintenance-flow-arrow" aria-hidden="true">→</span>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  )
}

function EvolutionTimeline({ eyebrow, headline, introduction, takeaway, scenes, currentRule }: EvolutionTimelineProps) {
  const [activeSceneId, setActiveSceneId] = useState(scenes[0]?.id ?? '')
  const [usesStaticStory, setUsesStaticStory] = useState(false)
  const stepRefs = useRef(new Map<string, HTMLLIElement>())
  const activeScene = scenes.find((scene) => scene.id === activeSceneId) ?? scenes[0]
  const activeIndex = Math.max(0, scenes.findIndex((scene) => scene.id === activeScene?.id))

  useEffect(() => {
    const narrowQuery = window.matchMedia('(max-width: 820px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMode = () => setUsesStaticStory(narrowQuery.matches || reducedMotionQuery.matches)

    updateMode()
    narrowQuery.addEventListener('change', updateMode)
    reducedMotionQuery.addEventListener('change', updateMode)

    return () => {
      narrowQuery.removeEventListener('change', updateMode)
      reducedMotionQuery.removeEventListener('change', updateMode)
    }
  }, [])

  useEffect(() => {
    if (usesStaticStory) return

    const observer = new IntersectionObserver(
      (entries) => {
        const candidates = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const viewportCenter = window.innerHeight / 2
            const aCenter = a.boundingClientRect.top + a.boundingClientRect.height / 2
            const bCenter = b.boundingClientRect.top + b.boundingClientRect.height / 2
            return Math.abs(aCenter - viewportCenter) - Math.abs(bCenter - viewportCenter)
          })

        const sceneId = (candidates[0]?.target as HTMLElement | undefined)?.dataset.scene
        if (sceneId) setActiveSceneId(sceneId)
      },
      { rootMargin: '-38% 0px -38% 0px', threshold: [0, 0.2, 0.5] },
    )

    stepRefs.current.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [usesStaticStory])

  function setStepRef(sceneId: string, node: HTMLLIElement | null) {
    if (node) stepRefs.current.set(sceneId, node)
    else stepRefs.current.delete(sceneId)
  }

  return (
    <section className="evolution-section" aria-labelledby="evolution-title">
      <header className="evolution-header">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 id="evolution-title">
          {headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <div>
          <p>{introduction}</p>
          <strong>{takeaway}</strong>
        </div>
      </header>

      <div className="evolution-scrolly" data-static-story={usesStaticStory}>
        {activeScene ? (
          <aside className="evolution-sticky-visual" aria-hidden="true">
            <header>
              <span>CUMULATIVE STRUCTURE</span>
              <strong>{activeScene.time}</strong>
            </header>
            <figure className="evolution-frame" key={activeScene.id}>
              <EvolutionFrame visual={activeScene.visual} />
            </figure>
            <ol className="evolution-layer-ledger">
              {evolutionLayers.map((layer, index) => (
                <li data-reached={index <= activeIndex} data-current={index === activeIndex} key={layer}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{layer}</strong>
                </li>
              ))}
            </ol>
          </aside>
        ) : null}

        <ol className="evolution-steps" aria-label="Documentation system evolution">
          {scenes.map((scene) => (
            <EvolutionStep
              key={scene.id}
              scene={scene}
              isActive={scene.id === activeScene?.id}
              setStepRef={setStepRef}
            />
          ))}
        </ol>
      </div>

      <CurrentRule currentRule={currentRule} />
    </section>
  )
}

export default EvolutionTimeline
