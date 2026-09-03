export type EvolutionStageNumber = 1 | 2 | 3 | 4 | 5

export type EvolutionNodeRole = 'primary' | 'secondary' | 'history' | 'hidden' | 'micro'

export interface EvolutionNodeStageState {
  readonly role: EvolutionNodeRole
  readonly parent?: string
  readonly label?: string
  readonly detail?: string
  readonly x: number
  readonly y: number
  readonly scale?: number
  readonly opacity?: number
  readonly note?: string
}

export interface EvolutionNode {
  readonly id: string
  readonly label: string
  readonly detail?: string
  readonly introducedAt: EvolutionStageNumber
  readonly kind: 'semantic' | 'representation' | 'flow'
  readonly stage: Partial<Record<EvolutionStageNumber, EvolutionNodeStageState>>
}

export interface EvolutionTransitionContract {
  readonly from: EvolutionStageNumber
  readonly to: EvolutionStageNumber
  readonly persists: readonly string[]
  readonly moves: readonly string[]
  readonly shrinks: readonly string[]
  readonly exitsToHistory: readonly string[]
  readonly newNodes: readonly string[]
}

export interface EvolutionHistoryEntry {
  readonly nodeId: string
  readonly date: string
  readonly label: string
  readonly visibleFrom: EvolutionStageNumber
}

const hidden = (x: number, y: number): EvolutionNodeStageState => ({
  role: 'hidden',
  x,
  y,
  scale: 0.72,
  opacity: 0,
})

