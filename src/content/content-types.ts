export type ContentLane = 'what-i-built' | 'how-i-build'

export interface HomeTrackItem {
  readonly id: string
  readonly name: string
  readonly href?: string
}

export interface HomeTrackContent {
  readonly id: ContentLane
  readonly lane: ContentLane
  readonly index: string
  readonly label: string
  readonly href?: string
  readonly coverTitleLines: readonly string[]
  readonly seamTitle: string
  readonly descriptors: readonly string[]
  readonly items: readonly HomeTrackItem[]
}

export interface HomePageContent {
  readonly tracks: readonly HomeTrackContent[]
}

export type WhatFeatureGroupId =
  | 'workflow'
  | 'evidence'
  | 'ai-knowledge'
  | 'platform'

export interface WhatFeatureItem {
  readonly id: string
  readonly name: string
  readonly href: string
  readonly mobileLane: 1 | 2
}

export interface WhatFeatureGroup {
  readonly id: WhatFeatureGroupId
  readonly features: readonly WhatFeatureItem[]
}

export interface PublicFixtureBoundary {
  readonly dataOrigin: 'independently-authored-synthetic'
  readonly privateSourceRuntimeDependency: false
  readonly containsRealIdentifiers: false
  readonly oneToOneInternalMapping: false
}

export interface PublicFixtureMeta {
  readonly id: string
  readonly version: string
  readonly productName: string
  readonly organizationName: string
  readonly classification: 'synthetic-public-demo'
  readonly locale: 'ko-KR' | 'en-US'
  readonly disclosure: string
  readonly boundary: PublicFixtureBoundary
}

export interface PublicFixtureProject {
  readonly id: string
  readonly name: string
  readonly description: string
}

export interface PublicFixtureFeature {
  readonly id: string
  readonly projectId: PublicFixtureProject['id']
  readonly name: string
  readonly summary: string
}

export interface PublicProductFixture {
  readonly meta: PublicFixtureMeta
  readonly projects: readonly PublicFixtureProject[]
  readonly features: readonly PublicFixtureFeature[]
}

export type DocumentationKnowledgeNodeId =
  | 'project'
  | 'current'
  | 'decisions'
  | 'architecture'
  | 'data'
  | 'api'
  | 'adr'
  | 'deployment'
  | 'recovery'
  | 'known-issues'
  | 'codemap'

export type DocumentationKnowledgeKind =
  | 'root'
  | 'current'
  | 'decision'
  | 'operation'
  | 'code'

export interface DocumentationKnowledgeNode {
  readonly id: DocumentationKnowledgeNodeId
  readonly parentId?: DocumentationKnowledgeNodeId
  readonly index: string
  readonly label: string
  readonly question: string
  readonly authority: string
  readonly updateWhen: string
  readonly kind: DocumentationKnowledgeKind
}

export interface DocumentationKnowledgeEdge {
  readonly id: string
  readonly from: DocumentationKnowledgeNodeId
  readonly to: DocumentationKnowledgeNodeId
  readonly relation:
    | 'entry point'
    | 'current context'
    | 'decision record'
    | 'operational context'
    | 'code-level index'
}

export interface DocumentationTaxonomyRule {
  readonly statement: string
  readonly items: readonly {
    readonly label: string
    readonly responsibility: string
  }[]
}

export interface DocumentationArtifactEvidence {
  readonly label: string
  readonly statement: string
  readonly items?: readonly string[]
  readonly sequence?: readonly string[]
}

export interface DocumentationArtifact {
  readonly id: string
  readonly index: string
  readonly title: string
  readonly responsibility: string
  readonly summary: string
  readonly why: string
  readonly audience: readonly string[]
  readonly boundary: string
  readonly maintenance: string
  readonly evidence: readonly DocumentationArtifactEvidence[]
  readonly excerpt: readonly string[]
  readonly href?: string
}

export interface DocumentationEvolutionBoundaryVisual {
  readonly kind: 'boundary'
  readonly boundaries: readonly {
    readonly label: string
    readonly responsibility: string
  }[]
  readonly artifact: string
  readonly status: string
}

export interface DocumentationEvolutionTaxonomyVisual {
  readonly kind: 'taxonomy'
  readonly responsibilities: readonly {
    readonly label: string
    readonly answer: string
    readonly detail?: string
  }[]
}

export interface DocumentationEvolutionLevelsVisual {
  readonly kind: 'levels'
  readonly tracks: readonly {
    readonly label: string
    readonly question: string
    readonly levels: readonly string[]
  }[]
}

export interface DocumentationEvolutionOperationsVisual {
  readonly kind: 'operations'
  readonly entryPath: readonly string[]
  readonly groundTruth: {
    readonly from: string
    readonly to: string
    readonly checks: readonly string[]
  }
  readonly codemap: readonly {
    readonly label: string
    readonly responsibility: string
  }[]
}

