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
    eyebrow: 'WHAT I BUILT / 02',
    titleLines: ['WEEKLY', 'REPORT'],
    thesis:
      'AI가 일주일을 대신 확정하게 하지 않고, 사람이 검토한 기록을 우선 원본으로 삼아 보고서의 출처 상태를 드러냈다.',
    summary:
      '흩어진 업무일지·QA·회의 기록을 같은 주차로 모으되, AI 정규화 초안과 human-reviewed source를 끝까지 구분했습니다.',
    problemLabel: 'PROBLEM / A SUMMARY CAN HIDE ITS SOURCE',
    problem:
      '자유 형식 기록을 매주 다시 모아야 했고, 맥락이 빠진 AI 초안을 곧바로 공식 보고서 원본으로 쓰기에는 해석 위험이 컸습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / REVIEWED-FIRST REPORT',
    title: 'The report begins with source state, not generated prose.',
    instruction:
      '주차, source state, 구조화 지표, QA evidence, 생성 gate를 선택해 보고서가 무엇을 믿고 무엇을 보류하는지 확인하세요.',
    defaultAnnotation: {
      index: '00',
      label: 'REPORT GUIDE',
      title: '읽기 좋은 문장보다 먼저, 어떤 기록으로 만들었는지 표시한다.',
      body: '화면의 사람·프로젝트·기록 내용과 숫자는 Jadebell 공개용 합성 데이터입니다. 아래 Evidence의 운영 규모와 섞어 읽지 않습니다.',
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
          body: '업무 날짜를 정규화한 뒤 주차 범위를 명시하고, 생성 시각은 별도 metadata로 분리했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '날짜 parser 수정과 이미 저장된 과거 행의 교정은 같은 완료 상태가 아닙니다.',
        },
      ],
      evolution: { label: 'DATE RULES CORRECTED', date: '2026.06.12' },
    },
    {
      id: 'reviewed-source',
      index: '02',
      label: 'SOURCE STATE',
      title: '매끈한 AI 초안보다, 사람이 검토한 기록을 우선했다.',
      sections: [
        {
          label: 'WHY',
          body: '사내 용어와 생략된 배경은 정규화된 문장 안에서도 잘못 해석될 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: '검토 완료 기록을 우선 원본으로 사용하고, 해당 주에 검토본이 0건일 때만 미검토 초안을 fallback으로 허용했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: 'fallback 보고서에는 미검토 초안 포함 사실을 표시합니다. availability를 위한 예외이지 동일한 신뢰 등급이 아닙니다.',
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
          body: '보고서 본문과 함께 제한된 지표를 JSON 구조로 저장해 dashboard에서 같은 정의로 집계했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '주차별 누적값은 고유 사건 수나 생산성 향상률이 아닙니다.',
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
          body: '같은 주차의 테스트 기록이 있을 때 PASS·FAIL·HOLD를 별도 패널과 보고서 section으로 포함했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '테스트 건수는 품질 개선률이 아니며, 세 상태 밖의 기록도 있을 수 있습니다.',
        },
      ],
      evolution: { label: 'QA SOURCE INCLUDED', date: '2026.05.29' },
    },
    {
      id: 'generation-gate',
      index: '05',
      label: 'GENERATION GATE',
      title: '수동 생성은 우회로가 아니라, 같은 source 규칙을 다시 실행하는 경로다.',
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
          body: '영문 결과 구조는 배포했지만 품질 비교 전에는 화면 노출을 껐습니다. 배포와 runtime 활성화를 구분합니다.',
        },
      ],
      evolution: { label: 'MANUAL PATH + LOCALE GATE', date: '2026.08.26' },
    },
  ],
  workflow: {
    eyebrow: 'REPORT WORKFLOW',
    title: '여러 기록을 모으되, source authority는 한 단계씩 올린다.',
    introduction: '각 단계는 위 weekly report surface의 현재 component와 연결됩니다.',
    steps: [
      { id: 'report-flow-collect', hotspotId: 'week-window', index: '01', label: 'COLLECT', summary: '기록 날짜를 같은 주차로 정규화' },
      { id: 'report-flow-review', hotspotId: 'reviewed-source', index: '02', label: 'REVIEW', summary: 'AI 초안을 사람이 확인·수정' },
      { id: 'report-flow-select', hotspotId: 'reviewed-source', index: '03', label: 'SELECT', summary: '검토본 우선, 0건만 fallback' },
      { id: 'report-flow-compose', hotspotId: 'qa-evidence', index: '04', label: 'COMPOSE', summary: '업무·QA·회의를 주간 문서로 구성' },
      { id: 'report-flow-store', hotspotId: 'structured-metrics', index: '05', label: 'STORE', summary: '본문과 제한된 지표를 함께 저장' },
    ],
    boundary: 'AI는 기록을 정규화하고 주간 서술을 구성하지만, 어떤 초안을 공식 source로 승격할지 단독 결정하지 않습니다.',
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
        statement: 'ZERO REVIEWED IS AN EXCEPTION.',
        explanation: '검토 지연이 보고서 공백으로 이어지지 않게 하되 예외 사용 사실은 숨기지 않습니다.',
      },
      {
        statement: 'SHIPPED DOES NOT MEAN EXPOSED.',
        explanation: '영문 저장 구조의 배포와 번역 품질 검증, 화면 활성화, 반복 사용을 별도 상태로 둡니다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '요약 생성에서, source state가 보이는 weekly record로.',
    introduction: '현재 보고서의 입력·주차·fallback·생성 control에 직접 남은 변화입니다.',
    scenes: [
      {
        date: '2026.05.29',
        label: 'MULTI-SOURCE WEEK',
        visual: 'multi-source',
        decision: '업무일지만 요약하지 않고 같은 주차의 QA 기록을 포함했다.',
        trigger: '업무 서술만으로는 주간 검증 상태를 함께 볼 수 없음',
        change: '주차별 테스트 source와 report section 연결',
        currentEffect: '본문과 별도로 PASS·FAIL·HOLD evidence 표시',
      },
      {
        date: '2026.06.05',
        label: 'REVIEWED-FIRST',
        visual: 'reviewed-first',
        decision: 'AI 초안을 공식 원본으로 쓰지 않는 review gate를 세웠다.',
        trigger: '자유 형식 기록의 맥락을 AI만으로 확정할 수 없음',
        change: 'L3 초안 → human review → reviewed source',
        currentEffect: '검토 완료 기록이 weekly report의 기본 입력',
      },
      {
        date: '2026.06.12',
        label: 'DATE WINDOW',
        visual: 'date-window',
        decision: '수신 시각보다 기록 제목의 날짜와 지역 규칙을 우선했다.',
        trigger: '편집 중복과 국가별 날짜 표기로 주차가 어긋남',
        change: '업무 날짜 역산·정규화와 중복 수집 보정',
        currentEffect: '선택 주차·date range·생성 시각을 분리 표시',
      },
      {
        date: '2026.07.03',
        label: 'VISIBLE FALLBACK',
        visual: 'visible-fallback',
        decision: '검토본 0건에는 표시가 있는 draft fallback을 허용했다.',
        trigger: '월요일까지 review가 끝나지 않으면 보고서가 비는 문제',
        change: 'reviewed-first + unreviewed included label',
        currentEffect: 'history pill과 report header에서 source state 확인',
      },
      {
        date: '2026.08.26',
        label: 'MANUAL + LOCALE GATE',
        visual: 'manual-locale',
        decision: '같은 정책의 수동 생성은 열고, 검증 전 영문 노출은 닫았다.',
        trigger: '자동 일정 밖 재생성 필요와 번역 품질 미확인',
        change: '권한 기반 생성 action, KO/EN 저장 구조, EN flag off',
        currentEffect: '생성 경로와 locale의 runtime 상태를 따로 표시',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / SNAPSHOT 2026.08.26',
    title: '반복 생성 규모는 확인됐지만, 읽은 사람과 절감 시간은 측정하지 않았다.',
    snapshot: '같은 읽기 전용 운영 snapshot에서 확인한 저장·누적 집계 범위입니다.',
    items: [
      { value: '22', label: 'WEEKLY REPORTS', meaning: '저장된 주간보고 문서', boundary: '열람·의사결정 활용 횟수가 아님' },
      { value: '316', label: 'REVIEWED WORKLOGS', meaning: '9명·73 업무일 범위의 검토 완료 row', boundary: '8월 27일의 332건 snapshot과 측정 시점이 다름' },
      { value: '360', label: 'WORKLOG ITEMS', meaning: '22개 보고서에 기록된 주차별 누적 항목', boundary: '중복 제거된 고유 사건 수가 아님' },
      { value: '131', label: 'TEST ENTRIES', meaning: '같은 보고서들에 집계된 테스트 항목', boundary: '품질 개선률이나 전체 테스트 성공률이 아님' },
    ],
  },
  implementationStatus: {
    state: 'AUTOMATIC + MANUAL GENERATION ACTIVE',
    items: [
      '업무일지·QA·회의 source의 주차별 요약',
      '검토 완료 기록 우선과 표시가 있는 draft fallback',
      '보고서 본문과 구조화 지표 저장',
      '권한 기반 수동 생성과 자동 월요일 생성',
    ],
    runtime: '주간보고의 반복 생성과 수동 생성 경로의 production 배포는 확인됐습니다. KO/EN 결과 구조도 배포됐지만 EN 화면은 feature flag off이며, provider 중단으로 품질 비교와 생성 검증이 막혀 있었습니다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / REPORT, NOT BUSINESS OUTCOME',
    statement: 'A generated report is evidence of a workflow, not proof of impact.',
    items: [
      'AI 정규화 초안과 사람이 검토한 source를 같은 상태로 취급하지 않습니다.',
      '검토본 0건 fallback은 availability 규칙이며 검토를 대체하지 않습니다.',
      '보고서와 누적 지표가 있어도 준비 시간 절감·열람·의사결정 효과는 미측정입니다.',
      '영문 구조의 배포는 화면 활성화나 반복 사용을 의미하지 않습니다.',
    ],
  },
  relatedSystems: [
    { title: 'WORKLOG REVIEW', relation: 'AI 초안을 사람이 공식 report source로 승격하는 흐름', href: '/what/worklog-review', status: 'available' },
    { title: 'QA', relation: '같은 주차에 포함되는 테스트 상태와 반복 검증 evidence', href: '/what/qa', status: 'available' },
    { title: 'MEETING LOG', relation: '회의 기록과 후보 검토가 report source가 되는 흐름', status: 'in-development' },
  ],
} as const satisfies ReportPageContent
