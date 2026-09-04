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

export interface PublicFixturePerson {
  readonly id: string
  readonly name: string
  readonly role: string
  readonly initials: string
}

export interface PublicProductFixture {
  readonly meta: PublicFixtureMeta
  readonly projects: readonly PublicFixtureProject[]
  readonly features: readonly PublicFixtureFeature[]
  readonly people: readonly PublicFixturePerson[]
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

export type FeatureValidationHotspotId =
  | 'requirement'
  | 'evidence'
  | 'ai-assessment'
  | 'unknown'
  | 'human-review'

export interface ProductEditorialSection {
  readonly label: 'WHY' | 'DECISION' | 'BOUNDARY' | 'EVIDENCE'
  readonly body: string
}

export interface ProductEditorialAnnotation<Id extends string = string> {
  readonly id: Id
  readonly index: string
  readonly label: string
  readonly title: string
  readonly sections: readonly ProductEditorialSection[]
  readonly evolution?: {
    readonly label: string
    readonly date: string
  }
}

export interface ProductWorkflowStep<Id extends string = string> {
  readonly id: string
  readonly hotspotId: Id
  readonly index: string
  readonly label: string
  readonly summary: string
}

export type FeatureValidationRequirementState =
  | 'confirmed'
  | 'linked'
  | 'unknown'

export interface FeatureValidationEvidenceFixture {
  readonly eyebrow: string
  readonly title: string
  readonly summary: string
  readonly tokens: readonly string[]
  readonly companion?: {
    readonly eyebrow: string
    readonly body: string
  }
}

export interface FeatureValidationRequirementFixture {
  readonly id: string
  readonly statement: string
  readonly sourceLabel: string
  readonly state: FeatureValidationRequirementState
  readonly statusLabel: string
  readonly statementHotspotId?: FeatureValidationHotspotId
  readonly evidenceHotspotId: FeatureValidationHotspotId
  readonly evidence: FeatureValidationEvidenceFixture
  readonly signal: string
  readonly reviewer?: {
    readonly initials: string
    readonly name: string
    readonly note: string
    readonly time: string
  }
}

export interface FeatureValidationProductFixture {
  readonly productName: string
  readonly workspaceLabel: string
  readonly project: {
    readonly id: string
    readonly name: string
  }
  readonly reviewer: PublicFixturePerson
  readonly featureList: readonly {
    readonly id: string
    readonly name: string
    readonly meta: string
    readonly status: string
    readonly tone: 'confirmed' | 'linked' | 'unknown'
  }[]
  readonly selectedFeature: {
    readonly name: string
    readonly summary: string
    readonly status: string
    readonly lastReviewed: string
    readonly requirements: readonly FeatureValidationRequirementFixture[]
    readonly unlinkedCandidate: {
      readonly title: string
      readonly label: string
      readonly summary: string
      readonly tokens: readonly string[]
    }
  }
}

export interface FeatureValidationPageContent {
  readonly meta: {
    readonly classification: 'reconstructed-public-example'
    readonly disclosure: string
    readonly currentStatus: 'partial'
    readonly boundary: PublicFixtureBoundary
  }
  readonly hero: {
    readonly eyebrow: string
    readonly titleLines: readonly string[]
    readonly thesis: string
    readonly summary: string
    readonly problemLabel: string
    readonly problem: string
  }
  readonly inspection: {
    readonly eyebrow: string
    readonly title: string
    readonly instruction: string
    readonly defaultAnnotation: {
      readonly index: string
      readonly label: string
      readonly title: string
      readonly body: string
    }
  }
  readonly product: FeatureValidationProductFixture
  readonly annotations: readonly ProductEditorialAnnotation<FeatureValidationHotspotId>[]
  readonly workflow: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly steps: readonly ProductWorkflowStep<FeatureValidationHotspotId>[]
    readonly boundary: string
  }
  readonly decisions: {
    readonly eyebrow: string
    readonly items: readonly {
      readonly statement: string
      readonly explanation: string
    }[]
  }
  readonly evolution: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly scenes: readonly {
      readonly date: string
      readonly label: string
      readonly visual: 'read-only' | 'unknown' | 'human-link' | 'review-ui'
      readonly decision: string
      readonly trigger: string
      readonly change: string
    }[]
  }
  readonly evidence: {
    readonly eyebrow: string
    readonly title: string
    readonly snapshot: string
    readonly items: readonly {
      readonly value: string
      readonly label: string
      readonly meaning: string
      readonly boundary: string
    }[]
  }
  readonly implementationStatus: {
    readonly implemented: {
      readonly label: string
      readonly phase: string
      readonly items: readonly string[]
    }
    readonly remaining: {
      readonly label: string
      readonly phase: string
      readonly items: readonly string[]
    }
    readonly runtime: string
  }
  readonly boundary: {
    readonly eyebrow: string
    readonly statement: string
    readonly items: readonly string[]
  }
  readonly relatedSystems: readonly {
    readonly title: string
    readonly relation: string
    readonly href?: string
    readonly status: 'available' | 'in-development'
  }[]
}

