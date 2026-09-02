import { useState } from 'react'
import type {
  DocumentationKnowledgeEdge,
  DocumentationKnowledgeNode,
  DocumentationKnowledgeNodeId,
  DocumentationTaxonomyRule,
} from '../../content/content-types.ts'

interface KnowledgeMapProps {
  readonly nodes: readonly DocumentationKnowledgeNode[]
  readonly edges: readonly DocumentationKnowledgeEdge[]
  readonly accessibleSummary: string
  readonly taxonomy: DocumentationTaxonomyRule
}

const nodePositions: Record<
  DocumentationKnowledgeNodeId,
  { readonly x: number; readonly y: number }
> = {
  project: { x: 500, y: 56 },
  current: { x: 290, y: 174 },
  decisions: { x: 745, y: 174 },
  architecture: { x: 130, y: 300 },
  data: { x: 290, y: 300 },
  api: { x: 450, y: 300 },
  adr: { x: 745, y: 300 },
  deployment: { x: 65, y: 455 },
  recovery: { x: 175, y: 455 },
  'known-issues': { x: 300, y: 455 },
  codemap: { x: 690, y: 558 },
}

const edgeRoutes: Readonly<Record<string, string>> = {
  'project-current': 'M 500 78 V 118 H 290 V 148',
  'project-decisions': 'M 500 78 V 118 H 745 V 148',
  'current-architecture': 'M 290 200 V 240 H 130 V 274',
  'current-data': 'M 290 200 V 274',
  'current-api': 'M 290 200 V 240 H 450 V 274',
  'decisions-adr': 'M 745 200 V 274',
  'architecture-deployment': 'M 130 326 V 382 H 65 V 429',
  'architecture-recovery': 'M 130 326 V 382 H 175 V 429',
  'architecture-known-issues': 'M 130 326 V 382 H 300 V 429',
  'project-codemap': 'M 500 78 V 498 H 690 V 532',
}

const mobileOrder: readonly DocumentationKnowledgeNodeId[] = [
  'project',
  'current',
  'architecture',
  'data',
  'api',
  'deployment',
  'recovery',
  'known-issues',
  'decisions',
  'adr',
  'codemap',
]

function getNodeDepth(
  node: DocumentationKnowledgeNode,
  nodesById: ReadonlyMap<DocumentationKnowledgeNodeId, DocumentationKnowledgeNode>,
) {
  let depth = 0
  let parentId = node.parentId

  while (parentId) {
    depth += 1
    parentId = nodesById.get(parentId)?.parentId
  }

  return depth
}

function getNodePath(
  nodeId: DocumentationKnowledgeNodeId,
  nodesById: ReadonlyMap<DocumentationKnowledgeNodeId, DocumentationKnowledgeNode>,
) {
  const path: DocumentationKnowledgeNodeId[] = []
  let currentNode = nodesById.get(nodeId)

  while (currentNode) {
    path.unshift(currentNode.id)
    currentNode = currentNode.parentId
      ? nodesById.get(currentNode.parentId)
      : undefined
  }

  return new Set(path)
}

interface KnowledgeAnnotationFieldsProps {
  readonly node: DocumentationKnowledgeNode
}

function KnowledgeAnnotationFields({ node }: KnowledgeAnnotationFieldsProps) {
  return (
    <dl className="knowledge-annotation-fields">
      <div>
        <dt>QUESTION</dt>
        <dd>{node.question}</dd>
      </div>
      <div>
        <dt>AUTHORITY</dt>
        <dd>{node.authority}</dd>
      </div>
      <div>
        <dt>UPDATE WHEN</dt>
        <dd>{node.updateWhen}</dd>
      </div>
    </dl>
  )
}

