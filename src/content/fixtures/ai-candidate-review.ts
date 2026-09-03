import type { AiCandidateReviewProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const aiCandidateReviewProductFixture = {
  productName: jadebellPublicWorld.productName,
  workspaceLabel: 'RECORD REVIEW WORKSPACE',
  reviewer: jadebellPublicWorld.people.minaKim,
  author: jadebellPublicWorld.people.danielLee,
  project: jadebellPublicWorld.projects.atlas,
  filters: ['전체', '결정', '이슈', '기능 요구', '액션 아이템'],
  queue: [
    {
      id: 'C-042',
      category: '이슈',
      title: '대용량 요청의 응답 지연 재현 조건',
      source: 'Teams · Atlas',
      age: '18분 전',
      state: 'selected',
    },
    {
      id: 'C-041',
      category: '액션 아이템',
      title: '릴리스 전 복구 순서 재확인',
      source: '회의록 · Atlas',
      age: '34분 전',
      state: 'waiting',
    },
    {
      id: 'C-038',
      category: '기능 요구',
      title: '실패 상태에서 다음 행동 표시',
      source: 'Assistant · Atlas',
      age: '1시간 전',
      state: 'waiting',
    },
    {
      id: 'C-035',
      category: '결정',
      title: '파트너 알림 재시도 범위 확정',
      source: 'Teams · Atlas',
      age: '어제',
      state: 'recent',
    },
  ],
  selectedCandidate: {
    id: 'C-042',
    category: '이슈',
    title: '대용량 요청의 응답 지연 재현 조건',
    risk: '낮음',
    createdAt: '2026.08.27 · 16:48',
    source: {
      type: 'Teams channel message',
      author: jadebellPublicWorld.people.danielLee.name,
      context: 'Atlas · release readiness thread',
      excerpt:
        '요청 크기가 커질 때 응답 지연을 다시 확인했습니다. 재시도 횟수와 요청 조건을 다음 검증 전에 구체화해야 합니다.',
    },
    draft: {
      title: '응답 지연 재현 조건을 검증 기준으로 정리',
      body:
        '요청 크기와 재시도 횟수를 함께 기록하고, 같은 조건에서 결과를 다시 확인한다.',
      project: jadebellPublicWorld.projects.atlas.name,
      category: '이슈',
      risk: '낮음',
    },
    duplicateCheck: {
      label: 'SIMILAR RECORD CHECK',
      result: '확정 기록과 직접 일치하는 항목 없음 · 승인 시 다시 확인',
    },
    destination: 'Atlas → Issues',
  },
  recentDecision: {
    title: '파트너 알림 재시도 범위 확정',
    decision: '승인됨',
    reviewer: `${jadebellPublicWorld.people.minaKim.name} · 1일 전`,
  },
} as const satisfies AiCandidateReviewProductFixture
