import type { WhatFeatureGroup } from './content-types.ts'

export const whatFeatureGroups = [
  {
    id: 'workflow',
    features: [
      { id: 'report', name: 'REPORT', mobileLane: 1 },
      { id: 'worklog-review', name: 'WORKLOG REVIEW', mobileLane: 2 },
      { id: 'meeting-log', name: 'MEETING LOG', mobileLane: 1 },
      { id: 'schedule', name: 'SCHEDULE', mobileLane: 2 },
    ],
  },
  {
    id: 'evidence',
    features: [
      {
        id: 'feature-validation',
        name: 'FEATURE VALIDATION',
        mobileLane: 1,
      },
      { id: 'qa', name: 'QA', mobileLane: 2 },
      { id: 'version-log', name: 'VERSION LOG', mobileLane: 1 },
    ],
  },
  {
    id: 'ai-knowledge',
    features: [
      { id: 'rag-assistant', name: 'RAG ASSISTANT', mobileLane: 2 },
      {
        id: 'ai-candidate-review',
        name: 'AI CANDIDATE REVIEW',
        mobileLane: 1,
      },
      { id: 'wiki', name: 'WIKI', mobileLane: 2 },
    ],
  },
  {
    id: 'platform',
    features: [
      { id: 'permission', name: 'PERMISSION', mobileLane: 1 },
      { id: 'project-setting', name: 'PROJECT SETTING', mobileLane: 2 },
      { id: 'api-usage', name: 'API USAGE', mobileLane: 1 },
      {
        id: 'developer-status',
        name: 'DEVELOPER STATUS',
        mobileLane: 2,
      },
    ],
  },
] as const satisfies readonly WhatFeatureGroup[]
