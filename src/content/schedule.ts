import type { SchedulePageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { scheduleProductFixture } from './fixtures/schedule.ts'

export const scheduleContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED SCHEDULE VIEW / SYNTHETIC DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 06',
    titleLines: [
      'SCHEDULE',
      'OVERVIEW'
    ],
    thesis: '흩어진 일정표를 모아 진행을 비교하고 변경을 검토하게 했다.',
    summary: '프로젝트마다 다른 Excel을 공통 계획으로 정리했습니다. 자연어로 요청한 변경은 적용 전후를 확인하고, 역할에 맞는 일정 보기를 공유할 수 있습니다.',
    problemLabel: 'PROBLEM / SCATTERED PLANS',
    problem: '프로젝트마다 일정 문서와 항목 구성이 달라 전체 지연을 보기 어려웠습니다. 여러 일정을 고칠 때는 변경 대상과 누락 항목을 따로 확인해야 했습니다.'
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / PLAN + ACTUAL',
    title: '계획과 실제 진행을 한 화면에서',
    instruction: '진행선, 변경안, 이력을 선택해 설계 이유를 확인하세요.',
    defaultAnnotation: {
      index: '00',
      label: 'TIMELINE GUIDE',
      title: '일정을 보고 변경하는 흐름',
      body: '현재 일정은 확정된 값으로 표시합니다. 변경안은 선택과 충돌 검사를 거쳐 적용하고, 조회 전용 역할에는 허용된 일정만 제공합니다.'
    }
  },
  product: scheduleProductFixture,
  annotations: [
    {
      id: 'canonical-timeline',
      index: '01',
      label: 'PLAN / ACTUAL',
      title: '계획 위에 실제 진행선을 겹쳤다.',
      sections: [
        {
          label: 'WHY',
          body: '계획 날짜만으로는 실제로 어디까지 진행했는지 알기 어렵고, 실제 날짜만으로는 기준 계획과 비교하기 어려웠습니다.'
        },
        {
          label: 'DECISION',
          body: '확정 계획 막대 위에 실제 시작일부터 종료일 또는 오늘까지의 진행선을 표시했습니다. 실제 날짜를 기록한 항목에 진행선을 그립니다.'
        }
      ],
      evolution: {
        label: 'ACTUAL LINE ADDED',
        date: '2026.08.24'
      }
    },
    {
      id: 'missing-data',
      index: '02',
      label: 'CONFIRM NEEDED',
      title: '누락한 항목을 확인할 수 있게 했다.',
      sections: [
        {
          label: 'WHY',
          body: '원본 일정마다 담당자와 시작일, 완료 기준이 빠진 항목이 있었습니다.'
        },
        {
          label: 'DECISION',
          body: '필요한 값이 없는 항목은 확인 필요로 표시하고, 어떤 값을 보완해야 하는지 읽을 수 있게 했습니다.'
        }
      ],
      evolution: {
        label: 'CANONICAL MODEL',
        date: '2026.07.16'
      }
    },
    {
      id: 'staged-changes',
      index: '03',
      label: 'STAGED CHANGE SET',
      title: '자연어 요청을 적용 전 변경안으로 보여준다.',
      sections: [
        {
          label: 'WHY',
          body: '담당자나 작업명으로 여러 일정을 바꿀 때 대상을 잘못 찾거나 일부 항목만 반영할 수 있었습니다.'
        },
        {
          label: 'DECISION',
          body: '변경 전후를 나란히 보여주고 사용자가 항목을 선택하거나 수정한 뒤 적용하도록 했습니다. 선택한 변경은 같은 트랜잭션에서 함께 처리합니다.'
        }
      ],
      evolution: {
        label: 'PROPOSAL WORKFLOW',
        date: '2026.07.21'
      }
    },
    {
      id: 'audit-revert',
      index: '04',
      label: 'AUDIT + REVERT',
      title: '최근 변경을 확인한 뒤 되돌린다.',
      sections: [
        {
          label: 'WHY',
          body: '다른 사람이 수정한 뒤 과거 값을 다시 적용하면 새 변경을 덮어쓸 수 있었습니다.'
        },
        {
          label: 'DECISION',
          body: '변경자와 요청, 변경 전후 값을 이력으로 남겼습니다. 같은 계획에 더 최신 적용이 있는지 확인한 뒤 되돌리도록 했습니다.'
        }
      ],
      evolution: {
        label: 'AUDIT CONNECTED',
        date: '2026.07.23'
      }
    },
    {
      id: 'role-boundary',
      index: '05',
      label: 'ROLE SCOPE',
      title: '역할에 맞는 일정 보기를 제공한다.',
      sections: [
        {
          label: 'WHY',
          body: '외부 협업자는 공유한 계획을 읽을 수 있어야 했고, 실제 계획을 바꾸는 일은 편집자가 맡았습니다.'
        },
        {
          label: 'DECISION',
          body: '항목별 공개 여부와 서버의 변경 권한을 나눴습니다. 조회 전용 역할에는 타임라인과 상세 보기, 표시 이름을 제공합니다.'
        }
      ],
      evolution: {
        label: 'READ-ONLY CONTRACT',
        date: '2026.07.20 → 08.27'
      }
    }
  ],
  workflow: {
    eyebrow: 'CHANGE WORKFLOW',
    title: '가져온 계획을 검토하고 바꾸고 공유한다.',
    introduction: '원본 가져오기부터 변경안 적용과 역할별 공유로 이어지는 흐름.',
    steps: [
      {
        id: 'schedule-flow-import',
        hotspotId: 'missing-data',
        index: '01',
        label: 'IMPORT',
        summary: '원본 이력과 누락 값을 보존'
      },
      {
        id: 'schedule-flow-plan',
        hotspotId: 'canonical-timeline',
        index: '02',
        label: 'PLAN',
        summary: '확인된 계획·실제를 표시'
      },
      {
        id: 'schedule-flow-propose',
        hotspotId: 'staged-changes',
        index: '03',
        label: 'PROPOSE',
        summary: '자연어 변경을 검토 대기안으로 저장'
      },
      {
        id: 'schedule-flow-apply',
        hotspotId: 'audit-revert',
        index: '04',
        label: 'APPLY',
        summary: '선택·충돌 확인 후 전체를 함께 적용'
      },
      {
        id: 'schedule-flow-share',
        hotspotId: 'role-boundary',
        index: '05',
        label: 'SHARE',
        summary: '역할에 허용된 일정만 조회'
      }
    ],
    boundary: '원본 가져오기 이력과 변경 전후 값을 남겨, 현재 계획이 어떤 요청으로 바뀌었는지 다시 확인할 수 있습니다.'
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: '바꾸기 전에 확인할 것',
    items: [
      {
        statement: '빠진 값은 확인할 항목으로',
        explanation: '담당자나 날짜가 없는 계획을 찾고 보완할 수 있도록 표시했습니다.'
      },
      {
        statement: '적용 전 변경 전후 비교',
        explanation: '자연어로 찾은 대상과 바꿀 값을 사람이 확인한 뒤 함께 반영합니다.'
      },
      {
        statement: '공유와 편집 권한 분리',
        explanation: '항목별 공개 여부와 생성, 수정, 삭제, 적용 권한을 역할에 맞게 나눴습니다.'
      }
    ]
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '일정을 모으고 바꾸는 화면으로',
    introduction: '원본 보존, 변경안 검토, 역할별 공유, 실제 진행선, 공유 가능한 보기로 확장했습니다.',
    scenes: [
      {
        date: '2026.07.16',
        label: 'CANONICAL PLAN',
        visual: 'canonical',
        decision: '서로 다른 Excel을 하나의 계획 모델로 읽기 시작했다.',
        trigger: '원본 구조와 누락 필드가 프로젝트마다 달랐음',
        change: '가져온 원본 이력과 확정 계획 항목 분리',
        currentEffect: '화면은 확인된 계획만 읽고 누락 값은 비움'
      },
      {
        date: '2026.07.21',
        label: 'STAGED PROPOSAL',
        visual: 'proposal',
        decision: '자연어 변경을 별도의 검토 대기안으로 만들었다.',
        trigger: '다중 일정 오인식·부분 반영·동시 수정 위험',
        change: '선택 적용, 동시 수정 확인, 되돌리기 추가',
        currentEffect: '검토 대기안과 최근 적용 이력을 별도로 표시'
      },
      {
        date: '2026.07.24',
        label: 'ROLE SCOPE',
        visual: 'role-scope',
        decision: '항목의 공개 여부와 서버 경로의 변경 권한을 나눴다.',
        trigger: '외부 협업자는 일부 일정만 읽어야 했음',
        change: '항목 공개 설정·한국어/영어·영업 역할의 조회 전용 상세',
        currentEffect: '같은 타임라인을 조회 전용 화면으로 제공'
      },
      {
        date: '2026.08.24',
        label: 'ACTUAL LINE',
        visual: 'actual-line',
        decision: '계획 막대에 실제 진행선을 더했다.',
        trigger: '계획 종료와 실제 진행을 함께 비교할 필요',
        change: '실제 시작부터 종료 또는 오늘까지 별도 진행선',
        currentEffect: '미완료·기한 초과를 계획 대비 실제로 읽음'
      },
      {
        date: '2026.08.27',
        label: 'SHAREABLE STATE',
        visual: 'share-state',
        decision: '같은 보기를 복원하고, 조회 전용 응답에 담는 정보는 줄였다.',
        trigger: '새로고침과 링크 공유 시 필터 조건이 사라짐',
        change: '허용 필터를 URL에 저장하고 역할별 별칭 응답을 구분',
        currentEffect: '보기 조건을 공유하고 원시 별칭은 편집자에게만 제공'
      }
    ]
  },
  evidence: {
    eyebrow: 'WORK CHANGES',
    title: '같은 일정을 함께 보고 변경을 추적',
    snapshot: '프로젝트별 계획을 공통 타임라인으로 모으고, 같은 필터 조건을 링크로 공유하게 했습니다.',
    items: []
  },
  implementationStatus: {
    state: '업무의 변화',
    items: [
      '계획 생성과 수정, 한국어와 영어 상세 보기',
      '계획 대비 실제 진행과 기한 초과 표시',
      '변경안 선택 적용, 변경 이력, 되돌리기',
      '역할별 일정 공유와 필터 조건을 담은 링크'
    ],
    runtime: '편집자는 변경 전후와 적용 이력을 확인하고, 조회자는 자신의 역할에 공개된 계획을 읽습니다. 계획과 실제를 나란히 보며 기한을 넘긴 항목도 확인할 수 있습니다.'
  },
  boundary: {
    eyebrow: 'DESIGN TAKEAWAY',
    statement: '요청부터 변경 이력까지',
    items: [
      '자연어 요청으로 찾은 대상을 먼저 보여주고, 사람이 고른 변경을 적용한 뒤 되돌릴 조건까지 확인하도록 했습니다.'
    ]
  },
  relatedSystems: [
    { title: 'PROJECT SETTING', relation: '일정과 후보가 함께 사용하는 추적 프로젝트 목록', href: '/what/project-setting', status: 'available' },
    { title: 'AI-NATIVE ENGINEERING', relation: '제안을 검증 가능한 변경으로 다루는 방식', href: '/how/ai-native-engineering', status: 'available' },
    { title: 'SECURITY & OPERATIONS', relation: '항목별 공개 여부와 서버 경로의 변경 권한', href: '/how/security-operations', status: 'available' },
  ],
} as const satisfies SchedulePageContent
