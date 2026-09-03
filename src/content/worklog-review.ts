import type { WorklogReviewPageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { worklogReviewProductFixture } from './fixtures/worklog-review.ts'

export const worklogReviewContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED REVIEW VIEW / SYNTHETIC DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 04',
    titleLines: ['WORKLOG', 'REVIEW'],
    thesis:
      'AI는 자유 형식을 정리하고 모호함을 드러낸다. 보고 source가 되는 문장은 사람이 확정한다.',
    summary:
      'Teams 원문과 구조화 초안, 사람의 수정, 주간보고 eligibility를 하나의 continuity record로 연결했다.',
    problemLabel: 'PROBLEM / NORMALIZED DOES NOT MEAN UNDERSTOOD',
    problem:
      '사람마다 다른 표현과 생략된 맥락 때문에 AI 정규화만으로는 업무 기록을 안정적으로 해석할 수 없었다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / REVIEW CONTINUITY',
    title: '문장을 다듬는 화면보다, source의 지위가 바뀌는 경계를 살펴보세요.',
    instruction:
      '다섯 지점에 hover, focus 또는 tap하면 원문·초안·모호함·사람 수정·보고 반영의 설계 이유가 오른쪽 여백에 표시됩니다.',
    defaultAnnotation: {
      index: '00',
      label: 'REVIEW GUIDE',
      title: '같은 기록을 따라가되, 각 상태의 권한은 섞지 않는다.',
      body: 'Raw message, L3 draft, ambiguity, human correction, report-source boundary를 따라가면 AI가 정리한 문장과 사람이 확정한 기록이 분리되는 방식을 볼 수 있습니다.',
    },
  },
  product: worklogReviewProductFixture,
  annotations: [
    {
      id: 'source-continuity',
      index: '01',
      label: 'SOURCE CONTINUITY',
      title: '요약문이 좋아져도 원문으로 돌아갈 길을 남겼다.',
      sections: [
        {
          label: 'WHY',
          body: '정규화 과정에서 사내 용어와 생략된 조건이 보완되면 어느 표현이 원문이고 어느 부분이 해석인지 흐려질 수 있다.',
        },
        {
          label: 'DECISION',
          body: '하나의 continuity record로 Teams 원문, AI draft, reviewer, 보고 source 상태를 연결했다.',
        },
        {
          label: 'BOUNDARY',
          body: '공개 화면의 메시지와 식별자는 모두 합성값이며 실제 업무 원문을 재현하지 않는다.',
        },
      ],
    },
    {
      id: 'structured-draft',
      index: '02',
      label: 'L3 STRUCTURED DRAFT',
      title: 'AI의 역할을 완성 문장보다 검토 가능한 구조에 뒀다.',
      sections: [
        {
          label: 'WHY',
          body: '한 문단 요약은 자연스럽지만 작업·결과·추가 확인 사항이 섞여 있으면 사람이 빠르게 판단하기 어렵다.',
        },
        {
          label: 'DECISION',
          body: 'L1·L2·L3 형식을 비교해 작업, 결과, 불명확 지점을 가장 세분화한 L3를 검토 초안으로 선택했다.',
        },
        {
          label: 'BOUNDARY',
          body: '구조화 draft는 검토를 돕는 임시 상태이며 공식 업무일지가 아니다.',
        },
      ],
      evolution: { label: 'L3 SELECTED', date: '2026.06.05' },
    },
    {
      id: 'ambiguity-level',
      index: '03',
      label: 'AMBIGUITY AS REVIEW WORK',
      title: '모호함을 숨기지 않고 사람이 답할 질문으로 바꿨다.',
      sections: [
        {
          label: 'WHY',
          body: '“간헐적”, “완료”, “문제 없음” 같은 표현은 조건이 빠지면 보고 문장으로 확정할 수 없다.',
        },
        {
          label: 'DECISION',
          body: 'AI가 부족한 조건을 임의로 채우는 대신 ambiguity와 review question으로 별도 표시한다.',
        },
        {
          label: 'EVIDENCE',
          body: '반복되는 고유명사 문제는 2026.07.31 용어집을 추가해 보완했지만 정확도 향상률은 측정하지 않았다.',
        },
      ],
      evolution: { label: 'GLOSSARY SUPPORT', date: '2026.07.31' },
    },
    {
      id: 'human-correction',
      index: '04',
      label: 'HUMAN CORRECTION',
      title: '사람 검토는 실패 뒤 붙인 절차가 아니라 최초 workflow의 authority였다.',
      sections: [
        {
          label: 'WHY',
          body: '업무 맥락과 보고에 필요한 확정 조건은 작성자·검토자가 원문을 다시 확인해야 결정할 수 있다.',
        },
        {
          label: 'DECISION',
          body: 'AI는 정규화와 확인 지점 표시까지 담당하고, 사람이 수정·검토 완료한 기록을 우선 원본으로 삼았다.',
        },
        {
          label: 'BOUNDARY',
          body: '승인은 기록의 보고 사용 가능 상태를 정한다. 기능 완료나 업무 효과를 자동 증명하지 않는다.',
        },
      ],
    },
    {
      id: 'report-boundary',
      index: '05',
      label: 'REPORT-SOURCE BOUNDARY',
      title: '미검토 초안을 쓰는 예외는 숨기지 않는다.',
      sections: [
        {
          label: 'WHY',
          body: '월요일까지 검토 완료 기록이 0건이면 보고 생성 자체가 멈추지만, 미검토 자료를 확정 source처럼 쓰는 것도 위험하다.',
        },
        {
          label: 'DECISION',
          body: '검토본을 우선하고 0건일 때만 draft를 fallback으로 사용하며 결과에 미검토 포함 label을 남겼다.',
        },
        {
          label: 'BOUNDARY',
          body: 'fallback은 availability 경로다. 사람 검토를 대체하거나 같은 신뢰 수준을 부여하지 않는다.',
        },
      ],
      evolution: { label: 'EXPLICIT FALLBACK', date: '2026.07.03' },
    },
  ],
  workflow: {
    eyebrow: 'REVIEW WORKFLOW',
    title: '수집과 정규화는 자동화하고, 보고에 쓸 문장은 사람이 닫는다.',
    introduction:
      '각 단계에 focus하거나 pointer를 올리면 제품 surface의 대응 지점도 함께 강조됩니다.',
    steps: [
      {
        id: 'workflow-source',
        hotspotId: 'source-continuity',
        index: '01',
        label: 'RAW MESSAGE',
        summary: '자유 형식 원문과 날짜 보존',
      },
      {
        id: 'workflow-draft',
        hotspotId: 'structured-draft',
        index: '02',
        label: 'AI DRAFT',
        summary: '작업·결과·확인 지점 구조화',
      },
      {
        id: 'workflow-question',
        hotspotId: 'ambiguity-level',
        index: '03',
        label: 'AMBIGUITY',
        summary: '빠진 조건을 질문으로 표시',
      },
      {
        id: 'workflow-review',
        hotspotId: 'human-correction',
        index: '04',
        label: 'HUMAN REVIEW',
        summary: '원문 확인 뒤 수정·확정',
      },
      {
        id: 'workflow-report',
        hotspotId: 'report-boundary',
        index: '05',
        label: 'REPORT SOURCE',
        summary: '검토 상태를 보존해 주간 입력',
      },
    ],
    boundary:
      '같은 문장이 이동하는 것이 아니라 source authority가 단계마다 달라진다. AI draft와 reviewed record를 같은 입력으로 취급하지 않는다.',
  },
  rules: {
    eyebrow: 'SOURCE RULES',
    title: '보고가 생성되는 것과, 근거가 확정되는 것은 다른 상태다.',
    items: [
      {
        statement: 'AI NORMALIZES. PEOPLE CONFIRM.',
        explanation:
          '모델은 자유 형식을 정리하고 확인할 지점을 제안한다. 업무 맥락을 확정하는 authority는 사람에게 남긴다.',
      },
      {
        statement: 'FALLBACK MUST BE VISIBLE.',
        explanation:
          '검토본이 없을 때 draft로 보고를 만들 수는 있지만, 미검토 source가 포함됐다는 사실을 결과에서 숨기지 않는다.',
      },
      {
        statement: 'FIXING THE PARSER ≠ FIXING OLD ROWS.',
        explanation:
          '발생 원인 수정, 이미 저장된 초안 교정, canonical 데이터 비오염, 재발 방지는 서로 다른 확인 상태다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '더 자연스러운 요약보다, 더 확인하기 쉬운 기록으로.',
    introduction:
      '현재 review component와 source boundary에 직접 남은 변화만 다섯 장면으로 정리했습니다.',
    scenes: [
      {
        date: '2026.06.05',
        label: 'L3 REVIEW SHAPE',
        visual: 'review-level',
        decision: 'L1·L2·L3 중 모호함을 가장 구체적으로 드러내는 L3 선택',
        trigger: '자유 형식 원문을 한 문단으로 요약하면 검토할 조건이 묻힘',
        change: '작업·결과·불명확 사항과 사람 검토 상태를 분리',
        currentEffect: 'AI draft는 검토 재료로만 남고 reviewed record가 우선 source가 된다.',
      },
      {
        date: '2026.06.25',
        label: 'READABLE REVIEW',
        visual: 'readable-body',
        decision: '정규화 본문을 속성 묶음보다 읽기 쉬운 body로 이동',
        trigger: '검토자가 여러 속성을 오가며 읽는 불편을 제기',
        change: '본문 렌더링 경로를 검증하고 review surface의 읽기 흐름 개선',
        currentEffect: '구조는 유지하면서 사람이 읽는 순서에 맞춰 내용을 배치한다.',
      },
      {
        date: '2026.07.03',
        label: 'VISIBLE FALLBACK',
        visual: 'fallback',
        decision: '검토 완료 0건일 때만 draft fallback과 명시적 label 허용',
        trigger: '검토가 월요일까지 끝나지 않으면 주간보고 생성이 멈춤',
        change: 'reviewed-first 규칙과 unreviewed included 표시 추가',
        currentEffect: '생성 가능성과 source 신뢰 수준을 같은 상태로 숨기지 않는다.',
      },
      {
        date: '2026.07.31',
        label: 'TERM SUPPORT',
        visual: 'glossary',
        decision: '반복되는 고유명사와 용어를 정규화 참고 목록으로 제공',
        trigger: '사람이 같은 사내 용어를 매번 다시 설명해야 함',
        change: '용어집 context를 draft 생성 경로에 추가',
        currentEffect: '검토 질문을 줄이려는 보조 장치지만 정확도 향상은 주장하지 않는다.',
      },
      {
        date: '2026.08.26–27',
        label: 'ANOMALY SEPARATION',
        visual: 'anomaly',
        decision: '원인 수정과 기존 미래 날짜 초안 교정을 서로 다른 완료로 기록',
        trigger: '원인 수정 뒤에도 기존 draft 두 행이 남아 있음',
        change: '사용자 날짜 교정 후 draft 재조회, reviewed canonical 비오염 별도 확인',
        currentEffect: '수정·데이터 정리·재발 방지를 하나의 완료 claim으로 합치지 않는다.',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / 2026.08.27 12:42 KST',
    title: '검토 상태의 규모를 세되, 생산성으로 바꾸지 않는다.',
    snapshot:
      '서로 다른 테이블과 상태를 읽은 시점 snapshot입니다. 열람 수·시간 절감·정규화 정확도 지표가 아닙니다.',
    items: [
      {
        value: '332',
        label: 'REVIEWED WORKLOGS',
        meaning: '사람 검토 완료 상태로 관측된 업무일지 row',
        boundary: '고유 업무 사건 수나 실제 열람 수가 아님',
      },
      {
        value: '302',
        label: 'AI DRAFTS',
        meaning: '공식 검토 데이터와 별도로 유지된 정규화 초안 row',
        boundary: '모두 오류이거나 모두 사용됐다는 뜻이 아님',
      },
      {
        value: '2 → 0',
        label: 'FUTURE-DATED DRAFTS',
        meaning: '11:45 발견 뒤 사용자 교정, 12:42 같은 조건 재조회 결과',
        boundary: '전체 날짜 정확도나 재발 방지를 보증하지 않음',
      },
    ],
  },
  implementationStatus: {
    state: 'IMPLEMENTED / DEPLOYED / REVIEWED-FIRST',
    items: [
      'Teams 원문 수집과 AI L3 정규화 draft',
      '불명확 사항 표시와 사람 수정·검토 완료 상태',
      '검토본 우선 주간보고와 0건 fallback label',
      '날짜·편집 중복 보정과 용어집 context',
    ],
    runtime:
      '검토 데이터 누적과 주간보고 입력 경로는 운영에서 확인됐다. 공개 화면은 실제 Notion 기록을 복사하지 않고 그 상태 관계만 재구성했다. 검토 시간 절감·정확도·사용자별 반복 이용량은 측정하지 않았다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / REVIEWED-FIRST, NOT AI-FIRST',
    statement: 'A clean sentence is still a draft until its missing context is answered.',
    items: [
      'AI 정규화 결과를 바로 공식 업무일지나 확정 보고 source로 사용하지 않는다.',
      '검토 완료 0건 fallback은 명시적 예외이며 reviewed record와 같은 지위가 아니다.',
      '미래 날짜 draft 0건 재조회는 전체 데이터 정확도나 재발 방지 효과를 뜻하지 않는다.',
      '데이터 누적은 확인했지만 보고 준비 시간 단축·읽은 사용자 수·의사결정 효과는 미측정이다.',
    ],
  },
  relatedSystems: [
    {
      title: 'AI CANDIDATE REVIEW',
      relation: 'AI가 만든 중간 상태를 사람 결정 전까지 분리하는 공통 경계',
      href: '/what/ai-candidate-review',
      status: 'available',
    },
    {
      title: 'DOCUMENTATION SYSTEM',
      relation: 'source authority와 현재 상태를 다시 찾는 방식',
      href: '/how/documentation-system',
      status: 'available',
    },
    {
      title: 'REPORT',
      relation: '검토 완료 기록과 명시적 fallback을 사용하는 downstream',
      status: 'in-development',
    },
  ],
} as const satisfies WorklogReviewPageContent
