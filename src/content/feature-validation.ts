import type { FeatureValidationPageContent } from './content-types.ts'
import { featureValidationProductFixture } from './fixtures/feature-validation.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'

export const featureValidationContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED PRODUCT VIEW / SYNTHETIC DATA',
    currentStatus: 'partial',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 01',
    titleLines: ['FEATURE', 'VALIDATION'],
    thesis:
      '요구사항과 코드 근거를 연결하고, 사람이 확인한 뒤에만 판정을 갱신한다.',
    summary:
      'PR 메시지와 AI claim은 탐색 신호다. 구현 완료의 최종 사실로 사용하지 않는다.',
    problemLabel: 'PROBLEM / SCATTERED EVIDENCE',
    problem:
      '명세·계획·QA·업무 기록과 코드 변경이 흩어져 있어, 비개발자가 기능 단위로 구현 여부를 다시 확인하기 어려웠다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / INSPECTION',
    title: '화면을 보는 대신, 판단 지점을 살펴보세요.',
    instruction:
      '강조된 요소에 hover, focus 또는 tap하면 제품 옆의 검토 여백이 설계 이유로 바뀝니다.',
    defaultAnnotation: {
      index: '00',
      label: 'INSPECTION GUIDE',
      title: '다섯 개의 판단 지점',
      body: 'Requirement가 질문을 만들고 Evidence와 AI candidate가 검토 재료를 모읍니다. Unknown과 Human review는 근거가 최종 판정으로 넘어가는 경계를 지킵니다.',
    },
  },
  product: featureValidationProductFixture,
  annotations: [
    {
      id: 'requirement',
      index: '01',
      label: 'REQUIREMENT',
      title: '판정 기준도 시간축을 가진다.',
      sections: [
        {
          label: 'WHY',
          body: '기능 설명이 바뀌면 과거 판정의 기준도 흔들린다. 현재 문장만 남겨서는 당시 판단을 재현하기 어렵다.',
        },
        {
          label: 'DECISION',
          body: 'AI 추출 문구를 바로 기준으로 쓰지 않고 준비→수정→사람 확정 단계를 뒀다. 재분석도 확정 문구를 덮지 않는다.',
        },
        {
          label: 'BOUNDARY',
          body: '확정된 Requirement는 판정 기준일 뿐 구현 완료를 뜻하지 않는다.',
        },
      ],
      evolution: { label: 'EVOLVED FROM', date: '2026.08.10' },
    },
    {
      id: 'evidence',
      index: '02',
      label: 'CODE EVIDENCE',
      title: '설명보다 다시 확인 가능한 변경을 남긴다.',
      sections: [
        {
          label: 'WHY',
          body: 'PR·commit 메시지는 의도를 찾는 데 유용하지만 실제로 무엇이 바뀌었는지를 충분히 증명하지 못한다.',
        },
        {
          label: 'DECISION',
          body: '변경 범위와 source·symbol 근거를 묶고 기능과의 연결을 따로 확정해, 사람이 실제 변경으로 돌아갈 수 있게 했다.',
        },
        {
          label: 'BOUNDARY',
          body: '코드 변경의 존재는 기능 품질, QA 통과, 배포 또는 사용자 결과를 증명하지 않는다.',
        },
      ],
      evolution: { label: 'LINKED IN', date: '2026.08.10–12' },
    },
    {
      id: 'ai-assessment',
      index: '03',
      label: 'AI CANDIDATE',
      title: 'AI는 찾고, 판정하지 않는다.',
      sections: [
        {
          label: 'WHY',
          body: 'embedding 유사도와 implementation claim은 후보 순위를 만들 수 있지만 요구사항 충족을 증명하지 않는다.',
        },
        {
          label: 'DECISION',
          body: 'claim은 한 번 추출해 탐색 자료로 재사용하되, 사람이 확정한 연결만 명시적 재분석의 입력으로 사용했다.',
        },
        {
          label: 'BOUNDARY',
          body: 'AI 답변 자체는 Evidence도 공식 상태도 아니다.',
        },
      ],
      evolution: { label: 'REUSED SINCE', date: '2026.08.11' },
    },
    {
      id: 'unknown',
      index: '04',
      label: 'UNKNOWN',
      title: '근거 부족과 미구현은 같은 상태가 아니다.',
      sections: [
        {
          label: 'WHY',
          body: 'diff가 잘렸거나 source가 아직 연결되지 않았을 수 있다. 근거가 보이지 않는다는 이유만으로 MISSING을 만들면 거짓 음성이 된다.',
        },
        {
          label: 'DECISION',
          body: '근거의 완전성을 먼저 확인하고 부족하면 UNKNOWN·확인 필요에서 멈추게 했다.',
        },
        {
          label: 'BOUNDARY',
          body: 'UNKNOWN은 PASS도 MISSING도 아니며 구현 상태를 임의로 추정하지 않는다.',
        },
      ],
      evolution: { label: 'CORRECTED ON', date: '2026.08.10' },
    },
    {
      id: 'human-review',
      index: '05',
      label: 'HUMAN REVIEW',
      title: '연결을 확인한 뒤에만 상태가 움직인다.',
      sections: [
        {
          label: 'WHY',
          body: '의미가 비슷하다는 이유만으로 자동 연결하면 잘못된 근거가 이후 판정에 반복 사용될 수 있다.',
        },
        {
          label: 'DECISION',
          body: '후보를 confirm 또는 reject하고, 명시적으로 재분석한 뒤 verdict를 갱신하는 순서를 유지했다.',
        },
        {
          label: 'BOUNDARY',
          body: '사람 확인은 근거 연결과 문구·판정 입력에 대한 결정이다. 기능 완료·배포의 최종 업무 승인과는 다르다.',
        },
      ],
      evolution: { label: 'MOVED INTO UI', date: '2026.08.19' },
    },
  ],
  workflow: {
    eyebrow: 'PRODUCT WORKFLOW',
    title: '후보와 사실 사이에, 명시적인 결정 지점을 둔다.',
    introduction:
      '단계에 focus하거나 pointer를 올리면 위 제품 화면의 대응 요소가 같은 상태로 강조됩니다.',
    steps: [
      {
        id: 'workflow-requirement',
        hotspotId: 'requirement',
        index: '01',
        label: 'REQUIREMENT',
        summary: '사람이 확정한 문구와 snapshot',
      },
      {
        id: 'workflow-evidence',
        hotspotId: 'evidence',
        index: '02',
        label: 'EVIDENCE',
        summary: '서로 다른 역할의 근거를 연결',
      },
      {
        id: 'workflow-ai',
        hotspotId: 'ai-assessment',
        index: '03',
        label: 'AI MATCH',
        summary: '관련 가능성이 높은 후보 탐색',
      },
      {
        id: 'workflow-review',
        hotspotId: 'human-review',
        index: '04',
        label: 'HUMAN REVIEW',
        summary: '연결을 확정하거나 제외',
      },
      {
        id: 'workflow-state',
        hotspotId: 'unknown',
        index: '05',
        label: 'VERDICT',
        summary: '재분석 뒤 PASS·MISSING·UNKNOWN',
      },
    ],
    boundary:
      '각 source는 다른 사실을 설명한다. 링크 수나 AI 점수 하나로 완료를 계산하지 않는다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    items: [
      {
        statement: 'AI DOES NOT CONFIRM IMPLEMENTATION.',
        explanation:
          'AI는 요구사항과 변경 근거 사이의 후보를 찾는다. 공식 상태를 바꾸는 결정은 사람이 맡는다.',
      },
      {
        statement: 'INSUFFICIENT EVIDENCE IS A STATE.',
        explanation:
          '부족한 근거를 Yes 또는 No로 압축하지 않는다. 확인할 수 없으면 UNKNOWN으로 남긴다.',
      },
      {
        statement: 'EVIDENCE MUST BE REVISITABLE.',
        explanation:
          '판정만 남기지 않고 당시 Requirement와 연결한 변경 근거를 다시 살펴볼 수 있게 한다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '검증 화면은 더 많은 판정이 아니라, 더 안전한 멈춤으로 발전했다.',
    introduction:
      'Feature Validation의 UI·상태·검토 흐름과 직접 연결된 변화만 네 장면으로 좁혔습니다.',
    scenes: [
      {
        date: '2026.08.07',
        label: 'READ-ONLY START',
        visual: 'read-only',
        decision: 'AI가 공식 상태를 직접 수정하지 않는 읽기 중심 화면',
        trigger: '명세와 구현 근거가 흩어져 기능 단위 검토가 어려움',
        change: '기능·명세 snapshot·Requirement·기존 근거를 한 화면에서 조회',
      },
      {
        date: '2026.08.10',
        label: 'SAFE UNKNOWN',
        visual: 'unknown',
        decision: '근거 완전성이 불명확하면 MISSING 대신 UNKNOWN',
        trigger: '잘린 diff와 미연결 source가 미구현으로 오판됨',
        change: '보수적 상태와 사람 확정 Requirement 문구 보존',
      },
      {
        date: '2026.08.10–12',
        label: 'HUMAN LINK',
        visual: 'human-link',
        decision: 'AI 추천과 사람이 확정한 근거 연결을 분리',
        trigger: '유사도 기반 자동 연결이 잘못된 근거를 반복 사용할 위험',
        change: '계획·QA·결정·업무 기록·change set의 confirm/reject 흐름 추가',
      },
      {
        date: '2026.08.19',
        label: 'REVIEW IN PRODUCT',
        visual: 'review-ui',
        decision: '검토자가 화면을 떠나지 않고 연결을 끝내는 UI',
        trigger: 'CLI 확정 과정과 branch별 중복 표시가 검토 흐름을 끊음',
        change: '직접 검색·연결, 중복 변경 묶기, 준비·수정·확정 UI',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / 2026.08.26 SNAPSHOT',
    title: '성과가 아니라, 연결하고 검토한 범위.',
    snapshot: '운영 데이터의 특정 시점 snapshot이며 현재 실시간 수치가 아닙니다.',
    items: [
      {
        value: '32',
        label: 'FEATURES',
        meaning: '기능 검증 범위에 등록된 기능',
        boundary: '기능 완료 수가 아님',
      },
      {
        value: '240',
        label: 'TRACE LINKS',
        meaning: 'Requirement·결정·계획·QA·업무 기록·change set 연결',
        boundary: '구현 일치율이 아님',
      },
      {
        value: '12 / 13',
        label: 'HUMAN-REVIEWED SETS',
        meaning: '사람의 확인을 거친 Requirement 세트',
        boundary: '기능 완료율이 아님',
      },
    ],
  },
  implementationStatus: {
    implemented: {
      label: 'IMPLEMENTED',
      phase: 'PHASE 1–2',
      items: [
        '읽기 중심 기능·명세·Requirement 검증 화면',
        '다중 source 추적 링크와 change set confirm/reject',
        '사람 확정 Requirement·연결·판정 이력 보존',
      ],
    },
    remaining: {
      label: 'NOT STARTED',
      phase: 'PHASE 3–4',
      items: [
        'HEAD·테스트·배포 evidence와 stale 자동 재분석',
        '반영 제안과 다른 제품 화면의 교차 동작',
      ],
    },
    runtime:
      '2026.08.19 운영 화면 배포와 제한된 실제 검토가 확인됐다. 정기 반복 사용이나 조직 표준 정착은 확인되지 않았다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / CURRENT SCOPE',
    statement: 'A traceable relation is not a finished feature.',
    items: [
      'AI는 구현 완료를 단독 확정하지 않는다.',
      '근거 부족을 완료 또는 미구현으로 추측하지 않는다.',
      'Requirement와 코드 변경의 연결은 품질·QA·배포·사용자·사업 결과를 증명하지 않는다.',
      '현재 확인된 구현 범위는 Phase 1–2이며 전체 상태는 partial이다.',
    ],
  },
  relatedSystems: [
    {
      title: 'DOCUMENTATION SYSTEM',
      relation: 'Requirement와 근거의 맥락을 다시 찾는 구조',
      href: '/how/documentation-system',
      status: 'available',
    },
    {
      title: 'AI-NATIVE ENGINEERING',
      relation: 'AI candidate를 검증하고 사람이 변경을 확정하는 방식',
      href: '/how/ai-native-engineering',
      status: 'available',
    },
    {
      title: 'AI TRUST / HUMAN REVIEW',
      relation: '후보와 공식 상태 사이의 승인 경계',
      status: 'in-development',
    },
  ],
} as const satisfies FeatureValidationPageContent
