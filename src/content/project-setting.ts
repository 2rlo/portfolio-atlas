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
      "프로젝트를 한곳에서 관리하고, 이름이 바뀌어도 기존 업무 기록은 이어지게 했습니다.",
    summary:
      "일정과 검토, 대시보드, AI 분류가 같은 프로젝트 목록과 순서를 사용하도록 바꿨습니다. 표시명은 수정하되 기록을 연결하는 ID는 유지합니다.",
    problemLabel: "화면마다 달라지는 프로젝트 목록",
    problem:
      '기능마다 프로젝트 목록을 따로 두면 추가하거나 이름을 바꿀 때 선택지가 갈라집니다. 프로젝트를 삭제하면 이미 연결된 일정과 기록도 맥락을 잃습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / TRACKED REGISTRY',
    title: '이름은 바뀌어도, 같은 프로젝트로 연결되도록.',
    instruction:
      "프로젝트 이름과 연결 관계, 공통 정렬, 보관과 복원 방식을 확인해 보세요.",
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
          body: '코드와 내부 ID는 고정하고, 사용자가 표시명과 정렬 순서를 편집할 수 있게 했습니다.',
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
          body: "일정과 대시보드, AI 후보, 채팅, 회의 추출이 같은 프로젝트 목록을 사용합니다. 관리 화면에서 정한 목록과 순서가 각 업무 화면에 반영됩니다.",
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
          body: "보관 이후 새로 생긴 프로젝트와의 충돌, 일정과 저장소의 연결 관계를 확인한 뒤 복원합니다.",
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
      "프로젝트를 등록하거나 표시 순서를 바꾸면 연결된 업무 화면이 같은 목록을 사용합니다. 이름을 바꾸거나 보관해도 기존 기록의 연결을 유지합니다.",
  },
  rules: {
    eyebrow: 'LIFECYCLE RULES',
    title: '현재 상태와 그 상태가 된 사건을 함께 본다.',
    items: [
      {
        statement: "이름을 바꿔도 기록은 연결",
        explanation:
          '표시명은 바꿀 수 있습니다. 일정과 기록은 같은 프로젝트 ID를 계속 참조합니다.',
      },
      {
        statement: "보관할 때 이력은 보존",
        explanation:
          '운영 목록에서는 숨기되 데이터 행과 과거 연결 관계는 보존하고, 참조가 남아 있으면 보관을 제한한다.',
      },
      {
        statement: "복원할 때 현재 관계 확인",
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
  "eyebrow": "WORKFLOW CHANGE",
  "title": "프로젝트 변경을 여러 화면에 따로 반영할 필요가 줄었습니다.",
  "snapshot": "생성과 이름 변경, 정렬, 보관을 공통 관리 화면으로 모으고 각 기능이 같은 목록을 읽도록 연결했습니다.",
  "items": []
},
  implementationStatus: {
  "state": "공통 목록으로 이어지는 업무",
  "items": [
    "일정과 대시보드, 검토, 채팅, 회의에서 같은 프로젝트를 선택합니다.",
    "새 항목을 만들기 전에 기존 연결을 찾아 중복 등록을 줄입니다.",
    "보관할 때 과거 기록을 남기고, 복원할 때 현재 데이터와 충돌하는지 확인합니다."
  ],
  "runtime": "AI 후보의 프로젝트 선택지도 공통 목록을 따릅니다. 분류가 불명확한 항목은 검토자가 연결할 프로젝트를 선택할 수 있게 했습니다."
},
  boundary: {
  "eyebrow": "DESIGN TAKEAWAY",
  "statement": "프로젝트의 이름과 연결 관계를 나눠 관리했습니다.",
  "items": [
    "사용자에게 보이는 이름과 순서는 바꾸기 쉽게, 업무 기록의 연결은 유지되도록 설계했습니다."
  ]
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
