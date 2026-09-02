import type { WhatFeatureGroup } from './content-types.ts'

export const whatFeatureGroups = [
  {
    id: 'workflow',
    features: [
      { id: 'report', name: 'REPORT', href: '/what/report', mobileLane: 1 },
      {
        id: 'worklog-review',
        name: 'WORKLOG REVIEW',
        href: '/what/worklog-review',
        mobileLane: 2,
      },
      {
        id: 'meeting-log',
        name: 'MEETING LOG',
        href: '/what/meeting-log',
        mobileLane: 1,
      },
      {
        id: 'schedule',
        name: 'SCHEDULE',
        href: '/what/schedule',
        mobileLane: 2,
      },
    ],
  },
  {
    id: 'evidence',
    features: [
      {
        id: 'feature-validation',
        name: 'FEATURE VALIDATION',
        href: '/what/feature-validation',
        mobileLane: 1,
      },
      { id: 'qa', name: 'QA', href: '/what/qa', mobileLane: 2 },
      {
        id: 'version-log',
        name: 'VERSION LOG',
        href: '/what/version-log',
        mobileLane: 1,
      },
    ],
  },
  {
    id: 'ai-knowledge',
    features: [
      {
        id: 'rag-assistant',
        name: 'RAG ASSISTANT',
        href: '/what/rag-assistant',
        mobileLane: 2,
      },
      {
        id: 'ai-candidate-review',
        name: 'AI CANDIDATE REVIEW',
        href: '/what/ai-candidate-review',
        mobileLane: 1,
      },
      { id: 'wiki', name: 'WIKI', href: '/what/wiki', mobileLane: 2 },
    ],
  },
  {
    id: 'platform',
    features: [
      {
        id: 'permission',
        name: 'PERMISSION',
        href: '/what/permission',
        mobileLane: 1,
      },
      {
        id: 'project-setting',
        name: 'PROJECT SETTING',
        href: '/what/project-setting',
        mobileLane: 2,
      },
      {
        id: 'api-usage',
        name: 'API USAGE',
        href: '/what/api-usage',
        mobileLane: 1,
      },
      {
        id: 'developer-status',
        name: 'DEVELOPER STATUS',
        href: '/what/developer-status',
        mobileLane: 2,
      },
    ],
  },
] as const satisfies readonly WhatFeatureGroup[]
