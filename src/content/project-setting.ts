import type { ProjectSettingPageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { projectSettingProductFixture } from './fixtures/project-setting.ts'

export const projectSettingContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED PRODUCT VIEW / SYNTHETIC DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 03',
    titleLines: ['PROJECT', 'SETTING'],
    thesis:
      '화면마다 달라지던 프로젝트 이름을 하나의 공통 목록으로 모으되, 과거 연결은 끊지 않는다.',
    summary:
      '표시명·순서·노출은 바꿀 수 있게 하고, 일정·검토·AI 분류가 참조하는 프로젝트 ID는 유지했다.',
    problemLabel: 'PROBLEM / LABELS DRIFT, REFERENCES SHOULD NOT',
    problem:
      '기능마다 프로젝트 목록을 따로 두면 추가하거나 이름을 바꿀 때 선택지가 갈라집니다. 프로젝트를 삭제하면 이미 연결된 일정과 기록도 맥락을 잃습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / TRACKED REGISTRY',
    title: '이름은 바뀌어도, 같은 프로젝트로 연결되도록.',
    instruction:
      '코드와 표시명 · 기존 항목 확인 · 공통 순서 · 보관 이력 · 복원 검사',
    defaultAnnotation: {
      index: '00',
      label: 'REGISTRY GUIDE',
      title: '이름을 편집해도 연결은 남아야 한다.',
      body: '등록부터 복원까지 프로젝트 ID를 유지합니다. 여러 업무 화면은 같은 프로젝트 목록과 표시 순서를 사용합니다.',
    },
  },
  product: projectSettingProductFixture,
  annotations: [
    {
      id: 'stable-identity',
      index: '01',
      label: 'STABLE ID / EDITABLE LABEL',
      title: '사람이 보는 이름과 시스템의 연결 키를 분리했다.',
      sections: [
        {
          label: 'WHY',
          body: '표시명은 운영 중 바뀔 수 있어도 일정·저장소·후보가 참조하는 프로젝트는 그대로여야 합니다.',
        },
        {
          label: 'DECISION',
          body: '코드와 내부 ID는 고정하고, 표시명과 정렬 순서를 사용자 편집 영역으로 열었습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '표시명을 바꿔도 프로젝트 ID와 과거 연결 관계는 유지됩니다.',
        },
      ],
      evolution: { label: 'DEFINED AS SEPARATE FIELDS', date: '2026.08.24' },
    },
    {
      id: 'existing-row',
      index: '02',
      label: 'EXISTING ROW RESOLUTION',
      title: '새로 등록하기 전에, 이미 연결된 프로젝트가 있는지 확인한다.',
      sections: [
        {
          label: 'WHY',
          body: '일정이나 저장소와 연결됐지만 추적 목록에는 없는 프로젝트가 있을 수 있습니다. 같은 대상을 새로 만들면 참조가 둘로 갈라집니다.',
        },
        {
          label: 'DECISION',
          body: '새 항목을 만들기 전에 기존 프로젝트를 추적 목록에 올릴 수 있는지 확인해 연결 관계와 이력을 보존했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '표시명이 비슷하다는 이유만으로 자동 전환하지 않습니다. 대상이 모호하면 충돌 여부를 확인합니다.',
        },
      ],
      evolution: { label: 'PROMOTION PATH ADDED', date: '2026.08.25' },
    },
    {
      id: 'shared-order',
      index: '03',
      label: 'SHARED ORDER',
      title: '여러 업무 화면이 같은 프로젝트 순서를 사용하게 했다.',
      sections: [
        {
          label: 'WHY',
          body: '일정·대시보드·검토함·채팅마다 프로젝트 순서가 다르면 같은 대상을 다시 찾아야 합니다.',
        },
        {
          label: 'DECISION',
          body: '추적 프로젝트와 표시 순서를 공통 조회 경로로 제공하고, 각 기능을 이 기준에 연결했습니다.',
        },
        {
          label: 'EVIDENCE',
          body: '일정·대시보드·AI 후보·채팅·회의 추출이 같은 추적 프로젝트 목록을 읽는 운영 경로를 확인했습니다.',
        },
      ],
      evolution: { label: 'CONSUMERS ALIGNED', date: '2026.08.26' },
    },
    {
      id: 'archive-provenance',
      index: '04',
      label: 'ARCHIVE PROVENANCE',
      title: '추적 목록에서 빠진 상태와, 보관한 이력을 구분한다.',
      sections: [
        {
          label: 'WHY',
          body: '추적 제외 상태에는 처음부터 운영 대상이 아닌 보조 항목과 실제로 보관한 프로젝트가 함께 포함될 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: '성공한 project.archive 감사 기록이 있는 프로젝트만 보관 목록과 복원 후보에 포함합니다.',
        },
        {
          label: 'BOUNDARY',
          body: 'is_tracked=false만으로 보관 상태를 판정하지 않습니다. 성공한 보관 이력이 함께 있어야 합니다.',
        },
      ],
      evolution: { label: 'PROVENANCE RULE ADDED', date: '2026.08.27' },
    },
    {
      id: 'restore-guard',
      index: '05',
      label: 'RESTORE REVALIDATION',
      title: '복원할 때는 현재의 충돌과 의존 관계를 다시 검사한다.',
      sections: [
        {
          label: 'WHY',
          body: '보관 이후 같은 대상이 새로 생기거나 일정·저장소 의존 관계가 바뀌면 예전 상태를 그대로 되돌릴 수 없다.',
        },
        {
          label: 'DECISION',
          body: '복원 요청 시 보관 이력, 현재 상태, 대상 충돌과 의존 관계를 다시 확인합니다.',
        },
        {
          label: 'BOUNDARY',
          body: '복원 코드와 검증 계약은 구현했습니다. 운영 환경에서 반복 실행한 횟수는 미확인입니다.',
        },
      ],
      evolution: { label: 'REVALIDATION CONTRACT', date: '2026.08.27' },
    },
  ],
  workflow: {
    eyebrow: 'REGISTRATION WORKFLOW',
    title: '새 이름을 받되, 먼저 기존 연결을 찾는다.',
    introduction:
      '등록 요청에서 기존 항목 확인, 공통 목록 반영으로 이어지는 흐름.',
    steps: [
      {
        id: 'workflow-request',
        hotspotId: 'stable-identity',
        index: '01',
        label: 'REQUEST',
        summary: '코드와 표시명을 별도 입력',
      },
      {
        id: 'workflow-resolve',
        hotspotId: 'existing-row',
        index: '02',
        label: 'RESOLVE',
        summary: '추적 목록 밖의 기존 항목·충돌 확인',
      },
      {
        id: 'workflow-register',
        hotspotId: 'existing-row',
        index: '03',
        label: 'CREATE / PROMOTE',
        summary: '생성하거나 기존 연결을 보존해 추적',
      },
      {
        id: 'workflow-order',
        hotspotId: 'shared-order',
        index: '04',
        label: 'ORDER',
        summary: '공통 표시 순서를 저장',
      },
      {
        id: 'workflow-publish',
        hotspotId: 'shared-order',
        index: '05',
        label: 'CONSUME',
        summary: '일정·검토·AI가 같은 목록 사용',
      },
    ],
    boundary:
      '등록된 프로젝트 ID와 목록은 여러 기능이 함께 사용합니다. 과거 기록의 연결 대상이 의미상 맞는지는 별도 확인이 필요합니다.',
  },
  rules: {
    eyebrow: 'LIFECYCLE RULES',
    title: '현재 상태와 그 상태가 된 사건을 함께 본다.',
    items: [
      {
        statement: 'RENAME THE LABEL, KEEP THE ID.',
        explanation:
          '표시명은 바꿀 수 있습니다. 일정과 기록은 같은 프로젝트 ID를 계속 참조합니다.',
      },
      {
        statement: 'ARCHIVE IS NOT DELETE.',
        explanation:
          '운영 목록에서는 숨기되 row와 과거 관계를 보존하고, 참조가 남아 있으면 보관을 제한한다.',
      },
      {
        statement: 'STATE NEEDS PROVENANCE.',
        explanation:
          '추적 여부와 성공한 보관 이력을 함께 확인해, 보조 항목과 보관 프로젝트를 구분합니다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '프로젝트 목록에서, 참조를 지키는 공통 관리 체계로.',
    introduction:
      '목록의 기준을 정하고 여러 기능에 연결한 뒤, 보관과 복원의 판정 조건을 보완했습니다.',
    scenes: [
      {
        date: '2026.08.24',
        label: 'BOUNDARY DEFINED',
        visual: 'separate',
        decision: '프로젝트 데이터 관리를 접근 권한 설정과 분리',
        trigger: '프로젝트 데이터 변경과 누가 접근하는가가 한 설정 흐름에 섞임',
        change: '고정 ID·표시명·정렬·보관·복원에 대한 별도 계약 정의',
        currentEffect: '프로젝트 목록 관리와 RBAC가 각각의 책임을 맡는다.',
      },
      {
        date: '2026.08.25',
        label: 'REGISTRY UI',
        visual: 'registry',
        decision: '생성·추적 전환·이름 변경·정렬·보관을 하나의 관리 화면으로 연결',
        trigger: '기능마다 상수와 선택지가 달라 신규 프로젝트 추가 시 목록이 어긋남',
        change: '추적 목록 조회와 기존 프로젝트의 추적 전환 경로 구현',
        currentEffect: '표시를 바꿔도 기존 프로젝트 연결은 유지된다.',
      },
      {
        date: '2026.08.26',
        label: 'CONSUMER CUTOVER',
        visual: 'consumers',
        decision: '일정·검토·채팅·회의·AI 분류를 공통 목록으로 이동',
        trigger: '관리 화면만 바꾸면 다른 기능의 개별 프로젝트 목록은 계속 남음',
        change: '추적 프로젝트만 조회, 기타 분류 조건 정의, 기존 후보 연결 보완',
        currentEffect: '하나의 순서와 선택지가 여러 업무 화면에 반영된다.',
      },
      {
        date: '2026.08.27',
        label: 'PROVENANCE GUARD',
        visual: 'provenance',
        decision: '보관 이력과 복원 재검사를 상태 판정에 추가',
        trigger: '추적 여부만으로 보조 항목과 보관 프로젝트를 구분할 수 없음',
        change: '보관 감사 기록·현재 상태·충돌·의존 관계 확인',
        currentEffect: '복원 후보가 과거 추정이 아니라 기록된 사건으로 결정된다.',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / 2026.09.04 SNAPSHOT',
    title: '공통 프로젝트 목록에 연결된 데이터의 범위.',
    snapshot:
      '읽기 전용 production snapshot의 registry와 계획 범위입니다. 효율·정확도·반복 사용량 지표가 아닙니다.',
    items: [],
  },
  implementationStatus: {
    state: 'IMPLEMENTED / DEPLOYED / CONSUMED',
    items: [
      '프로젝트 생성·기존 항목의 추적 전환·표시명·정렬',
      '데이터를 유지한 보관·복원과 참조 검증',
      '일정·대시보드·검토·채팅·회의의 공통 추적 목록 조회',
      'AI 분류 선택지·기타 분류 조건·기존 후보 연결 보완',
    ],
    runtime:
      "2026.09.04 production snapshot에서 공통 프로젝트 목록과 연결된 계획 항목을 확인했다.",
  },
  boundary: {
    eyebrow: 'BOUNDARY / IDENTITY IS NOT OUTCOME',
    statement: '공통 ID의 적용 범위와, 연결된 내용의 타당성은 따로 확인한다.',
    items: [
      "추적 상태는 현재 목록에 노출되는 범위를 뜻합니다.",
      '기존 후보의 연결 보완 작업은 완료됐습니다. 과거 후보마다 프로젝트가 의미상 맞게 연결됐는지는 별도 검증이 필요합니다.',
    ],
  },
  relatedSystems: [
    {
      title: 'AI CANDIDATE REVIEW',
      relation: '후보가 사용할 프로젝트 선택지와 분류가 불확실할 때의 기타 상태',
      href: '/what/ai-candidate-review',
      status: 'available',
    },
    {
      title: 'DOCUMENTATION SYSTEM',
      relation: '현재 상태와 변경 이력, 판단 기준이 되는 문서를 다시 찾는 방식',
      href: '/how/documentation-system',
      status: 'available',
    },
    {
      title: 'SECURITY & OPERATIONS',
      relation: '프로젝트 데이터 관리와 접근 권한의 책임 분리',
      href: '/how/security-operations',
      status: 'available',
    },
  ],
} as const satisfies ProjectSettingPageContent
