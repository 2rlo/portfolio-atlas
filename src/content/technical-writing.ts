import type { HandoverGuideContent, TechnicalWritingContent } from './content-types.ts'

export const technicalWritingContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure:
      '문서의 작성 판단과 구조를 바탕으로 공개용 예시를 독립적으로 재구성했습니다.',
    boundary: {
      dataOrigin: 'independently-authored-synthetic',
      privateSourceRuntimeDependency: false,
      containsRealIdentifiers: false,
      oneToOneInternalMapping: false,
    },
  },
  hero: {
    eyebrow: 'HOW I BUILD / 03',
    titleLines: ['TECHNICAL', 'WRITING'],
    thesis: [
      '사용자 안내부터 API 참조와 운영 인계까지,',
      '독자가 다음 행동을 정할 수 있게 썼다.',
    ],
    coordinates: [
      { label: 'AUDIENCE', value: '누가 읽는가' },
      { label: 'PURPOSE', value: '무엇을 판단하는가' },
      { label: 'ACTION', value: '다음에 무엇을 하는가' },
      { label: 'BOUNDARY', value: '어떤 판단의 근거가 되는가' },
    ],
  },
  reader: {
    eyebrow: '01 / WRITING FOR THE READER',
    title: '권한이 다르면 안내도 달라진다.',
    commonContext: '품질 기록 기능 / 2026.08 권한별 안내',
    guides: [
      {
        id: 'writer',
        role: '작성 권한',
        purpose: '기록을 바꾸고 결과를 확정하는 사람',
        actions: '수정 → 재생성 → 확정',
        steps: [
          {
            index: '01',
            action: '기록을 연다',
            detail: '현재 결과와 첨부 근거를 확인',
          },
          {
            index: '02',
            action: '사실에 맞게 수정한다',
            detail: '결과와 상세 설명, 첨부를 수정',
          },
          {
            index: '03',
            action: '다시 생성하고 확정한다',
            detail: '수정 후 필요한 결과를 다시 생성하고 원문과 대조',
          },
        ],
        handoff:
          '수정 후에는 필요한 결과를 다시 생성하고 원문과 대조합니다.',
      },
      {
        id: 'viewer',
        role: '열람 권한',
        purpose: '결과를 확인하고 변경을 요청하는 사람',
        actions: '확인 → 비교 → 변경 요청',
        steps: [
          {
            index: '01',
            action: '결과와 근거를 읽는다',
            detail: '상세 설명과 첨부, 생성된 보조 내용 확인',
          },
          {
            index: '02',
            action: '관련 일정과 상태를 대조한다',
            detail: '읽을 수 있는 일정과 시점을 확인',
          },
          {
            index: '03',
            action: '변경이 필요하면 요청한다',
            detail: '수정할 대상과 근거를 담당자에게 전달',
          },
        ],
        handoff:
          '직접 수정하는 대신 대상과 근거를 갖춰 변경을 요청합니다.',
      },
    ],
    reasoning: {
      statement:
        '작성자는 직접 바꾸는 사람이므로 실행 순서를 적고, 열람자는 직접 수정할 수 없으므로 확인 기준과 변경 요청 방법을 적었습니다.',
      note:
        '재생성이 필요한 시점과 권한별로 보이는 기능을 안내에 함께 적었습니다.',
    },
    evolution: {
      before: {
        label: 'BEFORE / ROLE SNAPSHOT',
        title: '역할별 안내',
        description:
          '작성자와 열람자의 가능한 행동을 각각 고정된 안내로 분리했다.',
      },
      pressure: {
        label: 'PRODUCT MODEL CHANGE',
        title: '권한을 조합하는 제품',
        items: ['ROLE TEMPLATE', 'INDIVIDUAL GRANT', 'INDIVIDUAL REVOKE'],
      },
      after: {
        label: 'AFTER / EFFECTIVE ACCESS',
        title: '통합 안내 + 실제 권한 차이',
        description:
          '공통 흐름을 한 문서에 두고, 템플릿 범위와 개인별 차이를 함께 설명했다.',
      },
      takeaway:
        '고정된 역할명보다 실제 가능한 행동을 기준으로 안내를 통합했다.',
    },
  },
  implementation: {
    eyebrow: '02 / WRITING FOR IMPLEMENTATION',
    title: '응답을 받은 뒤 무엇을 확인할까.',
    summary:
      '유지보수자가 호출 결과를 해석할 수 있도록 API 경로를 정리했다. 복잡한 요청은 인증 조건부터 응답 상태와 예외까지 이어 읽게 했다.',
    artifact: {
      label: '내부 유지보수자를 위한 API 문서',
      title: 'EVENT INTAKE',
      method: 'POST',
      path: '/events/intake',
      purpose: '외부 업무 이벤트를 받아 지원되는 기록 흐름으로 분류',
      authorization: '일반 사용자 세션과 분리된 요청 검증 필요',
      request: [
        {
          field: 'event_kind',
          type: 'string',
          required: 'required',
          description: '처리 흐름을 고르는 이벤트 유형',
        },
        {
          field: 'external_key',
          type: 'string',
          required: 'optional',
          description: '중복 수신을 판별하는 외부 키',
        },
        {
          field: 'occurred_at',
          type: 'ISO 8601',
          required: 'required',
          description: '원본 이벤트가 발생한 시각',
        },
        {
          field: 'content',
          type: 'string',
          required: 'required',
          description: '정규화 전 원문 내용',
        },
      ],
      outcomes: [
        {
          status: 'ACCEPTED',
          changed: 'changed: true',
          meaning: '지원되는 이벤트가 후속 저장 흐름에 반영됨',
        },
        {
          status: 'IGNORED',
          changed: 'changed: false',
          meaning: '지원하지 않는 유형을 수신했지만 저장하지 않음',
        },
        {
          status: 'UNCHANGED',
          changed: 'changed: false',
          meaning: '중복 수신이거나 후속 저장이 완료되지 않은 상태',
        },
      ],
      behavior:
        '응답 상태와 changed를 함께 읽으면 요청 처리 결과와 실제 저장 여부를 구분할 수 있다.',
      annotation: {
        marker: '3',
        label: 'MARGIN NOTE 03',
        title: '응답 상태와 저장 여부를 함께 설명했다.',
        body: 'status와 changed를 함께 적어 중복 수신, 지원하지 않는 유형, 저장 미완료를 구별하도록 했다.',
      },
    },
    notes: [
      { label: '독자', value: '현재 구현을 이어받는 내부 개발자' },
      {
        label: '작성 판단',
        value: '호출 조건과 응답 상태, 예외의 의미를 함께 기록',
      },
      {
        label: '갱신 시점',
        value: 'API 경로, 요청 형식, 접근 권한이 바뀔 때',
      },
    ],
  },
  operations: {
    eyebrow: '03 / WRITING FOR SAFE ACTION',
    title: '실행 조건부터 읽는 운영 문서.',
    summary:
      'Deployment와 Recovery에 명령의 전제, 검증 순서, 실패 시 중단 조건을 먼저 배치했다.',
    artifacts: [
      {
        label: 'NORMAL CHANGE',
        title: 'DEPLOYMENT',
        responsibility: '비활성 대상을 준비하고, 검증 뒤에만 전환',
      },
      {
        label: 'FAILURE RESPONSE',
        title: 'RECOVERY',
        responsibility: '관측을 보존하고, 원인을 나눈 뒤 좁게 복구',
      },
    ],
    flow: [
      {
        index: '01',
        label: 'BEFORE ACTION',
        title: '전제와 대상을 고정',
        description: '권한, 비활성 대상, 데이터 변경과 복구 가능 범위를 먼저 확인.',
        tone: 'observe',
      },
      {
        index: '02',
        label: 'READ-ONLY OBSERVE',
        title: '현재 상태를 먼저 읽기',
        description: '활성 대상, 로그, 코드 차이와 실제 환경을 변경 없이 확인.',
        tone: 'observe',
      },
      {
        index: '03',
        label: 'ACT',
        title: '좁은 대상만 변경',
        description: '비활성 서비스 또는 승인된 복구 범위에만 명령을 실행.',
        tone: 'act',
      },
      {
        index: '04',
        label: 'VERIFY',
        title: '신호를 분리해 확인',
        description: '프로세스 응답과 DB 접근을 확인한 뒤 공개 트래픽, 작업 프로세스, 권한을 검사.',
        tone: 'act',
      },
      {
        index: '05',
        label: 'STOP / ROLLBACK',
        title: '실패하면 더 진행하지 않기',
        description: '배포 단계에서 실패하면 자동 원복 결과를 먼저 확인. 이전 대상 복원도 실패하면 수동 복구로 전환.',
        tone: 'stop',
      },
    ],
    verification: [
      {
        signal: 'PROCESS HEALTH',
        proves: '애플리케이션 프로세스가 응답 중',
        doesNotProve: 'DB·Redis·작업 프로세스·외부 연동·사용자 권한',
      },
      {
        signal: 'READINESS',
        proves: '새 API가 DB 조회를 수행할 수 있음',
        doesNotProve: 'Redis·작업 프로세스·외부 연동·데이터 이전·소급 반영 결과',
      },
      {
        signal: 'PUBLIC TARGET',
        proves: '공개 요청이 의도한 새 대상으로 전환됨',
        doesNotProve: '데이터 변경 성공·작업 프로세스 상태·전체 사용자 경로',
      },
    ],
    rollbackBoundary: {
      title: '코드 원복과 데이터 복구를 나눠 썼다.',
      statement:
        '애플리케이션 롤백은 실행 코드의 버전을 되돌리는 일입니다. 이미 바뀐 DB와 데이터, 외부 연동 결과는 각각 복구 방법을 확인해야 합니다.',
      stopRule:
        '이전 대상 복원까지 실패하면 자동 진행을 멈추고, 관측한 상태를 보존한 채 수동 복구로 전환한다.',
    },
  },
  principles: {
    eyebrow: '04 / WRITING PRINCIPLES',
    title: '독자가 다음 행동을 고를 수 있게',
    items: [
      {
        index: '01',
        title: '독자와 가능한 행동부터 나눈다.',
        statement:
          '같은 기능이라도 권한과 목적이 다르면, 필요한 동사와 요청 경로가 달라진다.',
        evidence: 'ROLE GUIDE / EFFECTIVE ACCESS',
      },
      {
        index: '02',
        title: '행동 전에 조건을 둔다.',
        statement:
          '변경 위험이 클수록 명령보다 전제, 대상과 읽기 전용 확인을 먼저 쓴다.',
        evidence: 'AUTHORIZATION / PRE-FLIGHT',
      },
      {
        index: '03',
        title: '결과를 읽는 방법을 적는다.',
        statement:
          '상태값과 검증 신호로 확인한 범위, 별도 확인이 필요한 범위를 함께 적는다.',
        evidence: 'CHANGED STATE / HEALTH SIGNAL',
      },
      {
        index: '04',
        title: '변경된 제품에 맞춰 안내를 고친다.',
        statement:
          '역할별 안내를 실제 권한에 맞춘 통합 안내로 바꾸고, API와 운영 절차도 구현 변경에 맞춰 갱신한다.',
        evidence: 'PRODUCT CHANGE / GUIDE UPDATE',
      },
    ],
  },
  nextPage: {
    eyebrow: 'NEXT / HOW I BUILD',
    title: 'AI-NATIVE ENGINEERING',
    summary:
      'AI 개발 과정에서 문서를 참고하고, 검증한 변경을 다시 기준으로 남기는 흐름.',
    href: '/how/ai-native-engineering',
  },
} as const satisfies TechnicalWritingContent