export type AiCandidateReviewHotspotId =
  | 'review-queue'
  | 'source-provenance'
  | 'editable-draft'
  | 'human-decision'
  | 'trust-boundary'

export interface AiCandidateReviewProductFixture {
  readonly productName: string
  readonly workspaceLabel: string
  readonly reviewer: PublicFixturePerson
  readonly author: PublicFixturePerson
  readonly project: PublicFixtureProject
  readonly filters: readonly string[]
  readonly queue: readonly {
    readonly id: string
    readonly category: string
    readonly title: string
    readonly source: string
    readonly age: string
    readonly state: 'selected' | 'waiting' | 'recent'
  }[]
  readonly selectedCandidate: {
    readonly id: string
    readonly category: string
    readonly title: string
    readonly risk: string
    readonly createdAt: string
    readonly source: {
      readonly type: string
      readonly author: string
      readonly context: string
      readonly excerpt: string
    }
    readonly draft: {
      readonly title: string
      readonly body: string
      readonly project: string
      readonly category: string
      readonly risk: string
    }
    readonly duplicateCheck: {
      readonly label: string
      readonly result: string
    }
    readonly destination: string
  }
  readonly recentDecision: {
    readonly title: string
    readonly decision: string
    readonly reviewer: string
  }
}

export interface AiCandidateReviewPageContent {
  readonly meta: {
    readonly classification: 'reconstructed-public-example'
    readonly disclosure: string
    readonly currentStatus: 'implemented-and-active'
    readonly boundary: PublicFixtureBoundary
  }
  readonly hero: {
    readonly eyebrow: string
    readonly titleLines: readonly string[]
    readonly thesis: string
    readonly summary: string
    readonly problemLabel: string
    readonly problem: string
  }
  readonly inspection: {
    readonly eyebrow: string
    readonly title: string
    readonly instruction: string
    readonly defaultAnnotation: {
      readonly index: string
      readonly label: string
      readonly title: string
      readonly body: string
    }
  }
  readonly product: AiCandidateReviewProductFixture
  readonly annotations: readonly ProductEditorialAnnotation<AiCandidateReviewHotspotId>[]
  readonly workflow: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly steps: readonly ProductWorkflowStep<AiCandidateReviewHotspotId>[]
    readonly boundary: string
  }
  readonly rules: {
    readonly eyebrow: string
    readonly items: readonly {
      readonly statement: string
      readonly explanation: string
    }[]
  }
  readonly evolution: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly scenes: readonly {
      readonly date: string
      readonly label: string
      readonly visual:
        | 'inline-card'
        | 'target-source'
        | 'multi-source'
        | 'knowledge-gate'
        | 'registry'
      readonly decision: string
      readonly trigger: string
      readonly change: string
      readonly currentEffect: string
    }[]
  }
  readonly evidence: {
    readonly eyebrow: string
    readonly title: string
    readonly snapshot: string
    readonly items: readonly {
      readonly value: string
      readonly label: string
      readonly meaning: string
      readonly boundary: string
    }[]
  }
  readonly implementationStatus: {
    readonly state: string
    readonly items: readonly string[]
    readonly runtime: string
  }
  readonly boundary: {
    readonly eyebrow: string
    readonly statement: string
    readonly items: readonly string[]
  }
  readonly relatedSystems: readonly {
    readonly title: string
    readonly relation: string
    readonly href?: string
    readonly status: 'available' | 'in-development'
  }[]
}