export const evolutionNodes: readonly EvolutionNode[] = [
  {
    id: 'human', label: 'NOTION', detail: 'HUMAN AUTHORING / REVIEW', introducedAt: 1, kind: 'semantic',
    stage: { 1: { role: 'secondary', x: 38, y: 24 }, 2: hidden(29, 20), 3: hidden(29, 20), 4: hidden(29, 20), 5: hidden(29, 20) },
  },
  {
    id: 'postgresql', label: 'POSTGRESQL', detail: 'AGGREGATION / QUERY', introducedAt: 1, kind: 'semantic',
    stage: { 1: { role: 'secondary', x: 73, y: 24 }, 2: hidden(29, 20), 3: hidden(29, 20), 4: hidden(29, 20), 5: hidden(29, 20) },
  },
  {
    id: 'initial-erd', label: 'INITIAL ERD', detail: '11 TABLES', introducedAt: 1, kind: 'representation',
    stage: {
      1: { role: 'primary', x: 56, y: 58, parent: 'human', note: 'FIRST SYSTEM SNAPSHOT' },
      2: { role: 'history', x: 10, y: 21, scale: 0.68, opacity: 0.82, note: 'PREVIOUS REPRESENTATION' },
      3: { role: 'history', x: 10, y: 18, scale: 0.62, opacity: 0.46 },
      4: { role: 'history', x: 10, y: 15, scale: 0.58, opacity: 0.4 },
      5: { role: 'history', x: 10, y: 14, scale: 0.55, opacity: 0.4 },
    },
  },
  {
    id: 'project', label: 'PROJECT', detail: 'DOCUMENTATION MAP', introducedAt: 2, kind: 'semantic',
    stage: {
      1: hidden(56, 58),
      2: { role: 'primary', x: 61, y: 13 },
      3: { role: 'primary', x: 61, y: 10 },
      4: { role: 'primary', x: 59, y: 8 },
      5: { role: 'primary', x: 59, y: 8, scale: 0.82 },
    },
  },
  {
    id: 'current', label: 'CURRENT', detail: 'COMPLETE / PARTIAL / TEMPORARY / RISK', introducedAt: 2, kind: 'semantic',
    stage: {
      1: hidden(56, 58),
      2: { role: 'primary', parent: 'project', x: 32, y: 39, note: 'WHAT IS TRUE NOW' },
      3: { role: 'secondary', parent: 'project', x: 32, y: 28 },
      4: { role: 'secondary', parent: 'project', x: 27, y: 25, scale: 0.62 },
      5: { role: 'secondary', parent: 'project', x: 27, y: 23, scale: 0.55, opacity: 0.76 },
    },
  },
  {
    id: 'architecture', label: 'ARCHITECTURE', detail: 'CURRENT ONLY', introducedAt: 2, kind: 'semantic',
    stage: {
      1: hidden(56, 58),
      2: { role: 'primary', parent: 'project', x: 51, y: 39 },
      3: { role: 'primary', parent: 'project', x: 48, y: 32, note: 'EXPLORATION BACKBONE' },
      4: { role: 'primary', parent: 'project', x: 43, y: 25, scale: 0.82 },
      5: { role: 'primary', parent: 'project', x: 42, y: 23, scale: 0.7, opacity: 0.82 },
    },
  },
  {
    id: 'roadmap', label: 'ROADMAP', detail: 'REMAINING SCOPE', introducedAt: 2, kind: 'semantic',
    stage: {
      1: hidden(56, 58),
      2: { role: 'primary', parent: 'project', x: 70, y: 39 },
      3: { role: 'secondary', parent: 'project', x: 68, y: 28 },
      4: { role: 'secondary', parent: 'project', x: 55, y: 25, scale: 0.58, opacity: 0.72 },
      5: { role: 'secondary', parent: 'project', x: 52, y: 23, scale: 0.5, opacity: 0.62 },
    },
  },
  {
    id: 'decisions', label: 'DECISIONS', detail: 'WHY', introducedAt: 2, kind: 'semantic',
    stage: {
      1: hidden(56, 58),
      2: { role: 'primary', parent: 'project', x: 88, y: 39 },
      3: { role: 'secondary', parent: 'project', x: 87, y: 28 },
      4: { role: 'secondary', parent: 'project', x: 65, y: 25, scale: 0.62 },
      5: { role: 'secondary', parent: 'project', x: 62, y: 23, scale: 0.55, opacity: 0.76 },
    },
  },
  {
    id: 'adr', label: 'ADR', detail: 'DECISION / SUPERSEDED / FOLLOW-UP', introducedAt: 2, kind: 'semantic',
    stage: {
      1: hidden(56, 58),
      2: { role: 'secondary', parent: 'decisions', x: 88, y: 64, scale: 0.78 },
      3: { role: 'secondary', parent: 'decisions', x: 87, y: 47, scale: 0.72 },
      4: { role: 'secondary', parent: 'decisions', x: 65, y: 43, scale: 0.52 },
      5: { role: 'secondary', parent: 'decisions', x: 62, y: 38, scale: 0.48, opacity: 0.62 },
    },
  },
  {
    id: 'taxonomy-snapshot', label: 'DOC TAXONOMY', detail: 'RESPONSIBILITY SEPARATION', introducedAt: 2, kind: 'representation',
    stage: {
      1: hidden(56, 58),
      2: { role: 'secondary', x: 61, y: 79, scale: 0.86, opacity: 0.72, note: 'CURRENT ≠ FUTURE ≠ DECISION' },
      3: { role: 'history', x: 10, y: 42, scale: 0.62, opacity: 0.84, note: 'SEMANTICS PERSIST IN MAP' },
      4: { role: 'history', x: 10, y: 36, scale: 0.56, opacity: 0.44 },
      5: { role: 'history', x: 10, y: 34, scale: 0.52, opacity: 0.4 },
    },
  },
  {
    id: 'system-map', label: 'SYSTEM MAP', detail: 'SYSTEM FLOW', introducedAt: 3, kind: 'semantic',
    stage: {
      1: hidden(61, 60), 2: hidden(61, 60),
      3: { role: 'primary', parent: 'architecture', x: 36, y: 61 },
      4: { role: 'secondary', parent: 'architecture', x: 35, y: 45, scale: 0.56 },
      5: { role: 'secondary', parent: 'architecture', x: 36, y: 37, scale: 0.54, opacity: 0.62 },
    },
  },
  {
    id: 'domain-erd', label: 'DOMAIN ERD', detail: 'DOMAIN RELATIONS', introducedAt: 3, kind: 'semantic',
    stage: {
      1: hidden(61, 60), 2: hidden(61, 60),
      3: { role: 'primary', parent: 'system-map', x: 57, y: 61 },
      4: { role: 'secondary', parent: 'system-map', x: 43, y: 45, scale: 0.56 },
      5: { role: 'secondary', parent: 'system-map', x: 42, y: 37, scale: 0.54, opacity: 0.62 },
    },
  },
  {
    id: 'physical-erd', label: 'PHYSICAL ERD', detail: 'COLUMNS / CONSTRAINTS / INDEXES', introducedAt: 3, kind: 'semantic',
    stage: {
      1: hidden(61, 60), 2: hidden(61, 60),
      3: { role: 'primary', parent: 'domain-erd', x: 78, y: 61 },
      4: { role: 'secondary', parent: 'domain-erd', x: 51, y: 45, scale: 0.56 },
      5: { role: 'secondary', parent: 'domain-erd', x: 48, y: 37, scale: 0.54, opacity: 0.62 },
    },
  },
  {
    id: 'likec4', label: 'LIKEC4', detail: 'SYSTEM / CONTAINER / COMPONENT', introducedAt: 3, kind: 'semantic',
    stage: {
      1: hidden(73, 78), 2: hidden(73, 78),
      3: { role: 'secondary', parent: 'architecture', x: 82, y: 83, scale: 0.82, note: 'SATELLITE VIEW' },
      4: { role: 'secondary', parent: 'architecture', x: 43, y: 62, scale: 0.52 },
      5: { role: 'secondary', parent: 'architecture', x: 42, y: 48, scale: 0.52, opacity: 0.58 },
    },
  },
  {
    id: 'db-map-snapshot', label: 'MULTI-LEVEL DB MAP', detail: 'RESOLUTION DEPTH', introducedAt: 3, kind: 'representation',
    stage: {
      1: hidden(61, 75), 2: hidden(61, 75),
      3: { role: 'micro', x: 61, y: 78, scale: 0.72, opacity: 0.7, note: 'ONE MAP COULD NOT ANSWER EVERY QUESTION' },
      4: { role: 'history', x: 10, y: 57, scale: 0.54, opacity: 0.82, note: 'DEPTH MODEL PERSISTS' },
      5: { role: 'history', x: 10, y: 53, scale: 0.5, opacity: 0.42 },
    },
  },
  {
    id: 'operations', label: 'OPERATIONS', detail: 'RUN / RECOVER / RESPOND', introducedAt: 4, kind: 'semantic',
    stage: {
      1: hidden(78, 25), 2: hidden(78, 25), 3: hidden(78, 25),
      4: { role: 'primary', parent: 'project', x: 76, y: 25, scale: 0.82 },
      5: { role: 'primary', parent: 'project', x: 73, y: 23, scale: 0.7, opacity: 0.82 },
    },
  },
  {
    id: 'readme', label: 'README', detail: 'START HERE', introducedAt: 4, kind: 'semantic',
    stage: {
      1: hidden(76, 65), 2: hidden(76, 65), 3: hidden(76, 65),
      4: { role: 'micro', parent: 'operations', x: 76, y: 64, scale: 0.54, opacity: 0.82 },
      5: { role: 'micro', parent: 'operations', x: 73, y: 51, scale: 0.48, opacity: 0.58 },
    },
  },
  ...['DEPLOYMENT', 'RECOVERY', 'KNOWN ISSUES'].map((label, index): EvolutionNode => ({
    id: ['deployment', 'recovery', 'known-issues'][index], label, introducedAt: 4, kind: 'semantic',
    stage: {
      1: hidden(75 + index * 6, 48), 2: hidden(75 + index * 6, 48), 3: hidden(75 + index * 6, 48),
      4: { role: 'secondary', parent: 'operations', x: 69 + index * 7, y: 45, scale: 0.48 },
      5: { role: 'secondary', parent: 'operations', x: 67 + index * 5, y: 37, scale: 0.5, opacity: 0.6 },
    },
  })),
  {
    id: 'code-level', label: 'CODE LEVEL', detail: 'WHERE IS IT IN CODE?', introducedAt: 4, kind: 'semantic',
    stage: {
      1: hidden(91, 25), 2: hidden(91, 25), 3: hidden(91, 25),
      4: { role: 'primary', parent: 'project', x: 91, y: 25, scale: 0.82 },
      5: { role: 'primary', parent: 'project', x: 90, y: 23, scale: 0.7, opacity: 0.82 },
    },
  },
  {
    id: 'codemap', label: 'CODEMAP', detail: 'ROLE / ENTRYPOINT / TEST / DEPENDENCY', introducedAt: 4, kind: 'semantic',
    stage: {
      1: hidden(91, 48), 2: hidden(91, 48), 3: hidden(91, 48),
      4: { role: 'secondary', parent: 'code-level', x: 91, y: 48, scale: 0.64 },
      5: { role: 'secondary', parent: 'code-level', x: 89, y: 38, scale: 0.58, opacity: 0.68 },
    },
  },
  {
    id: 'codemap-metadata', label: 'HTML / JSON / LOCK', detail: 'ROLE / ENTRYPOINT / TEST / CONSTRAINT / EVIDENCE', introducedAt: 4, kind: 'representation',
    stage: {
      1: hidden(88, 74), 2: hidden(88, 74), 3: hidden(88, 74),
      4: { role: 'micro', parent: 'codemap', x: 89, y: 70, scale: 0.56, opacity: 0.72 },
      5: { role: 'micro', parent: 'codemap', x: 84, y: 54, scale: 0.58, opacity: 0.88, label: 'LOCK', detail: 'REVISION / GENERATED TIME / SCAN SCOPE / FINGERPRINT', note: 'FRESHNESS CONTRACT' },
    },
  },
  {
    id: 'production-snapshot', label: 'PRODUCTION SNAPSHOT', detail: 'LOCAL ASSUMPTION → ACTUAL SCHEMA', introducedAt: 4, kind: 'representation',
    stage: {
      1: hidden(63, 75), 2: hidden(63, 75), 3: hidden(63, 75),
      4: { role: 'micro', parent: 'physical-erd', x: 54, y: 68, scale: 0.56, opacity: 0.78 },
      5: { role: 'micro', parent: 'physical-erd', x: 53, y: 49, scale: 0.5, opacity: 0.52 },
    },
  },
  {
    id: 'change', label: 'CHANGE', detail: 'BOUNDARY / ROUTE / DEPENDENCY / SCHEMA / QUEUE / DATA FLOW', introducedAt: 5, kind: 'flow',
    stage: { 1: hidden(38, 77), 2: hidden(38, 77), 3: hidden(38, 77), 4: hidden(38, 77), 5: { role: 'primary', x: 36, y: 76, note: 'TRIGGER' } },
  },
  {
    id: 'context', label: 'CONTEXT', detail: 'ARCHITECTURE / DOMAIN DOCS / CODEMAP', introducedAt: 5, kind: 'flow',
    stage: { 1: hidden(61, 77), 2: hidden(61, 77), 3: hidden(61, 77), 4: hidden(61, 77), 5: { role: 'primary', parent: 'change', x: 61, y: 76, note: 'UPDATE' } },
  },
  {
    id: 'verify', label: 'VERIFY', detail: 'CODE / TEST / ACTUAL SYSTEM STATE', introducedAt: 5, kind: 'flow',
    stage: { 1: hidden(86, 77), 2: hidden(86, 77), 3: hidden(86, 77), 4: hidden(86, 77), 5: { role: 'primary', parent: 'context', x: 86, y: 76, note: 'GROUND TRUTH' } },
  },
] as const

