import type { MeetingLogProductFixture } from '../content-types.ts'
import { jadebellPublicWorld } from './jadebell-public.ts'

export const meetingLogProductFixture = {
  productName: jadebellPublicWorld.productName,
  workspaceLabel: 'MEETING RECORD REVIEW',
  project: jadebellPublicWorld.projects.atlas,
  meeting: {
    title: 'Atlas release readiness sync',
    date: '2026.08.24 · 10:30',
    duration: '42 MIN',
    source: 'SYNCED MEETING NOTE',
    syncState: 'SOURCE SAVED',
    participants: [
      jadebellPublicWorld.people.minaKim,
      jadebellPublicWorld.people.danielLee,
      jadebellPublicWorld.people.alexSeo,
    ],
    summary:
      '출시 범위를 넓히기 전에 알림 재시도 기준과 실패 상태의 다음 행동을 다시 확인합니다.',
    sections: [
      {
        time: '10:38',
        label: 'DECISION CONTEXT',
        text: '알림 재시도 횟수는 검증 근거를 확인한 뒤 확정하기로 했습니다.',
      },
      {
        time: '10:51',
        label: 'OPEN ISSUE',
        text: '대용량 요청의 응답 지연을 같은 조건에서 재현할 기준이 필요합니다.',
      },
      {
        time: '11:04',
        label: 'FEATURE REQUEST',
        text: '실패 상태에서 사용자가 다음 행동을 바로 찾을 수 있어야 합니다.',
      },
    ],
  },
  changeGuard: {
    label: 'CHANGE CHECK',
    state: 'CHANGED',
    detail: '이전 동기화 이후 본문 변경 감지 · 후보 추출 대상',
    checkedAt: '07:00 KST SYNC',
  },
  candidates: [
    {
      category: '결정',
      title: '재시도 기준은 검증 근거 확인 뒤 확정',
      state: 'selected',
      sourceRange: '회의 메모 · 10:38',
    },
    {
      category: '이슈',
      title: '응답 지연 재현 조건 정리 필요',
      state: 'pending',
      sourceRange: '회의 메모 · 10:51',
    },
    {
      category: '기능 요구',
      title: '실패 상태에 다음 행동 표시',
      state: 'pending',
      sourceRange: '회의 메모 · 11:04',
    },
  ],
  selectedCandidate: {
    category: '결정',
    title: '재시도 기준은 검증 근거 확인 뒤 확정',
    body: '알림 재시도 횟수는 관련 검증 근거를 확인한 뒤 공식 기준으로 확정한다.',
    project: jadebellPublicWorld.projects.atlas.name,
    sourceExcerpt: '알림 재시도 횟수는 검증 근거를 확인한 뒤 확정하기로 했습니다.',
    duplicateState: '직접 일치하는 확정 기록 없음 · 승인 시 재확인',
    destination: 'Atlas → Decisions',
  },
  review: {
    reviewer: jadebellPublicWorld.people.minaKim,
    actions: ['승인', '수정 후 승인', '반려'],
    notice: '승인된 항목만 공식 기록과 우선 검색 근거로 이동합니다.',
  },
  captureBoundary: {
    label: 'AUTOMATED CAPTURE',
    state: 'DECISION WAITING',
    activeInput: '현재 입력 · 매일 동기화되는 회의 메모',
    remaining: '남은 범위 · 자동 녹화 · 전사 · 참석자 수집',
  },
} as const satisfies MeetingLogProductFixture