export const handoverGuideContent = {
  eyebrow: 'HANDOVER / READING PATHS',
  title: '같은 운영 상태, 서로 다른 다음 행동',
  introduction:
    '운영자는 상태 확인과 일상 대응에서 시작하고, 개발자는 전달받은 기록에서 원인 조사로 들어간다. 문서의 읽는 순서를 나눠 두 역할이 같은 기록으로 다음 작업을 이어가게 했다.',
  readers: [
    {
      id: 'operator',
      role: '운영자',
      question: '지금 허용된 범위에서 무엇을 할 수 있는가',
      steps: [
        '상태와 관측 시점을 읽고 추가로 확인할 신호를 찾는다.',
        '안내된 일상 대응의 전제와 권한, 변경될 대상을 확인한다.',
        '허용된 대응 뒤에는 결과를 다시 읽고 해결 여부를 별도로 확인한다.',
      ],
      nextAction: '전제가 맞는 일상 대응만 수행하고 관측한 상태와 결과를 기록한다.',
      stopCondition: '알 수 없는 실패, 반복되는 실패, 서로 맞지 않는 신호가 있으면 진행을 멈추고 개발자에게 근거와 함께 전달한다.',
    },
    {
      id: 'developer',
      role: '개발자',
      question: '어디서 실패했고 어떤 변경을 검증해야 하는가',
      steps: [
        '운영자가 남긴 상태와 시점, 대응 결과에서 조사를 시작한다.',
        '실패 지점과 현재 구현을 대조하고 재처리 조건과 변경의 영향 범위를 확인한다.',
        '검증할 신호와 중단 조건을 정한 뒤 확인한 결과를 운영 안내에 반영한다.',
      ],
      nextAction: '실패 원인과 변경 범위를 좁힌 뒤 대응 방법과 검증 순서를 정한다.',
      stopCondition: '근거가 부족하거나 상태가 모순되면 변경을 멈춘다. 복구 결과를 확인하기 전에는 정상화로 기록하지 않는다.',
    },
  ],
  related: { label: '운영 상태와 안전한 복구 사례 보기', href: '/what/operations' },
} as const satisfies HandoverGuideContent
