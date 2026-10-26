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
      '같은 역할 안에서도 맡은 업무는 달랐다.',
      '권한을 제품에서 조정하고,',
      '변경과 복구에 필요한 확인 절차를 만들었다.',
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
    title: '업무 차이를 권한에 반영한다.',
    question: '로그인한 사람이 실제로 할 수 있는 일은 어디에서 결정되는가?',
    summary:
      '고정된 역할만으로는 사람마다 다른 업무 범위를 표현하기 어려웠다. 반복되는 권한은 템플릿으로 묶고, 개인별 허용과 회수를 더해 관리 화면에서 조정하도록 바꿨다. 서버는 이 값을 요청마다 확인한다.',
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
        title: '사람마다 다른 업무를 반영한다.',
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
        body: '위임받은 관리자는 자기 자신이나 소유자의 권한을 바꿀 수 없다. 팀원과 권한을 관리하는 권한의 재위임, 초대 생성과 취소는 상위 관리자만 수행하도록 했다.',
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
    title: '서버에서 한 번 더 확인한다.',
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
        risk: '과거에 허용됐던 권한으로 현재 요청까지 통과할 수 있음',
        decision: '현재 값을 확인할 수 없으면 요청을 차단하고 오류로 처리',
        boundary: '권한 조회가 실패하면 요청도 차단해 우회를 막는다.',
        evidence: 'FAIL CLOSED',
      },
    ],
    currentRule:
      '현재 권한을 확인할 수 없으면 요청을 차단한다.',
  },
  deployment: {
    eyebrow: '03 / DEPLOY WITH A WAY BACK',
    title: '검증한 뒤 트래픽을 넘긴다.',
    summary:
      '전환 전에 문제를 찾을 수 있도록 비활성 API에서 새 버전을 검증했다. 전환 후에는 공개 응답을 대조하고, 검증이 끝날 때까지 이전 API를 보존한다. 작업 프로세스 갱신과 데이터 복구는 별도 절차로 뒀다.',
    steps: [
      {
        id: 'checks',
        index: '01',
        label: 'CHANGE',
        title: '변경과 복구 조건 확인',
        summary: '변경 범위, 데이터와 권한의 호환성, 복구 조건을 먼저 확인한다.',
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
        title: '작업 프로세스 갱신',
        summary: 'API 전환과 별도 절차로 갱신하되, 전환 구간의 호환성을 확인한다.',
        proves: '새 작업 프로세스 이미지가 실행되고 재시작이 반복되지 않음',
        doesNotProve: '모든 예약 작업의 최근 성공',
        tone: 'separate',
      },
      {
        id: 'decision',
        index: '07',
        label: 'KEEP / ROLLBACK',
        title: '유지 또는 이전 API로 복귀',
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
        boundary: 'API와 별도로 빌드하고 재생성한다. watchdog과 누락 복구 경로로 실행 상태를 확인하며 갱신 중 실행 공백도 점검한다.',
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
    title: '반복 실패는 멈추고 원인을 찾는다.',
    summary:
      '원본 저장의 일시 오류는 항목별로 격리해 다시 시도하도록 했다. 재시도 횟수를 넘기면 실패 단계와 원본을 남기고 처리를 멈춘다. 운영자는 기록을 확인한 뒤 한 건부터 재실행할 수 있다.',
    flow: [
      {
        index: '01',
        label: 'FAILURE',
        title: '원본 저장 실패',
        detail: '실패한 처리 단계를 기록.',
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
        detail: '재시도 횟수를 넘기면 종료 상태로 남기고 자동 처리를 중단.',
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
        items: ['상태를 바꾸지 않는 확인', '원인 수정 후 단일 항목 재실행'],
      },
      {
        label: 'MANUAL',
        title: '별도 검증 후 실행해야 하는 복구',
        items: ['격리 환경에서 백업 복원', '복원한 데이터와 동작을 확인한 뒤 전환 판단'],
      },
    ],
    knownBoundary: [
      '일시 오류는 항목별 재시도, 반복 실패는 원인 확인 후 단일 재실행으로 대응한다.',
      '전체 복원은 격리 환경에서 검증한 뒤 전환하도록 Runbook에 순서를 남겼다.',
    ],
    relatedProduct: {
      label: '운영 화면에서 상태와 복구 범위를 판단하는 방식',
      href: '/what/operations',
    },
  },
  boundary: {
    eyebrow: '05 / MAINTENANCE',
    title: '구조가 바뀌면 안전장치도 갱신한다.',
    summary:
      '권한 모델과 배포 구성이 달라지면 확인할 신호와 복구 절차도 바뀐다. 요청 차단, 전환 전 검증, 재시도 종료 조건을 관련 문서와 함께 관리한다.',
    groups: [
      {
        label: 'ACCESS',
        question: '권한 모델을 바꿀 때',
        items: [
          '템플릿과 개인별 예외를 합친 권한이 화면과 서버에 동일하게 적용되는지 확인한다.',
          '사용자 연결과 현재 권한을 확인할 수 없을 때 요청이 차단되는지 점검한다.',
        ],
      },
      {
        label: 'DEPLOY',
        question: '배포 구성을 바꿀 때',
        items: [
          '비활성 API의 DB 접근, 전환 후 공개 응답, 이전 API로 돌아갈 경로를 확인한다.',
          '별도로 갱신하는 작업 프로세스와 공유 데이터의 호환성을 점검한다.',
        ],
      },
      {
        label: 'RECOVER',
        question: '복구 절차를 바꿀 때',
        items: [
          '재시도 횟수와 종료 조건, 단일 항목 재실행의 영향 범위를 확인한다.',
          'watchdog과 누락 복구 경로를 점검하고 구성요소별 복구 순서를 문서에 반영한다.',
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