function KnowledgeMap({
  nodes,
  edges,
  accessibleSummary,
  taxonomy,
}: KnowledgeMapProps) {
  const [activeNodeId, setActiveNodeId] =
    useState<DocumentationKnowledgeNodeId>('project')
  const nodesById = new Map(nodes.map((node) => [node.id, node]))
  const orderedMobileNodes = mobileOrder.flatMap((nodeId) => {
    const node = nodesById.get(nodeId)
    return node ? [node] : []
  })
  const activeNode = nodesById.get(activeNodeId) ?? nodes[0]
  const activePath = getNodePath(activeNodeId, nodesById)
  const isExploring = activeNodeId !== 'project'

  function selectNode(nodeId: DocumentationKnowledgeNodeId) {
    setActiveNodeId(nodeId)
  }

  return (
    <section className="knowledge-map" aria-labelledby="knowledge-map-title">
      <div className="knowledge-map-heading">
        <p>01 / KNOWLEDGE STRUCTURE</p>
        <h2 id="knowledge-map-title">A MAP FOR FINDING CONTEXT</h2>
        <p className="knowledge-taxonomy-statement">{taxonomy.statement}</p>
      </div>

      <p className="visually-hidden">{accessibleSummary}</p>
      <ul className="visually-hidden">
        {taxonomy.items.map((item) => (
          <li key={item.label}>
            {item.label}: {item.responsibility}
          </li>
        ))}
      </ul>

      <div
        className="knowledge-map-canvas"
        data-exploring={isExploring}
        onMouseLeave={() => selectNode('project')}
      >
        <svg
          className="knowledge-map-lines"
          viewBox="0 0 1000 650"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {edges.map((edge) => (
            <path
              className={`knowledge-edge knowledge-edge--${edge.relation.replaceAll(' ', '-')}${activePath.has(edge.from) && activePath.has(edge.to) ? ' is-active' : ''}`}
              d={edgeRoutes[edge.id]}
              key={edge.id}
            />
          ))}
        </svg>

        <ol className="knowledge-nodes" aria-label="Project context map">
          {nodes.map((node) => {
            const position = nodePositions[node.id]
            const isActive = activeNodeId === node.id
            const isRelated = activePath.has(node.id)

            return (
              <li
                className={`knowledge-node knowledge-node--${node.kind}${isActive ? ' is-active' : ''}${isExploring && !isRelated ? ' is-dimmed' : ''}`}
                style={{ left: `${position.x / 10}%`, top: `${position.y / 6.5}%` }}
                key={node.id}
              >
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-describedby="knowledge-active-annotation"
                  onClick={() => selectNode(node.id)}
                  onFocus={() => selectNode(node.id)}
                  onMouseEnter={() => selectNode(node.id)}
                >
                  <span className="knowledge-node-index">{node.index}</span>
                  <span className="knowledge-node-label">{node.label}</span>
                </button>
              </li>
            )
          })}
        </ol>

        <p className="knowledge-level-label" aria-hidden="true">
          ↓ CODE LEVEL
        </p>

        {activeNode ? (
          <aside
            className="knowledge-annotation"
            id="knowledge-active-annotation"
            aria-live="polite"
            aria-label="Selected context note"
            key={activeNode.id}
          >
            <header>
              <span>{activeNode.index}</span>
              <strong>{activeNode.label}</strong>
            </header>
            <KnowledgeAnnotationFields node={activeNode} />
          </aside>
        ) : null}
      </div>

      <ol className="knowledge-mobile-outline" aria-label="Project context hierarchy">
        {orderedMobileNodes.map((node) => {
          const isActive = activeNodeId === node.id

          return (
            <li
              className={`knowledge-mobile-node knowledge-mobile-node--depth-${getNodeDepth(node, nodesById)}${isActive ? ' is-active' : ''}`}
              key={node.id}
            >
              <button
                type="button"
                aria-pressed={isActive}
                aria-expanded={isActive}
                aria-controls={`knowledge-mobile-annotation-${node.id}`}
                onClick={() => selectNode(node.id)}
              >
                <span>{node.index}</span>
                <strong>{node.label}</strong>
              </button>
              {isActive ? (
                <div
                  className="knowledge-mobile-annotation"
                  id={`knowledge-mobile-annotation-${node.id}`}
                >
                  <KnowledgeAnnotationFields node={node} />
                </div>
              ) : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default KnowledgeMap
