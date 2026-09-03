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
      '로그인 가능 여부와 업무 권한을 분리하고, 역할 기본값과 개인 예외를 합성한 effective permission을 UI와 API가 함께 사용하게 했다.',
    summary:
      '공용 인증에서 사용자 identity로, 고정 역할에서 resource × action과 안전한 위임이 가능한 application authorization으로 발전시켰습니다.',
    problemLabel: 'PROBLEM / AUTHENTICATED DOES NOT MEAN AUTHORIZED',
    problem:
      '공용 계정과 화면 숨김만으로는 누가 무엇을 바꿀 수 있는지 강제·회수·감사하기 어려웠고, 역할별 예외를 두 곳에서 관리하면 결과가 쉽게 어긋났습니다.',
  },
  inspection: {
    eyebrow: 'PRODUCT SURFACE / EFFECTIVE ACCESS',
    title: 'One actor. One computed result. Every consuming surface.',
    instruction:
      'identity link, role default, personal override, effective matrix, protected change를 선택해 권한 계산과 운영 경계를 확인하세요.',
    defaultAnnotation: {
      index: '00',
      label: 'ACCESS GUIDE',
      title: 'checkbox 목록이 아니라, 현재 이 사람이 할 수 있는 action의 계산 결과를 본다.',
      body: '사람·역할·권한 배정은 Jadebell 공개용 합성 예시입니다. 실제 계정·email·tenant·permission code는 사용하지 않았습니다.',
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
          body: '허용된 sign-in group 구성원이어도 application 팀원과 연결되지 않았거나 권한이 없을 수 있습니다.',
        },
        {
          label: 'DECISION',
          body: 'Entra는 로그인 gate만 판단하고, 연결된 팀원·역할·override는 PostgreSQL이 authorization source로 계산합니다.',
        },
        {
          label: 'BOUNDARY',
          body: '미연결 로그인은 오류나 자동 권한 부여 대신 permission 0개의 Access not granted 상태로 둡니다.',
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
          body: '역할만으로는 같은 직무 안의 제한된 예외를 표현하기 어렵고, 개인 checkbox만으로는 운영 비용이 커집니다.',
        },
        {
          label: 'DECISION',
          body: '역할 템플릿은 기본 permission set을 제공하되 템플릿 없음도 유효한 상태로 지원했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '템플릿 없음은 전체 접근이 아닙니다. 기본 permission은 비어 있고 허용 가능한 override만 계산됩니다.',
        },
      ],
      evolution: { label: 'ROLE + OVERRIDE MODEL', date: '2026.08.24' },
    },
    {
      id: 'personal-override',
      index: '03',
      label: 'PERSONAL OVERRIDE',
      title: '개인 예외는 전체 role 복사본이 아니라, 달라진 resource와 action만 기록한다.',
      sections: [
        {
          label: 'WHY',
          body: '전체 permission을 사람마다 저장하면 역할 기본값 변경 뒤 누가 왜 달라졌는지 추적하기 어렵습니다.',
        },
        {
          label: 'DECISION',
          body: 'role default 위에 grant/revoke 차이만 합성하고, matrix에 그 출처를 role·override·guard로 표시했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '보호된 role-locked permission과 위임 범위는 개인 override로 우회 부여할 수 없습니다.',
        },
      ],
      evolution: { label: 'DIFFERENCE-ONLY EDITING', date: '2026.08.25' },
    },
    {
      id: 'effective-permission',
      index: '04',
      label: 'EFFECTIVE PERMISSION',
      title: '메뉴·버튼·직접 URL·API가 같은 effective permission을 소비하게 했다.',
      sections: [
        {
          label: 'WHY',
          body: 'frontend만 숨기면 직접 API 호출이 열릴 수 있고, route마다 계산이 다르면 회수 결과가 어긋납니다.',
        },
        {
          label: 'DECISION',
          body: 'resource × action의 최종 계산을 한 server 함수로 모으고 frontend surface와 backend dependency를 같은 matrix로 검증했습니다.',
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
          body: '동시 권한 변경이나 위임자의 자기 승격으로 마지막 관리자가 사라지면 UI에서 되돌릴 경로도 잃습니다.',
        },
        {
          label: 'DECISION',
          body: 'advisory lock과 row lock 안에서 role·override를 바꾸고 effective admin을 다시 센 뒤 audit와 함께 한 transaction으로 확정했습니다.',
        },
        {
          label: 'BOUNDARY',
          body: '마지막 관리자 제거, 위임자의 자기 권한 상승, 보호 역할 재배정은 전체 rollback합니다.',
        },
      ],
      evolution: { label: 'DELEGATED ADMIN GUARDS', date: '2026.08.26' },
    },
  ],
  workflow: {
    eyebrow: 'AUTHORIZATION WORKFLOW',
    title: 'Actor를 확인하고, 차이를 합성하고, 보호 규칙을 통과한 결과만 적용한다.',
    introduction: '각 단계는 위 access surface의 identity·template·override·effective state와 연결됩니다.',
    steps: [
      { id: 'permission-flow-identify', hotspotId: 'identity-link', index: '01', label: 'IDENTIFY', summary: '로그인 identity와 team member 연결' },
      { id: 'permission-flow-default', hotspotId: 'role-default', index: '02', label: 'DEFAULT', summary: 'role의 resource × action 기본값' },
      { id: 'permission-flow-diff', hotspotId: 'personal-override', index: '03', label: 'OVERRIDE', summary: '개인 grant·revoke 차이만 적용' },
      { id: 'permission-flow-guard', hotspotId: 'protected-change', index: '04', label: 'GUARD', summary: 'lockout·escalation·위임 범위 차단' },
      { id: 'permission-flow-enforce', hotspotId: 'effective-permission', index: '05', label: 'ENFORCE', summary: 'UI와 API가 같은 결과 사용' },
    ],
    boundary: '인증 성공은 계산의 시작일 뿐입니다. 연결 상태·활성 여부·role·override·system guard를 통과해야 업무 action이 허용됩니다.',
  },
  decisions: {
    eyebrow: 'DESIGN DECISIONS',
    title: 'Authenticate with identity. Authorize with product policy.',
    items: [
      {
        statement: 'LOGIN GATE ≠ BUSINESS ACCESS.',
        explanation: '외부 identity provider는 사용자를 확인하고, 제품 resource 권한은 application DB가 판단합니다.',
      },
      {
        statement: 'STORE DIFFERENCES, SHOW RESULTS.',
        explanation: '관리자는 role과 개인 차이를 편집하지만 사용 화면은 최종 effective permission만 소비합니다.',
      },
      {
        statement: 'NO LAST-ADMIN WRITE.',
        explanation: '저장 후 복구 가능성을 transaction 안에서 재계산하고 위험한 변경은 전부 되돌립니다.',
      },
    ],
  },
  evolution: {
    eyebrow: 'PRODUCT EVOLUTION',
    title: '공용 비밀번호에서, 비개발자가 안전하게 운영하는 access surface로.',
    introduction: '현재 identity card·matrix·override·protected guard에 직접 남은 변화입니다.',
    scenes: [
      {
        date: '2026.07.16',
        label: 'READ-ONLY NEED',
        visual: 'read-only-need',
        decision: 'Sales에는 전체 시스템이 아니라 일정 보기만 필요했다.',
        trigger: '공용 인증으로는 사람별 업무 범위를 나눌 수 없음',
        change: 'role별 route·action 요구와 일정 read-only 정의',
        currentEffect: 'matrix에서 VIEW와 EDIT·DELETE를 별도 action으로 계산',
      },
      {
        date: '2026.07.20',
        label: 'OIDC + ROLE',
        visual: 'oidc-role',
        decision: '공용 Basic Auth를 회사 identity와 server-side session으로 교체했다.',
        trigger: '개인별 회수·감사·최소 권한을 적용할 수 없음',
        change: 'Entra OIDC, Redis session, CSRF, 초기 role mapping',
        currentEffect: 'actor가 식별된 뒤에만 application permission 계산 시작',
      },
      {
        date: '2026.08.24',
        label: 'RESOURCE × ACTION',
        visual: 'resource-action',
        decision: '화면 이름 중심 role을 domain action 중심 permission으로 바꿨다.',
        trigger: '보기·편집·삭제·관리 경계와 개인 예외를 세밀하게 표현해야 함',
        change: 'PostgreSQL role default ± grant/revoke override',
        currentEffect: 'effective matrix가 모든 route와 control의 기준',
      },
      {
        date: '2026.08.25',
        label: 'ADMIN SURFACE',
        visual: 'admin-surface',
        decision: 'identity provider 설정 없이 제품 안에서 권한을 운영하게 했다.',
        trigger: '신규 인원마다 두 권한 source를 개발자가 직접 수정함',
        change: '사전 invite·role·override·history 관리 UI',
        currentEffect: '비개발자도 허용된 위임 범위 안에서 팀 접근을 관리',
      },
      {
        date: '2026.08.26',
        label: 'AUTHORITY SPLIT',
        visual: 'authority-split',
        decision: 'Entra는 로그인 gate, PostgreSQL은 authorization SSOT로 책임을 나눴다.',
        trigger: 'App Role과 DB 권한의 이중 관리·결과 drift',
        change: 'security group gate, delegated admin guard, App Role 제거',
        currentEffect: 'identity 상태와 effective permission을 별도 축으로 표시',
      },
    ],
  },
  evidence: {
    eyebrow: 'EVIDENCE / OPERATING DB 2026.08.26',
    title: '권한 구성의 규모이지, 보안 수준의 점수가 아니다.',
    snapshot: '같은 읽기 전용 운영 snapshot에서 확인한 authorization 구성입니다.',
    items: [
      { value: '6', label: 'ROLE TEMPLATES', meaning: '운영 DB에 정의된 역할 기본값', boundary: '모든 팀원이 반드시 template을 가져야 한다는 뜻이 아님' },
      { value: '26', label: 'PERMISSIONS', meaning: '운영 DB의 resource × action 정의', boundary: '8월 27일 code catalog 29개와 다른 snapshot' },
      { value: '15', label: 'LINKED ACCOUNTS', meaning: 'Entra identity가 연결된 운영 계정', boundary: '로그인 횟수·활성 사용자·전사 adoption이 아님' },
      { value: '3', label: 'PERSONAL OVERRIDES', meaning: 'role 기본값과 다르게 적용된 개별 예외', boundary: '최소권한 달성률이나 예외 위험도를 뜻하지 않음' },
    ],
  },
  implementationStatus: {
    state: 'DEPLOYED / ACTIVE AUTHORIZATION BOUNDARY',
    items: [
      'Entra OIDC·Redis session·CSRF 기반 로그인 경계',
      'PostgreSQL resource × action과 role ± override 계산',
      '관리자 invite·권한 편집·감사·위임 control',
      'last-admin·self-escalation·protected role guard',
    ],
    runtime: '핵심 인증·권한 경계와 관리자 시스템은 production에 반영돼 활성화됐고 제한된 실제 계정 시나리오를 확인했습니다. 8월 27일 code catalog 확장은 같은 정의의 운영 DB 재조회 전까지 production 적용 여부를 확정하지 않습니다.',
  },
  boundary: {
    eyebrow: 'BOUNDARY / ACCESS CONTROL, NOT SECURITY COMPLETION',
    statement: 'A permission matrix narrows authority. It does not prove security is complete.',
    items: [
      '6개 role·26개 permission·15개 연결 계정은 구성 규모이며 최소권한 달성률이 아닙니다.',
      '8월 27일 code catalog 29개를 8월 26일 운영 DB의 최신 수치로 덮어쓰지 않습니다.',
      '권한 화면의 배포와 반복적인 관리자 사용·조직 adoption을 같은 상태로 보지 않습니다.',
      '정식 침투 테스트·외부 보안 감사·Zero Trust 완성을 수행했다고 주장하지 않습니다.',
    ],
  },
  relatedSystems: [
    { title: 'SCHEDULE', relation: 'read-only actor와 변경 권한이 실제로 소비되는 product surface', href: '/what/schedule', status: 'available' },
    { title: 'QA', relation: 'writer와 viewer의 action boundary가 적용되는 기록 surface', href: '/what/qa', status: 'available' },
    { title: 'SECURITY / GOVERNANCE', relation: 'OIDC·session·privacy·배포 access의 더 넓은 위험 경계', status: 'in-development' },
  ],
} as const satisfies PermissionPageContent