export type ProjectSettingHotspotId =
  | 'stable-identity'
  | 'existing-row'
  | 'shared-order'
  | 'archive-provenance'
  | 'restore-guard'

export interface ProjectSettingProductFixture {
  readonly productName: string
  readonly workspaceLabel: string
  readonly administrator: PublicFixturePerson
  readonly registration: {
    readonly codePlaceholder: string
    readonly labelPlaceholder: string
    readonly resolutionHint: string
  }
  readonly trackedProjects: readonly {
    readonly order: number
    readonly code: string
    readonly label: string
    readonly scheduleCount: number
    readonly pendingCount: number
  }[]
  readonly archivedProject: {
    readonly code: string
    readonly label: string
    readonly archivedAt: string
    readonly archiveEvent: string
    readonly dependencyState: string
  }
}

export interface ProjectSettingPageContent {
  readonly meta: {
    readonly classification: 'reconstructed-public-example'
    readonly disclosure: string
    readonly currentStatus: 'implemented-and-active'
    readonly boundary: PublicFixtureBoundary
  }
  readonly hero: {
    readonly eyebrow: string
    readonly titleLines: readonly string[]
    readonly thesis: string
    readonly summary: string
    readonly problemLabel: string
    readonly problem: string
  }
  readonly inspection: {
    readonly eyebrow: string
    readonly title: string
    readonly instruction: string
    readonly defaultAnnotation: {
      readonly index: string
      readonly label: string
      readonly title: string
      readonly body: string
    }
  }
  readonly product: ProjectSettingProductFixture
  readonly annotations: readonly ProductEditorialAnnotation<ProjectSettingHotspotId>[]
  readonly workflow: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly steps: readonly ProductWorkflowStep<ProjectSettingHotspotId>[]
    readonly boundary: string
  }
  readonly rules: {
    readonly eyebrow: string
    readonly title: string
    readonly items: readonly {
      readonly statement: string
      readonly explanation: string
    }[]
  }
  readonly evolution: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly scenes: readonly {
      readonly date: string
      readonly label: string
      readonly visual: 'separate' | 'registry' | 'consumers' | 'provenance'
      readonly decision: string
      readonly trigger: string
      readonly change: string
      readonly currentEffect: string
    }[]
  }
  readonly evidence: {
    readonly eyebrow: string
    readonly title: string
    readonly snapshot: string
    readonly items: readonly {
      readonly value: string
      readonly label: string
      readonly meaning: string
      readonly boundary: string
    }[]
  }
  readonly implementationStatus: {
    readonly state: string
    readonly items: readonly string[]
    readonly runtime: string
  }
  readonly boundary: {
    readonly eyebrow: string
    readonly statement: string
    readonly items: readonly string[]
  }
  readonly relatedSystems: readonly {
    readonly title: string
    readonly relation: string
    readonly href?: string
    readonly status: 'available' | 'in-development'
  }[]
}

export type WorklogReviewHotspotId =
  | 'source-continuity'
  | 'structured-draft'
  | 'ambiguity-level'
  | 'human-correction'
  | 'report-boundary'

export interface WorklogReviewProductFixture {
  readonly productName: string
  readonly workspaceLabel: string
  readonly author: PublicFixturePerson
  readonly reviewer: PublicFixturePerson
  readonly project: PublicFixtureProject
  readonly queue: readonly {
    readonly id: string
    readonly title: string
    readonly project: string
    readonly date: string
    readonly state: 'selected' | 'waiting'
  }[]
  readonly source: {
    readonly type: string
    readonly date: string
    readonly message: string
  }
  readonly draft: {
    readonly work: string
    readonly result: string
    readonly ambiguity: string
    readonly reviewQuestion: string
  }
  readonly corrected: {
    readonly result: string
    readonly nextCheck: string
    readonly reviewedAt: string
  }
  readonly fallback: {
    readonly condition: string
    readonly label: string
  }
}

