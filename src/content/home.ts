import type { HomePageContent } from './content-types.ts'

export const homeEntryRecommendation = {
  itemId: 'documentation-system',
  label: '추천 진입점',
} as const

export const homeContent = {
  introduction: {
    eyebrow: 'FROM WORKFLOW TO SYSTEM',
    title: '업무 흐름을 바꾸는 AX 시스템을 만들고 운영했습니다.',
    summary: '흩어진 업무 자료를 모아 정리하고, AI 처리와 사람의 검토를 연결했습니다. 기록을 찾고 보고서를 만드는 일부터 권한 관리와 장애 대응까지 하나의 시스템 안에서 다뤘습니다.',
    ownership: '요구사항 구체화부터 데이터 수집과 정규화, 화면과 서버 구현, 권한 설계, AI 기능, 배포와 운영 개선까지 직접 맡았습니다. 각 페이지에는 그 과정에서 발견한 문제와 바꾼 방식을 담았습니다.',
    paths: [
      { title: '기록이 다음 업무로 이어지도록', body: '업무 기록을 검토하고 보고 자료로 정리하는 흐름', href: '/what/worklog-review' },
      { title: '운영자가 직접 관리할 수 있도록', body: '개발자에게 요청하던 권한 변경을 관리자 화면으로', href: '/what/permission' },
      { title: '다음 변경에도 맥락이 남도록', body: '문서와 코드 지도로 설계 판단을 찾고 갱신하는 방식', href: '/how/documentation-system' },
    ],
  },
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