export const evolutionHistory: readonly EvolutionHistoryEntry[] = [
  { nodeId: 'initial-erd', date: '06.18', label: 'INITIAL ERD', visibleFrom: 2 },
  { nodeId: 'taxonomy-snapshot', date: '07.13', label: 'DOC TAXONOMY', visibleFrom: 3 },
  { nodeId: 'db-map-snapshot', date: '07.23', label: 'MULTI-LEVEL DB MAP', visibleFrom: 4 },
] as const

export const evolutionTransitionContracts: readonly EvolutionTransitionContract[] = [
  {
    from: 1, to: 2,
    persists: [],
    moves: ['initial-erd'],
    shrinks: ['initial-erd'],
    exitsToHistory: ['initial-erd'],
    newNodes: ['project', 'current', 'architecture', 'roadmap', 'decisions', 'adr', 'taxonomy-snapshot'],
  },
  {
    from: 2, to: 3,
    persists: ['project', 'current', 'architecture', 'roadmap', 'decisions', 'adr'],
    moves: ['project', 'current', 'architecture', 'roadmap', 'decisions', 'adr'],
    shrinks: ['current', 'roadmap', 'decisions', 'adr', 'taxonomy-snapshot'],
    exitsToHistory: ['taxonomy-snapshot'],
    newNodes: ['system-map', 'domain-erd', 'physical-erd', 'likec4', 'db-map-snapshot'],
  },
  {
    from: 3, to: 4,
    persists: ['project', 'current', 'architecture', 'roadmap', 'decisions', 'adr', 'system-map', 'domain-erd', 'physical-erd', 'likec4'],
    moves: ['project', 'architecture', 'system-map', 'domain-erd', 'physical-erd', 'likec4'],
    shrinks: ['current', 'roadmap', 'decisions', 'adr', 'system-map', 'domain-erd', 'physical-erd', 'likec4', 'db-map-snapshot'],
    exitsToHistory: ['db-map-snapshot'],
    newNodes: ['operations', 'readme', 'deployment', 'recovery', 'known-issues', 'code-level', 'codemap', 'codemap-metadata', 'production-snapshot'],
  },
  {
    from: 4, to: 5,
    persists: ['project', 'current', 'architecture', 'roadmap', 'decisions', 'adr', 'system-map', 'domain-erd', 'physical-erd', 'likec4', 'operations', 'readme', 'deployment', 'recovery', 'known-issues', 'code-level', 'codemap', 'codemap-metadata'],
    moves: ['project', 'architecture', 'operations', 'readme', 'code-level', 'codemap-metadata'],
    shrinks: ['current', 'architecture', 'roadmap', 'decisions', 'system-map', 'domain-erd', 'physical-erd', 'likec4', 'operations', 'readme', 'code-level', 'codemap'],
    exitsToHistory: [],
    newNodes: ['change', 'context', 'verify'],
  },
] as const

export function getEvolutionStageState(node: EvolutionNode, stage: EvolutionStageNumber) {
  return node.stage[stage] ?? hidden(50, 50)
}