export interface WorklogReviewPageContent {
  readonly meta: {
    readonly classification: 'reconstructed-public-example'
    readonly disclosure: string
    readonly currentStatus: 'implemented-and-active'
    readonly boundary: PublicFixtureBoundary
  }
  readonly hero: {
    readonly eyebrow: string
    readonly titleLines: readonly string[]
    readonly thesis: string
    readonly summary: string
    readonly problemLabel: string
    readonly problem: string
  }
  readonly inspection: {
    readonly eyebrow: string
    readonly title: string
    readonly instruction: string
    readonly defaultAnnotation: {
      readonly index: string
      readonly label: string
      readonly title: string
      readonly body: string
    }
  }
  readonly product: WorklogReviewProductFixture
  readonly annotations: readonly ProductEditorialAnnotation<WorklogReviewHotspotId>[]
  readonly workflow: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly steps: readonly ProductWorkflowStep<WorklogReviewHotspotId>[]
    readonly boundary: string
  }
  readonly rules: {
    readonly eyebrow: string
    readonly title: string
    readonly items: readonly {
      readonly statement: string
      readonly explanation: string
    }[]
  }
  readonly evolution: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly scenes: readonly {
      readonly date: string
      readonly label: string
      readonly visual: 'review-level' | 'readable-body' | 'fallback' | 'glossary' | 'anomaly'
      readonly decision: string
      readonly trigger: string
      readonly change: string
      readonly currentEffect: string
    }[]
  }
  readonly evidence: {
    readonly eyebrow: string
    readonly title: string
    readonly snapshot: string
    readonly items: readonly {
      readonly value: string
      readonly label: string
      readonly meaning: string
      readonly boundary: string
    }[]
  }
  readonly implementationStatus: {
    readonly state: string
    readonly items: readonly string[]
    readonly runtime: string
  }
  readonly boundary: {
    readonly eyebrow: string
    readonly statement: string
    readonly items: readonly string[]
  }
  readonly relatedSystems: readonly {
    readonly title: string
    readonly relation: string
    readonly href?: string
    readonly status: 'available' | 'in-development'
  }[]
}

export type QaHotspotId =
  | 'test-context'
  | 'human-result'
  | 'attachments'
  | 'revision-history'
  | 'ai-boundary'

export interface QaProductFixture {
  readonly productName: string
  readonly workspaceLabel: string
  readonly author: PublicFixturePerson
  readonly project: PublicFixtureProject
  readonly report: {
    readonly title: string
    readonly date: string
    readonly revision: string
    readonly purpose: string
    readonly environment: readonly string[]
    readonly assessment: string
    readonly resultSummary: readonly {
      readonly label: string
      readonly value: string
    }[]
  }
  readonly testCases: readonly {
    readonly id: string
    readonly title: string
    readonly result: 'PASS' | 'FAIL' | 'HOLD' | 'UNKNOWN'
    readonly precondition: string
    readonly expected: string
    readonly actual: string
    readonly discussion?: string
    readonly attachments: readonly {
      readonly name: string
      readonly type: 'image' | 'video' | 'file'
    }[]
  }[]
  readonly revisions: readonly {
    readonly revision: string
    readonly author: string
    readonly time: string
    readonly change: string
  }[]
}

export interface QaPageContent {
  readonly meta: {
    readonly classification: 'reconstructed-public-example'
    readonly disclosure: string
    readonly currentStatus: 'implemented-and-active'
    readonly boundary: PublicFixtureBoundary
  }
  readonly hero: {
    readonly eyebrow: string
    readonly titleLines: readonly string[]
    readonly thesis: string
    readonly summary: string
    readonly problemLabel: string
    readonly problem: string
  }
  readonly inspection: {
    readonly eyebrow: string
    readonly title: string
    readonly instruction: string
    readonly defaultAnnotation: {
      readonly index: string
      readonly label: string
      readonly title: string
      readonly body: string
    }
  }
  readonly product: QaProductFixture
  readonly annotations: readonly ProductEditorialAnnotation<QaHotspotId>[]
  readonly workflow: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly steps: readonly ProductWorkflowStep<QaHotspotId>[]
    readonly boundary: string
  }
  readonly decisions: {
    readonly eyebrow: string
    readonly title: string
    readonly items: readonly {
      readonly statement: string
      readonly explanation: string
    }[]
  }
  readonly evolution: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly scenes: readonly {
      readonly date: string
      readonly label: string
      readonly visual: 'source-shape' | 'history' | 'role' | 'regenerate' | 'database-source'
      readonly decision: string
      readonly trigger: string
      readonly change: string
      readonly currentEffect: string
    }[]
  }
  readonly evidence: {
    readonly eyebrow: string
    readonly title: string
    readonly snapshot: string
    readonly items: readonly {
      readonly value: string
      readonly label: string
      readonly meaning: string
      readonly boundary: string
    }[]
  }
  readonly implementationStatus: {
    readonly state: string
    readonly items: readonly string[]
    readonly runtime: string
  }
  readonly boundary: {
    readonly eyebrow: string
    readonly statement: string
    readonly items: readonly string[]
  }
  readonly relatedSystems: readonly {
    readonly title: string
    readonly relation: string
    readonly href?: string
    readonly status: 'available' | 'in-development'
  }[]
}

