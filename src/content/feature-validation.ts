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
      '기능별 요구사항과 코드 변경을 한 화면에서 검토하도록 만들었다.',
    summary:
      'AI가 관련 변경을 찾으면 검토자가 연결을 수정하고 확정한다. 당시 명세와 판정 이력도 함께 남겨, 같은 기능을 다시 확인할 때 판단 과정을 따라갈 수 있게 했다.',
    problemLabel: '흩어진 구현 정보',
    problem:
      '기획 문서와 QA, 업무 기록, 코드 변경이 각각 다른 곳에 있었다. 비개발자가 기능 하나의 구현 여부를 확인하려면 자료를 모으고 개발자에게 다시 물어야 했다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / INSPECTION',
    title: '기능 하나를 검토하는 화면',
    instruction:
      '요구사항과 연결된 변경을 선택하면 설계 이유를 읽을 수 있다.',
    defaultAnnotation: {
      index: '00',
      label: 'INSPECTION GUIDE',
      title: '명세와 변경을 나란히 확인',
      body: '요구사항을 기준으로 변경 근거와 AI 추천을 대조한다. 근거가 부족하면 UNKNOWN으로 남기고, 사람이 연결을 확정한 뒤 재분석한다.',
    },
  },
  product: featureValidationProductFixture,
  annotations: [
    {
      id: 'requirement',
      index: '01',
      label: 'REQUIREMENT',
      title: '판정 당시의 명세를 보존',
      sections: [
        {
          label: 'WHY',
          body: '기능 설명이 바뀌면 과거 판정의 기준도 흔들린다. 현재 문장만 남겨서는 당시 판단을 재현하기 어렵다.',
        },
        {
          label: 'DECISION',
          body: 'AI가 추출한 문구를 검토자가 수정하고 확정하도록 했다. 확정한 요구사항은 명세 이력과 함께 보존해, 재분석 후에도 당시의 판정 기준을 다시 읽을 수 있다.',
        },
      ],
      evolution: { label: 'EVOLVED FROM', date: '2026.08.10' },
    },
    {
      id: 'evidence',
      index: '02',
      label: 'CODE EVIDENCE',
      title: '실제 코드 변경으로 이동',
      sections: [
        {
          label: 'WHY',
          body: 'PR·커밋 메시지만으로는 실제 변경 내용을 충분히 확인하기 어렵다.',
        },
        {
          label: 'DECISION',
          body: '변경 범위에 소스·심벌 근거를 묶고 기능과의 연결을 별도로 확정했다. 검토자는 연결된 실제 변경으로 돌아갈 수 있다.',
        },
      ],
      evolution: { label: 'LINKED IN', date: '2026.08.10–12' },
    },
    {
      id: 'ai-assessment',
      index: '03',
      label: 'AI CANDIDATE',
      title: '관련 변경을 찾는 AI 추천',
      sections: [
        {
          label: 'WHY',
          body: '임베딩 유사도와 AI가 추출한 구현 설명만으로는 요구사항 충족 여부를 판단할 수 없다.',
        },
        {
          label: 'DECISION',
          body: 'AI가 추출한 구현 설명과 임베딩 검색으로 관련 변경을 찾는다. 검토자는 후보를 대조하고 연결을 확정한 뒤 재분석한다.',
        },
      ],
      evolution: { label: 'REUSED SINCE', date: '2026.08.11' },
    },
    {
      id: 'unknown',
      index: '04',
      label: 'UNKNOWN',
      title: '자료가 빠지면 확인 필요로 표시',
      sections: [
        {
          label: 'WHY',
          body: '잘린 diff나 아직 연결되지 않은 소스 때문에 근거가 빠질 수 있다. 이를 MISSING으로 처리하면 구현된 기능도 미구현으로 판정할 수 있다.',
        },
        {
          label: 'DECISION',
          body: '근거의 완전성을 먼저 확인하고 부족하면 UNKNOWN·확인 필요에서 멈추게 했다.',
        },
      ],
      evolution: { label: 'CORRECTED ON', date: '2026.08.10' },
    },
    {
      id: 'human-review',
      index: '05',
      label: 'HUMAN REVIEW',
      title: '화면 안에서 연결을 확정',
      sections: [
        {
          label: 'WHY',
          body: '의미가 비슷하다는 이유만으로 자동 연결하면 잘못된 근거가 이후 판정에 반복 사용될 수 있다.',
        },
        {
          label: 'DECISION',
          body: '사람이 후보 연결을 확정하거나 제외한 뒤, 명시적으로 재분석해 판정을 갱신하게 했다.',
        },
      ],
      evolution: { label: 'MOVED INTO UI', date: '2026.08.19' },
    },
  ],
  workflow: {
    eyebrow: 'PRODUCT WORKFLOW',
    title: '요구사항부터 판정까지',
    introduction:
      '각 단계와 연결된 화면 요소를 함께 강조',
    steps: [
      {
        id: 'workflow-requirement',
        hotspotId: 'requirement',
        index: '01',
        label: 'REQUIREMENT',
        summary: '사람이 확정한 문구와 당시 명세',
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
      '검토자는 요구사항 옆에서 관련 변경을 찾고 연결을 확정한다. 재분석한 판정과 사용한 자료를 함께 남긴다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    items: [
      {
        statement: '추천과 확정을 나눈 검토 흐름',
        explanation:
          'AI는 요구사항과 변경 근거 사이의 후보를 찾는다. 공식 상태를 바꾸는 결정은 사람이 맡는다.',
      },
      {
        statement: '자료 누락을 다루는 상태',
        explanation:
          '확인할 근거가 부족하면 UNKNOWN으로 남긴다.',
      },
      {
        statement: '다시 열 수 있는 판정 이력',
        explanation:
          '판정 당시의 요구사항과 연결한 변경 근거를 함께 보존한다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '조회 화면에 검토 기능을 더하다',
    introduction:
      '잘린 코드 차이를 미구현으로 오판한 문제를 고쳤고, CLI에서 하던 연결 작업을 제품 화면으로 옮겼다.',
    scenes: [
      {
        date: '2026.08.07',
        label: 'READ-ONLY START',
        visual: 'read-only',
        decision: '흩어진 명세와 변경을 모은 조회 화면',
        trigger: '명세와 구현 근거가 흩어져 기능 단위 검토가 어려움',
        change: '기능·명세 이력·요구사항·기존 근거를 한 화면에서 조회',
      },
      {
        date: '2026.08.10',
        label: 'SAFE UNKNOWN',
        visual: 'unknown',
        decision: '근거 완전성이 불명확하면 MISSING 대신 UNKNOWN',
        trigger: '잘린 diff와 미연결 소스로 미구현 오판 발생',
        change: '근거 부족은 UNKNOWN으로 남기고, 사람이 확정한 요구사항 문구는 보존',
      },
      {
        date: '2026.08.10–12',
        label: 'HUMAN LINK',
        visual: 'human-link',
        decision: 'AI 추천과 사람이 확정한 근거 연결을 분리',
        trigger: '유사도 기반 자동 연결이 잘못된 근거를 반복 사용할 위험',
        change: '계획·QA·결정·업무 기록·변경 묶음의 연결 확정·제외 흐름 추가',
      },
      {
        date: '2026.08.19',
        label: 'REVIEW IN PRODUCT',
        visual: 'review-ui',
        decision: '검토자가 화면을 떠나지 않고 연결을 끝내는 UI',
        trigger: 'CLI에서의 확정과 브랜치별 중복 표시로 검토 흐름 단절',
        change: '직접 검색·연결, 중복 변경 묶기, 준비·수정·확정 UI',
      },
    ],
  },
  evidence: {
    eyebrow: '검토 작업의 변화',
    title: '한 화면에서 끝내는 근거 연결',
    snapshot: '기능을 고른 뒤 요구사항을 읽고, 관련 변경을 찾아 연결하고, 판정을 갱신하는 순서로 화면을 구성했다.',
    items: [],
  },
  implementationStatus: {
    implemented: {
      label: '자료 찾기',
      phase: '명세와 변경을 함께 조회',
      items: [
        '기능별 요구사항과 명세 이력 조회',
        '계획과 QA, 업무 기록에서 관련 자료 검색',
        '브랜치별로 중복 표시되던 변경을 하나로 묶어 확인',
      ],
    },
    remaining: {
      label: '검토 마무리',
      phase: '수정하고 확정한 뒤 재분석',
      items: [
        '요구사항 문구를 준비하고 수정한 뒤 확정',
        '추천된 연결을 확정하거나 제외',
        '확정한 문구와 연결, 판정 이력 보존',
      ],
    },
    runtime: '직접 검색과 연결 확정을 화면으로 옮겨, 검토자가 CLI를 오가던 작업을 제품 안에서 마칠 수 있게 했다.',
  },
  boundary: {
    eyebrow: '설계에서 배운 점',
    statement: '판정을 고칠 수 있는 검토 화면',
    items: [
      '잘린 diff와 미연결 소스를 MISSING으로 처리하자 구현된 기능도 미구현으로 보였다. 자료가 부족한 경우를 UNKNOWN으로 분리했다.',
      '검토자가 확정한 요구사항은 재분석 때 보존한다. AI 추천이 달라져도 사람이 잡은 기준을 유지한다.',
    ],
  },
  relatedSystems: [
    {
      title: 'DOCUMENTATION SYSTEM',
      relation: '요구사항과 근거의 맥락을 다시 찾는 구조',
      href: '/how/documentation-system',
      status: 'available',
    },
    {
      title: 'AI-NATIVE ENGINEERING',
      relation: 'AI 후보를 검증하고 사람이 변경을 확정하는 방식',
      href: '/how/ai-native-engineering',
      status: 'available',
    },
  ],
} as const satisfies FeatureValidationPageContent
