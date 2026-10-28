import type { AiCandidateReviewPageContent, RecordExecutionContent } from './content-types.ts'
import { aiCandidateReviewProductFixture } from './fixtures/ai-candidate-review.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'

export const aiCandidateReviewContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED PRODUCT VIEW / SYNTHETIC DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 02',
    titleLines: ['AI CANDIDATE', 'REVIEW'],
    thesis:
      '대화에서 찾은 기록을 모아, 검토와 후속 업무까지 연결했다.',
    summary:
      '채팅과 Teams, 회의록에서 AI가 추출한 후보를 전용 검토함에 모았다. 검토자는 원문을 읽으며 분류와 내용을 고치고, 승인한 액션은 실행 계획으로 연결한다.',
    problemLabel: '대화 안에서 막히던 기록 처리',
    problem:
      '채팅 안의 승인 카드로는 여러 후보를 비교하기 어려웠다. 기록 저장에 실패하면 다음 대화도 막혔고, 이전 대화를 다시 추출하면서 같은 후보가 쌓였다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / REVIEW LEDGER',
    title: '원문과 초안을 나란히 검토',
    instruction:
      '후보 목록에서 원문을 열고, 초안을 수정해 승인하거나 반려하는 화면',
    defaultAnnotation: {
      index: '00',
      label: 'REVIEW GUIDE',
      title: '여러 후보를 모아 검토',
      body: '후보 목록과 상세 보기를 나눠 여러 기록을 비교하도록 했다. 원문과 초안을 함께 읽고 분류와 내용을 수정한 뒤 승인하면 공식 기록에 저장한다.',
    },
  },
  product: aiCandidateReviewProductFixture,
  annotations: [
    {
      id: 'review-queue',
      index: '01',
      label: 'REVIEW QUEUE',
      title: '대화와 기록 처리를 분리',
      sections: [
        {
          label: 'WHY',
          body: '처음에는 채팅 안에서 후보를 승인하고 수정했다. 여러 후보를 비교하기 어려웠고 기록 처리 실패가 다음 대화까지 막았다.',
        },
        {
          label: 'DECISION',
          body: '후보를 전용 검토함에 보존하고 목록과 상세 보기를 나눴다. 검토할 기록을 고르고 원문을 읽는 동안에도 대화를 계속할 수 있다.',
        },
      ],
      evolution: { label: 'REPLACED INLINE CARDS', date: '2026.07.08' },
    },
    {
      id: 'source-provenance',
      index: '02',
      label: 'SOURCE PROVENANCE',
      title: '원문으로 돌아가는 출처',
      sections: [
        {
          label: 'WHY',
          body: '정리한 초안만 읽어서는 어떤 대화나 회의록에서 나온 내용인지 알기 어려웠다.',
        },
        {
          label: 'DECISION',
          body: '채팅과 Teams, 회의록에 공통 후보 모델을 적용하고 출처를 보존했다. 검토자는 정리된 문장과 원문을 대조하며 승인할 수 있다.',
        },
      ],
      evolution: { label: 'TARGET-SOURCE SINCE', date: '2026.07.09' },
    },
    {
      id: 'editable-draft',
      index: '03',
      label: 'EDITABLE DRAFT',
      title: '승인 전에 고치는 초안',
      sections: [
        {
          label: 'WHY',
          body: '같은 원문도 결정·이슈·기능 요구로 다르게 읽힐 수 있고, 프로젝트나 위험도가 잘못 연결될 수 있다.',
        },
        {
          label: 'DECISION',
          body: '분류·제목·내용·프로젝트·위험도를 승인 전에 수정하고, 기존 내역과 확정 결과를 서로 다른 이력으로 남겼다.',
        },
      ],
      evolution: { label: 'DRAFT REFINEMENT', date: '2026.07.10' },
    },
    {
      id: 'human-decision',
      index: '04',
      label: 'HUMAN DECISION',
      title: '저장 직전 중복 재검사',
      sections: [
        {
          label: 'WHY',
          body: '후보 생성 후 검토를 기다리는 사이에 같은 내용이 공식 기록으로 저장될 수 있다.',
        },
        {
          label: 'DECISION',
          body: '생성 전에 동일하거나 유사한 기록을 찾고, 승인 직전에도 중복과 필수값을 다시 검사했다. 검토자는 비교 결과를 보고 승인하거나 반려한다.',
        },
      ],
      evolution: { label: 'SECOND CHECK', date: '2026.07.09' },
    },
    {
      id: 'trust-boundary',
      index: '05',
      label: 'KNOWLEDGE REVIEW',
      title: '승인한 지식을 검색에 반영',
      sections: [
        {
          label: 'WHY',
          body: '대기 중인 초안이 검색에 들어가면 다음 답변이 그 내용을 다시 인용할 수 있다.',
        },
        {
          label: 'DECISION',
          body: '승인한 기록을 AI 어시스턴트의 검색에 반영했다. 장기 지식 후보에는 별도의 검토 권한을 두어 저장과 검색 노출을 함께 관리했다.',
        },
      ],
      evolution: { label: 'KNOWLEDGE GATE ADDED', date: '2026.08.20' },
    },
  ],
  workflow: {
    eyebrow: 'PRODUCT WORKFLOW',
    title: '추출부터 공식 기록까지',
    introduction:
      '각 단계와 연결된 검토 영역을 함께 강조',
    steps: [
      {
        id: 'workflow-source',
        hotspotId: 'source-provenance',
        index: '01',
        label: 'TARGET SOURCE',
        summary: '원문과 추출 범위를 고정',
      },
      {
        id: 'workflow-queue',
        hotspotId: 'review-queue',
        index: '02',
        label: 'PENDING',
        summary: '후보를 공식 기록과 분리',
      },
      {
        id: 'workflow-edit',
        hotspotId: 'editable-draft',
        index: '03',
        label: 'EDIT',
        summary: '분류·문구·프로젝트 확인',
      },
      {
        id: 'workflow-decision',
        hotspotId: 'human-decision',
        index: '04',
        label: 'DECIDE',
        summary: '승인 시 중복·필수값 재검사',
      },
      {
        id: 'workflow-canonical',
        hotspotId: 'trust-boundary',
        index: '05',
        label: 'CANONICAL',
        summary: '공식 기록에 저장하고 RAG 근거로 사용',
      },
    ],
    boundary:
      'AI가 추출한 초안을 검토자가 수정하고 승인하면, 기록 유형에 맞는 공식 데이터로 저장한다.',
  },
  rules: {
    eyebrow: 'REVIEW RULES',
    items: [
      {
        statement: '이번 원문에서 추출',
        explanation:
          '답변은 이전 대화를 참고하되 후보는 지정한 원문에서만 추출한다. 이전 대화를 다시 읽으며 같은 후보가 생기는 문제에 대응했다.',
      },
      {
        statement: '유사한 기록을 함께 비교',
        explanation:
          '의미가 비슷한 기록을 검토자가 비교하고, 후보를 수용할지 수정할지 결정한다.',
      },
      {
        statement: '검토를 마친 지식부터 검색',
        explanation:
          '대기 후보는 기본 답변 근거에서 제외한다. 장기 지식 후보에는 별도의 검토 권한을 적용한다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '채팅 승인 카드에서 전용 검토함으로',
    introduction:
      '대화를 막던 기록 처리를 분리한 뒤, 중복 추출과 출처별로 갈라진 검토 흐름을 정리했다.',
    scenes: [
      {
        date: '2026.07.08',
        label: 'DEDICATED QUEUE',
        visual: 'inline-card',
        decision: '채팅 인라인 승인 카드를 없애고 전용 검토함으로 이동',
        trigger: '여러 후보를 검토하기 어렵고 기록 처리에 실패하면 다음 대화도 막힘',
        change: '왼쪽 후보 목록과 오른쪽 상세에서 승인·수정·반려',
        currentEffect: '후보 처리와 다음 대화 진행이 분리된다.',
      },
      {
        date: '2026.07.09–10',
        label: 'TARGET + PROVENANCE',
        visual: 'target-source',
        decision: '추출 대상·원문·수정 가능한 초안을 각각 보존',
        trigger: '답변 맥락에 포함된 이전 대화가 다시 추출돼 중복 후보 생성',
        change: '지정 원문에서 추출하고 생성·승인 시점에 중복 검사',
        currentEffect: '정리된 문장에서 원문과 수정 이력으로 되돌아갈 수 있다.',
      },
      {
        date: '2026.08.13–14',
        label: 'MULTI-SOURCE REVIEW',
        visual: 'multi-source',
        decision: '채팅·Teams·회의록을 같은 후보 대기열로 연결',
        trigger: '출처별 검토 경로가 갈리고 같은 회의록에서 반복 추출 발생',
        change: '공통 후보 모델·근거 묶음 도입, 바뀌지 않은 원문의 재추출 방지',
        currentEffect: '출처가 달라도 공통 검토 흐름에서 승인 여부를 결정한다.',
      },
      {
        date: '2026.08.20',
        label: 'KNOWLEDGE GATE',
        visual: 'knowledge-gate',
        decision: '장기 지식 후보를 권한이 제한된 비동기 검토 경로로 분리',
        trigger: '일반 업무 후보와 장기 검색 지식의 영향 범위가 다름',
        change: 'Developer 역할만 대기 지식 후보를 조회하고, 승인된 지식만 RAG에 사용',
        currentEffect: '후보 종류에 따라 검토 권한과 검색 노출이 달라진다.',
      },
      {
        date: '2026.08.26',
        label: 'REGISTRY ALIGNMENT',
        visual: 'registry',
        decision: '프로젝트 선택지를 관리자가 관리하는 공통 등록 목록으로 통일',
        trigger: '출처마다 프로젝트명이 달라 후보를 분류하고 연결하기 어려움',
        change: '불확실한 프로젝트는 기타로 남기고, 기존 후보에도 새 기준 반영',
        currentEffect: '후보와 다른 제품 화면이 같은 프로젝트 기준을 사용한다.',
      },
    ],
  },
  evidence: {
    eyebrow: '기록 처리의 변화',
    title: '대화는 이어가고, 검토는 모아서',
    snapshot: '후보 처리 실패가 다음 대화에 영향을 주던 구조를 분리하고, 여러 출처의 기록을 같은 검토 화면에 모았다.',
    items: [],
  },
  implementationStatus: {
    state: '추출과 검토, 후속 실행을 연결',
    items: [
      '후보 대기열과 원문을 함께 읽는 상세 화면',
      '수정 후 승인하거나 반려하는 검토 동작',
      '변하지 않은 원문의 재추출 방지',
      '공통 프로젝트 목록으로 후보 분류 통일',
    ],
    runtime: '채팅과 Teams, 저장된 회의록을 공통 후보 모델로 처리했다. 승인 시에는 중복과 필수값을 다시 검사하고 기록 유형에 맞춰 저장한다.',
  },
  boundary: {
    eyebrow: '설계에서 배운 점',
    statement: '추출 범위와 답변 맥락을 나누다.',
    items: [
      '이전 대화까지 다시 추출하면서 중복 후보가 생겼다. 답변에는 대화 맥락을 쓰되, 후보를 추출할 원문은 별도로 지정했다.',
      '장기 지식 후보는 검토 권한과 검색 반영 시점을 함께 관리했다. 공식 기록을 고치는 작업과 AI의 다음 답변을 연결해서 설계했다.',
    ],
  },
  relatedSystems: [
    {
      title: 'AI-NATIVE ENGINEERING',
      relation: 'AI 후보를 검증 가능한 변경과 사람의 결정으로 연결하는 방식',
      href: '/how/ai-native-engineering',
      status: 'available',
    },
    {
      title: 'DOCUMENTATION SYSTEM',
      relation: '확정된 기록의 역할과 갱신 맥락을 다시 찾는 구조',
      href: '/how/documentation-system',
      status: 'available',
    },
  ],
} as const satisfies AiCandidateReviewPageContent

export const recordExecutionContent = {
  eyebrow: 'CONFIRMED RECORD / FOLLOW-THROUGH',
  title: '확정한 기록에서 후속 계획까지',
  introduction:
    '여섯 유형의 공식 기록을 저장하고, 확정한 이슈와 액션은 후속 상황에 맞춰 갱신하도록 했다. 실행할 액션을 계획으로 전환할 때도 원래 기록의 연결을 유지한다.',
  stages: [
    {
      label: '01 / CONFIRM',
      title: '사람이 확인한 기록',
      body: 'AI 후보를 검토·수정하고 승인한 뒤 공식 기록으로 저장한다. 후보 생성과 기록 확정은 서로 다른 단계다.',
    },
    {
      label: '02 / UPDATE',
      title: '이슈·액션의 상태 갱신',
      body: '확정 이후에도 후속 상황에 맞춰 이슈·액션 상태를 갱신한다. 다시 확인이 필요한 이슈는 재개할 수 있다.',
    },
    {
      label: '03 / LINK',
      title: '액션을 실행 계획으로 연결',
      body: '후속 실행이 필요한 액션을 계획으로 전환한다. 원래 기록의 참조를 보존해 계획에서 그 기록으로 돌아갈 수 있게 했다.',
    },
  ],
  guards: [
    {
      title: '원본을 잠그고 중복 연결 확인',
      body: '전환 중 원본 행을 잠그고 이미 계획에 연결된 액션은 중복 계획으로 만들지 않는다.',
    },
    {
      title: '같은 프로젝트 안에서 연결',
      body: '액션과 계획이 같은 프로젝트에 속하는지 검사하고 전환 후에도 원래 기록의 참조를 유지한다.',
    },
  ],
  boundary:
    '검토를 마친 기록에서 상태 갱신과 계획 전환까지 이어가도록, 같은 프로젝트의 원본 참조와 연결 상태를 함께 관리했다.',
  related: { label: '연결된 계획과 일정 살펴보기', href: '/what/schedule' },
} as const satisfies RecordExecutionContent