export interface ReusableWhatCaseContent<
  Id extends string,
  Product,
  EvolutionVisual extends string,
> {
  readonly meta: {
    readonly classification: 'reconstructed-public-example'
    readonly disclosure: string
    readonly currentStatus: string
    readonly boundary: PublicFixtureBoundary
  }
  readonly hero: {
    readonly eyebrow: string
    readonly titleLines: readonly string[]
    readonly thesis: string
    readonly summary: string
    readonly problemLabel: string
    readonly problem: string
  }
  readonly inspection: {
    readonly eyebrow: string
    readonly title: string
    readonly instruction: string
    readonly defaultAnnotation: {
      readonly index: string
      readonly label: string
      readonly title: string
      readonly body: string
    }
  }
  readonly product: Product
  readonly annotations: readonly ProductEditorialAnnotation<Id>[]
  readonly workflow: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly steps: readonly ProductWorkflowStep<Id>[]
    readonly boundary: string
  }
  readonly decisions: {
    readonly eyebrow: string
    readonly title: string
    readonly items: readonly {
      readonly statement: string
      readonly explanation: string
    }[]
  }
  readonly evolution?: {
    readonly eyebrow: string
    readonly title: string
    readonly introduction: string
    readonly scenes: readonly {
      readonly date: string
      readonly label: string
      readonly visual: EvolutionVisual
      readonly decision: string
      readonly trigger: string
      readonly change: string
      readonly currentEffect: string
    }[]
  }
  readonly evidence: {
    readonly eyebrow: string
    readonly title: string
    readonly snapshot: string
    readonly items: readonly {
      readonly value: string
      readonly label: string
      readonly meaning: string
      readonly boundary: string
    }[]
  }
  readonly implementationStatus: {
    readonly state: string
    readonly items: readonly string[]
    readonly runtime: string
  }
  readonly boundary: {
    readonly eyebrow: string
    readonly statement: string
    readonly items: readonly string[]
  }
  readonly relatedSystems: readonly {
    readonly title: string
    readonly relation: string
    readonly href?: string
    readonly status: 'available' | 'in-development'
  }[]
}

export type ScheduleHotspotId =
  | 'canonical-timeline'
  | 'missing-data'
  | 'staged-changes'
  | 'audit-revert'
  | 'role-boundary'

export interface ScheduleProductFixture {
  readonly productName: string
  readonly workspaceLabel: string
  readonly editor: PublicFixturePerson
  readonly viewer: PublicFixturePerson
  readonly days: readonly string[]
  readonly timeline: readonly {
    readonly project: string
    readonly items: readonly {
      readonly title: string
      readonly start: number
      readonly span: number
      readonly actualSpan?: number
      readonly tone: 'normal' | 'warning' | 'overdue'
    }[]
  }[]
  readonly plans: readonly {
    readonly project: string
    readonly title: string
    readonly status: string
    readonly period: string
    readonly owner: string
    readonly actual: string
    readonly needsReview?: boolean
  }[]
  readonly changes: readonly {
    readonly project: string
    readonly title: string
    readonly proposedBy: string
    readonly state: string
  }[]
  readonly recentApply: {
    readonly title: string
    readonly actor: string
    readonly state: string
    readonly rule: string
  }
  readonly readOnlyScope: {
    readonly label: string
    readonly person: string
    readonly visible: readonly string[]
    readonly restricted: readonly string[]
  }
}

export type ScheduleEvolutionVisual =
  | 'canonical'
  | 'proposal'
  | 'role-scope'
  | 'actual-line'
  | 'share-state'

export type SchedulePageContent = ReusableWhatCaseContent<
  ScheduleHotspotId,
  ScheduleProductFixture,
  ScheduleEvolutionVisual
