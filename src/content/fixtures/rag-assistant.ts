import type { RagAssistantProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const ragAssistantProductFixture = {
  productName: jadebellPublicWorld.productName,
  assistantName: 'Jadebell Assistant',
  workspaceLabel: 'Atlas workspace',
  user: jadebellPublicWorld.people.minaKim,
  sessions: [
    { label: '이번 주 릴리스', state: 'active' },
    { label: 'Canopy 접근 범위', state: 'history' },
    { label: 'Harbor 배포 확인', state: 'history' },
  ],
  scope: {
    label: '개발 운영 현황',
    detail: 'project · schedule · report · QA · meeting',
  },
  question: '이번 주 릴리스의 주요 리스크는 무엇이야?',
  deterministicContext: {
    label: '확인된 상태',
    value: '릴리스 상태: 준비 중',
    state: 'DETERMINISTIC',
  },
  answer: {
    headline: '인증 롤백 준비와 배포 체크가 이번 주 주요 리스크입니다.',
    body: '담당자 확인이 필요한 근거를 함께 연결했습니다.',
    risks: [
      { title: '인증 롤백 준비', detail: '릴리스 전 복구 경로와 담당자 확인이 남아 있습니다.' },
      { title: '배포 체크', detail: 'Harbor 승인 일정과 Atlas 리허설 시간이 맞물립니다.' },
    ],
  },
  sources: [
    { type: 'SCHEDULE', title: 'Atlas · 배포 점검', trust: 'canonical', state: 'CONFIRMED' },
    { type: 'REPORT', title: '8월 4주 주간보고', trust: 'reviewed', state: 'REVIEWED' },
    { type: 'TEAMS', title: '릴리스 discussion thread', trust: 'unreviewed', state: 'UNREVIEWED RAW' },
  ],
  followup: {
    question: '그럼 배포 영향도와 우선순위도 확정해줘.',
    headline: '현재 연결된 정보만으로는 영향도와 우선순위를 확정하기 어렵습니다.',
    body: '상태 값은 확인되지만 QA 영향 범위와 승인 결정이 연결되지 않아 판단 맥락이 부족합니다.',
    missing: ['QA 영향 범위', '승인 결정', '배포 의존 관계'],
  },
  reviewAction: {
    label: '변경 후보로 정리',
    detail: '답변은 공식 상태를 직접 바꾸지 않습니다.',
    destination: 'AI 기록 검토함에서 확인 후 반영',
  },
  suggestions: ['이번 주 요약', '롤백 준비 비교', '다음 할 일 추천'],
} as const satisfies RagAssistantProductFixture
