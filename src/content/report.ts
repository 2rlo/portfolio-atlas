import type { ReportPageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { reportProductFixture } from './fixtures/report.ts'

export const reportContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED WEEKLY REPORT / SYNTHETIC UI DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 09',
    titleLines: [
      'WEEKLY',
      'REPORT'
    ],
    thesis: '주간보고의 자료 취합과 초안 작성을 한 흐름으로 묶었다.',
    summary: '업무일지, QA 결과, 회의 기록을 같은 주차로 모았습니다. 사람이 검토한 기록을 먼저 사용하고 본문과 집계 지표를 함께 저장했습니다.',
    problemLabel: 'PROBLEM / WEEKLY PREPARATION',
    problem: '자유 형식 기록을 매주 다시 모으고 번역해 보고서를 작성해야 했습니다. 자료마다 날짜와 검토 상태가 달라 같은 주차의 업무를 정리하는 데도 손이 갔습니다.'
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / REVIEWED-FIRST REPORT',
    title: '한 주의 업무를 한 보고서로',
    instruction: '보고서 영역을 선택하면 설계 이유를 볼 수 있습니다.',
    defaultAnnotation: {
      index: '00',
      label: 'REPORT GUIDE',
      title: '주차와 자료를 함께 읽는 보고서',
      body: '기록이 속한 주차와 검토 상태를 먼저 구분한다. 본문과 함께 저장한 지표, 같은 주차의 QA 결과, 생성 조건을 보면 어떤 자료로 보고서를 만들었는지 다시 확인할 수 있다.'
    }
  },
  product: reportProductFixture,
  annotations: [
    {
      id: 'week-window',
      index: '01',
      label: 'REPORT WEEK',
      title: '업무 날짜로 보고서를 찾는다.',
      sections: [
        {
          label: 'WHY',
          body: '메시지 제목 날짜와 수신 날짜, 국가별 표기가 달라 같은 업무가 잘못된 주차에 묶일 수 있었습니다.'
        },
        {
          label: 'DECISION',
          body: '업무 날짜를 정규화해 주차 범위를 명시하고, 보고서 생성 시각은 따로 표시했습니다.'
        }
      ],
      evolution: {
        label: 'DATE RULES CORRECTED',
        date: '2026.06.12'
      }
    },
    {
      id: 'reviewed-source',
      index: '02',
      label: 'SOURCE STATE',
      title: '사람이 검토한 기록부터 사용한다.',
      sections: [
        {
          label: 'WHY',
          body: '사내 용어와 생략된 배경은 정규화한 문장에서도 다시 확인해야 했습니다.'
        },
        {
          label: 'DECISION',
          body: '같은 원문의 검토 완료 기록을 우선하고, 검토본이 없는 원문은 초안으로 보완했습니다. 초안을 사용한 보고서에는 미검토 자료 포함을 표시합니다.'
        }
      ],
      evolution: {
        label: 'VISIBLE FALLBACK',
        date: '2026.07.03'
      }
    },
    {
      id: 'structured-metrics',
      index: '03',
      label: 'STRUCTURED METRICS',
      title: '본문과 집계 지표를 함께 저장했다.',
      sections: [
        {
          label: 'WHY',
          body: '완료 건수나 위험 항목 수가 본문 안에만 있으면 주차별 상태를 다시 집계하기 어려웠습니다.'
        },
        {
          label: 'DECISION',
          body: '보고서 본문과 함께 정해진 지표를 JSON으로 저장해 현황 화면에서도 같은 정의로 집계했습니다.'
        }
      ],
      evolution: {
        label: 'REPORT METRICS SHAPED',
        date: '2026.06.05'
      }
    },
    {
      id: 'qa-evidence',
      index: '04',
      label: 'WEEKLY QA',
      title: '주간 업무 옆에 QA 결과를 붙였다.',
      sections: [
        {
          label: 'WHY',
          body: '업무 서술만으로는 테스트 결과와 보류된 위험을 함께 파악하기 어려웠습니다.'
        },
        {
          label: 'DECISION',
          body: '같은 주차의 테스트 기록에서 PASS, FAIL, HOLD를 별도 패널과 보고서 항목에 표시했습니다.'
        }
      ],
      evolution: {
        label: 'QA SOURCE INCLUDED',
        date: '2026.05.29'
      }
    },
    {
      id: 'generation-gate',
      index: '05',
      label: 'GENERATION GATE',
      title: '필요한 주차를 다시 생성한다.',
      sections: [
        {
          label: 'WHY',
          body: '검토를 마친 자료로 보고서를 다시 만들려면 월요일 자동 생성 밖에서도 실행할 수 있어야 했습니다.'
        },
        {
          label: 'DECISION',
          body: '권한이 있는 사용자가 주차를 선택해 생성하도록 했습니다. 자동 생성과 같은 자료 선택 규칙을 적용하고 본문과 지표를 함께 저장합니다.'
        }
      ],
      evolution: {
        label: 'MANUAL GENERATION',
        date: '2026.08.26'
      }
    }
  ],
  workflow: {
    eyebrow: 'REPORT WORKFLOW',
    title: '기록 검토부터 보고서 저장까지',
    introduction: '각 단계와 연결된 보고서 영역을 함께 강조',
    steps: [
      {
        id: 'report-flow-collect',
        hotspotId: 'week-window',
        index: '01',
        label: 'COLLECT',
        summary: '기록 날짜를 같은 주차로 정규화'
      },
      {
        id: 'report-flow-review',
        hotspotId: 'reviewed-source',
        index: '02',
        label: 'REVIEW',
        summary: 'AI 초안을 사람이 확인·수정'
      },
      {
        id: 'report-flow-select',
        hotspotId: 'reviewed-source',
        index: '03',
        label: 'SELECT',
        summary: '검토본 우선 사용, 검토본이 없는 원문은 초안으로 보완'
      },
      {
        id: 'report-flow-compose',
        hotspotId: 'qa-evidence',
        index: '04',
        label: 'COMPOSE',
        summary: '업무·QA·회의를 주간 문서로 구성'
      },
      {
        id: 'report-flow-store',
        hotspotId: 'structured-metrics',
        index: '05',
        label: 'STORE',
        summary: '본문과 집계 지표를 함께 저장'
      }
    ],
    boundary: 'AI는 기록을 정규화하고 주간 서술을 구성한다. 초안을 검토 완료 기록으로 확정하는 결정은 사람이 맡는다.'
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: '취합과 검토를 보고에 연결',
    items: [
      {
        statement: '검토한 기록부터 사용',
        explanation: '보고서 문장과 함께 입력 자료의 검토 상태를 보여줍니다.'
      },
      {
        statement: '검토할 자료를 표시',
        explanation: '검토본이 없는 원문은 초안으로 보완하고, 보고서에서 해당 자료를 확인하게 했습니다.'
      },
      {
        statement: '필요한 시점에 재생성',
        explanation: '월요일 자동 생성과 권한별 수동 생성에 같은 자료 선택 규칙을 적용했습니다.'
      }
    ]
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '주차와 검토 상태를 보고서에 담기까지',
    introduction: 'QA 결과를 더하고 날짜를 바로잡은 뒤, 필요한 시점에 다시 생성할 수 있게 했습니다.',
    scenes: [
      {
        date: '2026.05.29',
        label: 'MULTI-SOURCE WEEK',
        visual: 'multi-source',
        decision: '업무일지만 요약하지 않고 같은 주차의 QA 기록을 포함했다.',
        trigger: '업무 서술만으로는 주간 검증 상태를 함께 볼 수 없음',
        change: '주차별 테스트 기록을 보고서 항목에 연결',
        currentEffect: '본문과 별도로 PASS·FAIL·HOLD 결과 표시'
      },
      {
        date: '2026.06.05',
        label: 'REVIEWED-FIRST',
        visual: 'reviewed-first',
        decision: '사람이 검토한 기록을 보고서의 기본 입력으로 삼았다.',
        trigger: '자유 형식 기록의 맥락을 AI만으로 확정할 수 없음',
        change: '구조화 초안 → 사람 검토 → 검토 완료 기록',
        currentEffect: '검토 완료 기록을 주간보고의 기본 입력으로 사용'
      },
      {
        date: '2026.06.12',
        label: 'DATE WINDOW',
        visual: 'date-window',
        decision: '수신 시각보다 기록 제목의 날짜와 지역 규칙을 우선했다.',
        trigger: '편집 중복과 국가별 날짜 표기로 주차가 어긋남',
        change: '업무 날짜 역산·정규화와 중복 수집 보정',
        currentEffect: '선택 주차·기록 날짜 범위·생성 시각을 따로 표시'
      },
      {
        date: '2026.07.03',
        label: 'VISIBLE FALLBACK',
        visual: 'visible-fallback',
        decision: '검토본 0건일 때 미검토 표시와 함께 초안 사용',
        trigger: '월요일까지 검토가 끝나지 않으면 보고서가 비는 문제',
        change: '검토본 우선 규칙과 미검토 자료 포함 표시',
        currentEffect: '주차 이력과 보고서 상단에 입력 자료의 검토 상태 표시'
      },
      {
        date: '2026.08.26',
        label: 'MANUAL GENERATION',
        visual: 'manual-locale',
        decision: '자동 일정 밖에서도 같은 주차를 다시 생성하게 했다.',
        trigger: '검토를 마친 자료로 보고서를 다시 만들 필요',
        change: '권한 기반 수동 생성과 동일한 자료 선택 규칙 적용',
        currentEffect: '자동 생성과 수동 생성에서 같은 보고서 구조 유지'
      }
    ]
  },
  evidence: {
    eyebrow: 'WORK CHANGES',
    title: '자료 취합에서 주간 업무 정리로',
    snapshot: '번역과 자료 취합, 문서 초안 작성을 하나의 보고 흐름으로 연결했습니다.',
    items: []
  },
  implementationStatus: {
    state: '업무의 변화',
    items: [
      '업무일지, QA 결과, 회의 기록을 주차별로 취합',
      '검토 완료 기록 우선 선택과 초안 사용 표시',
      '보고서 본문과 현황 화면의 집계 지표 함께 저장',
      '월요일 자동 생성과 권한별 수동 생성'
    ],
    runtime: '검토한 업무일지로 웹에서 보고서를 만들고, 같은 주차의 QA 결과와 회의 내용을 함께 읽게 됐습니다.',
    feedback: {
      label: '사용자 인터뷰',
      text: '이전에 정기적으로 하지 않던 주간 업무 정리를 보고 흐름으로 이어가게 됐다는 응답이 있었다. 번역·자료 취합·문서 초안 작성에 드는 시간은 이전의 절반 정도로 줄었다고 회고했다.'
    }
  },
  boundary: {
    eyebrow: 'DESIGN TAKEAWAY',
    statement: '보고 자료의 맥락까지 남긴다.',
    items: [
      '자료를 모으는 흐름과 보고서를 읽는 흐름에 같은 주차와 검토 상태를 사용했습니다.'
    ]
  },
  relatedSystems: [
    {
      title: 'WORKLOG REVIEW',
      relation: 'AI 초안을 사람이 검토해 보고 자료로 확정하는 흐름',
      href: '/what/worklog-review',
      status: 'available'
    },
    {
      title: 'QA',
      relation: '같은 주차에 포함되는 테스트 상태와 반복 검증 기록',
      href: '/what/qa',
      status: 'available'
    },
    {
      title: 'MEETING LOG',
      relation: '회의 메모에서 결정과 후속 업무를 정리하는 흐름',
      href: '/what/meeting-log',
      status: 'available'
    }
  ],
} as const satisfies ReportPageContent
