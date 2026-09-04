import type { HomePageContent } from './content-types.ts'

export const homeContent = {
  tracks: [
    {
      id: 'what-i-built',
      lane: 'what-i-built',
      index: '01',
      label: 'WHAT I BUILT',
      coverTitleLines: ['WHAT'],
      seamTitle: 'WHAT',
      descriptors: ['PRODUCT', 'WORKFLOW', 'STATE'],
      items: [],
    },
    {
      id: 'how-i-build',
      lane: 'how-i-build',
      index: '02',
      label: 'HOW I BUILD',
      href: '/how/documentation-system',
      coverTitleLines: ['HOW'],
      seamTitle: 'HOW',
      descriptors: ['CONTEXT', 'EVIDENCE', 'OPERATION'],
      items: [
        {
          id: 'documentation-system',
          name: 'Documentation System',
          href: '/how/documentation-system',
        },
        {
          id: 'ai-native-engineering',
          name: 'AI-native Engineering',
          href: '/how/ai-native-engineering',
        },
        {
          id: 'technical-writing',
          name: 'Technical Writing',
          href: '/how/technical-writing',
        },
        {
          id: 'security-operations',
          name: 'Security & Operations',
          href: '/how/security-operations',
        },
      ],
    },
  ],
} as const satisfies HomePageContent
