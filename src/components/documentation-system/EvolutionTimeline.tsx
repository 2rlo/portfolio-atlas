import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type {
  DocumentationEvolutionScene,
  DocumentationSystemContent,
} from '../../content/content-types.ts'
import {
  evolutionHistory,
  evolutionNodes,
  evolutionTransitionContracts,
  getEvolutionStageState,
} from '../../content/evolution-stages.ts'
import type {
  EvolutionNode,
  EvolutionStageNumber,
  EvolutionTransitionContract,
} from '../../content/evolution-stages.ts'

type EvolutionContent = DocumentationSystemContent['evolution']

interface EvolutionTimelineProps {
  readonly eyebrow: EvolutionContent['eyebrow']
  readonly headline: EvolutionContent['headline']
  readonly introduction: EvolutionContent['introduction']
  readonly takeaway: EvolutionContent['takeaway']
  readonly scenes: EvolutionContent['scenes']
  readonly currentRule: EvolutionContent['currentRule']
}

interface EvolutionMapProps {
  readonly stage: EvolutionStageNumber
  readonly time: string
}

interface EvolutionStepProps {
  readonly scene: DocumentationEvolutionScene
  readonly stage: EvolutionStageNumber
  readonly isActive: boolean
  readonly setStepRef: (sceneId: string, node: HTMLLIElement | null) => void
}

const nodeById = new Map(evolutionNodes.map((node) => [node.id, node]))

function getTransitionStatus(
  nodeId: string,
  stage: EvolutionStageNumber,
): 'ADDED' | 'PERSISTS' | 'HISTORY' | undefined {
  const node = nodeById.get(nodeId)
  const state = node ? getEvolutionStageState(node, stage) : undefined
  if (!node || !state || state.role === 'hidden') return undefined
  if (state.role === 'history') return 'HISTORY'
  if (node.introducedAt === stage) return 'ADDED'
  return 'PERSISTS'
}

function EvolutionArchitectureMap({ stage, time }: EvolutionMapProps) {
  return (
    <div className="evolution-architecture-map" data-stage={stage}>
      <header className="evolution-map-header">
        <span>PROGRESSIVE ARCHITECTURE MAP</span>
        <strong>{time}</strong>
      </header>

      <aside className="evolution-history-rail">
        <span>EVOLUTION TRACE</span>
        <i aria-hidden="true" />
      </aside>

      <div className="evolution-active-field">
        <span>CURRENT ACTIVE STRUCTURE</span>
      </div>

      <svg className="evolution-map-edges" viewBox="0 0 100 100" preserveAspectRatio="none">
        {evolutionNodes.map((node) => {
          const state = getEvolutionStageState(node, stage)
          const parent = state.parent ? nodeById.get(state.parent) : undefined
          const parentState = parent ? getEvolutionStageState(parent, stage) : undefined
          const visible = state.role !== 'hidden' && parentState?.role !== 'hidden'

          return (
            <line
              key={node.id}
              data-visible={visible}
              x1={parentState?.x ?? state.x}
              y1={parentState?.y ?? state.y}
              x2={state.x}
              y2={state.y}
            />
          )
        })}
        {stage === 1 ? <line data-visible="true" x1="73" y1="24" x2="56" y2="58" /> : null}
      </svg>

      <div className="evolution-map-nodes">
        {evolutionNodes.map((node) => {
          const state = getEvolutionStageState(node, stage)
          const historyEntry = evolutionHistory.find((entry) => entry.nodeId === node.id)
          const scale = state.scale ?? 1
          const style: CSSProperties = {
            opacity: state.opacity ?? (state.role === 'hidden' ? 0 : 1),
            transform: `translate(calc(${state.x}cqw - 50%), calc(${state.y}cqh - 50%)) scale(${scale})`,
          }

          return (
            <article
              className="evolution-map-node"
              data-kind={node.kind}
              data-node-id={node.id}
              data-role={state.role}
              key={node.id}
              style={style}
            >
              {state.role === 'history' && historyEntry ? <time>{historyEntry.date}</time> : null}
              <strong>{state.label ?? node.label}</strong>
              {(state.detail ?? node.detail) ? <span>{state.detail ?? node.detail}</span> : null}
              {state.note ? <small>{state.note}</small> : null}
            </article>
          )
        })}
      </div>

      <p className="evolution-map-pressure">
        <span>PRESSURE</span>
        <strong>{stage === 1 ? 'DIRECTION + STORAGE' : stage === 2 ? 'RESPONSIBILITY' : stage === 3 ? 'RESOLUTION' : stage === 4 ? 'OPERATIONS + CODE' : 'STALE CONTEXT'}</strong>
      </p>
    </div>
  )
}

