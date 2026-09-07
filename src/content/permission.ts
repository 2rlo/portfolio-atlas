import type { PermissionPageContent } from './content-types.ts'
import { jadebellPublicFixture } from './fixtures/jadebell-public.ts'
import { permissionProductFixture } from './fixtures/permission.ts'

export const permissionContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: 'RECONSTRUCTED ACCESS VIEW / SYNTHETIC DATA',
    currentStatus: 'implemented-and-active',
    boundary: jadebellPublicFixture.meta.boundary,
  },
  hero: {
    eyebrow: 'WHAT I BUILT / 11',
    titleLines: ['PERMISSION', 'CONTROL'],
    thesis:
      '로그인과 업무 권한을 분리하고, 역할 기본값과 개인 예외를 합산한 최종 권한을 UI와 API가 함께 사용하게 했다.',
    summary:
      '공용 인증을 개인별 인증으로 바꾸고, 고정 역할을 자원·행동별 권한과 위임 관리로 확장했습니다.',
    problemLabel: 'PROBLEM / AUTHENTICATED DOES NOT MEAN AUTHORIZED',
    problem:
      '공용 계정과 화면 숨김만으로는 누가 무엇을 바꿀 수 있는지 강제·회수·감사하기 어려웠고, 역할별 예외를 두 곳에서 관리하면 결과가 쉽게 어긋났습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / EFFECTIVE ACCESS',
    title: 'One actor. One computed result. Every consuming surface.',
    instruction:
      '계정 연결 · 역할 기본값 · 개인 예외 · 최종 권한 · 변경 보호 규칙',
    defaultAnnotation: {
      index: '00',
      label: 'ACCESS GUIDE',
      title: '역할과 개인 예외를 합산하면, 이 사람이 할 수 있는 일이 정해진다.',
      body: '계정 연결을 확인한 뒤 역할 기본값에 개인 예외를 적용합니다. 권한 변경은 관리자 보호 규칙까지 통과해야 저장됩니다.',
    },
  },
  product: permissionProductFixture,
  annotations: [
    {
      id: 'identity-link',
      index: '01',
      label: 'IDENTITY LINK',
      title: '회사 계정으로 인증됐다는 사실과, 제품 안에서 허용됐다는 사실을 분리했다.',
      sections: [
        {
          label: 'WHY',
          body: '로그인을 허용한 그룹의 구성원이어도 제품의 팀원으로 연결되지 않았거나 업무 권한이 없을 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: 'Entra는 로그인 허용 여부를 판단하고, 제품은 PostgreSQL의 팀원·역할·개인 예외를 기준으로 업무 권한을 계산합니다.',
        },
        {
          label: 'BOUNDARY',
          body: '팀원으로 연결되지 않은 로그인은 업무 권한 0개의 Access not granted 상태로 둡니다.',
        },
      ],
      evolution: { label: 'AUTHENTICATION GATE SPLIT', date: '2026.08.26' },
    },
    {
      id: 'role-default',
      index: '02',
      label: 'ROLE DEFAULT',
      title: '역할은 반복되는 기본값이지, 모든 사람을 억지로 끼워 넣는 단일 분류가 아니다.',
      sections: [
        {
          label: 'WHY',
          body: '같은 직무에도 개인별 예외가 생깁니다. 역할만으로는 이를 표현하기 어렵고, 모든 권한을 사람마다 설정하면 관리 항목이 늘어납니다.',
        },
        {
          label: 'DECISION',
          body: '역할 템플릿으로 기본 권한을 제공하고, 템플릿을 지정하지 않는 상태도 지원했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '템플릿이 없으면 기본 권한도 없습니다. 보호 규칙이 허용하는 개인 예외만 적용됩니다.',
        },
      ],
      evolution: { label: 'ROLE + OVERRIDE MODEL', date: '2026.08.24' },
    },
    {
      id: 'personal-override',
      index: '03',
      label: 'PERSONAL OVERRIDE',
      title: '개인 예외에는 역할 기본값에서 달라진 자원과 행동만 기록한다.',
      sections: [
        {
          label: 'WHY',
          body: '사람마다 전체 권한을 저장하면 역할 기본값이 바뀐 뒤 누가 어떤 이유로 다른 권한을 갖는지 추적하기 어렵습니다.',
        },
        {
          label: 'DECISION',
          body: '역할 기본값에 추가·회수한 권한만 합산하고, 권한표에는 역할·개인 예외·보호 규칙 중 어디에서 나온 결과인지 표시했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '역할에 고정된 보호 권한과 위임 범위는 개인 예외로 우회할 수 없습니다.',
        },
      ],
      evolution: { label: 'DIFFERENCE-ONLY EDITING', date: '2026.08.25' },
    },
    {
      id: 'effective-permission',
      index: '04',
      label: 'EFFECTIVE PERMISSION',
      title: '메뉴·버튼·직접 URL·API에 같은 최종 권한을 적용했다.',
      sections: [
        {
          label: 'WHY',
          body: '화면에서만 숨기면 직접 API 호출이 허용될 수 있습니다. 경로마다 계산이 달라도 권한 회수 결과가 어긋납니다.',
        },
        {
          label: 'DECISION',
          body: '자원·행동별 권한 계산을 서버 함수 하나로 모으고, 같은 권한표로 화면과 API의 허용 결과를 검증했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '즉시 회수 race를 피하기 위해 v1은 request 간 cache를 두지 않았습니다. 성능 최적화보다 stale 허용 방지를 우선했습니다.',
        },
      ],
      evolution: { label: 'RESOURCE × ACTION', date: '2026.08.24' },
    },
    {
      id: 'protected-change',
      index: '05',
      label: 'PROTECTED CHANGE',
      title: '저장 버튼보다 먼저, 변경 후에도 복구 가능한 관리자가 남는지 확인한다.',
      sections: [
        {
          label: 'WHY',
          body: '동시 변경으로 마지막 관리자가 사라지면 제품 안에서 복구할 권한도 잃습니다. 위임받은 관리자가 자기 권한을 높이는 경로도 막아야 합니다.',
        },
        {
          label: 'DECISION',
          body: 'advisory lock과 행 잠금 안에서 역할·개인 예외를 바꾼 뒤 유효한 관리자 수를 다시 셌습니다. 변경과 감사 기록은 하나의 트랜잭션으로 확정했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '마지막 관리자 제거는 전체 rollback한다. 위임 관리자는 자신·owner를 바꾸거나 팀원 관리 권한을 재위임할 수 없고, 초대 생성·취소도 할 수 없다.',
        },
      ],
      evolution: { label: 'DELEGATED ADMIN GUARDS', date: '2026.08.26' },
    },
  ],
  workflow: {
    eyebrow: 'AUTHORIZATION WORKFLOW',
    title: '사용자를 확인하고, 개인 예외와 보호 규칙을 반영한 권한을 적용한다.',
    introduction: '계정 연결에서 시작해 UI와 API의 권한 적용으로 이어지는 다섯 단계.',
    steps: [
      { id: 'permission-flow-identify', hotspotId: 'identity-link', index: '01', label: 'IDENTIFY', summary: '로그인 계정과 제품 팀원 연결' },
      { id: 'permission-flow-default', hotspotId: 'role-default', index: '02', label: 'DEFAULT', summary: '역할의 자원·행동별 기본 권한' },
      { id: 'permission-flow-diff', hotspotId: 'personal-override', index: '03', label: 'OVERRIDE', summary: '개인의 추가·회수 권한 반영' },
      { id: 'permission-flow-guard', hotspotId: 'protected-change', index: '04', label: 'GUARD', summary: '관리자 잠금·권한 상승·위임 범위 검사' },
      { id: 'permission-flow-enforce', hotspotId: 'effective-permission', index: '05', label: 'ENFORCE', summary: 'UI와 API가 같은 결과 사용' },
    ],
    boundary: '계정 연결 상태, 활성 여부, 역할, 개인 예외, 보호 규칙을 확인한 뒤 업무 행동을 허용합니다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'Authenticate with identity. Authorize with product policy.',
    items: [
      {
        statement: 'LOGIN GATE ≠ BUSINESS ACCESS.',
        explanation: '외부 인증 서비스는 사용자를 확인하고, 제품은 자체 DB의 정책을 기준으로 업무 권한을 판단합니다.',
      },
      {
        statement: 'STORE DIFFERENCES, SHOW RESULTS.',
        explanation: '관리자는 역할과 개인별 차이를 편집하고, 사용 화면은 계산된 최종 권한을 적용합니다.',
      },
      {
        statement: 'NO LAST-ADMIN WRITE.',
        explanation: '변경 후에도 관리자가 남는지 트랜잭션 안에서 다시 확인하고, 보호 규칙을 위반한 변경은 모두 되돌립니다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '공용 비밀번호에서, 비개발자도 위임 범위 안에서 관리하는 권한 체계로.',
    introduction: '일정 조회 권한에서 시작해 계정 연결·권한표·개인 예외·관리자 보호로 확장했습니다.',
    scenes: [
      {
        date: '2026.07.16',
        label: 'READ-ONLY NEED',
        visual: 'read-only-need',
        decision: '영업 담당자에게는 일정 조회 권한이 필요했다.',
        trigger: '공용 인증으로는 사람별 업무 범위를 나눌 수 없음',
        change: '역할별 접근 경로와 행동, 일정 조회 전용 범위 정의',
        currentEffect: '권한표에서 조회·편집·삭제를 각각 계산',
      },
      {
        date: '2026.07.20',
        label: 'OIDC + ROLE',
        visual: 'oidc-role',
        decision: '공용 Basic Auth를 회사 계정 인증과 서버 세션으로 교체했다.',
        trigger: '개인별 회수·감사·최소 권한을 적용할 수 없음',
        change: 'Entra OIDC, Redis 세션, CSRF, 초기 역할 매핑',
        currentEffect: '사용자를 식별한 뒤 제품의 업무 권한 계산',
      },
      {
        date: '2026.08.24',
        label: 'RESOURCE × ACTION',
        visual: 'resource-action',
        decision: '화면별 역할을 업무 자원·행동별 권한으로 바꿨다.',
        trigger: '보기·편집·삭제·관리 경계와 개인 예외를 세밀하게 표현해야 함',
        change: 'PostgreSQL의 역할 기본값에 개인별 추가·회수 권한 반영',
        currentEffect: '계산된 최종 권한을 접근 경로와 조작의 공통 기준으로 사용',
      },
      {
        date: '2026.08.25',
        label: 'ADMIN SURFACE',
        visual: 'admin-surface',
        decision: '외부 인증 서비스의 설정을 바꾸지 않고 제품 안에서 권한을 관리하게 했다.',
        trigger: '신규 인원마다 개발자가 두 곳의 권한 설정을 직접 수정',
        change: '사전 초대·역할·개인 예외·변경 이력 관리 UI',
        currentEffect: '비개발자도 허용된 위임 범위 안에서 팀 접근을 관리',
      },
      {
        date: '2026.08.26',
        label: 'AUTHORITY SPLIT',
        visual: 'authority-split',
        decision: 'Entra는 로그인 허용 여부를, PostgreSQL은 업무 권한의 기준을 맡게 했다.',
        trigger: 'App Role과 DB의 권한을 중복 관리하면서 결과가 어긋남',
        change: '보안 그룹의 로그인 제어, 위임 관리자 보호, App Role 제거',
        currentEffect: '계정 인증 상태와 최종 업무 권한을 각각 표시',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / OPERATING DB 2026.09.04',
    title: '2026년 8월 26일, 운영 DB의 권한 구성.',
    snapshot: '읽기 전용 production snapshot에서 확인한 현재 authorization contract입니다.',
    items: [
      { value: '31', label: 'PERMISSION CATALOG', meaning: '현재 resource × action 정의', boundary: '보안 인증이나 최소권한 달성률이 아님' },
      { value: '6', label: 'PERMISSION TEMPLATES', meaning: '운영 DB에 정의된 역할 기본값', boundary: '모든 팀원이 같은 template만 사용한다는 뜻이 아님' },
    ],
  },
  implementationStatus: {
    state: 'DEPLOYED / CURRENT DB AUTHORIZATION',
    items: [
      'Entra OIDC·server-side session·CSRF 코드 경계',
      'PostgreSQL catalog·template·개인 override 기반 effective permission',
      '관리자 초대·권한 편집·감사·위임 관리',
      'self·owner·관리 권한 재위임과 invite 생성·취소 guard',
    ],
    runtime: '2026.09.04 production DB의 31개 catalog와 6개 template, effective permission contract를 확인했다. Azure Portal 구성과 interactive OIDC login smoke는 같은 시점에 재검증하지 않았다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / ACCESS CONTROL, NOT SECURITY COMPLETION',
    statement: '확인된 범위는 접근 제어의 구성과 제한된 실제 계정 시나리오까지.',
    items: [
      '31개 catalog와 6개 template은 구성 규모이며 최소권한 달성률이 아닙니다.',
      'production developer template에 포함된 permission 28개와 repository seed의 26개 차이는 deployment divergence로 남아 있습니다.',
      'Azure Portal 설정과 interactive OIDC login smoke는 9월 4일 current evidence로 확인하지 않았습니다.',
      '권한 화면은 배포됐습니다. 관리자의 반복 사용과 조직 전체 활용 여부는 별도 확인이 필요합니다.',
      '정식 침투 테스트와 외부 보안 감사는 이 사례의 확인 범위에 포함되지 않습니다.',
    ],
  },
  relatedSystems: [
    { title: 'SCHEDULE', relation: '일정 조회와 변경에 서로 다른 권한을 적용한 제품 사례', href: '/what/schedule', status: 'available' },
    { title: 'QA', relation: '기록 작성자와 조회자의 행동 범위를 나눈 제품 사례', href: '/what/qa', status: 'available' },
    { title: 'SECURITY & OPERATIONS', relation: 'OIDC·session·권한·배포 access의 더 넓은 위험 경계', href: '/how/security-operations', status: 'available' },
  ],
} as const satisfies PermissionPageContent
