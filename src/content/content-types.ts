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
    readonly available: false
  }
}