export interface DocumentationEvolutionStalenessVisual {
  readonly kind: 'staleness'
  readonly backlog: readonly string[]
  readonly triggers: readonly string[]
  readonly context: readonly string[]
}

export type DocumentationEvolutionVisual =
  | DocumentationEvolutionBoundaryVisual
  | DocumentationEvolutionTaxonomyVisual
  | DocumentationEvolutionLevelsVisual
  | DocumentationEvolutionOperationsVisual
  | DocumentationEvolutionStalenessVisual

export interface DocumentationEvolutionScene {
  readonly id: string
  readonly index: string
  readonly time: string
  readonly title: string
  readonly pressureLines: readonly string[]
  readonly takeaway: string
  readonly change: string
  readonly evidence: {
    readonly label: string
    readonly statement: string
  }
  readonly boundary?: string
  readonly accessibleVisualSummary: string
  readonly visual: DocumentationEvolutionVisual
}

export interface DocumentationMaintenanceFlowStep {
  readonly label: string
  readonly items: readonly string[]
}

export interface DocumentationSystemContent {
  readonly meta: {
    readonly id: string
    readonly classification: 'reconstructed-public-example'
    readonly disclosure: string
    readonly boundary: PublicFixtureBoundary
  }
  readonly hero: {
    readonly eyebrow: string
    readonly titleLines: readonly string[]
    readonly supportingLabel: string
    readonly thesis: string
    readonly summary: string
    readonly scope: {
      readonly eyebrow: string
      readonly statement: string
      readonly boundary: string
      readonly artifacts: readonly string[]
    }
  }
  readonly knowledgeMap: {
    readonly title: string
    readonly accessibleSummary: string
    readonly nodes: readonly DocumentationKnowledgeNode[]
    readonly edges: readonly DocumentationKnowledgeEdge[]
    readonly taxonomy: DocumentationTaxonomyRule
  }
  readonly artifacts: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly primaryItems: readonly DocumentationArtifact[]
    readonly libraryItems: readonly DocumentationArtifact[]
  }
  readonly evolution: {
    readonly eyebrow: string
    readonly headline: readonly string[]
    readonly introduction: string
    readonly takeaway: string
    readonly scenes: readonly DocumentationEvolutionScene[]
    readonly currentRule: {
      readonly eyebrow: string
      readonly title: string
      readonly statement: string
      readonly flow: readonly DocumentationMaintenanceFlowStep[]
    }
  }
  readonly principle: {
    readonly statement: string
    readonly boundary: readonly string[]
    readonly claimBoundary: string
    readonly notVerified: readonly string[]
  }
  readonly nextPage: {
    readonly eyebrow: string
    readonly title: string
    readonly summary: string
    readonly href: string
    readonly available: boolean
  }
}

export type PublicCodemapNodeId =
  | 'workspace'
  | 'interface'
  | 'access'
  | 'service'
  | 'store'

export interface PublicCodemapNode {
  readonly id: PublicCodemapNodeId
  readonly index: string
  readonly label: string
  readonly kind: string
  readonly role: string
  readonly callers: readonly string[]
  readonly dependencies: readonly string[]
  readonly tests: readonly string[]
  readonly evidence: readonly string[]
}

export interface PublicCodemapFlow {
  readonly id: string
  readonly label: string
  readonly trigger: string
  readonly outcome: string
  readonly steps: readonly PublicCodemapNodeId[]
}

export interface PublicCodemapContent {
  readonly meta: {
    readonly classification: 'reconstructed-public-example'
    readonly owner: 'Documentation System'
    readonly disclosure: string
  }
  readonly hero: {
    readonly eyebrow: string
    readonly titleLines: readonly string[]
    readonly thesis: string
    readonly summary: string
  }
  readonly freshness: {
    readonly state: 'FRESH'
    readonly reviewedAt: string
    readonly scope: string
    readonly rule: string
  }
  readonly nodes: readonly PublicCodemapNode[]
  readonly flows: readonly PublicCodemapFlow[]
  readonly contract: readonly {
    readonly format: 'HTML' | 'JSON' | 'LOCK'
    readonly audience: string
    readonly responsibility: string
  }[]
  readonly boundary: readonly string[]
}

export type AiNativeWorkflowState =
  | 'context'
  | 'candidate'
  | 'evidence'
  | 'decision'
  | 'canonical'

export interface AiNativeWorkflowStep {
  readonly id: string
  readonly label: string
  readonly summary: string
  readonly action: string
  readonly proof: string
  readonly exitRule: string
  readonly codemapUse?: string
  readonly state: AiNativeWorkflowState
}

