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
    titleLines: [
      'WORKLOG',
      'REVIEW'
    ],
    thesis: '제각각인 업무일지를 정리하고, 검토자가 확인할 부분부터 보여줬다.',
    summary: 'Teams 원문과 AI 초안을 나란히 읽고 수정할 수 있게 했습니다. 검토를 마친 기록은 주간보고로 이어집니다.',
    problemLabel: 'PROBLEM / REPEATED REVIEW',
    problem: '작성자마다 표현이 달라 검토자가 작업 내용과 결과를 다시 읽어 정리해야 했습니다. 생략된 조건과 사내 용어도 매번 확인이 필요했습니다.'
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / REVIEW CONTINUITY',
    title: '원문에서 보고 자료가 되기까지',
    instruction: '원문부터 보고 자료까지, 화면의 각 영역에서 설계 이유를 확인하세요.',
    defaultAnnotation: {
      index: '00',
      label: 'REVIEW GUIDE',
      title: '원문 옆에서 초안을 검토',
      body: '원문과 구조화한 초안을 비교하고 빠진 조건을 질문으로 남깁니다. 사람이 수정한 이력과 보고 사용 상태도 같은 기록에 연결됩니다.'
    }
  },
  product: worklogReviewProductFixture,
  annotations: [
    {
      id: 'source-continuity',
      index: '01',
      label: 'SOURCE CONTINUITY',
      title: '원문과 수정 이력을 한 기록에 연결했다.',
      sections: [
        {
          label: 'WHY',
          body: '정리된 문장만 읽으면 사내 용어와 생략된 조건을 어디서 보완했는지 알기 어려웠습니다.'
        },
        {
          label: 'DECISION',
          body: '하나의 기록에 Teams 원문, AI 초안, 검토자와 보고 사용 상태를 연결했습니다. 검토자는 초안에서 원문으로 돌아가 해석을 대조합니다.'
        }
      ]
    },
    {
      id: 'structured-draft',
      index: '02',
      label: 'L3 STRUCTURED DRAFT',
      title: '작업과 결과, 확인할 조건을 나눴다.',
      sections: [
        {
          label: 'WHY',
          body: '한 문단 안에 작업과 결과, 추가 확인 사항이 섞여 있으면 검토자가 빠르게 판단하기 어려웠습니다.'
        },
        {
          label: 'DECISION',
          body: 'L1, L2, L3 형식을 비교해 작업과 결과, 불명확 지점을 가장 세분화한 L3를 검토 초안으로 선택했습니다.'
        }
      ],
      evolution: {
        label: 'L3 SELECTED',
        date: '2026.06.05'
      }
    },
    {
      id: 'ambiguity-level',
      index: '03',
      label: 'REVIEW QUESTIONS',
      title: '빠진 조건을 확인 질문으로 바꿨다.',
      sections: [
        {
          label: 'WHY',
          body: '간헐적, 완료, 문제 없음 같은 표현에는 판단에 필요한 조건이 생략되곤 했습니다.'
        },
        {
          label: 'DECISION',
          body: 'AI가 찾은 불명확한 표현과 확인 질문을 따로 표시해 검토자가 보완할 지점을 짚었습니다. 반복되는 고유명사 문제는 용어집을 추가해 보완했습니다.'
        }
      ],
      evolution: {
        label: 'GLOSSARY SUPPORT',
        date: '2026.07.31'
      }
    },
    {
      id: 'human-correction',
      index: '04',
      label: 'HUMAN CORRECTION',
      title: '수정한 기록을 보고 자료로 확정한다.',
      sections: [
        {
          label: 'WHY',
          body: '업무 맥락과 보고에 필요한 조건은 작성자와 검토자가 원문을 다시 읽고 확인해야 했습니다.'
        },
        {
          label: 'DECISION',
          body: 'AI가 정리한 초안에서 사람이 내용을 고치고 검토를 완료하도록 했습니다. 같은 원문의 검토 완료 기록을 보고에 먼저 사용합니다.'
        }
      ]
    },
    {
      id: 'report-boundary',
      index: '05',
      label: 'REPORT SOURCE',
      title: '보고서에서도 검토 상태를 이어간다.',
      sections: [
        {
          label: 'WHY',
          body: '같은 주에 같은 사람이 쓴 기록도 원문마다 검토 상태가 달라, 보고에 어떤 자료를 썼는지 알아야 했습니다.'
        },
        {
          label: 'DECISION',
          body: '같은 원문의 검토 완료 기록을 우선했습니다. 검토본이 없는 원문은 초안으로 보완하고 보고서에 미검토 자료 포함을 표시했습니다.'
        }
      ],
      evolution: {
        label: 'EXPLICIT FALLBACK',
        date: '2026.07.03'
      }
    }
  ],
  workflow: {
    eyebrow: 'REVIEW WORKFLOW',
    title: '초안을 읽고, 보완하고, 보고에 사용한다.',
    introduction: '각 단계와 연결된 검토 영역을 함께 강조',
    steps: [
      {
        id: 'workflow-source',
        hotspotId: 'source-continuity',
        index: '01',
        label: 'RAW MESSAGE',
        summary: '자유 형식 원문과 날짜 보존'
      },
      {
        id: 'workflow-draft',
        hotspotId: 'structured-draft',
        index: '02',
        label: 'AI DRAFT',
        summary: '작업·결과·확인 지점 구조화'
      },
      {
        id: 'workflow-question',
        hotspotId: 'ambiguity-level',
        index: '03',
        label: 'AMBIGUITY',
        summary: '빠진 조건을 질문으로 표시'
      },
      {
        id: 'workflow-review',
        hotspotId: 'human-correction',
        index: '04',
        label: 'HUMAN REVIEW',
        summary: '원문 확인 뒤 수정·확정'
      },
      {
        id: 'workflow-report',
        hotspotId: 'report-boundary',
        index: '05',
        label: 'REPORT SOURCE',
        summary: '검토 상태를 보존해 주간보고에 입력'
      }
    ],
    boundary: '원문과 초안, 사람의 수정 이력이 이어져 보고에 쓸 문장을 확정하는 과정을 다시 볼 수 있습니다.'
  },
  rules: {
    eyebrow: 'DESIGN DECISIONS',
    title: '검토할 부분부터 보여주기',
    items: [
      {
        statement: '확인할 지점을 먼저 표시',
        explanation: '모델은 자유 형식을 정리하고 확인 질문을 만듭니다. 검토자는 원문과 질문을 읽고 업무 맥락을 보완합니다.'
      },
      {
        statement: '검토 상태를 보고까지 연결',
        explanation: '검토본이 없는 자료도 주간보고에 포함할 수 있게 하고, 추가로 확인할 자료를 상태로 표시했습니다.'
      },
      {
        statement: '오류 수정 뒤 저장 데이터 확인',
        explanation: '날짜 해석 로직을 고친 뒤 기존 초안을 다시 조회하고, 확정 데이터에 미친 영향도 확인했습니다.'
      }
    ]
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '검토자가 읽는 순서에 맞춰 바꿨다.',
    introduction: '요약 형식을 비교한 뒤 사용자 의견으로 본문 배치를 바꿨습니다. 반복되는 용어와 날짜 오류도 순차적으로 보완했습니다.',
    scenes: [
      {
        date: '2026.06.05',
        label: 'L3 REVIEW SHAPE',
        visual: 'review-level',
        decision: 'L1·L2·L3 중 모호함을 가장 구체적으로 드러내는 L3 선택',
        trigger: '자유 형식 원문을 한 문단으로 요약하면 검토할 조건이 묻힘',
        change: '작업·결과·불명확 사항과 사람 검토 상태를 분리',
        currentEffect: 'AI 초안과 검토 완료 기록을 구분하고, 검토본을 보고 자료로 우선 사용한다.'
      },
      {
        date: '2026.06.25',
        label: 'READABLE REVIEW',
        visual: 'readable-body',
        decision: '여러 속성에 흩어진 정규화 내용을 문서 본문으로 이동',
        trigger: '검토자가 여러 속성을 오가며 읽는 불편을 제기',
        change: '본문 렌더링을 검증하고 검토 화면의 읽기 순서 정리',
        currentEffect: '구조는 유지하면서 사람이 읽는 순서에 맞춰 내용을 배치한다.'
      },
      {
        date: '2026.07.03',
        label: 'VISIBLE FALLBACK',
        visual: 'fallback',
        decision: '검토 완료 0건일 때만 미검토 표시와 함께 초안 사용',
        trigger: '검토가 월요일까지 끝나지 않으면 주간보고 생성이 멈춤',
        change: '검토본 우선 규칙과 미검토 자료 포함 표시 추가',
        currentEffect: '보고가 생성돼도 입력 자료의 미검토 상태를 알 수 있다.'
      },
      {
        date: '2026.07.31',
        label: 'TERM SUPPORT',
        visual: 'glossary',
        decision: '반복되는 고유명사와 용어를 정규화 참고 목록으로 제공',
        trigger: '사람이 같은 사내 용어를 매번 다시 설명해야 함',
        change: 'AI 초안 생성 시 참고할 용어집 추가',
        currentEffect: '초안을 생성할 때 같은 용어집을 참조하도록 연결'
      },
      {
        date: '2026.08.26–27',
        label: 'ANOMALY SEPARATION',
        visual: 'anomaly',
        decision: '원인 수정 완료와 미래 날짜로 저장된 기존 초안의 교정 완료를 따로 기록',
        trigger: '원인 수정 뒤에도 미래 날짜의 기존 초안 2건이 남음',
        change: '사용자 날짜 교정 뒤 초안을 재조회하고, 확정 데이터의 영향 여부를 별도로 확인',
        currentEffect: '원인 수정·기존 데이터 정리·재발 방지 상태를 따로 기록한다.'
      }
    ]
  },
  evidence: {
    eyebrow: 'WORK CHANGES',
    title: '한 건을 검토하는 시간이 줄었다.',
    snapshot: '여러 속성을 오가던 내용을 본문에 모으고, 원문과 확인 질문을 가까이 배치했습니다.',
    items: []
  },
  implementationStatus: {
    state: '업무의 변화',
    items: [
      'Teams 원문 수집과 작업별 초안 정리',
      '웹에서 내용 수정과 원문별 검토 완료',
      '검토 완료 기록을 주간보고에 우선 사용',
      '날짜와 편집 중복 보정, 용어집 참조'
    ],
    runtime: '검토자는 원문과 초안, 확인 질문을 한곳에서 읽고 수정합니다. 확정한 기록을 주간보고로 보내는 과정도 같은 기록에 남습니다.',
    feedback: {
      label: '사용자 인터뷰',
      text: '업무일지 한 건을 검토하는 데 걸리는 시간이 약 7분에서 4분으로 줄었다는 응답이 있었다.'
    }
  },
  boundary: {
    eyebrow: 'DESIGN TAKEAWAY',
    statement: '사람이 읽는 순서로 배치했다.',
    items: [
      '사용자가 제기한 읽기 불편을 바탕으로 본문 배치를 고쳤고, 반복되는 용어 설명은 용어집으로 보완했습니다.'
    ]
  },
  relatedSystems: [
    {
      title: 'AI CANDIDATE REVIEW',
      relation: 'AI 제안을 원문과 함께 검토하고 확정하는 흐름',
      href: '/what/ai-candidate-review',
      status: 'available'
    },
    {
      title: 'DOCUMENTATION SYSTEM',
      relation: '자료의 역할과 현재 상태를 다시 찾는 방식',
      href: '/how/documentation-system',
      status: 'available'
    },
    {
      title: 'REPORT',
      relation: '검토한 업무일지를 주간보고로 모으는 흐름',
      href: '/what/report',
      status: 'available'
    }
  ],
} as const satisfies WorklogReviewPageContent
