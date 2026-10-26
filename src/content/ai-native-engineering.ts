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
    thesis: 'AI가 프로젝트를 다시 읽고, 작은 변경부터 검증할 작업 환경을 만들었다.',
    summary:
      'AI와 개발하려면 매번 설명하던 프로젝트 맥락과 작업 조건을 다시 찾을 수 있어야 했다. 읽기 순서와 권한을 지침에 남기고, Codemap으로 영향 범위를 찾고, worktree에서 변경을 분리했다. 구현 결과는 코드와 테스트로 확인한 뒤 문서에도 반영했다.',
    manifest: {
      eyebrow: '작업을 시작하기 전에',
      title: '작업 환경의 구성',
      items: [
        {
          index: '01',
          label: 'INSTRUCTIONS',
          title: 'CLAUDE.md / AGENTS.md',
          description: 'Claude Code와 Codex가 같은 읽기 순서와 작업 규칙을 따르도록 진입점을 둔다.',
          signals: ['READ ORDER', 'CONSTRAINTS', 'VERIFICATION'],
        },
        {
          index: '02',
          label: 'STRUCTURE',
          title: 'CODEMAP',
          description: '수정할 코드의 호출자와 의존성을 찾고, 함께 확인할 테스트로 이동한다.',
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
      status: '기준 브랜치와 문서, 변경 범위를 확인한 뒤 시작',
    },
  },
  scene: {
    eyebrow: 'WORKFLOW / ONE CHANGE',
    title: '맥락을 읽고, 구현하고, 다시 확인한다.',
    situation:
      '권한 조건 하나를 바꿀 때도 화면에서 저장 규칙까지 영향이 이어진다. 아래 예시는 그 경로를 찾고 변경을 검증하는 작업 순서를 재구성했다.',
    toolRule:
      '읽을 범위, 변경 권한, 검증 대상을 먼저 정하고 작업에 맞춰 Claude Code 또는 Codex를 사용한다. 두 도구에 같은 프로젝트 지침을 적용한다.',
    steps: [
      {
        id: 'context',
        label: 'CONTEXT',
        summary: '현재 기준부터 읽는다.',
        action: '원격 기준과 작업 상태를 확인하고, 작업 지침의 순서대로 현재 문서와 알려진 문제를 읽는다.',
        proof: '기준 문서와 작업 제약을 다음 단계에서 참조할 수 있다.',
        exitRule: '기준 브랜치·문서 최신성·작업 제약을 설명할 수 있을 때.',
        codemapUse: 'LOCK에서 생성 범위와 최신성을 먼저 확인한다.',
        state: 'context',
      },
      {
        id: 'scope',
        label: 'SCOPE',
        summary: '영향 범위를 좁힌다.',
        action: '요청과 연결된 진입점, 의존성, 제약과 테스트를 찾아 수정할 범위를 정한다.',
        proof: '영향 경로에 맞춰 수정 대상과 검증 대상을 함께 정한다.',
        exitRule: '영향 경로와 검증할 대상이 정해졌을 때.',
        codemapUse: '코드의 역할과 호출 관계를 따라 관련 테스트를 찾는다.',
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
        action: '확정한 범위 안에서 AI가 코드와 테스트 후보를 만들고, 구현에 사용한 가정을 기록한다.',
        proof: '코드 변경과 테스트를 하나의 검토 단위로 비교할 수 있다.',
        exitRule: '후보가 독립적으로 검사 가능하고 되돌릴 수 있을 때.',
        state: 'candidate',
      },
      {
        id: 'verify',
        label: 'VERIFY',
        summary: '코드와 실제 결과를 대조한다.',
        action: '정적 검사와 관련 테스트를 실행하고, 필요하면 실제 데이터 규칙이나 변경 전 기준과 결과를 비교한다.',
        proof: '초기 가설을 지지하거나 반박하는 관찰 결과가 명령과 함께 남는다.',
        exitRule: '결과를 기준 상태와 비교하고, 실패가 있으면 원인을 좁혔을 때.',
        codemapUse: '처음 식별한 영향 경로에 검증 누락이 없는지 다시 대조한다.',
        state: 'evidence',
      },
      {
        id: 'decision',
        label: 'HUMAN DECISION',
        summary: '채택 여부를 사람이 판단한다.',
        action: '요청에 맞는 변화인지와 검증 결과를 검토하고, 채택하거나 수정할 부분을 결정한다.',
        proof: 'AI가 만든 후보 중 무엇을 사람이 채택했는지 기록한다.',
        exitRule: '결정 주체와 근거, 남은 위험이 함께 확인됐을 때.',
        state: 'decision',
      },
      {
        id: 'canonicalize',
        label: 'CANONICALIZE',
        summary: '변경한 구조를 문서에 반영한다.',
        action: '확정된 변경이 구조나 경계를 바꿨다면 작업 지침, 관련 문서와 코드 수준 맥락을 같은 변경에서 갱신한다.',
        proof: '다음 작업에서 새 기준을 찾고, 코드와 문서가 어긋났는지 확인할 수 있다.',
        exitRule: '코드·문서·생성 기준이 같은 변경을 가리킬 때.',
        codemapUse: 'Codemap을 갱신하고 새 LOCK의 스캔 범위와 모듈 지문을 확인한다.',
        state: 'canonical',
      },
    ],
  },
  incident: {
    eyebrow: 'CASE / FOLLOW-UP SEARCH',
    date: '2026-08-14',
    title: '근거 저장을 늘리기 전에 검색 맥락을 고쳤다.',
    summary:
      '짧은 후속 질문에 AI가 앞서 찾은 근거까지 부정했다. 이전 답변의 근거를 저장하는 설계가 제안됐지만, 코드를 검토하자 검색 맥락이 이어지지 않는 문제가 드러났다. 직전 질문을 검색에 연결하고 실제 2턴 대화로 다시 확인했다.',
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
        note: '개발 환경의 실제 임베딩 데이터로 재현한 2턴 대화에서 앞선 근거를 유지해 답변',
      },
    ],
    evidence:
      '직전 질문의 맥락을 연결해 검색하고, 이번 검색에 없다는 이유로 앞서 확인한 근거를 부정하지 않도록 응답 지침을 보완했다.',
    decision:
      '검색 맥락 보완을 적용했다. 근거를 장기 저장하는 설계는 추론과 근거 검증 구조를 함께 검토할 때 다시 다루기로 했다.',
    extension: {
      workflow: '자동 검색 → 맥락 부족 판단 → 추가 검색 → 답변 계속',
      description:
        '추가로 search_company_context를 구현했다. 자동 RAG 이후 맥락이 부족하면 AI가 원본 검색 도구를 호출하고, 검색 결과를 tool_result로 받아 답변을 이어간다.',
    },
    rule: ['제안을 검증하고,', '원본으로 돌아간다.'],
  },
  artifacts: {
    eyebrow: 'WORKING ENVIRONMENT',
    title: '다음 작업에서도 같은 기준으로',
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
    eyebrow: 'CURRENT PRACTICE',
    statement: '제안을 코드와 재현 결과에 대조한다.',
    explanation:
      '후속 질문 문제를 고치면서 원본을 다시 검색하는 경로를 더했다. 이후에도 AI의 제안을 작은 변경으로 확인하고, 채택한 구조는 작업 지침과 Codemap에 남기는 순서를 적용했다.',
    maintenanceRule: {
      label: 'CURRENT RULE',
      statement: 'PROPOSAL → EVIDENCE → DECISION',
      detail: '사람이 코드와 재현 결과를 검토해 구현 범위를 정한다. 구조가 바뀌면 같은 변경에서 작업 지침과 Codemap도 갱신한다.',
    },
    boundary: [
      '작업 지침에서 맥락을 읽고 Codemap에서 수정할 경로를 찾는다.',
      '분리된 작업 환경에서 결과를 비교하고, 결정한 변경을 다음 작업의 기준으로 남긴다.',
    ],
    appliedIn: '후속 질문의 검색 맥락 보완과 원본 재검색 도구 구현에 적용했다.',
  },
} as const satisfies AiNativeEngineeringContent
