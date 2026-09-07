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
      'PR 메시지와 AI가 추출한 구현 설명으로 후보를 찾고, 실제 변경 근거와 대조한다.',
    problemLabel: 'PROBLEM / SCATTERED EVIDENCE',
    problem:
      '명세·계획·QA·업무 기록과 코드 변경이 흩어져 있어, 비개발자가 기능 단위로 구현 여부를 다시 확인하기 어려웠다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / INSPECTION',
    title: '명세부터 판정까지, 다섯 판단 지점',
    instruction:
      '강조 영역의 설계 이유 · 포인터, 키보드, 터치 지원',
    defaultAnnotation: {
      index: '00',
      label: 'INSPECTION GUIDE',
      title: '다섯 개의 판단 지점',
      body: '요구사항을 기준으로 변경 근거와 AI 추천을 대조한다. 근거가 부족하면 UNKNOWN으로 남기고, 사람이 연결을 확정한 뒤 재분석한다.',
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
          body: '확정된 요구사항은 판정 기준이며, 구현 완료 상태와는 별개다.',
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
          body: 'PR·커밋 메시지만으로는 실제 변경 내용을 충분히 확인하기 어렵다.',
        },
        {
          label: 'DECISION',
          body: '변경 범위에 소스·심벌 근거를 묶고 기능과의 연결을 별도로 확정했다. 검토자는 연결된 실제 변경으로 돌아갈 수 있다.',
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
      title: 'AI는 관련 변경을 후보로 제안한다.',
      sections: [
        {
          label: 'WHY',
          body: '임베딩 유사도와 AI가 추출한 구현 설명만으로는 요구사항 충족 여부를 판단할 수 없다.',
        },
        {
          label: 'DECISION',
          body: 'AI가 추출한 구현 설명은 탐색 자료로 재사용하고, 사람이 확정한 연결만 명시적 재분석에 넣었다.',
        },
        {
          label: 'BOUNDARY',
          body: 'AI 답변만으로 근거 연결이나 공식 상태를 확정하지 않는다.',
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
          body: '잘린 diff나 아직 연결되지 않은 소스 때문에 근거가 빠질 수 있다. 이를 MISSING으로 처리하면 구현된 기능도 미구현으로 판정할 수 있다.',
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
          body: '사람이 후보 연결을 확정하거나 제외한 뒤, 명시적으로 재분석해 판정을 갱신하게 했다.',
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
    title: '근거 연결을 확정한 뒤, 판정을 다시 계산한다.',
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
      '명세·QA·코드 변경은 서로 다른 사실의 근거다. 링크 수나 AI 점수로 기능 완료를 계산하지 않는다.',
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
          '확인할 근거가 부족하면 UNKNOWN으로 남긴다.',
      },
      {
        statement: 'EVIDENCE MUST BE REVISITABLE.',
        explanation:
          '판정 당시의 요구사항과 연결한 변경 근거를 함께 보존한다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '읽기 중심 조회에서, 화면 안의 사람 검토까지.',
    introduction:
      '근거 누락에 대응한 UNKNOWN, AI 추천과 사람 확정의 분리, 검토 UI의 추가.',
    scenes: [
      {
        date: '2026.08.07',
        label: 'READ-ONLY START',
        visual: 'read-only',
        decision: 'AI가 공식 상태를 직접 수정하지 않는 읽기 중심 화면',
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
    eyebrow: 'EVIDENCE / 2026.09.04 SNAPSHOT',
    title: '등록한 기능과 검토한 연결의 범위',
    snapshot: '읽기 전용 production snapshot의 저장·분석 범위이며 현재 실시간 수치가 아닙니다.',
    items: [],
  },
  implementationStatus: {
    implemented: {
      label: 'IMPLEMENTED',
      phase: 'PHASE 1–2',
      items: [
        '기능·명세·요구사항을 조회하는 읽기 중심 검증 화면',
        '여러 출처의 추적 링크와 변경 묶음 연결 확정·제외',
        '사람이 확정한 요구사항과 연결·판정 이력 보존',
      ],
    },
    remaining: {
      label: 'NEXT SCOPE',
      phase: 'POLICY + PHASE 3–4',
      items: [
        'actor·domain별로 세분화한 permission policy',
        'HEAD·test·deployment evidence 자동 연결과 stale 재분석',
        '반영 proposal과 다른 제품 화면의 교차 동작',
      ],
    },
    runtime:
      '2026.09.04 기준 Phase 1–2의 구현과 production 경로를 확인했다. Phase 3–4의 자동 evidence·stale 재분석·proposal workflow는 시작하지 않았다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / CURRENT SCOPE',
    statement: '근거 연결이 확인된 범위와, 아직 남은 검증.',
    items: [
      'AI는 구현 완료를 단독 확정하지 않는다.',
      '근거 부족을 완료 또는 미구현으로 추측하지 않는다.',
      '요구사항과 코드 변경을 연결해도 품질·QA·배포·사용자·사업 결과는 각각 확인해야 한다.',
      '현재 권한은 조회·편집의 coarse gate이며 actor·domain별 세분화는 planned다.',
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
    {
      title: 'AI TRUST / HUMAN REVIEW',
      relation: '후보와 공식 상태 사이의 승인 경계',
      status: 'in-development',
    },
  ],
} as const satisfies FeatureValidationPageContent