function EvolutionContract({ contract }: { readonly contract?: EvolutionTransitionContract }) {
  if (!contract) return <span>ORIGIN</span>

  return (
    <>
      {contract.persists.length > 0 ? <span>PERSIST</span> : null}
      {contract.newNodes.length > 0 ? <span>ADDED</span> : null}
      {contract.exitsToHistory.length > 0 ? <span>TO HISTORY</span> : null}
    </>
  )
}

function StaticNodeTree({
  node,
  stage,
  childrenByParent,
}: {
  readonly node: EvolutionNode
  readonly stage: EvolutionStageNumber
  readonly childrenByParent: ReadonlyMap<string, readonly EvolutionNode[]>
}) {
  const children = childrenByParent.get(node.id) ?? []
  const status = getTransitionStatus(node.id, stage)

  return (
    <li className="evolution-static-node" data-role={getEvolutionStageState(node, stage).role}>
      <div>
        <strong>{getEvolutionStageState(node, stage).label ?? node.label}</strong>
        {(getEvolutionStageState(node, stage).detail ?? node.detail) ? <span>{getEvolutionStageState(node, stage).detail ?? node.detail}</span> : null}
        {status ? <small>{status}</small> : null}
      </div>
      {children.length > 0 ? (
        <ul>
          {children.map((child) => (
            <StaticNodeTree key={child.id} node={child} stage={stage} childrenByParent={childrenByParent} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

function StaticArchitectureKeyframe({ stage, time }: EvolutionMapProps) {
  const visibleNodes = evolutionNodes.filter((node) => {
    const role = getEvolutionStageState(node, stage).role
    return role !== 'hidden' && role !== 'history'
  })
  const historyNodes = evolutionHistory
    .filter((entry) => entry.visibleFrom <= stage)
    .map((entry) => nodeById.get(entry.nodeId))
    .filter((node): node is EvolutionNode => Boolean(node))
  const childrenByParent = new Map<string, EvolutionNode[]>()

  for (const node of visibleNodes) {
    const parent = getEvolutionStageState(node, stage).parent
    if (!parent) continue
    const siblings = childrenByParent.get(parent) ?? []
    siblings.push(node)
    childrenByParent.set(parent, siblings)
  }

  const rootNodes = visibleNodes.filter((node) => {
    const parent = getEvolutionStageState(node, stage).parent
    return !parent || !visibleNodes.some((candidate) => candidate.id === parent)
  })
  const contract = evolutionTransitionContracts.find((item) => item.to === stage)

  return (
    <figure className="evolution-static-keyframe" aria-hidden="true" data-stage={stage}>
      <figcaption>
        <span>STATIC KEYFRAME / {time}</span>
        <span className="evolution-static-contract"><EvolutionContract contract={contract} /></span>
      </figcaption>

      {historyNodes.length > 0 ? (
        <div className="evolution-static-history">
          <span>EVOLUTION TRACE</span>
          <ol>
            {historyNodes.map((node) => {
              const entry = evolutionHistory.find((item) => item.nodeId === node.id)
              return <li key={node.id}><time>{entry?.date}</time><strong>{node.label}</strong><small>HISTORY</small></li>
            })}
          </ol>
        </div>
      ) : null}

      <ol className="evolution-static-tree">
        {rootNodes.map((node) => (
          <StaticNodeTree key={node.id} node={node} stage={stage} childrenByParent={childrenByParent} />
        ))}
      </ol>
    </figure>
  )
}

function EvolutionStep({ scene, stage, isActive, setStepRef }: EvolutionStepProps) {
  return (
    <li
      className="evolution-step"
      data-active={isActive}
      data-scene={scene.id}
      ref={(node) => setStepRef(scene.id, node)}
    >
      <article className="evolution-step-layout" aria-labelledby={`scene-${scene.id}`}>
        <header className="evolution-scene-meta">
          <span>STAGE {scene.index} / 05</span>
          <time>{scene.time}</time>
        </header>

        <div className="evolution-scene-pressure">
          <span>PRESSURE</span>
          <p>{scene.pressureLines.map((line) => <strong key={line}>{line}</strong>)}</p>
        </div>

        <div className="evolution-scene-heading">
          <h3 id={`scene-${scene.id}`}>{scene.title}</h3>
          <p>{scene.takeaway}</p>
        </div>

        <dl className="evolution-scene-change"><div><dt>STRUCTURE CHANGE</dt><dd>{scene.change}</dd></div></dl>

        <StaticArchitectureKeyframe stage={stage} time={scene.time} />
        <p className="visually-hidden">{scene.accessibleVisualSummary}</p>

        <dl className="evolution-scene-evidence"><div><dt>{scene.evidence.label}</dt><dd>{scene.evidence.statement}</dd></div></dl>

        {scene.boundary ? <p className="evolution-scene-boundary"><span>BOUNDARY</span>{scene.boundary}</p> : null}
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
        <ol className="maintenance-flow" aria-label="같은 변경에서 맥락을 갱신하고 검증하는 흐름">
        {currentRule.flow.map((step, index) => (
          <li key={step.label}>
            <span>{step.label}</span>
            <ul>{step.items.map((item) => <li key={item}>{item}</li>)}</ul>
            {index < currentRule.flow.length - 1 ? <span className="maintenance-flow-arrow" aria-hidden="true">→</span> : null}
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
  const activeIndex = Math.max(0, scenes.findIndex((scene) => scene.id === activeSceneId))
  const activeScene = scenes[activeIndex] ?? scenes[0]
  const activeStage = (activeIndex + 1) as EvolutionStageNumber

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

    const observer = new IntersectionObserver((entries) => {
      const candidates = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => {
          const center = window.innerHeight / 2
          const aCenter = a.boundingClientRect.top + a.boundingClientRect.height / 2
          const bCenter = b.boundingClientRect.top + b.boundingClientRect.height / 2
          return Math.abs(aCenter - center) - Math.abs(bCenter - center)
        })
      const sceneId = (candidates[0]?.target as HTMLElement | undefined)?.dataset.scene
      if (sceneId) setActiveSceneId(sceneId)
    }, { rootMargin: '-38% 0px -38% 0px', threshold: [0, 0.2, 0.5] })

    stepRefs.current.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [usesStaticStory])

  const setStepRef = useCallback((sceneId: string, node: HTMLLIElement | null) => {
    if (node) stepRefs.current.set(sceneId, node)
    else stepRefs.current.delete(sceneId)
  }, [])

  return (
    <section className="evolution-section" aria-labelledby="evolution-title">
      <header className="evolution-header">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 id="evolution-title">{headline.map((line) => <span key={line}>{line}</span>)}</h2>
        <div><p>{introduction}</p><strong>{takeaway}</strong></div>
      </header>

      <div className="evolution-scrolly" data-static-story={usesStaticStory}>
        {activeScene ? (
          <aside className="evolution-sticky-visual" aria-hidden="true">
            <EvolutionArchitectureMap stage={activeStage} time={activeScene.time} />
          </aside>
        ) : null}

        <ol className="evolution-steps" aria-label="문서 체계가 확장된 과정">
          {scenes.map((scene, index) => (
            <EvolutionStep
              key={scene.id}
              scene={scene}
              stage={(index + 1) as EvolutionStageNumber}
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
