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
    titleLines: ['WEEKLY', 'REPORT'],
    thesis:
      '사람이 검토한 기록을 우선 사용하고, 보고서에 입력 자료의 검토 상태를 표시했다.',
    summary:
      '흩어진 업무일지·QA·회의 기록을 같은 주차로 모으되, AI 정규화 초안과 human-reviewed source를 끝까지 구분했습니다.',
    problemLabel: 'PROBLEM / A SUMMARY CAN HIDE ITS SOURCE',
    problem:
      '자유 형식 기록을 매주 다시 모아야 했고, 맥락이 빠진 AI 초안을 곧바로 공식 보고서 원본으로 쓰기에는 해석 위험이 컸습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / REVIEWED-FIRST REPORT',
    title: '어떤 기록으로 만든 주간보고인가',
    instruction:
      '주차·입력 상태·집계 지표·QA·생성 조건의 설계 이유',
    defaultAnnotation: {
      index: '00',
      label: 'REPORT GUIDE',
      title: '보고서에 남긴 입력 자료의 검토 상태',
      body: '기록이 속한 주차와 검토 상태를 먼저 구분한다. 본문과 함께 저장한 지표, 같은 주차의 QA 결과, 생성 조건을 통해 보고서의 입력 범위를 다시 확인할 수 있다.',
    },
  },
  product: reportProductFixture,
  annotations: [
    {
      id: 'week-window',
      index: '01',
      label: 'REPORT WEEK',
      title: '생성한 날이 아니라, 실제 기록이 속한 주차로 보고서를 찾게 했다.',
      sections: [
        {
          label: 'WHY',
          body: '메시지 제목 날짜, 수신 날짜, 국가별 표기가 달라지면 같은 업무가 잘못된 주차에 묶일 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: '업무 날짜를 정규화해 주차 범위를 명시하고, 보고서 생성 시각은 따로 표시했다.',
        },
        {
          label: 'BOUNDARY',
          body: '날짜 해석 로직을 수정해도 이미 저장된 과거 행은 별도로 교정해야 한다.',
        },
      ],
      evolution: { label: 'DATE RULES CORRECTED', date: '2026.06.12' },
    },
    {
      id: 'reviewed-source',
      index: '02',
      label: 'SOURCE STATE',
      title: '사람이 검토한 기록을 보고서의 기본 입력으로 삼았다.',
      sections: [
        {
          label: 'WHY',
          body: '사내 용어와 생략된 배경은 정규화된 문장 안에서도 잘못 해석될 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: '같은 원문의 검토 완료 기록을 우선하고, 검토본이 없는 원문에만 미검토 초안을 fallback으로 허용했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '초안으로 생성한 보고서에는 미검토 자료 포함을 표시한다. 보고서 생성이 초안의 검토 완료를 뜻하지는 않는다.',
        },
      ],
      evolution: { label: 'VISIBLE FALLBACK', date: '2026.07.03' },
    },
    {
      id: 'structured-metrics',
      index: '03',
      label: 'STRUCTURED METRICS',
      title: '읽는 보고서와 다시 셀 수 있는 상태를 함께 저장했다.',
      sections: [
        {
          label: 'WHY',
          body: '완료·위험·회의·업무일지 수가 본문 안에만 있으면 주차 간 상태를 다시 집계하기 어렵습니다.',
        },
        {
          label: 'DECISION',
          body: '보고서 본문과 함께 정해진 지표를 JSON으로 저장해 현황 화면에서 같은 정의로 집계했다.',
        },
        {
          label: 'BOUNDARY',
          body: '주차별 누적값은 고유 사건 수가 아닙니다.',
        },
      ],
      evolution: { label: 'REPORT METRICS SHAPED', date: '2026.06.05' },
    },
    {
      id: 'qa-evidence',
      index: '04',
      label: 'QA AS EVIDENCE',
      title: '성과 서술 옆에, 같은 주차의 QA 결과를 별도 상태로 남겼다.',
      sections: [
        {
          label: 'WHY',
          body: '주간 서술만 읽으면 검증 결과와 보류된 위험이 성과 문장 안에 섞일 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: '같은 주차의 테스트 기록이 있으면 PASS·FAIL·HOLD를 별도 패널과 보고서 항목에 포함했다.',
        },
        {
          label: 'BOUNDARY',
          body: '세 상태 밖의 기록도 있을 수 있습니다.',
        },
      ],
      evolution: { label: 'QA SOURCE INCLUDED', date: '2026.05.29' },
    },
    {
      id: 'generation-gate',
      index: '05',
      label: 'GENERATION GATE',
      title: '수동 생성에도 같은 입력·저장 규칙을 적용했다.',
      sections: [
        {
          label: 'WHY',
          body: '월요일 자동 생성만으로는 권한 보유자가 필요한 시점에 같은 주차를 다시 생성하기 어려웠습니다.',
        },
        {
          label: 'DECISION',
          body: '수동 경로에도 검토본 우선·표시가 있는 fallback·동일한 저장 규칙을 적용했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '영문 결과를 저장하는 구조는 배포했으며, 품질 비교 전까지 영문 화면은 비활성화했다.',
        },
      ],
      evolution: { label: 'MANUAL PATH + LOCALE GATE', date: '2026.08.26' },
    },
  ],
  workflow: {
    eyebrow: 'REPORT WORKFLOW',
    title: '기록을 검토하고 같은 주차로 모아, 본문과 지표를 저장한다.',
    introduction: '각 단계와 연결된 보고서 영역을 함께 강조',
    steps: [
      { id: 'report-flow-collect', hotspotId: 'week-window', index: '01', label: 'COLLECT', summary: '기록 날짜를 같은 주차로 정규화' },
      { id: 'report-flow-review', hotspotId: 'reviewed-source', index: '02', label: 'REVIEW', summary: 'AI 초안을 사람이 확인·수정' },
      { id: 'report-flow-select', hotspotId: 'reviewed-source', index: '03', label: 'SELECT', summary: '원문별 검토본 우선, 없는 원문만 fallback' },
      { id: 'report-flow-compose', hotspotId: 'qa-evidence', index: '04', label: 'COMPOSE', summary: '업무·QA·회의를 주간 문서로 구성' },
      { id: 'report-flow-store', hotspotId: 'structured-metrics', index: '05', label: 'STORE', summary: '본문과 제한된 지표를 함께 저장' },
    ],
    boundary: 'AI는 기록을 정규화하고 주간 서술을 구성한다. 초안을 검토 완료 기록으로 확정하는 결정은 사람이 맡는다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'Reviewed first. Fallback visible. Deployment gated.',
    items: [
      {
        statement: 'SOURCE STATE BEFORE SUMMARY.',
        explanation: '보고서 문장보다 먼저 검토본 기반인지 미검토 초안이 포함됐는지 보여줍니다.',
      },
      {
        statement: 'UNREVIEWED FALLBACK IS AN EXCEPTION.',
        explanation: '검토본이 없는 원문을 보완하되, 미검토 source가 포함됐다는 사실은 숨기지 않습니다.',
      },
      {
        statement: 'SHIPPED DOES NOT MEAN EXPOSED.',
        explanation: '영문 저장 구조의 배포와 번역 품질 검증, 화면 활성화, 반복 사용을 별도 상태로 둡니다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '주차와 입력 상태를 함께 보존하는 보고서로',
    introduction: '현재 보고서의 입력·주차·fallback·생성 control에 직접 남은 변화입니다.',
    scenes: [
      {
        date: '2026.05.29',
        label: 'MULTI-SOURCE WEEK',
        visual: 'multi-source',
        decision: '업무일지만 요약하지 않고 같은 주차의 QA 기록을 포함했다.',
        trigger: '업무 서술만으로는 주간 검증 상태를 함께 볼 수 없음',
        change: '주차별 테스트 기록을 보고서 항목에 연결',
        currentEffect: '본문과 별도로 PASS·FAIL·HOLD 결과 표시',
      },
      {
        date: '2026.06.05',
        label: 'REVIEWED-FIRST',
        visual: 'reviewed-first',
        decision: '사람이 검토한 기록을 보고서의 기본 입력으로 삼았다.',
        trigger: '자유 형식 기록의 맥락을 AI만으로 확정할 수 없음',
        change: 'L3 초안 → 사람 검토 → 검토 완료 기록',
        currentEffect: '검토 완료 기록을 주간보고의 기본 입력으로 사용',
      },
      {
        date: '2026.06.12',
        label: 'DATE WINDOW',
        visual: 'date-window',
        decision: '수신 시각보다 기록 제목의 날짜와 지역 규칙을 우선했다.',
        trigger: '편집 중복과 국가별 날짜 표기로 주차가 어긋남',
        change: '업무 날짜 역산·정규화와 중복 수집 보정',
        currentEffect: '선택 주차·기록 날짜 범위·생성 시각을 따로 표시',
      },
      {
        date: '2026.07.03',
        label: 'VISIBLE FALLBACK',
        visual: 'visible-fallback',
        decision: '검토본 0건일 때 미검토 표시와 함께 초안 사용',
        trigger: '월요일까지 검토가 끝나지 않으면 보고서가 비는 문제',
        change: '검토본 우선 규칙과 미검토 자료 포함 표시',
        currentEffect: '주차 이력과 보고서 상단에 입력 자료의 검토 상태 표시',
      },
      {
        date: '2026.08.26',
        label: 'MANUAL + LOCALE GATE',
        visual: 'manual-locale',
        decision: '같은 정책의 수동 생성은 열고, 검증 전 영문 노출은 닫았다.',
        trigger: '자동 일정 밖 재생성 필요와 번역 품질 미확인',
        change: '권한 기반 생성 기능·한영 저장 구조 추가, 영문 노출 비활성화',
        currentEffect: '생성 경로와 언어별 활성 상태를 따로 표시',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / SNAPSHOT 2026.09.04',
    title: '저장된 보고서와 주차별 누적 기록의 범위',
    snapshot: '읽기 전용 production snapshot에서 확인한 서로 다른 저장 상태입니다.',
    items: [],
  },
  implementationStatus: {
    state: 'AUTOMATIC + MANUAL GENERATION ACTIVE',
    items: [
      '업무일지·QA·회의 기록의 주차별 요약',
      '같은 원문의 검토 완료 기록 우선과 표시가 있는 draft fallback',
      '보고서 본문과 구조화 지표 저장',
      '권한 기반 수동 생성과 자동 월요일 생성',
    ],
    runtime: '주간보고 생성 경로는 production에 있고 현재 업무일지 authority는 web이다. Notion은 명시적 rollback mode다.',
    feedback: {
      label: '사용자 인터뷰',
      text: '이전에 정기적으로 하지 않던 주간 업무 정리를 보고 흐름으로 이어가게 됐다는 응답이 있었다. 번역·자료 취합·문서 초안 작성에 드는 시간은 이전의 절반 정도로 줄었다고 회고했다.',
    },
  },
  boundary: {
    eyebrow: 'BOUNDARY / REPORT, NOT BUSINESS OUTCOME',
    statement: '확인한 범위는 보고서 생성과 저장까지.',
    items: [
      'AI 정규화 초안과 사람 검토 완료 기록은 별도 상태로 보존한다.',
      '검토본이 없는 원문의 draft fallback은 availability 규칙이며 검토를 대체하지 않습니다.',
      '영문 구조의 배포는 화면 활성화나 반복 사용을 의미하지 않습니다.',
    ],
  },
  relatedSystems: [
    { title: 'WORKLOG REVIEW', relation: 'AI 초안을 사람이 검토해 보고 자료로 확정하는 흐름', href: '/what/worklog-review', status: 'available' },
    { title: 'QA', relation: '같은 주차에 포함되는 테스트 상태와 반복 검증 기록', href: '/what/qa', status: 'available' },
    { title: 'MEETING LOG', relation: '구현된 downstream과 planned / blocked transcript upstream을 분리한 회의 source 경계', href: '/what/meeting-log', status: 'available' },
  ],
} as const satisfies ReportPageContent