>

export type DeveloperStatusHotspotId =
  | 'identity-scope'
  | 'source-hierarchy'
  | 'grouped-evidence'
  | 'partial-state'
  | 'refresh-cadence'

export interface DeveloperStatusProductFixture {
  readonly productName: string
  readonly workspaceLabel: string
  readonly window: string
  readonly people: readonly {
    readonly person: PublicFixturePerson
    readonly project: string
    readonly state: string
    readonly tone: 'ready' | 'partial'
  }[]
  readonly selected: {
    readonly person: PublicFixturePerson
    readonly project: PublicFixtureProject
    readonly refreshedAt: string
    readonly state: string
    readonly summary: string
    readonly counts: readonly {
      readonly label: string
      readonly value: string
    }[]
    readonly warnings: readonly string[]
    readonly focus: readonly string[]
    readonly projectProgress: {
      readonly feature: string
      readonly status: string
      readonly summary: string
      readonly verified: string
    }
    readonly changes: readonly {
      readonly title: string
      readonly date: string
      readonly symbols: readonly string[]
      readonly state: string
    }[]
    readonly sources: readonly {
      readonly type: 'reviewed' | 'draft' | 'change-set'
      readonly title: string
      readonly meta: string
    }[]
  }
  readonly cadence: {
    readonly schedule: string
    readonly window: string
    readonly recovery: string
  }
}

export type DeveloperStatusEvolutionVisual =
  | 'identity'
  | 'time-window'
  | 'batch'
  | 'partial'
  | 'daily'

export type DeveloperStatusPageContent = ReusableWhatCaseContent<
  DeveloperStatusHotspotId,
  DeveloperStatusProductFixture,
  DeveloperStatusEvolutionVisual
>

export type ApiUsageHotspotId =
  | 'usage-ledger'
  | 'pricing-dimensions'
  | 'workload-split'
  | 'budget-guard'
  | 'counterfactual'

export interface ApiUsageProductFixture {
  readonly productName: string
  readonly workspaceLabel: string
  readonly period: string
  readonly syntheticSummary: readonly {
    readonly label: string
    readonly value: string
    readonly note: string
    readonly tone: 'normal' | 'warning'
  }[]
  readonly guard: {
    readonly status: string
    readonly dailyWarning: string
    readonly dailyStop: string
    readonly monthlyProjection: string
    readonly keptOnline: string
    readonly paused: string
  }
  readonly workloads: readonly {
    readonly name: string
    readonly model: string
    readonly cost: string
    readonly share: number
    readonly mode: 'standard' | 'batch'
  }[]
  readonly tokenLedger: readonly {
    readonly label: string
    readonly tokens: string
    readonly rate: string
  }[]
  readonly ledgerRows: readonly {
    readonly date: string
    readonly feature: string
    readonly mode: string
    readonly input: string
    readonly output: string
    readonly cost: string
    readonly state: string
  }[]
  readonly counterfactual: {
    readonly recorded: string
    readonly standardNoCache: string
    readonly difference: string
    readonly label: string
  }
}

export type ApiUsageEvolutionVisual =
  | 'disconnect'
  | 'dashboard'
  | 'batch-rate'
  | 'retry-ledger'
  | 'workload-effect'

export type ApiUsagePageContent = ReusableWhatCaseContent<
  ApiUsageHotspotId,
  ApiUsageProductFixture,
  ApiUsageEvolutionVisual
>

export type ReportHotspotId =
  | 'week-window'
  | 'reviewed-source'
  | 'structured-metrics'
  | 'qa-evidence'
  | 'generation-gate'

export interface ReportProductFixture {
  readonly productName: string
  readonly workspaceLabel: string
  readonly weeks: readonly {
    readonly label: string
    readonly state: 'current' | 'history' | 'fallback'
  }[]
  readonly selectedWeek: {
    readonly label: string
    readonly range: string
    readonly generatedAt: string
  }
  readonly sourceState: {
    readonly label: string
    readonly detail: string
    readonly fallbackLabel: string
  }
  readonly generation: {
    readonly action: string
    readonly automatic: string
    readonly manual: string
    readonly locale: string
    readonly gatedLocale: string
  }
  readonly metrics: readonly {
    readonly label: string
    readonly value: string
  }[]
  readonly tests: readonly {
    readonly label: string
    readonly value: string
    readonly tone: 'pass' | 'fail' | 'hold'
  }[]
  readonly reportSections: readonly {
    readonly label: string
    readonly introduction?: string
    readonly entries: readonly {
      readonly title: string
      readonly body: string
      readonly source?: {
        readonly record: string
        readonly status: string
        readonly lineage: string
      }
    }[]
  }[]
}

