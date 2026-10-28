import type { MeetingLogPageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { meetingLogProductFixture } from './fixtures/meeting-log.ts'

export const meetingLogContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED MEETING REVIEW VIEW / SYNTHETIC DATA',
    currentStatus: 'meeting-notes-review',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 12',
    titleLines: [
      'MEETING',
      'LOG'
    ],
    thesis: '회의 메모에서 결정과 후속 업무를 골라 기록하는 흐름을 만들었다.',
    summary: '동기화한 회의 메모에서 결정, 이슈, 기능 요구를 추출했습니다. 검토자는 같은 회의의 원문을 보며 후보를 수정하고 공식 기록으로 저장합니다.',
    problemLabel: 'PROBLEM / FROM MEETING TO ACTION',
    problem: '회의 메모에 결정과 후속 업무가 섞여 있어 필요한 내용을 다시 찾고 옮겨야 했습니다. 짧게 정리한 제목만으로는 결정의 조건이나 미확정 내용을 확인하기 어려웠습니다.'
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / SOURCE TO REVIEW',
    title: '회의 메모에서 공식 기록까지',
    instruction: '메모와 후보, 검토 화면을 선택해 설계 이유를 확인하세요.',
    defaultAnnotation: {
      index: '00',
      label: 'REVIEW GUIDE',
      title: '같은 회의의 원문과 후보를 함께 검토',
      body: '동기화한 회의 메모에서 바뀐 내용을 찾고 후보를 추출합니다. 검토자는 같은 회의의 원문과 후보를 함께 읽으며 저장할 내용을 결정합니다.'
    }
  },
  product: meetingLogProductFixture,
  annotations: [
    {
      id: 'source-record',
      index: '01',
      label: 'MEETING RECORD',
      title: '후보에서 원문으로 돌아갈 수 있게 했다.',
      sections: [
        {
          label: 'WHY',
          body: '요약한 제목만 남으면 결정의 조건과 미확정 표현이 사라져 검토자가 원래 맥락을 다시 판단하기 어려웠습니다.'
        },
        {
          label: 'DECISION',
          body: '회의 기록을 의미 단위로 나누고 후보마다 근거 위치를 연결했습니다. 검토자는 같은 회의의 해당 구간을 바로 읽을 수 있습니다.'
        }
      ],
      evolution: {
        label: 'SOURCE PATH',
        date: '2026.06.04'
      }
    },
    {
      id: 'change-guard',
      index: '02',
      label: 'CHANGE GUARD',
      title: '바뀐 회의 메모에서만 후보를 추출한다.',
      sections: [
        {
          label: 'WHY',
          body: '같은 본문을 반복해서 처리하면 동일한 후보와 AI 호출, 검토 작업이 함께 늘어납니다.'
        },
        {
          label: 'DECISION',
          body: '동기화할 때 내용 변경 여부를 먼저 확인하고, 바뀐 회의 기록을 후보 추출과 검색 데이터 갱신에 사용했습니다.'
        }
      ],
      evolution: {
        label: 'IDEMPOTENT EXTRACTION',
        date: '2026.08.13'
      }
    },
    {
      id: 'candidate-group',
      index: '03',
      label: 'AI CANDIDATE',
      title: '같은 회의의 후보를 묶었다.',
      sections: [
        {
          label: 'WHY',
          body: '긴 회의 메모에서 여러 결정과 이슈가 나오면 낱개 제목만으로는 함께 논의한 맥락을 놓치기 쉽습니다.'
        },
        {
          label: 'DECISION',
          body: '같은 회의에서 추출한 후보를 묶어 제목과 분류, 근거 위치를 먼저 보여줬습니다. 검토자는 필요한 항목을 열어 내용을 확인합니다.'
        }
      ],
      evolution: {
        label: 'MEETING SOURCE EXPANSION',
        date: '2026.08.13'
      }
    },
    {
      id: 'human-review',
      index: '04',
      label: 'HUMAN REVIEW',
      title: '원문 옆에서 수정하고 승인한다.',
      sections: [
        {
          label: 'WHY',
          body: '회의 표현이 모호하거나 프로젝트 연결과 분류가 잘못됐을 때 업무 맥락을 보며 고칠 수 있어야 했습니다.'
        },
        {
          label: 'DECISION',
          body: '원문과 편집 필드를 함께 두고 승인할 때 필수값과 기존 기록의 중복을 검사했습니다. 승인한 항목은 유형별 공식 기록으로 저장합니다.'
        }
      ],
      evolution: {
        label: 'SHARED REVIEW GATE',
        date: '2026.08.14'
      }
    },
    {
      id: 'capture-boundary',
      index: '05',
      label: 'MEETING SYNC',
      title: '회의 메모를 매일 같은 흐름으로 읽는다.',
      sections: [
        {
          label: 'WHY',
          body: '회의 메모가 바뀌면 후보 검토와 검색에서도 같은 내용을 다시 읽어야 했습니다.'
        },
        {
          label: 'DECISION',
          body: '매일 07:00 KST에 회의록을 동기화하고, 변경한 메모를 후보 추출과 검색 데이터 갱신에 연결했습니다.'
        }
      ],
      evolution: {
        label: 'DAILY SYNC',
        date: '2026.08.20'
      }
    }
  ],
  workflow: {
    eyebrow: 'MEETING WORKFLOW',
    title: '메모를 읽고, 후보를 고르고, 기록으로 남긴다.',
    introduction: '회의 메모와 후보 목록, 검토 화면이 하나의 흐름으로 이어집니다.',
    steps: [
      {
        id: 'meeting-flow-record',
        hotspotId: 'source-record',
        index: '01',
        label: '회의록',
        summary: '원문과 의미 단위 근거 보존'
      },
      {
        id: 'meeting-flow-candidate',
        hotspotId: 'candidate-group',
        index: '02',
        label: 'AI 후보',
        summary: '결정·이슈·기능 요구를 대기 후보로 분리'
      },
      {
        id: 'meeting-flow-review',
        hotspotId: 'human-review',
        index: '03',
        label: '검토와 저장',
        summary: '수정·승인·반려 결정, 승인 항목만 반영'
      }
    ],
    boundary: '승인한 결정과 이슈, 기능 요구는 공식 기록으로 저장하고 같은 회의의 원문을 다시 찾을 수 있게 했습니다.'
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: '회의 이후의 정리 작업',
    items: [
      {
        statement: '후보마다 원문 연결',
        explanation: '결정 조건과 미확정 표현을 검토할 수 있도록 후보가 나온 회의 구간을 함께 보존했습니다.'
      },
      {
        statement: '변경한 메모만 처리',
        explanation: '동기화 때 본문 변경을 확인해 같은 메모에서 후보를 반복 생성하는 일을 막았습니다.'
      },
      {
        statement: '검토한 내용으로 기록 생성',
        explanation: '검토자는 분류와 프로젝트, 본문을 고친 뒤 승인합니다. 저장 직전 필수값과 중복도 다시 검사합니다.'
      }
    ]
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '회의 요약을 후속 업무로 연결했다.',
    introduction: '요약한 내용을 주간보고에 넣는 흐름에서, 결정과 이슈를 개별 기록으로 검토하는 흐름으로 넓혔습니다.',
    scenes: [
      {
        date: '2026.06.04',
        label: 'MEETING SUMMARY',
        visual: 'transcript-path',
        decision: '회의 내용을 요약해 주간보고에 연결했다.',
        trigger: '회의 결정과 후속 업무를 보고에 다시 정리해야 했음',
        change: '회의 대본을 읽어 요약하는 코드와 보고 입력 구조 구성',
        currentEffect: '회의 내용을 주간보고의 회의 섹션으로 전달'
      },
      {
        date: '2026.08.13',
        label: 'CANDIDATE GATE',
        visual: 'candidate-gate',
        decision: '회의에서 나온 후보를 공통 검토 대기열로 연결했다.',
        trigger: '회의록의 결정과 이슈를 각각의 업무 기록으로 옮길 필요',
        change: '결정, 이슈, 기능 요구 추출과 변경 여부 검사',
        currentEffect: '회의 원문에서 검토 후보와 공식 기록으로 연결'
      },
      {
        date: '2026.08.20',
        label: 'DAILY SYNC',
        visual: 'current-sync',
        decision: '일일 동기화로 회의 메모와 검색 데이터를 갱신했다.',
        trigger: '편집한 회의 메모를 검토와 검색에 반영할 필요',
        change: '매일 07:00 KST 회의록 동기화',
        currentEffect: '바뀐 메모를 후보 추출과 검색 데이터에 함께 반영'
      }
    ]
  },
  evidence: {
    eyebrow: 'WORK CHANGES',
    title: '회의 뒤에 남길 일을 한곳에서 검토',
    snapshot: '회의 메모를 읽고 정리한 내용을 다른 화면으로 옮기는 과정에 후보 검토를 연결했습니다.',
    items: []
  },
  implementationStatus: {
    state: '업무의 변화',
    items: [
      '회의 메모와 검색 데이터 동기화',
      '변경한 메모에서 결정, 이슈, 기능 요구 추출',
      '원문을 보며 후보 수정, 승인, 반려',
      '필수값과 중복 검사 후 유형별 기록 저장'
    ],
    runtime: '검토자는 같은 회의에서 나온 결정과 이슈를 묶어 보고, 원문을 확인한 자리에서 공식 기록으로 저장할 수 있습니다.'
  },
  boundary: {
    eyebrow: 'DESIGN TAKEAWAY',
    statement: '회의 뒤 할 일까지 연결한다.',
    items: [
      '회의 원문에서 검토 후보를 거쳐 공식 기록까지 같은 근거를 따라갈 수 있게 했습니다.'
    ]
  },
  relatedSystems: [
    {
      title: 'AI CANDIDATE REVIEW',
      relation: '회의록의 대기 후보를 검토해 공식 기록으로 저장하는 흐름',
      href: '/what/ai-candidate-review',
      status: 'available'
    },
    {
      title: 'REPORT',
      relation: '회의 내용을 같은 주차의 업무와 함께 정리하는 보고서',
      href: '/what/report',
      status: 'available'
    },
    {
      title: 'RAG ASSISTANT',
      relation: '검토된 기록과 미검토 원문을 구분해 검색하는 방식',
      href: '/what/rag-assistant',
      status: 'available'
    }
  ],
} as const satisfies MeetingLogPageContent