export interface AiNativeEngineeringContent {
  readonly meta: {
    readonly classification: 'reconstructed-public-example'
    readonly disclosure: string
    readonly boundary: PublicFixtureBoundary
  }
  readonly hero: {
    readonly eyebrow: string
    readonly titleLines: readonly string[]
    readonly thesis: string
    readonly summary: string
    readonly manifest: {
      readonly eyebrow: string
      readonly title: string
      readonly items: readonly {
        readonly index: string
        readonly label: string
        readonly title: string
        readonly description: string
        readonly signals: readonly string[]
      }[]
      readonly statusLabel: string
      readonly status: string
    }
  }
  readonly scene: {
    readonly eyebrow: string
    readonly title: string
    readonly situation: string
    readonly toolRule: string
    readonly stateLegend: readonly {
      readonly state: AiNativeWorkflowState
      readonly label: string
    }[]
    readonly steps: readonly AiNativeWorkflowStep[]
  }
  readonly incident: {
    readonly eyebrow: string
    readonly title: string
    readonly summary: string
    readonly symptom: string
    readonly hypotheses: readonly string[]
    readonly comparison: readonly {
      readonly id: 'working-copy' | 'clean-baseline'
      readonly label: string
      readonly state: string
      readonly observation: string
    }[]
    readonly evidence: string
    readonly decision: string
    readonly rule: readonly string[]
  }
  readonly artifacts: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly items: readonly {
      readonly index: string
      readonly label: string
      readonly title: string
      readonly question: string
      readonly responsibility: string
      readonly maintenance: string
      readonly fields?: readonly string[]
      readonly href?: string
    }[]
  }
  readonly principle: {
    readonly eyebrow: string
    readonly statement: string
    readonly explanation: string
    readonly maintenanceRule: {
      readonly label: string
      readonly statement: string
      readonly detail: string
    }
    readonly boundary: readonly string[]
    readonly appliedIn: string
  }
}

export interface TechnicalWritingAnnotation {
  readonly marker: string
  readonly label: string
  readonly title: string
  readonly body: string
}

export interface TechnicalWritingReaderGuide {
  readonly id: 'writer' | 'viewer'
  readonly index: string
  readonly label: string
  readonly role: string
  readonly purpose: string
  readonly permission: string
  readonly steps: readonly {
    readonly index: string
    readonly action: string
    readonly detail: string
    readonly annotation?: TechnicalWritingAnnotation
  }[]
  readonly handoff: string
}

export interface TechnicalWritingContent {
  readonly meta: {
    readonly classification: 'reconstructed-public-example'
    readonly disclosure: string
    readonly boundary: PublicFixtureBoundary
  }
  readonly hero: {
    readonly eyebrow: string
    readonly titleLines: readonly string[]
    readonly thesis: readonly string[]
    readonly coordinates: readonly {
      readonly label: string
      readonly value: string
    }[]
  }
  readonly reader: {
    readonly eyebrow: string
    readonly title: string
    readonly question: string
    readonly commonContext: string
    readonly decision: string
    readonly guides: readonly TechnicalWritingReaderGuide[]
    readonly actionStructure: readonly string[]
    readonly evolution: {
      readonly before: {
        readonly label: string
        readonly title: string
        readonly description: string
      }
      readonly pressure: {
        readonly label: string
        readonly title: string
        readonly items: readonly string[]
      }
      readonly after: {
        readonly label: string
        readonly title: string
        readonly description: string
      }
      readonly takeaway: string
    }
  }
  readonly implementation: {
    readonly eyebrow: string
    readonly title: string
    readonly summary: string
    readonly artifact: {
      readonly label: string
      readonly title: string
      readonly method: string
      readonly path: string
      readonly purpose: string
      readonly authorization: string
      readonly request: readonly {
        readonly field: string
        readonly type: string
        readonly required: string
        readonly description: string
      }[]
      readonly outcomes: readonly {
        readonly status: string
        readonly changed: string
        readonly meaning: string
      }[]
      readonly behavior: string
      readonly annotation: TechnicalWritingAnnotation
    }
    readonly notes: readonly {
      readonly label: string
      readonly value: string
    }[]
    readonly notFormalized: readonly string[]
  }
  readonly operations: {
    readonly eyebrow: string
    readonly title: string
    readonly summary: string
    readonly artifacts: readonly {
      readonly label: string
      readonly title: string
      readonly responsibility: string
    }[]
    readonly flow: readonly {
      readonly index: string
      readonly label: string
      readonly title: string
      readonly description: string
      readonly tone: 'observe' | 'act' | 'stop'
    }[]
    readonly verification: readonly {
      readonly signal: string
      readonly proves: string
      readonly doesNotProve: string
    }[]
    readonly rollbackBoundary: {
      readonly title: string
      readonly statement: string
      readonly stopRule: string
    }
  }
  readonly principles: {
    readonly eyebrow: string
    readonly title: string
    readonly items: readonly {
      readonly index: string
      readonly title: string
      readonly statement: string
      readonly evidence: string
    }[]
  }
  readonly boundary: {
    readonly eyebrow: string
    readonly title: string
    readonly statements: readonly string[]
    readonly notClaimed: readonly string[]
  }
  readonly nextPage: {
    readonly eyebrow: string
    readonly title: string
    readonly summary: string
    readonly href: string
  }
}