export type ReportEvolutionVisual =
  | 'multi-source'
  | 'reviewed-first'
  | 'visible-fallback'
  | 'date-window'
  | 'manual-locale'

export type ReportPageContent = ReusableWhatCaseContent<
  ReportHotspotId,
  ReportProductFixture,
  ReportEvolutionVisual
>

export type RagAssistantHotspotId =
  | 'context-entry'
  | 'deterministic-first'
  | 'source-hierarchy'
  | 'insufficient-evidence'
  | 'review-boundary'

export interface RagAssistantProductFixture {
  readonly productName: string
  readonly assistantName: string
  readonly workspaceLabel: string
  readonly user: PublicFixturePerson
  readonly sessions: readonly {
    readonly label: string
    readonly state: 'active' | 'history'
  }[]
  readonly scope: {
    readonly label: string
    readonly detail: string
  }
  readonly question: string
  readonly deterministicContext: {
    readonly label: string
    readonly value: string
    readonly state: string
  }
  readonly answer: {
    readonly headline: string
    readonly body: string
    readonly risks: readonly {
      readonly title: string
      readonly detail: string
    }[]
  }
  readonly sources: readonly {
    readonly type: string
    readonly title: string
    readonly trust: 'canonical' | 'reviewed' | 'unreviewed'
    readonly state: string
  }[]
  readonly followup: {
    readonly question: string
    readonly headline: string
    readonly body: string
    readonly missing: readonly string[]
  }
  readonly reviewAction: {
    readonly label: string
    readonly detail: string
    readonly destination: string
  }
  readonly suggestions: readonly string[]
}

export type RagAssistantEvolutionVisual =
  | 'deterministic'
  | 'vector-support'
  | 'trust-order'
  | 'context-tool'
  | 'memory-boundary'

export type RagAssistantPageContent = ReusableWhatCaseContent<
  RagAssistantHotspotId,
  RagAssistantProductFixture,
  RagAssistantEvolutionVisual
>

export type PermissionHotspotId =
  | 'identity-link'
  | 'role-default'
  | 'personal-override'
  | 'effective-permission'
  | 'protected-change'

export interface PermissionProductFixture {
  readonly productName: string
  readonly workspaceLabel: string
  readonly members: readonly {
    readonly person: PublicFixturePerson
    readonly role: string
    readonly state: 'active' | 'unlinked'
  }[]
  readonly selected: {
    readonly person: PublicFixturePerson
    readonly state: string
    readonly identityGate: string
    readonly linkedState: string
    readonly lastChecked: string
  }
  readonly roleDefault: {
    readonly label: string
    readonly detail: string
    readonly permissions: readonly string[]
  }
  readonly override: {
    readonly label: string
    readonly detail: string
    readonly grants: readonly string[]
    readonly revokes: readonly string[]
  }
  readonly effective: {
    readonly label: string
    readonly detail: string
  }
  readonly matrix: readonly {
    readonly resource: string
    readonly scope: string
    readonly actions: readonly {
      readonly label: 'VIEW' | 'EDIT' | 'DELETE' | 'MANAGE'
      readonly state: 'role' | 'override' | 'guard' | 'none'
    }[]
    readonly result: string
  }[]
  readonly guard: {
    readonly label: string
    readonly detail: string
    readonly blocked: readonly string[]
    readonly audit: string
  }
}

export type PermissionEvolutionVisual =
  | 'read-only-need'
  | 'oidc-role'
  | 'resource-action'
  | 'admin-surface'
  | 'authority-split'

export type PermissionPageContent = ReusableWhatCaseContent<
  PermissionHotspotId,
  PermissionProductFixture,
  PermissionEvolutionVisual
>

export type MeetingLogHotspotId =
  | 'source-record'
  | 'change-guard'
  | 'candidate-group'
  | 'human-review'
  | 'capture-boundary'

