import type { QaPageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { qaProductFixture } from './fixtures/qa.ts'

export const qaContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED TEST REPORT / SYNTHETIC DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 05',
    titleLines: ['QA', 'RECORD'],
    thesis:
      '테스트 결과를 한 번의 문서가 아니라, 다시 실행하고 근거를 되짚을 수 있는 기록으로 만들었다.',
    summary:
      '목적과 환경, 기대·실제 결과, 첨부, 수정 이력을 한 surface에 연결해 QA 판단이 바뀐 맥락까지 남겼습니다.',
    problemLabel: 'PROBLEM / RESULT WITHOUT HISTORY',
    problem:
      '문서 버전과 언어가 나뉘면 같은 테스트의 수정·재실행·첨부를 함께 추적하기 어렵고, 최신 판정이 무엇인지 다시 확인하는 비용이 커졌습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / TEST DETAIL',
    title: '판정만 보여주지 않고, 판정이 만들어진 기록을 남긴다.',
    instruction:
      '강조된 영역을 hover, focus 또는 tap하면 기능 사용법이 아니라 그 구조를 선택한 이유가 열립니다.',
    defaultAnnotation: {
      index: '00',
      label: 'INSPECTION GUIDE',
      title: '한 테스트 기록 안에서 근거와 변화가 이어집니다.',
      body: 'Test context, Human result, Attachments, Revision history, AI boundary를 차례로 살펴보세요. 화면의 모든 값은 공개용 합성 데이터입니다.',
    },
  },
  product: qaProductFixture,
  annotations: [
    {
      id: 'test-context',
      index: '01',
      label: 'TEST CONTEXT',
      title: '결과보다 먼저, 같은 조건을 다시 만들 수 있어야 했다.',
      sections: [
        {
          label: 'WHY',
          body: 'PASS와 FAIL만 남으면 어떤 환경과 목적에서 나온 결과인지 분리됩니다. 재실행할 사람이 조건을 먼저 읽을 수 있게 했습니다.',
        },
        {
          label: 'DECISION',
          body: '테스트 목적과 실행 환경을 서로 다른 필드로 분리해, “왜”와 “어디서”를 한 문장에 섞지 않았습니다.',
        },
      ],
      evolution: { label: 'CONTEXT FIELDS SEPARATED', date: '2026.08.07' },
    },
    {
      id: 'human-result',
      index: '02',
      label: 'HUMAN RESULT',
      title: 'QA 판정은 자동 요약이 아니라 실행자가 소유한다.',
      sections: [
        {
          label: 'WHY',
          body: '실제 화면과 기대 결과의 차이는 실행 맥락을 본 QA가 판단해야 합니다. 보조 생성물이 결과 상태를 바꾸지 않도록 권한을 나눴습니다.',
        },
        {
          label: 'BOUNDARY',
          body: 'PASS·FAIL·HOLD와 수정 필요 여부는 QA의 값입니다. AI assessment나 번역은 이 상태를 덮어쓰지 않습니다.',
        },
      ],
      evolution: { label: 'QA-OWNED STATE', date: '2026.08.07' },
    },
    {
      id: 'attachments',
      index: '03',
      label: 'ATTACHMENTS',
      title: '설명만으로 부족한 순간을 다시 볼 수 있게 했다.',
      sections: [
        {
          label: 'WHY',
          body: '오류 순서나 일시적인 화면 상태는 텍스트만으로 재현하기 어렵습니다. 실행 단위에 이미지·영상·파일을 붙여 논의의 출발점을 보존했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '첨부가 있다는 사실은 결함이 수정됐다는 증명이 아닙니다. 당시 관찰을 다시 확인하기 위한 evidence입니다.',
        },
      ],
      evolution: { label: 'ATTACHMENT UX REFINED', date: '2026.08.04' },
    },
    {
      id: 'revision-history',
      index: '04',
      label: 'RETEST HISTORY',
      title: '최신 값으로 덮기보다, 판정이 바뀐 순서를 남겼다.',
      sections: [
        {
          label: 'WHY',
          body: '재테스트 뒤 결과만 교체하면 이전 실패와 수정 확인의 연결이 사라집니다. revision을 실행 기록으로 남겨 변화 순서를 보존했습니다.',
        },
        {
          label: 'EVIDENCE',
          body: '운영 snapshot에는 29개 테스트 케이스의 재실행과 최대 6회 실행 이력이 기록돼 있었습니다.',
        },
      ],
      evolution: { label: 'RETEST HISTORY SHIPPED', date: '2026.07.30' },
    },
    {
      id: 'ai-boundary',
      index: '05',
      label: 'AI BOUNDARY',
      title: '자동 갱신보다, 사람이 요청한 재생성을 택했다.',
      sections: [
        {
          label: 'WHY',
          body: '원문을 고칠 때마다 assessment와 번역이 자동으로 바뀌면 사람이 이미 검토한 문장과 경계가 흐려집니다.',
        },
        {
          label: 'DECISION',
          body: 'AI 결과는 명시적인 regenerate로만 갱신하고, source text와 QA 판정은 별도 권한으로 유지했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: 'AI 문장은 테스트 통과 여부의 증거가 아니며, 사람이 입력한 source를 수정하지 않습니다.',
        },
      ],
      evolution: { label: 'EXPLICIT REGENERATE', date: '2026.08.19' },
    },
  ],
  workflow: {
    eyebrow: 'PRODUCT WORKFLOW',
    title: '작성보다 중요한 것은, 같은 판단을 다시 따라갈 수 있는 흐름.',
    introduction:
      'workflow step에 focus하면 위 제품 화면의 해당 기록이 함께 강조됩니다.',
    steps: [
      { id: 'qa-flow-context', hotspotId: 'test-context', index: '01', label: 'CONTEXT', summary: '목적과 환경을 분리해 기록' },
      { id: 'qa-flow-execute', hotspotId: 'human-result', index: '02', label: 'EXECUTE', summary: '기대와 실제를 비교해 판정' },
      { id: 'qa-flow-attach', hotspotId: 'attachments', index: '03', label: 'ATTACH', summary: '관찰 근거를 실행에 연결' },
      { id: 'qa-flow-retest', hotspotId: 'revision-history', index: '04', label: 'RETEST', summary: '덮어쓰지 않고 이력을 추가' },
      { id: 'qa-flow-assist', hotspotId: 'ai-boundary', index: '05', label: 'ASSIST', summary: '요청할 때만 AI 결과 갱신' },
    ],
    boundary:
      '이 흐름은 기록의 추적 가능성을 높이지만, 테스트 수나 첨부 수만으로 제품 품질 향상을 증명하지 않습니다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'A test result is a state. A QA record is a sequence.',
    items: [
      {
        statement: 'KEEP EVERY RUN.',
        explanation: '최신 결과만 남기지 않고 재실행마다 판정과 관찰을 새 revision으로 보존했습니다.',
      },
      {
        statement: 'QA OWNS THE VERDICT.',
        explanation: 'AI assessment와 번역은 읽기 보조이며 PASS·FAIL·수정 필요 상태의 authority가 아닙니다.',
      },
      {
        statement: 'ATTACH TO THE OBSERVATION.',
        explanation: '파일을 보고서 끝에 모으지 않고 해당 테스트 실행과 직접 연결했습니다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '문서 복제에서, 실행 이력이 남는 운영 기록으로.',
    introduction:
      '화면과 상태에 직접 남아 있는 변화만 선택했습니다. 프로젝트 전체 commit history는 포함하지 않았습니다.',
    scenes: [
      {
        date: '2026.05.29',
        label: 'SOURCE SHAPE',
        visual: 'source-shape',
        decision: '기존 테스트 문서의 구조와 반복 패턴부터 분리했다.',
        trigger: '여러 문서 버전과 언어에서 같은 기록을 유지하기 어려웠음',
        change: '보고서·테스트 케이스·실행 근거의 기본 shape 정의',
        currentEffect: '현재 detail 화면의 context와 case 단위 구조로 남음',
      },
      {
        date: '2026.07.30',
        label: 'RETEST + ATTACHMENT',
        visual: 'history',
        decision: '결과 교체 대신 실행 이력과 첨부를 제품 surface에 넣었다.',
        trigger: '수정 전후 판정과 파일을 함께 추적할 필요',
        change: 'report CRUD, retest history, image·video attachment 구현',
        currentEffect: 'revision과 실행별 evidence를 한 detail에서 확인',
      },
      {
        date: '2026.08.12',
        label: 'READ-ONLY ROLE',
        visual: 'role',
        decision: '보는 권한과 판정을 바꾸는 권한을 나눴다.',
        trigger: 'QA 기록은 공유하되 수정 authority는 제한할 필요',
        change: 'QAViewer read-only 접근 추가',
        currentEffect: '열람 범위와 write action이 역할별로 분리됨',
      },
      {
        date: '2026.08.19',
        label: 'EXPLICIT REGENERATE',
        visual: 'regenerate',
        decision: '자동 AI 갱신을 명시적 regenerate로 바꿨다.',
        trigger: 'source 수정과 생성 결과의 변경 시점이 섞이는 문제',
        change: 'assessment·translation을 사용자 요청에서만 재생성',
        currentEffect: '사람이 검토한 source와 AI 결과의 경계를 유지',
      },
      {
        date: '2026.08.20',
        label: 'OPERATING SOURCE',
        visual: 'database-source',
        decision: '제품 데이터베이스를 현재 기록의 운영 source로 전환했다.',
        trigger: '두 저장소를 지속 동기화할 때 생기는 최신성 모호함',
        change: '주기적 외부 문서 polling 중단, 수동 recovery 경로 유지',
        currentEffect: '현재 상태와 복구 경로의 역할이 분리됨',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / SNAPSHOT 2026.08.26',
    title: '운영 기록의 규모이지, 품질 성과 지표가 아니다.',
    snapshot:
      '아래 숫자는 확인 가능한 당시 snapshot입니다. 정확도·생산성·조직 adoption으로 해석하지 않습니다.',
    items: [
      { value: '51', label: 'ACTIVE REPORTS', meaning: '보관되지 않은 테스트 보고서', boundary: '보고서 수는 테스트 품질을 뜻하지 않음' },
      { value: '217', label: 'EXECUTION HISTORIES', meaning: '175개 케이스에 연결된 전체 실행 기록', boundary: '29개 케이스 재실행 · 최대 6회' },
      { value: '352', label: 'ATTACHMENTS', meaning: '이미지 282개와 영상 70개', boundary: '파일 수는 결함 해결 수가 아님' },
      { value: '67', label: 'RECORDED WRITES', meaning: '8월 3–24일 성공한 report·case·translation confirm write', boundary: '3명 범위의 반복 사용 · 조직 adoption 아님' },
    ],
  },
  implementationStatus: {
    state: 'IMPLEMENTED / DEPLOYED / LIMITED-TEAM USE',
    items: [
      '보고서와 테스트 케이스 CRUD·archive',
      '재실행 history와 이미지·영상 attachment',
      '한국어·영어 translation과 explicit regenerate',
      'QA write role과 QAViewer read-only role',
    ],
    runtime:
      '당시 제품 데이터베이스가 현재 기록의 운영 source였고 제한된 팀 사용 기록이 확인됩니다. 외부 문서의 주기적 polling은 중단됐으며 수동 recovery 경로는 남아 있었습니다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / RECORD, NOT OUTCOME',
    statement: 'More records do not automatically mean better quality.',
    items: [
      'AI assessment와 번역은 QA의 PASS·FAIL·HOLD 판정을 변경하지 않습니다.',
      '첨부와 revision은 관찰과 변경 순서를 보존하지만 수정 완료를 증명하지 않습니다.',
      '기록 수와 write 수를 생산성·정확도·품질 향상 지표로 사용하지 않습니다.',
      '제한된 사용자 범위의 반복 사용을 조직 전체 adoption으로 확대 해석하지 않습니다.',
    ],
  },
  relatedSystems: [
    { title: 'FEATURE VALIDATION', relation: '요구사항과 구현 evidence를 사람이 다시 확인하는 검토 경계', href: '/what/feature-validation', status: 'available' },
    { title: 'DOCUMENTATION SYSTEM', relation: '여러 source의 authority와 recovery 맥락을 구분하는 방식', href: '/how/documentation-system', status: 'available' },
    { title: 'OPERATIONS / RELIABILITY', relation: '운영 source 전환과 수동 recovery boundary', status: 'in-development' },
  ],
} as const satisfies QaPageContent
