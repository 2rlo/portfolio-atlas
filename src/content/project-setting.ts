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
      '화면마다 달라지던 프로젝트 이름을 하나의 registry로 모으되, 과거 연결은 끊지 않는다.',
    summary:
      '표시명·순서·노출은 바꿀 수 있게 하고, 일정·검토·AI 분류가 참조하는 내부 identity는 유지했다.',
    problemLabel: 'PROBLEM / LABELS DRIFT, REFERENCES SHOULD NOT',
    problem:
      '기능마다 문자열 목록을 따로 두면 신규 프로젝트와 rename 때 선택지가 갈라지고, 삭제는 이미 연결된 일정과 기록의 맥락을 잃게 했다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / TRACKED REGISTRY',
    title: '관리 화면 안에 숨은 데이터 수명주기를 살펴보세요.',
    instruction:
      '다섯 지점에 hover, focus 또는 tap하면 등록·정렬·보관·복원이 같은 ID를 지키는 이유가 오른쪽 여백에 표시됩니다.',
    defaultAnnotation: {
      index: '00',
      label: 'REGISTRY GUIDE',
      title: '이름을 편집해도 연결은 남아야 한다.',
      body: 'Code, existing row resolution, shared order, archive provenance, restore guard를 따라가면 작은 설정 화면이 여러 product surface의 기준이 되는 방식을 볼 수 있습니다.',
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
          body: '표시명은 운영 중 바뀔 수 있지만 일정·저장소·후보가 가리키는 대상까지 rename에 따라 이동하면 안 된다.',
        },
        {
          label: 'DECISION',
          body: 'code와 내부 ID는 stable identity로 두고, label과 sort order만 사용자 편집 영역으로 열었다.',
        },
        {
          label: 'BOUNDARY',
          body: '표시명 변경은 새 프로젝트 생성이나 과거 관계 migration이 아니다.',
        },
      ],
      evolution: { label: 'DEFINED AS SEPARATE FIELDS', date: '2026.08.24' },
    },
    {
      id: 'existing-row',
      index: '02',
      label: 'EXISTING ROW RESOLUTION',
      title: '등록 요청이 곧 새 row 생성은 아니다.',
      sections: [
        {
          label: 'WHY',
          body: '일정이나 저장소가 연결된 untracked row가 이미 있다면 같은 이름을 새로 만드는 순간 참조가 둘로 갈라진다.',
        },
        {
          label: 'DECISION',
          body: '새 row보다 기존 row의 tracked 승격을 먼저 검토해 이미 쌓인 관계와 history를 보존했다.',
        },
        {
          label: 'BOUNDARY',
          body: 'label 유사성만으로 자동 승격하지 않는다. 모호한 대상은 충돌 확인을 거친다.',
        },
      ],
      evolution: { label: 'PROMOTION PATH ADDED', date: '2026.08.25' },
    },
    {
      id: 'shared-order',
      index: '03',
      label: 'SHARED ORDER',
      title: '정렬도 각 화면의 로컬 취향으로 남기지 않았다.',
      sections: [
        {
          label: 'WHY',
          body: '일정·대시보드·검토함·채팅이 서로 다른 프로젝트 순서를 쓰면 같은 대상을 비교할 때 매번 다시 찾아야 한다.',
        },
        {
          label: 'DECISION',
          body: 'tracked list와 sort order를 공통 lookup으로 제공하고 consumer를 같은 기준으로 옮겼다.',
        },
        {
          label: 'EVIDENCE',
          body: '일정·대시보드·AI 후보·채팅·회의 추출이 같은 tracked registry를 읽는 운영 경로를 확인했다.',
        },
      ],
      evolution: { label: 'CONSUMERS ALIGNED', date: '2026.08.26' },
    },
    {
      id: 'archive-provenance',
      index: '04',
      label: 'ARCHIVE PROVENANCE',
      title: '현재 꺼져 있다는 상태만으로 과거를 해석하지 않는다.',
      sections: [
        {
          label: 'WHY',
          body: 'untracked는 처음부터 운영 대상이 아니었던 utility row와 실제 보관된 프로젝트를 모두 표현할 수 있다.',
        },
        {
          label: 'DECISION',
          body: '성공한 project.archive 감사 사건이 있는 row만 보관 목록과 복원 후보로 취급한다.',
        },
        {
          label: 'BOUNDARY',
          body: 'is_tracked=false 하나만 보고 archived라고 추정하지 않는다.',
        },
      ],
      evolution: { label: 'PROVENANCE RULE ADDED', date: '2026.08.27' },
    },
    {
      id: 'restore-guard',
      index: '05',
      label: 'RESTORE REVALIDATION',
      title: '복원은 archive를 뒤집는 단순 toggle이 아니다.',
      sections: [
        {
          label: 'WHY',
          body: '보관 이후 같은 대상이 새로 생기거나 일정·저장소 의존 관계가 바뀌면 예전 상태를 그대로 되돌릴 수 없다.',
        },
        {
          label: 'DECISION',
          body: 'archive provenance, 현재 상태, 대상 충돌과 의존 관계를 복원 요청 시 다시 확인한다.',
        },
        {
          label: 'BOUNDARY',
          body: '코드 경로와 계약은 구현됐지만 production 복원 반복 사용 횟수는 확인하지 않았다.',
        },
      ],
      evolution: { label: 'REVALIDATION CONTRACT', date: '2026.08.27' },
    },
  ],
  workflow: {
    eyebrow: 'REGISTRATION WORKFLOW',
    title: '새 이름을 받되, 먼저 기존 연결을 찾는다.',
    introduction:
      '각 단계에 focus하거나 pointer를 올리면 제품 surface의 대응 지점도 함께 강조됩니다.',
    steps: [
      {
        id: 'workflow-request',
        hotspotId: 'stable-identity',
        index: '01',
        label: 'REQUEST',
        summary: 'code와 표시명을 별도 입력',
      },
      {
        id: 'workflow-resolve',
        hotspotId: 'existing-row',
        index: '02',
        label: 'RESOLVE',
        summary: '기존 untracked row와 충돌 확인',
      },
      {
        id: 'workflow-register',
        hotspotId: 'existing-row',
        index: '03',
        label: 'CREATE / PROMOTE',
        summary: '관계를 보존하며 tracked로 전환',
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
      '등록 성공은 여러 consumer가 같은 project identity를 읽게 한다. 과거 데이터 전체가 의미적으로 완전해졌다는 선언은 아니다.',
  },
  rules: {
    eyebrow: 'LIFECYCLE RULES',
    title: '현재 상태와 그 상태가 된 사건을 함께 본다.',
    items: [
      {
        statement: 'RENAME THE LABEL, KEEP THE ID.',
        explanation:
          '사람이 보는 용어는 바뀔 수 있다. 일정과 기록의 과거 참조는 동일한 identity에 남긴다.',
      },
      {
        statement: 'ARCHIVE IS NOT DELETE.',
        explanation:
          '운영 목록에서는 숨기되 row와 과거 관계를 보존하고, 참조가 남아 있으면 보관을 제한한다.',
      },
      {
        statement: 'STATE NEEDS PROVENANCE.',
        explanation:
          '현재 untracked라는 값만으로 utility와 archive를 합치지 않고, 성공한 감사 사건으로 lifecycle을 구분한다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '프로젝트 목록에서, 참조를 지키는 registry로.',
    introduction:
      '관리 surface와 consumer 연결에 직접 남은 변화만 네 장면으로 정리했습니다.',
    scenes: [
      {
        date: '2026.08.24',
        label: 'BOUNDARY DEFINED',
        visual: 'separate',
        decision: '프로젝트 lifecycle을 접근 권한 설정과 분리',
        trigger: '프로젝트 데이터 변경과 누가 접근하는가가 한 설정 흐름에 섞임',
        change: 'stable ID·표시명·정렬·보관·복원의 별도 계약 정의',
        currentEffect: 'registry와 RBAC가 서로 다른 책임으로 남는다.',
      },
      {
        date: '2026.08.25',
        label: 'REGISTRY UI',
        visual: 'registry',
        decision: '생성·승격·rename·reorder·archive를 하나의 관리 surface로 연결',
        trigger: '기능마다 상수와 선택지가 달라 신규 프로젝트 추가 때 drift 발생',
        change: 'tracked lookup과 기존 row 승격 경로 구현',
        currentEffect: '표시를 바꿔도 기존 project relation은 유지된다.',
      },
      {
        date: '2026.08.26',
        label: 'CONSUMER CUTOVER',
        visual: 'consumers',
        decision: '일정·검토·채팅·회의·AI 분류를 공통 목록으로 이동',
        trigger: '관리 화면만 registry를 쓰면 다른 surface의 문자열 목록은 계속 갈라짐',
        change: 'tracked-only lookup, 기타 경계, 기존 후보 backfill',
        currentEffect: '하나의 순서와 선택지가 여러 업무 화면에 반영된다.',
      },
      {
        date: '2026.08.27',
        label: 'PROVENANCE GUARD',
        visual: 'provenance',
        decision: 'archive 사건과 restore 재검증을 상태 판정에 추가',
        trigger: 'untracked 하나로 utility row와 보관 프로젝트를 구분할 수 없음',
        change: '감사 provenance·현재 상태·충돌·의존 관계 확인',
        currentEffect: '복원 후보가 과거 추정이 아니라 기록된 사건으로 결정된다.',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / 2026.08.27 SNAPSHOT',
    title: 'registry의 적용 범위를 세되, 운영 성과로 읽지 않는다.',
    snapshot:
      '같은 시점의 읽기 전용 데이터 범위입니다. 효율·정확도·기능별 반복 사용량 지표가 아닙니다.',
    items: [
      {
        value: '4 / 8',
        label: 'TRACKED / ALL ROWS',
        meaning: '전체 project row 중 tracked registry에 노출된 범위',
        boundary: '나머지 4개가 모두 archive라는 뜻이 아님',
      },
      {
        value: '74 / 74',
        label: 'SCHEDULE LINKS',
        meaning: '관측한 일정 row가 tracked project ID에 연결된 상태',
        boundary: '일정 품질이나 사용 완료율을 의미하지 않음',
      },
      {
        value: '213 / 307',
        label: 'CANDIDATE LINKS',
        meaning: 'AI 기록 후보 중 tracked project ID가 연결된 범위',
        boundary: '연결되지 않은 후보가 모두 오류라는 뜻이 아님',
      },
    ],
  },
  implementationStatus: {
    state: 'IMPLEMENTED / DEPLOYED / CONSUMED',
    items: [
      '프로젝트 생성·기존 row 승격·표시명·정렬',
      'soft archive·restore와 참조 검증',
      '일정·대시보드·검토·채팅·회의 tracked lookup',
      'AI 분류의 registry 선택지·기타 경계·후보 backfill',
    ],
    runtime:
      '2026.08.26 운영 반영과 consumer 조회 경로는 확인됐다. 8월 27일 provenance 보완은 코드·계약 근거이며 production 복원 실행 횟수와 관리 동작별 adoption은 미확인이다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / IDENTITY IS NOT OUTCOME',
    statement: 'One registry prevents drift. It does not prove every relation is correct.',
    items: [
      'tracked 상태는 현재 노출 범위이며 프로젝트의 성공·활성 사용을 뜻하지 않는다.',
      'backfill job 완료는 모든 과거 후보의 의미적 연결 완전성을 증명하지 않는다.',
      'untracked row를 archive로 추정하지 않고 감사 provenance를 함께 본다.',
      '구현·배포는 확인했지만 관리 기능 반복 사용량과 운영 효율은 측정하지 않았다.',
    ],
  },
  relatedSystems: [
    {
      title: 'AI CANDIDATE REVIEW',
      relation: '후보의 project 선택지와 불확실한 기타 상태',
      href: '/what/ai-candidate-review',
      status: 'available',
    },
    {
      title: 'DOCUMENTATION SYSTEM',
      relation: '현재 상태뿐 아니라 변경 사건과 authority를 다시 찾는 방식',
      href: '/how/documentation-system',
      status: 'available',
    },
    {
      title: 'SECURITY / GOVERNANCE',
      relation: '프로젝트 lifecycle과 접근 권한의 책임 분리',
      status: 'in-development',
    },
  ],
} as const satisfies ProjectSettingPageContent
