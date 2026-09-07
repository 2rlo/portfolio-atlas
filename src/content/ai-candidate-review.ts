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
      'AI가 찾은 기록 후보를 대기 상태로 남기고, 사람이 수정·승인한 뒤에만 공식 기록으로 확정한다.',
    summary:
      '대화에서 추출한 기록을 즉시 승인하는 대신, 여러 기록을 한곳에서 비교하고 확정할 수 있는 검토 흐름을 만들었다.',
    problemLabel: 'PROBLEM / CANDIDATE IS NOT RECORD',
    problem:
      '오분류·중복·잘못된 프로젝트 연결이 섞인 AI 결과를 검증 없이 바로 저장하면 이후 검색과 보고의 기준까지 오염될 수 있다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / REVIEW LEDGER',
    title: 'AI가 추출하고, 사람이 판단한 뒤에 공식 데이터로 반영됩니다.',
    instruction:
      '각 검토 지점에는 무엇을 AI에 맡기고, 어디서 사람의 판단을 남겼는지가 연결되어 있습니다.',
    defaultAnnotation: {
      index: '00',
      label: 'REVIEW GUIDE',
      title: '후보와 공식 기록 사이의 간격',
      body: 'AI가 찾은 후보는 바로 공식 데이터가 되지 않습니다. 원문과 추출한 초안을 함께 확인하고, 사람이 수정⋅확정한 뒤에만 반영합니다. 검토에 필요한 원문, 초안, 판단 상태를 한 화면에서 함께 확인할 수 있게 했습니다.',
    },
  },
  product: aiCandidateReviewProductFixture,
  annotations: [
    {
      id: 'review-queue',
      index: '01',
      label: 'REVIEW QUEUE',
      title: '대화와 검토를 같은 흐름에 두지 않았다.',
      sections: [
        {
          label: 'WHY',
          body: '처음엔 AI 어시스턴트 채팅 안에서 후보를 확인하고 승인⋅수정하는 방식이었습니다. 그러나 이 방식은 여러 후보를 한 번에 비교하기 어려웠고, 기록 처리 실패가 다음 대화까지 막는 문제가 있었습니다.',
        },
        {
          label: 'DECISION',
          body: '후보를 대기열에 보존하고 목록과 상세 보기를 분리해, 여러 후보를 빠르게 훑은 뒤 필요한 근거만 확인할 수 있도록 바꿨습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '대기열에 있는 데이터는 공식 데이터가 아닙니다.',
        },
      ],
      evolution: { label: 'REPLACED INLINE CARDS', date: '2026.07.08' },
    },
    {
      id: 'source-provenance',
      index: '02',
      label: 'SOURCE PROVENANCE',
      title: '정리된 문장과 함께 출처를 남긴다.',
      sections: [
        {
          label: 'WHY',
          body: 'AI가 제목과 내용을 다듬은 초안만 확인하면 어떤 대화·채널·회의록에서 나온 해석인지 알 수 없습니다.',
        },
        {
          label: 'DECISION',
          body: '후보에 출처와 원문 근거를 함께 남겨, 검토할 때 원래 기록을 참고할 수 있도록 했습니다.',
        },
        {
          label: 'EVIDENCE',
          body: '채팅·Teams와 과거 회의록 연결은 같은 후보 모델을 쓰되, 각 source의 원문으로 되돌아갈 수 있다.',
        },
      ],
      evolution: { label: 'TARGET-SOURCE SINCE', date: '2026.07.09' },
    },
    {
      id: 'editable-draft',
      index: '03',
      label: 'EDITABLE DRAFT',
      title: 'AI의 초안은 결론이 아니라 검토 재료다.',
      sections: [
        {
          label: 'WHY',
          body: '같은 원문도 결정·이슈·기능 요구로 다르게 읽힐 수 있고, 프로젝트나 위험도가 잘못 연결될 수 있다.',
        },
        {
          label: 'DECISION',
          body: '분류·제목·내용·프로젝트·위험도를 승인 전에 수정하고, 기존 내역과 확정 결과를 서로 다른 이력으로 남겼다.',
        },
        {
          label: 'BOUNDARY',
          body: '수정 가능한 초안은 검색⋅검토 편의를 위한 구조화다.',
        },
      ],
      evolution: { label: 'DRAFT REFINEMENT', date: '2026.07.10' },
    },
    {
      id: 'human-decision',
      index: '04',
      label: 'HUMAN DECISION',
      title: '후보를 만들 때 확인하고, 승인할 때 한 번 더 확인한다.',
      sections: [
        {
          label: 'WHY',
          body: '후보가 만들어진 뒤 검토하는 동안 공식 기록이 바뀔 수 있어, 처음 검사한 결과만으로는 충돌을 막기 어렵습니다.',
        },
        {
          label: 'DECISION',
          body: '후보 생성 전에 동일⋅유사 기록을 확인하고, 승인 직전에도 중복과 필수값을 다시 검사합니다.',
        },
        {
          label: 'BOUNDARY',
          body: '유사한 후보를 자동으로 합치지 않고, 수용⋅수정⋅반려 판단은 사람이 합니다.',
        },
      ],
      evolution: { label: 'SECOND CHECK', date: '2026.07.09' },
    },
    {
      id: 'trust-boundary',
      index: '05',
      label: 'CANONICAL BOUNDARY',
      title: '승인 전 후보는 AI 어시스턴트 답변 근거에서 제외한다.',
      sections: [
        {
          label: 'WHY',
          body: '승인 전 후보가 검색과 보고에 섞이면 AI의 초안이 확정된  사실처럼 다시 인용될 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: '검토 대기 중인 후보는 저장해두되, 사람이 승인하기 전까지 AI 어시스턴트의 기본 검색 근거에서 제외했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '후보는 검토를 위해 보존하지만, 승인되기 전까지 공식 데이터와 같은 신뢰 수준으로 다루지 않습니다.',
        },
      ],
      evolution: { label: 'KNOWLEDGE GATE ADDED', date: '2026.08.20' },
    },
  ],
  workflow: {
    eyebrow: 'PRODUCT WORKFLOW',
    title: 'AI가 후보를 찾고, 사람이 공식 기록으로 확정한다.',
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
      '후보 추출을 자동화해도, 공식 기록으로 저장할지는 사람이 결정한다.',
  },
  rules: {
    eyebrow: 'REVIEW RULES',
    items: [
      {
        statement: 'ANSWER CONTEXT ≠ EXTRACTION TARGET.',
        explanation:
          '답변은 이전 대화를 참고하되 후보는 지정한 원문에서만 추출한다. 이전 대화를 다시 읽으며 같은 후보가 생기는 문제에 대응했다.',
      },
      {
        statement: 'SIMILAR DOES NOT MEAN SAME.',
        explanation:
          '의미 유사도는 검토 단서다. 유사하다는 이유만으로 공식 기록을 자동 병합하지 않는다.',
      },
      {
        statement: 'PENDING IS NOT KNOWLEDGE.',
        explanation:
          '대기 후보는 기본 답변 근거에서 제외한다. 장기 지식 후보에는 별도의 검토 권한을 적용한다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '채팅 승인 카드에서 전용 검토함으로',
    introduction:
      '추출 범위 분리, 여러 출처의 통합, 지식 후보의 권한 제한, 프로젝트 기준 정렬.',
    scenes: [
      {
        date: '2026.07.08',
        label: 'DEDICATED QUEUE',
        visual: 'inline-card',
        decision: '채팅 인라인 승인 카드를 없애고 전용 검토함으로 이동',
        trigger: '여러 후보 검토가 어렵고 기록 처리 실패가 다음 대화와 결합됨',
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
        trigger: '출처마다 다른 프로젝트명이 후보 분류와 연결에 혼선',
        change: '불확실한 프로젝트는 기타로 남기고, 기존 후보에도 새 기준 반영',
        currentEffect: '후보와 다른 제품 화면이 같은 프로젝트 기준을 사용한다.',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / 2026.09.04 SNAPSHOT',
    title: '후보의 저장 상태이지, AI 정확도 점수가 아니다.',
    snapshot: '읽기 전용 production snapshot의 후보 상태이며 네 값은 하나의 저장 범위를 설명합니다.',
    items: [
      {
        value: '371',
        label: 'AI CANDIDATES',
        meaning: '사람 검토 상태와 함께 저장된 전체 후보',
        boundary: '모델 정확도·자동 승인·반복 사용량이 아님',
      },
      {
        value: '119',
        label: 'APPROVED',
        meaning: '사람이 승인한 후보 상태',
        boundary: '제품 구현 완료나 배포 증명이 아님',
      },
      {
        value: '154',
        label: 'PENDING',
        meaning: '공식 기록으로 승격되지 않은 검토 대기 상태',
        boundary: 'canonical data나 기본 RAG 근거가 아님',
      },
      {
        value: '98',
        label: 'REJECTED',
        meaning: '사람이 승격하지 않기로 결정한 후보 상태',
        boundary: '모두 모델 오류였다는 뜻이 아님',
      },
    ],
  },
  implementationStatus: {
    state: 'IMPLEMENTED / DEPLOYED / ACTIVE',
    items: [
      '후보 추출·대기 저장·목록/상세 검토 UI',
      '수정 후 승인·반려와 유형별 공식 기록 저장',
      '채팅·Teams source와 Knowledge 권한 경계',
      '회의록 downstream 구조와 blocked transcript upstream의 분리',
      '공통 프로젝트 목록 연동과 기존 후보의 기준 보완',
    ],
    runtime:
      '운영 배포와 후보 상태 저장은 확인됐다. 회의 transcript upstream은 blocked이며, 후보 정확도·검토 시간·반복 이용량은 측정하지 않았다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / RECORD AUTHORITY',
    statement: '공식 기록으로 보내기 전, 사람이 확인할 범위를 남긴다.',
    items: [
      '371개 후보는 저장 범위이며 pending 후보는 공식 기록도 기본 RAG 근거도 아니다.',
      '의미 유사도는 후보 비교에 사용하며, 병합이나 승인 결정을 대신하지 않는다.',
      '사람의 승인은 기록 승격 결정이며 제품 완료·배포를 증명하지 않는다.',
      '운영 배포는 확인됐으며, 정확도 향상·시간 절감·조직 내 정착 정도는 측정하지 않았다.',
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
    {
      title: 'AI TRUST / KNOWLEDGE GOVERNANCE',
      relation: '후보 종류별 승인 권한과 검색 노출 경계',
      status: 'in-development',
    },
  ],
} as const satisfies AiCandidateReviewPageContent
