import type { AiNativeEngineeringContent } from './content-types.ts'

export const aiNativeEngineeringContent = {
  meta: {
    classification: 'reconstructed-public-example',
    disclosure: '실제 업무 데이터와 식별정보 없이 개발 판단 구조만 재구성했습니다.',
    boundary: {
      dataOrigin: 'independently-authored-synthetic',
      privateSourceRuntimeDependency: false,
      containsRealIdentifiers: false,
      oneToOneInternalMapping: false,
    },
  },
  hero: {
    eyebrow: 'HOW I BUILD / 02',
    titleLines: ['AI-NATIVE', 'ENGINEERING'],
    thesis: 'AI가 읽을 기준, 바꿀 범위, 검증할 조건을 먼저 정했다.',
    summary:
      '읽기 순서와 작업 제약을 문서에 남기고, 코드의 영향 경로를 확인한다. 작업별로 변경을 분리해 만든 결과는 코드·데이터·테스트로 검증하고, 사람이 채택한 뒤 기준 문서에 반영한다.',
    manifest: {
      eyebrow: '작업을 시작하기 전에',
      title: 'AI가 참고할 작업 기준',
      items: [
        {
          index: '01',
          label: 'INSTRUCTIONS',
          title: 'CLAUDE.md / AGENTS.md',
          description: '도구별 진입점과 공통 작업 규칙, 읽기 순서, 권한 경계를 먼저 제공한다.',
          signals: ['READ ORDER', 'CONSTRAINTS', 'VERIFICATION'],
        },
        {
          index: '02',
          label: 'STRUCTURE',
          title: 'CODEMAP',
          description: '파일을 열기 전에 코드의 역할과 영향 경로, 검증 근거를 탐색한다.',
          signals: ['ROLE', 'ENTRYPOINT', 'DEPENDENCY', 'TESTS', 'CONSTRAINTS', 'EVIDENCE'],
        },
        {
          index: '03',
          label: 'EXECUTION',
          title: 'WORKTREE / BASELINE',
          description: '작업 변경과 기존 상태를 분리하고, 환경 차이가 원인에 섞이지 않았는지 비교한다.',
          signals: ['BRANCH', 'DIRTY STATE', 'ENVIRONMENT'],
        },
      ],
      statusLabel: 'READY WHEN',
      status: '변경 전 기준·문서 최신성·작업 범위가 확인됐을 때',
    },
  },
  scene: {
    eyebrow: 'EXECUTION TRACE / ONE BOUNDED CHANGE',
    title: '한 번의 변경을 검증하고 기준 문서에 반영하기까지.',
    situation:
      '권한 조건 하나를 바꿀 때 화면·정책·서비스·저장 규칙·테스트를 함께 검토하는 공개 재구성 사례.',
    toolRule:
      '읽을 범위, 변경 권한, 검증 대상을 먼저 정하고 작업에 맞춰 Claude Code 또는 Codex를 사용한다. 두 도구에 같은 프로젝트 지침을 적용한다.',
    steps: [
      {
        id: 'context',
        label: 'CONTEXT',
        summary: '현재 기준부터 읽는다.',
        action: '원격 기준과 작업 상태를 확인하고, 작업 지침의 순서대로 현재 문서와 알려진 문제를 읽는다.',
        proof: '작업 전제, 아직 확인되지 않은 항목과 금지된 변경이 구분된다.',
        exitRule: '기준 브랜치·문서 최신성·작업 제약을 설명할 수 있을 때.',
        codemapUse: 'LOCK에서 생성 범위와 최신성을 먼저 확인한다.',
        state: 'context',
      },
      {
        id: 'scope',
        label: 'SCOPE',
        summary: '영향 범위를 좁힌다.',
        action: '요청과 연결된 진입점·의존성·제약·테스트를 찾고, 변경하지 않을 영역을 명시한다.',
        proof: '수정 대상과 함께 건드리지 않을 경계가 하나의 작은 변경 단의로 정의된다.',
        exitRule: '영향 경로와 검증할 대상이 정해졌을 때.',
        codemapUse: '코드의 역할·진입점·의존성·테스트·제약·근거를 함께 대조한다.',
        state: 'context',
      },
      {
        id: 'isolate',
        label: 'ISOLATE',
        summary: '코드와 환경의 경계를 나눈다.',
        action: '확정한 기준으로 독립 worktree와 브랜치를 만들고, 재현 환경과 변경 전 상태를 고정한다.',
        proof: '변경, 기존 상태와 로컬 환경을 서로 다른 원인 후보로 추적할 수 있다.',
        exitRule: '재현 명령과 비교 기준이 같은 조건으로 준비됐을 때.',
        state: 'candidate',
      },
      {
        id: 'build',
        label: 'BUILD',
        summary: '검증 가능한 후보를 만든다.',
        action: 'AI가 코드와 테스트 후보를 만들되, 요청한 범위 밖의 구조나 운영 상태는 추정하지 않는다.',
        proof: '변경 내용과 함께 가정한 것과 아직 확인하지 못한 것을 남긴다.',
        exitRule: '후보가 독립적으로 검사 가능하고 되돌릴 수 있을 때.',
        state: 'candidate',
      },
      {
        id: 'verify',
        label: 'VERIFY',
        summary: '코드·데이터·테스트로 검증한다.',
        action: '정적 검사와 관련 테스트를 실행하고, 필요하면 실제 데이터 규칙이나 변경 전 기준과 결과를 비교한다.',
        proof: '초기 가설을 지지하거나 반박하는 관찰 결과가 명령과 함께 남는다.',
        exitRule: '성공뿐 아니라 실패 원인과 검증하지 못한 범위까지 설명할 수 있을 때.',
        codemapUse: '처음 식별한 영향 경로에 검증 누락이 없는지 다시 대조한다.',
        state: 'evidence',
      },
      {
        id: 'decision',
        label: 'HUMAN DECISION',
        summary: '채택 여부를 사람이 판단한다.',
        action: '근거를 바탕으로 채택, 수정 또는 보류를 결정한다. 생성됐거나 테스트가 통과했다는 사실만으로 승인하지 않는다.',
        proof: 'AI가 만든 후보 중 무엇을 사람이 채택했는지 기록한다.',
        exitRule: '결정 주체와 근거, 남은 위험이 함께 확인됐을 때.',
        state: 'decision',
      },
      {
        id: 'canonicalize',
        label: 'CANONICALIZE',
        summary: '확인된 것만 다시 기준으로 남긴다.',
        action: '확정된 변경이 구조나 경계를 바꿨다면 작업 지침, 관련 문서와 코드 수준 맥락을 같은 변경에서 갱신한다.',
        proof: '다음 작업에서 새 기준을 찾고, 코드와 문서가 어긋났는지 확인할 수 있다.',
        exitRule: '코드·문서·생성 기준이 같은 변경을 가리킬 때.',
        codemapUse: 'Codemap을 갱신하고 새 LOCK의 스캔 범위와 모듈 지문을 확인한다.',
        state: 'canonical',
      },
    ],
  },
  incident: {
    eyebrow: 'FAILURE RECORD / AI PROPOSAL REVIEW',
    date: '2026-08-14',
    title: 'AI의 첫 해결책을 바로 구현하지 않았습니다.',
    summary:
      '후속 질문에서 AI가 앞서 찾은 근거까지 부정하는 문제가 나타났습니다. 근거를 저장해 다시 주입하는 큰 설계가 제안됐지만, 먼저 더 작은 수정안을 적용하고 실제 대화로 검증했습니다. 코드와 재현 결과를 확인한 뒤, 사람이 구현 범위를 결정했습니다.',
    symptom: '“아닌데?”라는 짧은 후속 질문에, 앞서 찾은 근거까지 부정했다.',
    reviewFindings: [
      '후속 질문에서 자동 RAG가 필요한 검색 맥락을 충분히 확보하지 못하는 경우가 있었다.',
      '제안된 저장 시점에 구조화된 검색 근거가 충분히 존재하지 않았다.',
      '모델 출력 → 근거 저장 → 모델 입력으로 이어지는 자기참조 가능성이 있었다.',
    ],
    comparison: [
      {
        id: 'first-proposal',
        label: 'FIRST PROPOSAL',
        state: 'HOLD',
        observation: '이전 답변의 근거를 저장하고 다음 대화에 다시 주입',
        note: '모델 출력이 다시 사실의 근거가 되는 순환 가능성을 확인',
      },
      {
        id: 'smaller-test',
        label: 'SMALLER TEST',
        state: 'VERIFIED',
        observation: '후속 질문의 검색 맥락을 보완하고 실제 2턴 대화로 재현',
        note: '개발 환경의 실제 임베딩 데이터로 검증. 해당 시나리오에서 앞선 근거를 다시 부정하지 않음을 확인',
      },
    ],
    evidence:
      '직전 질문의 맥락을 연결해 검색하고, 이번 검색에 없다는 이유로 앞서 확인한 근거를 부정하지 않도록 응답 지침을 보완했다.',
    decision:
      '작은 수정과 재현 결과를 확인한 뒤, 큰 근거 영속화는 향후 추론·근거 검증 구조와 함께 다시 설계할 항목으로 보류했다.',
    extension: {
      workflow: '자동 검색 → 맥락 부족 판단 → 추가 검색 → 답변 계속',
      description:
        '추가로 search_company_context를 구현했다. 자동 RAG 이후 맥락이 부족하면 AI가 원본 검색 도구를 호출하고, 검색 결과를 tool_result로 받아 답변을 이어간다.',
    },
    rule: ['VERIFY THE PROPOSAL.', 'RETURN TO SOURCE.'],
  },
  artifacts: {
    eyebrow: 'THREE CONTROLS / HUMAN + AI',
    title: '작업 지침, 코드 지도, 비교 기준의 역할',
    introduction:
      '작업 지침은 읽기 순서와 권한을, Codemap은 영향 경로를, 변경 전 기준은 원인을 비교할 조건을 맡는다.',
    items: [
      {
        index: 'A1',
        label: 'ENTRY CONTRACT',
        title: 'CLAUDE.md / AGENTS.md',
        question: '어디서부터 읽고, 어떤 권한과 검증 규칙으로 일하는가?',
        responsibility: 'Claude Code 전용 진입점과 공통 AI 작업 규칙을 구분하고, 같은 프로젝트 제약을 적용한다.',
        maintenance: '읽기 순서·도구별 작업 규칙·변경 권한·완료 조건이 바뀔 때 갱신.',
      },
      {
        index: 'A2',
        label: 'STRUCTURAL CONTRACT',
        title: 'CODEMAP / JSON + LOCK',
        question: '무엇이 이 코드를 호출하고, 어디에 영향을 주며, 무엇이 검증하는가?',
        responsibility: '사람과 개발 에이전트가 같은 코드 지도를 읽고, LOCK으로 생성 범위와 최신성을 확인한다.',
        maintenance: '모듈 경계·의존성·라우트·데이터 규칙·주요 흐름이 바뀔 때 갱신.',
        fields: ['ROLE', 'ENTRYPOINT', 'DEPENDENCY', 'TESTS', 'CONSTRAINTS', 'EVIDENCE'],
        href: '/how/documentation-system/artifacts/codemap',
      },
      {
        index: 'A3',
        label: 'ISOLATION CONTRACT',
        title: 'WORKTREE / CLEAN BASELINE',
        question: '지금 보는 증상은 코드·데이터·의존성·환경 중 어디에서 왔는가?',
        responsibility: 'Orca/ADE worktree로 변경을 분리하고, 변경 전 기준과 비교해 로컬 환경의 영향을 검증한다.',
        maintenance: '실행 환경·테스트 데이터·의존성·검증 명령이 달라질 때 비교 조건을 갱신.',
      },
    ],
  },
  principle: {
    eyebrow: 'BOUNDARY / CURRENT PRACTICE',
    statement: 'AI-ready는 모델 선택이 아니라, 검증할 수 있는 작업 구조의 상태다.',
    explanation:
      '이전 AI 답변을 사실처럼 기억시키기보다, 필요할 때 원본 근거를 다시 검색할 수 있게 했다. 제안은 후보로 두고, 코드와 재현 결과를 확인한 뒤 사람이 구현 범위를 정한다.',
    maintenanceRule: {
      label: 'CURRENT RULE',
      statement: 'PROPOSAL → EVIDENCE → DECISION',
      detail: 'AI의 제안은 코드와 재현 결과를 확인한 뒤 사람이 채택·수정·보류를 결정한다. 확인된 구조 변경은 코드와 같은 변경에서 작업 지침과 Codemap에 반영한다.',
    },
    boundary: [
      '문서와 Codemap은 탐색 기준이다. 실제 동작은 코드·데이터·테스트로 확인한다.',
      'AI가 만든 후보·검증 근거·사람의 채택 결정·기준 문서 반영을 구분해 남긴다.',
      '구현·테스트 통과·배포·실제 사용·조직 내 정착은 각각의 근거로 확인한다.',
    ],
    appliedIn: '',
  },
} as const satisfies AiNativeEngineeringContent