export type SecurityOperationsAnnotationId =
  | 'template'
  | 'override'
  | 'effective'
  | 'guard'

export interface SecurityOperationsAnnotation {
  readonly id: SecurityOperationsAnnotationId
  readonly index: string
  readonly label: string
  readonly title: string
  readonly body: string
}

export type SecurityOperationsDeployStepId =
  | 'checks'
  | 'inactive'
  | 'readiness'
  | 'switch'
  | 'smoke'
  | 'worker'
  | 'decision'

export interface SecurityOperationsDeployStep {
  readonly id: SecurityOperationsDeployStepId
  readonly index: string
  readonly label: string
  readonly title: string
  readonly summary: string
  readonly proves: string
  readonly doesNotProve: string
  readonly tone: 'prepare' | 'verify' | 'switch' | 'separate' | 'decision'
}

export interface SecurityOperationsContent {
  readonly meta: {
    readonly classification: 'reconstructed-public-example'
    readonly disclosure: string
    readonly boundary: PublicFixtureBoundary
  }
  readonly hero: {
    readonly eyebrow: string
    readonly titleLines: readonly string[]
    readonly thesis: readonly string[]
    readonly coordinates: readonly {
      readonly label: string
      readonly value: string
    }[]
  }
  readonly authorization: {
    readonly eyebrow: string
    readonly title: string
    readonly question: string
    readonly summary: string
    readonly productLabel: string
    readonly members: readonly {
      readonly id: string
      readonly name: string
      readonly role: string
      readonly state: string
      readonly selected?: boolean
    }[]
    readonly templates: readonly {
      readonly id: string
      readonly title: string
      readonly description: string
      readonly selected?: boolean
    }[]
    readonly delegated: readonly {
      readonly label: string
      readonly description: string
      readonly enabled: boolean
    }[]
    readonly permissionRows: readonly {
      readonly group: string
      readonly resource: string
      readonly view: 'base' | 'grant' | 'revoke' | 'none'
      readonly edit: 'base' | 'grant' | 'revoke' | 'none'
      readonly manage: 'base' | 'grant' | 'revoke' | 'none'
    }[]
    readonly annotations: readonly SecurityOperationsAnnotation[]
    readonly formula: readonly {
      readonly label: string
      readonly value: string
      readonly tone: 'base' | 'grant' | 'revoke' | 'effective'
    }[]
    readonly evolution: readonly {
      readonly index: string
      readonly label: string
      readonly title: string
      readonly summary: string
      readonly state: 'historical' | 'transition' | 'current'
    }[]
    readonly takeaway: string
  }
  readonly security: {
    readonly eyebrow: string
    readonly title: string
    readonly summary: string
    readonly decisions: readonly {
      readonly index: string
      readonly risk: string
      readonly decision: string
      readonly boundary: string
      readonly evidence: string
    }[]
    readonly currentRule: string
  }
  readonly deployment: {
    readonly eyebrow: string
    readonly title: string
    readonly summary: string
    readonly steps: readonly SecurityOperationsDeployStep[]
    readonly components: readonly {
      readonly label: string
      readonly mode: string
      readonly boundary: string
      readonly state: 'switchable' | 'separate' | 'shared'
    }[]
  }
  readonly recovery: {
    readonly eyebrow: string
    readonly title: string
    readonly summary: string
    readonly flow: readonly {
      readonly index: string
      readonly label: string
      readonly title: string
      readonly detail: string
      readonly state: 'failure' | 'automatic' | 'terminal' | 'human'
    }[]
    readonly modes: readonly {
      readonly label: 'AUTOMATED' | 'ASSISTED' | 'MANUAL / NOT VERIFIED'
      readonly title: string
      readonly items: readonly string[]
    }[]
    readonly knownBoundary: readonly string[]
  }
  readonly boundary: {
    readonly eyebrow: string
    readonly title: string
    readonly summary: string
    readonly built: readonly string[]
    readonly notClaimed: readonly string[]
    readonly maintenanceRule: string
  }
  readonly nextPage: {
    readonly eyebrow: string
    readonly title: string
    readonly summary: string
    readonly href: string
  }
}
