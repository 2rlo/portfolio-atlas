import type { SecurityOperationsContent } from './content-types.ts'

export const securityOperationsContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure:
      '제품과 운영 문서에서 확인한 설계를 바탕으로 공개용 화면과 예시를 독립적으로 재구성했습니다.',
    boundary: {
      dataOrigin: 'independently-authored-synthetic',
      privateSourceRuntimeDependency: false,
      containsRealIdentifiers: false,
      oneToOneInternalMapping: false,
    },
  },
  hero: {
    eyebrow: 'HOW I BUILD / 04',
    titleLines: ['SECURITY &', 'OPERATIONS'],
    thesis: [
      '변경 권한과 배포·복구 조건을 함께 설계했다.',
      '권한은 요청 시점에 확인하고,',
      '실패가 이어지면 자동화를 멈추고 사람이 판단한다.',
    ],
    coordinates: [
      { label: 'BOUNDARY', value: '누가 무엇을 바꾸는가' },
      { label: 'CHANGE', value: '어디에서 먼저 검증하는가' },
      { label: 'VERIFY', value: '각 신호로 어디까지 확인하는가' },
      { label: 'RECOVER', value: '어디서 자동화를 멈추는가' },
    ],
  },
  authorization: {
    eyebrow: '01 / AUTHORIZATION AS A PRODUCT',
    title: '권한을 화면에서 조정하고, 요청마다 적용한다.',
    question: '로그인한 사람이 실제로 할 수 있는 일은 어디에서 결정되는가?',
    summary:
      '조직 계정은 신원을 확인한다. 역할의 기본값과 개인별 예외를 합친 실제 행동 권한은 제품 안에서 보고 바꾼다.',
    productLabel: 'JADEBELL HUB / ACCESS CONTROL',
    members: [
      {
        id: 'member-a',
        name: 'S. YOON',
        role: '품질 운영',
        state: '연결됨',
        selected: true,
      },
      {
        id: 'member-b',
        name: 'M. PARK',
        role: '일정 열람',
        state: '연결됨',
      },
      {
        id: 'member-c',
        name: 'H. CHOI',
        role: '템플릿 없음',
        state: '연결 대기',
      },
    ],
    templates: [
      {
        id: 'none',
        title: '템플릿 없음',
        description: '개별 권한만으로 시작',
      },
      {
        id: 'operations',
        title: '운영 조정',
        description: '일정·상태 변경',
      },
      {
        id: 'quality',
        title: '품질 기록',
        description: '조회·작성 기본값',
        selected: true,
      },
      {
        id: 'viewer',
        title: '열람 전용',
        description: '조회만 허용',
      },
    ],
    delegated: [
      {
        label: '팀원과 권한 관리',
        description: '다른 구성원의 접근 범위를 조정',
        enabled: false,
      },
      {
        label: '프로젝트 관리',
        description: '추적 대상의 표시와 보관을 관리',
        enabled: false,
      },
      {
        label: '비용과 사용량 관리',
        description: '사용량과 예산 경계를 관리',
        enabled: false,
      },
    ],
    permissionRows: [
      {
        group: 'OVERVIEW',
        resource: '개발 운영 현황',
        view: 'base',
        edit: 'none',
        manage: 'none',
      },
      {
        group: 'PROJECT',
        resource: '일정',
        view: 'base',
        edit: 'revoke',
        manage: 'none',
      },
      {
        group: 'QUALITY',
        resource: '품질 기록',
        view: 'base',
        edit: 'grant',
        manage: 'none',
      },
      {
        group: 'RECORDS',
        resource: '기록 보관함',
        view: 'grant',
        edit: 'none',
        manage: 'none',
      },
    ],
    annotations: [
      {
        id: 'template',
        index: '01',
        label: 'PERMISSION TEMPLATE',
        title: '반복되는 기본값부터 시작한다.',
        body: '반복되는 권한 묶음을 템플릿으로 제공한다. 템플릿 없이 개별 권한만 부여하는 경우도 허용한다.',
      },
      {
        id: 'override',
        index: '02',
        label: 'INDIVIDUAL OVERRIDE',
        title: '같은 역할 안의 실제 업무 차이를 남긴다.',
        body: '템플릿의 기본값 위에 사람별 허용과 회수를 별도로 둔다. 삭제와 고위험 관리는 일반 편집에서 분리했다.',
      },
      {
        id: 'effective',
        index: '03',
        label: 'EFFECTIVE PERMISSION',
        title: '설정값을 합쳐 실제 행동 권한을 계산한다.',
        body: '서버는 요청마다 활성 사용자 연결, 역할 기본값, 개인별 예외를 확인해 행동 권한을 계산한다.',
      },
      {
        id: 'guard',
        index: '04',
        label: 'ADMIN GUARD',
        title: '위임에도 넘지 못할 선을 둔다.',
        body: '위임받은 관리자는 자기 자신이나 owner를 변경할 수 없고, 팀원·권한 관리 권한을 부여·회수·재위임할 수 없다. 초대 생성과 취소도 상위 관리자 전용 경계로 남긴다.',
      },
    ],
    formula: [
      { label: 'TEMPLATE', value: '기본값', tone: 'base' },
      { label: 'GRANT', value: '개별 허용', tone: 'grant' },
      { label: 'REVOKE', value: '개별 회수', tone: 'revoke' },
      { label: 'EFFECTIVE', value: '실제 행동', tone: 'effective' },
    ],
    evolution: [
      {
        index: '01',
        label: "USER LOGIN",
        title: "사용자별 로그인",
        summary: "사용자별 ID와 비밀번호로 로그인하고, 역할별 업무 접근은 이후에 분리했다.",
        state: 'historical',
      },
      {
        index: '02',
        label: 'IDENTITY + FIXED ROLE',
        title: '조직 계정과 고정 역할',
        summary: '사용자를 식별하고 역할별 화면과 API를 나눴다.',
        state: 'transition',
      },
      {
        index: '03',
        label: 'IDENTITY / AUTHORIZATION',
        title: '신원과 업무 권한 분리',
        summary: '로그인은 신원 경계, 실제 행동은 템플릿과 개인 예외를 합친 제품 데이터가 결정한다.',
        state: 'current',
      },
    ],
    takeaway:
      '고정된 역할표에서 시작해, 기본값과 개인별 예외를 화면에서 관리하는 구조로 바꿨다.',
  },
  security: {
    eyebrow: '02 / SECURITY BOUNDARIES',
    title: '신원 확인과 행동 허용을 별도로 판단한다.',
    summary:
      '사용자 연결이 없거나 현재 권한을 확인할 수 없는 경우, 접근을 허용하지 않도록 기준을 정했다.',
    decisions: [
      {
        index: '01',
        risk: '로그인 성공을 업무 접근 성공으로 오해할 수 있음',
        decision: '조직 로그인은 신원만 확인하고, 행동 허용은 별도로 계산',
        boundary: '연결되지 않았거나 비활성인 사용자는 업무 권한이 없다.',
        evidence: 'IDENTITY ≠ AUTHORIZATION',
      },
      {
        index: '02',
        risk: 'UI에서 보이지 않아도 직접 요청은 별도로 차단해야 함',
        decision: '화면과 서버 요청에서 같은 업무 대상·행동 권한을 확인',
        boundary: '직접 요청해도 허용되지 않은 변경은 서버에서 거부한다.',
        evidence: 'UI + SERVER',
      },
      {
        index: '03',
        risk: '허용된 오래된 권한의 요청을 현재 권한을 확인할 수 없는 상태에서 허용할 수 있음',
        decision: '현재 값을 확인할 수 없으면 요청을 차단하고 오류로 처리',
        boundary: '가용성보다 권한 우회를 막는 쪽을 우선함.',
        evidence: 'FAIL CLOSED',
      },
    ],
    currentRule:
      '현재 권한을 확인할 수 없으면 요청을 차단한다.',
  },
  deployment: {
    eyebrow: '03 / DEPLOY WITH A WAY BACK',
    title: '새 버전을 띄우는 일과, 넘겨도 되는지 판단하는 일을 분리했다.',
    summary:
      '비활성 API를 먼저 검증하고 트래픽을 넘긴다. 작업 프로세스는 따로 갱신하며 데이터 복구도 별도로 판단한다.',
    steps: [
      {
        id: 'checks',
        index: '01',
        label: 'CHANGE',
        title: '변경과 복구 조건 확인',
        summary: '변경 범위와 데이터⋅권한 호환성, 복구 조건을 먼저 확인한다.',
        proves: '배포 대상으로 삼을 변경과 사전 조건이 식별됨',
        doesNotProve: '새 버전의 실제 실행 상태',
        tone: 'prepare',
      },
      {
        id: 'inactive',
        index: '02',
        label: 'INACTIVE API',
        title: '비활성 대상만 기동',
        summary: '현재 트래픽을 받는 API는 그대로 둔다.',
        proves: '새 애플리케이션 프로세스를 분리해 시작함',
        doesNotProve: '의존성 접근과 사용자 경로',
        tone: 'prepare',
      },
      {
        id: 'readiness',
        index: '03',
        label: 'READINESS',
        title: 'DB 접근 확인',
        summary: '전환 전에 새 API가 내부 DB를 조회할 수 있는지 확인한다.',
        proves: '애플리케이션이 DB 조회를 수행할 수 있음',
        doesNotProve: 'Redis·작업 프로세스·외부 연동·실제 권한',
        tone: 'verify',
      },
      {
        id: 'switch',
        index: '04',
        label: 'TRAFFIC SWITCH',
        title: '검증된 대상으로 전환',
        summary: '프록시 설정을 검사한 뒤 새 API로 넘긴다.',
        proves: '전환 설정이 유효하고 적용됨',
        doesNotProve: '공개 경로가 새 대상을 응답함',
        tone: 'switch',
      },
      {
        id: 'smoke',
        index: '05',
        label: 'PUBLIC TARGET',
        title: '응답 대상 대조',
        summary: '공개 응답과 목표 대상을 함께 확인한다.',
        proves: '실제 트래픽이 새 API에 도달함',
        doesNotProve: '데이터 변경 성공과 전체 사용자 시나리오',
        tone: 'verify',
      },
      {
        id: 'worker',
        index: '06',
        label: 'WORKER',
        title: '별도 갱신과 누락 복구 확인',
        summary: 'API 전환과 별도 절차로 갱신하되, 전환 구간의 호환성을 확인한다.',
        proves: '새 작업 프로세스 이미지가 실행되고 재시작이 반복되지 않음',
        doesNotProve: '모든 예약 작업의 최근 성공',
        tone: 'separate',
      },
      {
        id: 'decision',
        index: '07',
        label: 'KEEP / ROLLBACK',
        title: '새 대상을 유지하거나 이전 API로 복귀',
        summary: '검증을 모두 통과하기 전에는 이전 API를 보존한다.',
        proves: '애플리케이션 트래픽을 이전 대상으로 되돌릴 경로가 남아 있음',
        doesNotProve: 'DB 스키마·데이터·Redis 상태의 복원',
        tone: 'decision',
      },
    ],
    components: [
      {
        label: 'API',
        mode: 'SWITCHABLE',
        boundary: '비활성 대상을 검증한 뒤 트래픽을 전환한다. 검증 실패 시 이전 대상으로 복귀한다.',
        state: 'switchable',
      },
      {
        label: 'WORKER',
        mode: 'SEPARATE RECREATE',
        boundary: 'API와 별도로 빌드⋅재생성하고, watchdog과 누락 복구 경로로 실행 상태를 확인한다. 갱신 중 짧은 실행 공백이 생길 수 있다.',
        state: 'separate',
      },
      {
        label: 'POSTGRESQL / REDIS',
        mode: 'SHARED STATE',
        boundary: 'API 트래픽을 되돌려도 이미 바뀐 상태는 함께 복원되지 않는다. 호환성과 복구 조건을 별도로 판단한다.',
        state: 'shared',
      },
    ],
  },
  recovery: {
    eyebrow: '04 / FAILURE & RECOVERY',
    title: '재시도할 실패와, 멈춰서 볼 실패를 나눴다.',
    summary:
      '일부 수집 실패의 일시 오류는 좁게 다시 시도한다. 같은 실패가 계속되면 자동화를 끝내고 원인과 대상 범위를 사람이 확인한다.',
    flow: [
      {
        index: '01',
        label: 'FAILURE',
        title: '원본 저장 실패',
        detail: '성공처럼 숨기지 않고 실패 단계를 식별.',
        state: 'failure',
      },
      {
        index: '02',
        label: 'ISOLATE',
        title: '원본과 단계 보존',
        detail: '한 항목의 실패가 다음 항목을 막지 않게 격리.',
        state: 'automatic',
      },
      {
        index: '03',
        label: 'BOUNDED RETRY',
        title: '간격을 둔 제한 재시도',
        detail: '같은 처리 함수를 제한된 횟수로 다시 실행.',
        state: 'automatic',
      },
      {
        index: '04',
        label: 'TERMINAL',
        title: '자동 재시도 종료',
        detail: '재시도 가능 횟수를 넘기면 terminal 상태로 남기고 자동 처리를 종료',
        state: 'terminal',
      },
      {
        index: '05',
        label: 'REVIEW',
        title: '원인과 범위 확인',
        detail: '읽기 전용 확인 뒤 수정할 대상을 좁힌다.',
        state: 'human',
      },
      {
        index: '06',
        label: 'REPLAY',
        title: '한 건만 수동 재실행',
        detail: '대량 재처리 전에 멱등성과 영향 범위를 확인.',
        state: 'human',
      },
    ],
    modes: [
      {
        label: 'AUTOMATED',
        title: '복구 가능한 실패를 좁게 처리',
        items: ['원본과 실패 단계 보존', '항목별 격리', '간격을 둔 제한 재시도와 종료 상태'],
      },
      {
        label: 'ASSISTED',
        title: '도구는 실행하고, 사람은 범위를 결정',
        items: ['상태를 바꾸지 않는 확인', '원인 수정 뒤 단일 항목 재실행', '원인 수정 후 단일 항목 재실행'],
      },
      {
        label: 'MANUAL',
        title: '별도 검증 후 실행해야 하는 복구',
        items: ['격리 환경에서 복원 결과를 확인한 뒤 전환 판단', '전체 백업⋅복원은 별도 리허설 필요'],
      },
    ],
    knownBoundary: [
      '실패 종류에 따라 적용하는 복구 경로가 다르다.',
      'Runbook은 복구 절차를 안내한다. 실행·검증 결과는 별도로 확인한다.',
    ],
  },
  boundary: {
    eyebrow: '05 / CURRENT BOUNDARY',
    title: '세 가지 경계로 안전장치를 구현했습니다.',
    summary:
      '권한, 배포, 복구를 각각 다른 경계로 다뤘습니다. 자동으로 처리할 범위와 사람이 판단할 조건을 구분해 운영에 남겼습니다.',
    groups: [
      {
        label: 'ACCESS',
        question: '누가 무엇을 바꿀 수 있는가',
        items: [
          '조직 로그인과 업무 권한을 분리하고, 기본 권한 템플릿에 개인별 조정을 반영합니다.',
          'UI와 서버에서 같은 업무 대상·행동 권한을 확인합니다.',
          '현재 권한을 확인할 수 없으면 요청을 차단합니다.',
        ],
      },
      {
        label: 'DEPLOY',
        question: '어디까지 검증한 뒤 트래픽을 넘기는가',
        items: [
          '변경·호환성·복구 조건을 확인하고, 비활성 API를 기동해 readiness를 검증합니다.',
          '전환 후 public target을 대조하고, 검증이 끝날 때까지 이전 API를 보존합니다.',
          '검증에 실패하면 이전 API로 복귀합니다.',
          'worker는 API와 별도로 재생성합니다.',
        ],
      },
      {
        label: 'RECOVER',
        question: '어디까지 자동화하고, 어디서 사람이 판단하는가',
        items: [
          '실패 항목과 단계를 보존·격리하고, 수집 중 일시 오류를 제한적으로 재시도합니다.',
          '반복 실패는 terminal 상태로 멈추고, 사람이 원인과 범위를 확인한 뒤 단일 항목을 replay합니다.',
          'watchdog과 누락 복구 경로로 작업 프로세스의 실행 상태를 확인합니다.',
          '구성요소별 복구 경계와 절차에 따라 복구 범위를 판단합니다.',
        ],
      },
    ],
    rollbackBoundary:
      '이전 API로 복귀해도 PostgreSQL·Redis의 변경된 상태는 함께 복원되지 않습니다.',
    maintenanceRule:
      '권한 모델, 배포 구성요소, 검증 신호, 자동 복구 범위가 바뀌면 이 경계도 같은 변경에서 다시 확인한다.',
  },
  nextPage: {
    eyebrow: 'NEXT / HOW THE BOUNDARY STAYS FINDABLE',
    title: 'DOCUMENTATION SYSTEM',
    summary: '권한과 운영의 판단을 문서에 남기고, 변경에 맞춰 갱신하는 체계.',
    href: '/how/documentation-system',
  },
} as const satisfies SecurityOperationsContent