export interface MeetingLogProductFixture {
  readonly productName: string
  readonly workspaceLabel: string
  readonly project: PublicFixtureProject
  readonly meeting: {
    readonly title: string
    readonly date: string
    readonly duration: string
    readonly source: string
    readonly syncState: string
    readonly participants: readonly PublicFixturePerson[]
    readonly summary: string
    readonly sections: readonly {
      readonly time: string
      readonly label: string
      readonly text: string
    }[]
  }
  readonly changeGuard: {
    readonly label: string
    readonly state: string
    readonly detail: string
    readonly checkedAt: string
  }
  readonly candidates: readonly {
    readonly category: '결정' | '이슈' | '기능 요구'
    readonly title: string
    readonly state: 'selected' | 'pending'
    readonly sourceRange: string
  }[]
  readonly selectedCandidate: {
    readonly category: '결정' | '이슈' | '기능 요구'
    readonly title: string
    readonly body: string
    readonly project: string
    readonly sourceExcerpt: string
    readonly duplicateState: string
    readonly destination: string
  }
  readonly review: {
    readonly reviewer: PublicFixturePerson
    readonly actions: readonly string[]
    readonly notice: string
  }
  readonly captureBoundary: {
    readonly label: string
    readonly state: string
    readonly activeInput: string
    readonly remaining: string
  }
}

export type MeetingLogEvolutionVisual =
  | 'transcript-path'
  | 'candidate-gate'
  | 'capture-paused'
  | 'current-sync'

export type MeetingLogPageContent = ReusableWhatCaseContent<
  MeetingLogHotspotId,
  MeetingLogProductFixture,
  MeetingLogEvolutionVisual
>

export type VersionLogHotspotId =
  | 'release-status'
  | 'same-date-builds'
  | 'compatibility-scope'
  | 'deployment-note'
  | 'source-trace'

export interface VersionLogProductFixture {
  readonly productName: string
  readonly workspaceLabel: string
  readonly project: PublicFixtureProject
  readonly filters: readonly {
    readonly label: string
    readonly active: boolean
  }[]
  readonly query: {
    readonly label: string
    readonly value: string
    readonly result: string
  }
  readonly groups: readonly {
    readonly date: string
    readonly records: readonly {
      readonly product: string
      readonly version: string
      readonly displayName: string
      readonly releaseStatus: 'RELEASE' | 'DEVELOPMENT'
      readonly compatibility: string
      readonly selected: boolean
    }[]
  }[]
  readonly selected: {
    readonly product: string
    readonly version: string
    readonly displayName: string
    readonly releaseStatus: 'RELEASE' | 'DEVELOPMENT'
    readonly releaseDate: string
    readonly compatibility: readonly string[]
    readonly updates: readonly string[]
    readonly fixes: readonly string[]
    readonly deploymentNote: string
  }
  readonly sourceTrace: {
    readonly source: string
    readonly sync: string
    readonly structuredLookup: string
    readonly semanticIndex: string
    readonly reference: string
  }
}

export type VersionLogEvolutionVisual =
  | 'normalized-sync'
  | 'search-source'
  | 'ambiguous-latest'
  | 'missing-tolerant'
  | 'evidence-axis'

export type VersionLogPageContent = ReusableWhatCaseContent<
  VersionLogHotspotId,
  VersionLogProductFixture,
  VersionLogEvolutionVisual
>

export type WikiHotspotId =
  | 'search-entry'
  | 'collection-structure'
  | 'return-views'
  | 'document-metadata'

export interface WikiProductFixture {
  readonly productName: string
  readonly platformLabel: string
  readonly workspaceLabel: string
  readonly actor: PublicFixturePerson
  readonly searchPlaceholder: string
  readonly createLabel: string
  readonly primaryNavigation: readonly {
    readonly symbol: string
    readonly label: string
    readonly active: boolean
  }[]
  readonly collections: readonly {
    readonly symbol: string
    readonly label: string
  }[]
  readonly tabs: readonly {
    readonly label: string
    readonly active: boolean
  }[]
  readonly documents: readonly {
    readonly title: string
    readonly editedBy: PublicFixturePerson
    readonly updated: string
    readonly collection: string
    readonly viewed: string
  }[]
}

export type WikiPageContent = ReusableWhatCaseContent<
  WikiHotspotId,
  WikiProductFixture,
  never
>
