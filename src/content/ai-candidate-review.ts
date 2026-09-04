import type { AiCandidateReviewPageContent } from './content-types.ts'
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
      'AI가 찾은 기록 후보를 대기 상태로 남기고, 사람이 수정·확정한 뒤에만 공식 기록으로 보낸다.',
    summary:
      '대화 속 즉시 승인 대신, 여러 source의 후보를 한곳에서 비교하고 되돌아볼 수 있는 검토 흐름을 만들었다.',
    problemLabel: 'PROBLEM / CANDIDATE IS NOT RECORD',
    problem:
      '오분류·중복·잘못된 프로젝트 연결이 섞인 AI 결과를 바로 저장하면 이후 검색과 보고의 기준까지 오염될 수 있었다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / REVIEW LEDGER',
    title: '후보를 처리하는 화면보다, 사실로 넘어가는 경계를 살펴보세요.',
    instruction:
      '다섯 개의 검토 지점에 hover, focus 또는 tap하면 선택 이유와 책임 범위가 오른쪽 여백에 표시됩니다.',
    defaultAnnotation: {
      index: '00',
      label: 'REVIEW GUIDE',
      title: '후보와 공식 기록 사이의 간격',
      body: 'Queue에 머문 후보는 source와 editable draft를 거쳐 human decision 뒤에만 canonical record로 이동합니다. 이 화면은 그 사이의 검토 책임을 한곳에 모읍니다.',
    },
  },
  product: aiCandidateReviewProductFixture,
  annotations: [
    {
      id: 'review-queue',
      index: '01',
      label: 'REVIEW QUEUE',
      title: '대화 흐름과 검토 업무를 분리했다.',
      sections: [
        {
          label: 'WHY',
          body: '채팅 안의 즉시 승인 카드는 긴 입력과 여러 후보를 한꺼번에 비교하기 어려웠고, 기록 처리 실패가 다음 대화까지 막았다.',
        },
        {
          label: 'DECISION',
          body: '후보를 pending queue에 보존하고 목록·상세를 분리해, 빠르게 훑은 뒤 필요한 근거만 깊게 보도록 바꿨다.',
        },
        {
          label: 'BOUNDARY',
          body: '대기열에 있다는 사실은 업무적으로 유효하거나 승인됐다는 뜻이 아니다.',
        },
      ],
      evolution: { label: 'REPLACED INLINE CARDS', date: '2026.07.08' },
    },
    {
      id: 'source-provenance',
      index: '02',
      label: 'SOURCE PROVENANCE',
      title: '정리된 문장보다 먼저, 돌아갈 원문을 남긴다.',
      sections: [
        {
          label: 'WHY',
          body: 'AI가 제목과 내용을 다듬으면 어떤 대화·채널·회의록에서 나온 해석인지 잃기 쉽다.',
        },
        {
          label: 'DECISION',
          body: '답변용 대화 context와 후보 추출 target을 나누고 source type·원문 근거를 후보에 유지했다.',
        },
        {
          label: 'EVIDENCE',
          body: '채팅·Teams·회의록은 같은 후보 모델을 쓰지만 각 source의 원문으로 되돌아갈 수 있다.',
        },
      ],
      evolution: { label: 'TARGET-SOURCE SINCE', date: '2026.07.09' },
    },
    {
      id: 'editable-draft',
      index: '03',
      label: 'EDITABLE DRAFT',
      title: '분류와 문장은 AI의 결론이 아니라 검토 재료다.',
      sections: [
        {
          label: 'WHY',
          body: '같은 원문도 결정·이슈·기능 요구로 다르게 읽힐 수 있고, 프로젝트나 위험도가 잘못 연결될 수 있다.',
        },
        {
          label: 'DECISION',
          body: '분류·제목·내용·프로젝트·위험도를 승인 전에 수정하고, draft와 확정 결과를 서로 다른 이력으로 남겼다.',
        },
        {
          label: 'BOUNDARY',
          body: '수정 가능한 초안은 검색 편의를 위한 구조화이며 아직 canonical record가 아니다.',
        },
      ],
      evolution: { label: 'REFINED WITH SOURCE TIERS', date: '2026.07.10' },
    },
    {
      id: 'human-decision',
      index: '04',
      label: 'HUMAN DECISION',
      title: '승인 시점에 한 번 더 충돌을 확인한다.',
      sections: [
        {
          label: 'WHY',
          body: '후보 생성 뒤 검토 전까지 공식 기록이 바뀔 수 있어, 저장 전 검사만으로는 중복을 막을 수 없다.',
        },
        {
          label: 'DECISION',
          body: '생성 전 exact·semantic 검사를 하고 승인 transaction 안에서 중복과 필수값을 다시 확인한다.',
        },
        {
          label: 'BOUNDARY',
          body: '유사한 후보를 자동 병합하지 않는다. approve·edit·reject 중 업무 판단은 사람에게 남긴다.',
        },
      ],
      evolution: { label: 'DOUBLE-CHECKED SINCE', date: '2026.07.09' },
    },
    {
      id: 'trust-boundary',
      index: '05',
      label: 'CANONICAL BOUNDARY',
      title: '승인 전 후보는 기본 답변 근거에서 제외한다.',
      sections: [
        {
          label: 'WHY',
          body: 'pending 후보가 검색과 보고에 섞이면 AI의 해석이 회사의 확정 사실처럼 다시 인용될 수 있다.',
        },
        {
          label: 'DECISION',
          body: '승인된 공식 데이터→검토된 요약→개발 근거→pending→raw의 신뢰 계층을 두고, pending은 기본 RAG 근거에서 제외했다.',
        },
        {
          label: 'BOUNDARY',
          body: '사람의 승인은 기록 승격 결정이다. 내용의 장기적 정확성이나 조직 합의 전체를 자동 보증하지 않는다.',
        },
      ],
      evolution: { label: 'KNOWLEDGE GATE ADDED', date: '2026.08.20' },
    },
  ],
  workflow: {
    eyebrow: 'PRODUCT WORKFLOW',
    title: '발견은 자동화하고, 승격은 명시적으로 결정한다.',
    introduction:
      '각 단계에 focus하거나 pointer를 올리면 제품 surface의 대응 지점도 함께 강조됩니다.',
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
        summary: '확정 record와 RAG 근거로 승격',
      },
    ],
    boundary:
      'AI가 후보를 찾는 속도와 공식 기록을 바꾸는 권한은 같은 자동화 단계로 합치지 않는다.',
  },
  rules: {
    eyebrow: 'REVIEW RULES',
    items: [
      {
        statement: 'ANSWER CONTEXT ≠ EXTRACTION TARGET.',
        explanation:
          '답변에는 이전 대화가 필요해도 후보는 지정한 원문에서만 만든다. 같은 내용이 sliding window에서 반복 생성되는 문제를 막았다.',
      },
      {
        statement: 'SIMILAR DOES NOT MEAN SAME.',
        explanation:
          'semantic match는 판단 단서다. 유사하다는 이유만으로 공식 기록을 자동 병합하지 않는다.',
      },
      {
        statement: 'PENDING IS NOT KNOWLEDGE.',
        explanation:
          '검토 전 후보는 기본 검색 근거에서 제외한다. 장기 Knowledge 후보는 더 좁은 권한 경계를 거친다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '더 빨리 승인하는 UI에서, 더 안전하게 승격하는 queue로.',
    introduction:
      '검토 surface와 상태 경계에 직접 남아 있는 변화만 다섯 장면으로 정리했습니다.',
    scenes: [
      {
        date: '2026.07.08',
        label: 'DEDICATED QUEUE',
        visual: 'inline-card',
        decision: '채팅 인라인 승인 카드를 없애고 전용 검토함으로 이동',
        trigger: '여러 후보 검토가 어렵고 기록 처리 실패가 다음 대화와 결합됨',
        change: '왼쪽 queue와 오른쪽 detail에서 승인·수정·반려',
        currentEffect: '후보 처리가 대화 lifecycle과 독립적으로 남는다.',
      },
      {
        date: '2026.07.09–10',
        label: 'TARGET + PROVENANCE',
        visual: 'target-source',
        decision: '추출 target, 원문, 수정 가능한 draft를 각각 보존',
        trigger: 'sliding window가 이전 대화를 다시 읽어 중복 후보를 생성',
        change: 'target-source 추출과 생성·승인 시점 이중 중복 검사',
        currentEffect: '정리된 문장에서 원문과 수정 이력으로 되돌아갈 수 있다.',
      },
      {
        date: '2026.08.13–14',
        label: 'MULTI-SOURCE REVIEW',
        visual: 'multi-source',
        decision: '채팅·Teams·회의록을 같은 후보 queue로 연결',
        trigger: 'source마다 다른 검토 경로가 생기고 같은 회의록이 반복 추출됨',
        change: '공통 후보 모델, 근거 grouping, 미변경 source 재추출 방지',
        currentEffect: 'source는 달라도 같은 승인 규칙으로 비교한다.',
      },
      {
        date: '2026.08.20',
        label: 'KNOWLEDGE GATE',
        visual: 'knowledge-gate',
        decision: '장기 Knowledge 후보를 더 좁은 비동기 검토 경로로 분리',
        trigger: '일반 업무 후보와 장기 검색 지식의 영향 범위가 다름',
        change: 'Developer 전용 pending 조회와 승인된 knowledge만 RAG 사용',
        currentEffect: '후보 종류에 따라 검토 권한과 검색 노출이 달라진다.',
      },
      {
        date: '2026.08.26',
        label: 'REGISTRY ALIGNMENT',
        visual: 'registry',
        decision: '프로젝트 선택지를 관리자가 추적하는 registry로 통일',
        trigger: 'source마다 다른 프로젝트명이 후보 분류와 연결을 흔듦',
        change: '확신할 수 없는 값은 기타로 남기고 기존 후보를 backfill',
        currentEffect: '후보와 다른 제품 화면이 같은 프로젝트 기준을 사용한다.',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / IMPLEMENTED STRUCTURE',
    title: '성과율 대신, 검토하도록 만든 구조.',
    snapshot: '구현 범위를 세는 구조적 evidence이며 정확도나 사용량 지표가 아닙니다.',
    items: [
      {
        value: '6',
        label: 'CANDIDATE TYPES',
        meaning: '결정·요구사항·기능·이슈·리스크·액션 아이템',
        boundary: '분류 정확도를 의미하지 않음',
      },
      {
        value: '3',
        label: 'SOURCE FAMILIES',
        meaning: '채팅·Teams·회의록이 공통 queue로 연결',
        boundary: '모든 source를 수집한다는 뜻이 아님',
      },
      {
        value: '2',
        label: 'DUPLICATE CHECKPOINTS',
        meaning: '후보 생성 전과 승인 transaction에서 재확인',
        boundary: '중복이 0건임을 보증하지 않음',
      },
    ],
  },
  implementationStatus: {
    state: 'IMPLEMENTED / DEPLOYED / ACTIVE',
    items: [
      '후보 추출·pending 저장·목록/상세 검토 UI',
      '수정 후 승인·반려·category별 canonical write',
      '채팅·Teams·회의록 source와 Knowledge 권한 경계',
      '프로젝트 registry 연동과 기존 후보 backfill',
    ],
    runtime:
      '운영 배포와 승인 처리 기록은 확인됐다. 후보 정확도·검토 시간 절감·사용자별 반복 이용량은 측정하지 않았다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / RECORD AUTHORITY',
    statement: 'A candidate can wait. Canonical data should not guess.',
    items: [
      'pending 후보는 공식 기록도 기본 RAG 근거도 아니다.',
      'semantic 유사도는 자동 병합이나 업무 승인 근거가 아니다.',
      '사람의 승인은 기록 승격 결정이며 제품 완료·배포를 증명하지 않는다.',
      '운영 배포는 확인했지만 정확도 향상·시간 절감·조직 adoption은 미측정이다.',
    ],
  },
  relatedSystems: [
    {
      title: 'AI-NATIVE ENGINEERING',
      relation: 'AI candidate를 검증 가능한 변경과 사람 결정으로 연결하는 방식',
      href: '/how/ai-native-engineering',
      status: 'available',
    },
    {
      title: 'DOCUMENTATION SYSTEM',
      relation: '확정된 기록의 authority와 갱신 맥락을 다시 찾는 구조',
      href: '/how/documentation-system',
      status: 'available',
    },
    {
      title: 'AI TRUST / KNOWLEDGE GOVERNANCE',
      relation: '후보 종류별 승인 권한과 검색 노출 경계',
      status: 'in-development',
    },
  ],
} as const satisfies AiCandidateReviewPageContent
