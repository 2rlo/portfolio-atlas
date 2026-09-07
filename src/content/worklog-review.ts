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
      'AI는 자유 형식을 정리하고 모호함을 드러낸다. 보고에 쓸 문장은 사람이 확정한다.',
    summary:
      'Teams 원문에 AI 초안과 사람의 수정 이력을 연결하고, 검토 상태에 따라 주간보고 사용 여부를 구분했다.',
    problemLabel: 'PROBLEM / NORMALIZED DOES NOT MEAN UNDERSTOOD',
    problem:
      '사람마다 다른 표현과 생략된 맥락 때문에 AI 정규화만으로는 업무 기록을 안정적으로 해석할 수 없었다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / REVIEW CONTINUITY',
    title: '원문에서 보고 자료가 되기까지',
    instruction:
      '다섯 검토 지점의 설계 이유 · 포인터, 키보드, 터치 지원',
    defaultAnnotation: {
      index: '00',
      label: 'REVIEW GUIDE',
      title: '원문·AI 초안·사람 수정의 연결',
      body: '원문과 L3 초안을 비교해 빠진 조건을 질문으로 남긴다. 사람의 수정 이력과 보고 사용 상태를 같은 기록에 연결한다.',
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
          body: '하나의 기록에 Teams 원문, AI 초안, 검토자와 보고 사용 상태를 연결했다.',
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
      title: '작업·결과·확인할 조건을 나눠 검토하게 했다.',
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
          body: '구조화 초안은 검토를 돕는 임시 상태이며 공식 업무일지가 아니다.',
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
          body: 'AI가 찾은 불명확한 표현과 확인 질문을 별도로 표시한다. 부족한 조건은 임의로 채우지 않는다.',
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
      title: '처음부터 사람이 보고에 쓸 기록을 확정하게 했다.',
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
          body: '같은 주와 작성자 안에서도 원문별 검토 상태는 다를 수 있다. 미검토 자료를 확정 source처럼 쓰는 것도 위험하다.',
        },
        {
          label: 'DECISION',
          body: '같은 원문에 연결된 reviewed 기록을 우선하고, 검토본이 없는 원문에만 draft를 보완하며 결과에 미검토 포함 label을 남겼다.',
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
    title: '수집·정규화 뒤, 사람이 보고에 쓸 기록을 확정한다.',
    introduction:
      '각 단계와 연결된 검토 영역을 함께 강조',
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
        summary: '검토 상태를 보존해 주간보고에 입력',
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
          '모델은 자유 형식을 정리하고 확인할 지점을 제안한다. 업무 맥락은 사람이 확정한다.',
      },
      {
        statement: 'FALLBACK MUST BE VISIBLE.',
        explanation:
          '검토본이 없을 때 draft로 보고를 만들 수는 있지만, 미검토 source가 포함됐다는 사실을 결과에서 숨기지 않는다.',
      },
      {
        statement: 'FIXING THE PARSER ≠ FIXING OLD ROWS.',
        explanation:
          '발생 원인 수정, 저장된 초안 교정, 확정 데이터의 영향 여부, 재발 방지는 각각 확인한다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '요약 형식에서 보고 사용 규칙까지 바뀐 과정',
    introduction:
      'L3 형식 선택, 본문 배치 변경, 미검토 예외 표시, 용어집 보완, 날짜 오류 정리.',
    scenes: [
      {
        date: '2026.06.05',
        label: 'L3 REVIEW SHAPE',
        visual: 'review-level',
        decision: 'L1·L2·L3 중 모호함을 가장 구체적으로 드러내는 L3 선택',
        trigger: '자유 형식 원문을 한 문단으로 요약하면 검토할 조건이 묻힘',
        change: '작업·결과·불명확 사항과 사람 검토 상태를 분리',
        currentEffect: 'AI 초안과 검토 완료 기록을 구분하고, 검토본을 보고 자료로 우선 사용한다.',
      },
      {
        date: '2026.06.25',
        label: 'READABLE REVIEW',
        visual: 'readable-body',
        decision: '여러 속성에 흩어진 정규화 내용을 문서 본문으로 이동',
        trigger: '검토자가 여러 속성을 오가며 읽는 불편을 제기',
        change: '본문 렌더링을 검증하고 검토 화면의 읽기 순서 정리',
        currentEffect: '구조는 유지하면서 사람이 읽는 순서에 맞춰 내용을 배치한다.',
      },
      {
        date: '2026.07.03',
        label: 'VISIBLE FALLBACK',
        visual: 'fallback',
        decision: '검토 완료 0건일 때만 미검토 표시와 함께 초안 사용',
        trigger: '검토가 월요일까지 끝나지 않으면 주간보고 생성이 멈춤',
        change: '검토본 우선 규칙과 미검토 자료 포함 표시 추가',
        currentEffect: '보고가 생성돼도 입력 자료의 미검토 상태를 알 수 있다.',
      },
      {
        date: '2026.07.31',
        label: 'TERM SUPPORT',
        visual: 'glossary',
        decision: '반복되는 고유명사와 용어를 정규화 참고 목록으로 제공',
        trigger: '사람이 같은 사내 용어를 매번 다시 설명해야 함',
        change: 'AI 초안 생성 시 참고할 용어집 추가',
        currentEffect: '용어 해석을 보조하며, 사람의 검토는 계속 필요하다.',
      },
      {
        date: '2026.08.26–27',
        label: 'ANOMALY SEPARATION',
        visual: 'anomaly',
        decision: '원인 수정과 기존 미래 날짜 초안 교정을 서로 다른 완료로 기록',
        trigger: '원인 수정 뒤에도 미래 날짜의 기존 초안 2건이 남음',
        change: '사용자 날짜 교정 뒤 초안을 재조회하고, 확정 데이터의 영향 여부를 별도로 확인',
        currentEffect: '원인 수정·기존 데이터 정리·재발 방지 상태를 따로 기록한다.',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / 2026.09.04 SNAPSHOT',
    title: '검토 완료 기록과 AI 초안의 관측 규모',
    snapshot:
      '서로 다른 테이블과 상태를 읽은 snapshot입니다. 같은 cohort의 funnel이나 검토율로 합산하지 않습니다.',
    items: [
      {
        value: '295',
        label: 'RAW RECORDS',
        meaning: '원문 상태로 보존된 worklog row',
        boundary: '검토 대기·완료 건수와 같은 분모가 아님',
      },
      {
        value: '199',
        label: 'WEB QUEUE / UNREVIEWED',
        meaning: 'web 검토 queue에 남은 미검토 draft',
        boundary: '오류 건수나 미사용 기록 수가 아님',
      },
      {
        value: '141',
        label: 'REVIEWED-SOURCE LINKS',
        meaning: 'source ID로 사람 검토 기록과 연결된 원문',
        boundary: '295건 전체의 전환율이나 반복 사용량이 아님',
      },
    ],
  },
  implementationStatus: {
    state: 'IMPLEMENTED / DEPLOYED / WEB AUTHORITY',
    items: [
      'Teams 원문 수집과 AI L3 정규화 초안',
      'web에서 불명확 사항을 수정하고 source ID로 검토 완료',
      '같은 원문의 검토본 우선과 표시가 있는 draft 보완',
      'Notion으로 돌아가는 명시적 rollback mode',
      '날짜·편집 중복 보정과 용어집 참고',
    ],
    runtime:
      '2026.09.04 현재 업무일지 authority는 web이며 Notion은 자동 fallback이 아닌 명시적 rollback 경로다. 공개 화면은 원문 대신 상태 관계만 재구성했고, 검토 시간·정확도·반복 이용량은 측정하지 않았다.',
    feedback: {
      label: '사용자 인터뷰',
      text: '업무일지 한 건을 검토하는 데 걸리는 시간이 약 7분에서 4분으로 줄었다는 응답이 있었다.',
    },
  },
  boundary: {
    eyebrow: 'BOUNDARY / REVIEWED-FIRST, NOT AI-FIRST',
    statement: '빠진 맥락을 확인한 뒤, 보고에 쓸 기록으로 확정한다.',
    items: [
      'AI 정규화 초안은 사람 검토를 거쳐 공식 업무일지와 보고 자료로 확정한다.',
      '검토본이 없는 원문의 draft 보완은 명시적 예외이며 reviewed record와 같은 지위가 아니다.',
      '미래 날짜 초안 0건은 같은 조건으로 재조회한 결과다. 전체 날짜 정확도와 재발 방지는 별도 확인 대상이다.',
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
      relation: '자료의 역할과 현재 상태를 다시 찾는 방식',
      href: '/how/documentation-system',
      status: 'available',
    },
    {
      title: 'REPORT',
      relation: '검토 완료 기록과 명시적 fallback을 사용하는 downstream',
      href: '/what/report',
      status: 'available',
    },
  ],
} as const satisfies WorklogReviewPageContent
