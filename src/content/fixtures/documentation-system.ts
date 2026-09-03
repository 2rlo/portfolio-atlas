import type { DocumentationSystemContent } from '../content-types.ts'

export const documentationSystemContent = {
  meta: {
    id: 'documentation-system-public-v2',
    classification: 'reconstructed-public-example',
    disclosure:
      '이 페이지의 구조와 문서 예시는 공개 목적에 맞게 독립적으로 재구성했습니다.',
    boundary: {
      dataOrigin: 'independently-authored-synthetic',
      privateSourceRuntimeDependency: false,
      containsRealIdentifiers: false,
      oneToOneInternalMapping: false,
    },
  },
  hero: {
    eyebrow: 'HOW I BUILD / 01',
    titleLines: ['DOCUMENTATION', 'SYSTEM'],
    supportingLabel: 'EXTERNALIZING PROJECT CONTEXT',
    thesis:
      '코드 작성자만 알고 있던 프로젝트 맥락을, 다시 찾아갈 수 있는 정보 구조로 만들었다.',
    summary:
      '현재 상태, 결정, 운영, 코드 수준의 질문을 서로 다른 책임과 해상도로 분리하고, 실제 상태의 재확인과 갱신 규칙을 연결했다.',
    scope: {
      eyebrow: 'SCOPE / DEVELOPMENT & OPERATIONS',
      statement:
        '개발자, 운영자, 미래의 내가 시스템을 다시 이해하고 안전하게 변경·배포·복구하기 위한 맥락이다.',
      boundary: 'Runtime AI 지식과 대화 기억은 이 문서 체계와 별도로 다룬다.',
      artifacts: [
        'ERD',
        'Architecture',
        'Current-state',
        'Roadmap',
        'ADR',
        'README',
        'Runbook',
        'Schema snapshot',
        'LikeC4',
        'Codemap',
      ],
    },
  },
  knowledgeMap: {
    title: 'Knowledge Structure',
    accessibleSummary:
      'Project는 현재 구현, 결정 기록, 코드 수준 지도로 나뉜다. 현재 구현 아래에는 Architecture, Data, API와 운영 문맥이 있고, 결정 기록은 ADR로 이어진다. Current-state, Roadmap, ADR은 각각 현재 상태, 미래 범위, 과거 판단을 분리한다.',
    taxonomy: {
      statement: 'CURRENT ≠ FUTURE ≠ DECISION',
      items: [
        { label: 'ARCHITECTURE', responsibility: '현재 구현된 구조만 설명한다.' },
        { label: 'CURRENT-STATE', responsibility: '완료, 부분 완료, 임시 구현, 위험을 구분한다.' },
        { label: 'ROADMAP', responsibility: '미구현 범위와 확장 조건을 둔다.' },
        { label: 'ADR', responsibility: '선택 이유와 superseded / follow-up 관계를 남긴다.' },
      ],
    },
    nodes: [
      {
        id: 'project', index: '00', label: 'PROJECT',
        question: '지금 가진 질문은 어느 맥락에서 다시 찾아야 하는가?',
        authority: '현재 문서 구조와 다음 읽을 위치를 연결하는 안내 맥락.',
        updateWhen: '기준 맥락이 추가되거나 문서의 책임 위치가 바뀔 때.', kind: 'root',
      },
      {
        id: 'current', parentId: 'project', index: '01', label: 'CURRENT',
        question: '현재 무엇이 완료, 부분 완료, 임시 구현 또는 위험 상태인가?',
        authority: '지금 유효한 구현 상태와 알려진 경계를 분류하는 현재 상태 문서.',
        updateWhen: '구현 상태, 임시 경로, 확인된 위험이 달라질 때.', kind: 'current',
      },
      {
        id: 'decisions', parentId: 'project', index: '02', label: 'DECISIONS',
        question: '왜 이 대안을 선택했고 이전 판단과 어떤 관계가 있는가?',
        authority: '주요 기술 판단, 대안, 판단 당시 제약과 follow-up 관계.',
        updateWhen: '새 결정이 기존 결정을 대체하거나 판단 조건이 달라질 때.', kind: 'decision',
      },
      {
        id: 'architecture', parentId: 'current', index: '01.1', label: 'ARCHITECTURE',
        question: '현재 시스템은 어떤 component와 boundary로 구성되어 있는가?',
        authority: '현재 구현된 시스템 구조와 주요 구성요소 경계. 미래 구조는 Roadmap이 책임진다.',
        updateWhen: '주요 구성요소, dependency, service boundary가 변경될 때.', kind: 'current',
      },
      {
        id: 'data', parentId: 'current', index: '01.2', label: 'DATA',
        question: '데이터는 어떤 깊이와 단계로 탐색해야 하는가?',
        authority: 'System Map, Domain ERD, Physical ERD로 나뉜 데이터 구조와 흐름 맥락.',
        updateWhen: '저장 구조, schema, transformation, 데이터 소유권이 변경될 때.', kind: 'current',
      },
      {
        id: 'api', parentId: 'current', index: '01.3', label: 'API',
        question: '현재 interface와 authorization boundary는 무엇인가?',
        authority: '인터페이스 계약과 접근 조건을 다시 찾는 맥락.',
        updateWhen: 'route, request shape, authorization boundary가 변경될 때.', kind: 'current',
      },
      {
        id: 'adr', parentId: 'decisions', index: '02.1', label: 'ADR',
        question: '한 기술 판단은 어떤 대안과 제약을 거쳐 결정되었는가?',
        authority: '선택과 기각의 이유를 보존하며, 바뀐 결정도 삭제하지 않고 관계로 남긴다.',
        updateWhen: '결정이 대체되거나 후속 판단이 추가될 때.', kind: 'decision',
      },
      {
        id: 'deployment', parentId: 'architecture', index: '01.4', label: 'DEPLOYMENT',
        question: '변경을 반영하기 전후에 무엇을 어떤 순서로 확인하는가?',
        authority: '배포 순서, 검증 관문, rollback 맥락.',
        updateWhen: '배포 topology, 배포 순서, 검증 관문이 변경될 때.', kind: 'operation',
      },
      {
        id: 'recovery', parentId: 'architecture', index: '01.5', label: 'RECOVERY',
        question: '장애가 발생했을 때 무엇부터 확인하고 어떤 순서로 복구하는가?',
        authority: '안전한 일상 명령과 고위험 복구 작업을 분리한 운영 맥락.',
        updateWhen: '복구 절차, 위험 분류, dry-run 또는 rollback 조건이 변경될 때.', kind: 'operation',
      },
      {
        id: 'known-issues', parentId: 'architecture', index: '01.6', label: 'KNOWN ISSUES',
        question: '이미 확인한 제약과 아직 해결되지 않은 경계는 무엇인가?',
        authority: '재현 가능한 제약, 영향 범위, 현재 우회 방법과 확인 경로.',
        updateWhen: '제약이 해결·재분류되거나 영향 범위가 달라질 때.', kind: 'operation',
      },
      {
        id: 'codemap', parentId: 'project', index: '03', label: 'CODEMAP',
        question: '구현 위치, 호출 관계, dependency, test, constraint, evidence는 어디에 있는가?',
        authority: 'Documentation System이 소유하며 HTML, JSON, LOCK으로 관리하는 저장소 수준 코드 맥락의 현재 기준본.',
        updateWhen: 'module boundary, route, dependency, entrypoint 또는 fingerprint가 변경될 때.', kind: 'code',
      },
    ],
    edges: [
      { id: 'project-current', from: 'project', to: 'current', relation: 'entry point' },
      { id: 'project-decisions', from: 'project', to: 'decisions', relation: 'entry point' },
      { id: 'current-architecture', from: 'current', to: 'architecture', relation: 'current context' },
      { id: 'current-data', from: 'current', to: 'data', relation: 'current context' },
      { id: 'current-api', from: 'current', to: 'api', relation: 'current context' },
      { id: 'decisions-adr', from: 'decisions', to: 'adr', relation: 'decision record' },
      { id: 'architecture-deployment', from: 'architecture', to: 'deployment', relation: 'operational context' },
      { id: 'architecture-recovery', from: 'architecture', to: 'recovery', relation: 'operational context' },
      { id: 'architecture-known-issues', from: 'architecture', to: 'known-issues', relation: 'operational context' },
      { id: 'project-codemap', from: 'project', to: 'codemap', relation: 'code-level index' },
    ],
  },
  artifacts: {
    eyebrow: '02 / ARTIFACTS',
    title: '문서 아카이브',
    introduction: '진입, 구조, 복구를 대표하는 세 문서로 서로 다른 문서 책임을 보여준다.',
    primaryItems: [
      {
        id: 'project-map', index: '01', title: 'PROJECT MAP', responsibility: '탐색 안내 / 진입 경로',
        summary: '질문에 따라 필요한 문서 깊이로 들어가는 진입 경로.',
        why: '저장소 전체를 처음부터 역추적하기 전에, 지금 필요한 질문의 위치부터 찾게 한다.',
        audience: ['향후 유지보수 담당자', '새로 합류한 개발자', 'Coding agent', '미래의 나'],
        boundary: '모든 구현 세부사항의 source of truth가 아니라 어디를 읽을지 알려주는 index다.',
        maintenance: '기준 문서가 생기거나 문서 책임 또는 진입 경로가 이동할 때 갱신한다.',
        evidence: [
          { label: 'ENTRY PATH', statement: '필요한 깊이까지 점진적으로 들어간다.', sequence: ['README', 'Project Map', 'Domain docs', 'Architecture / Operations', 'Codemap'] },
          { label: 'DESIGN INTENT', statement: '약 10분 안에 목적, 구조, 실행, 환경, data flow와 운영 문맥을 찾도록 설계했다. 측정된 onboarding 성과는 아니다.' },
        ],
        excerpt: ['# Project Map', '', '## Start here', '- Current implementation → ./current-state', '- System boundaries → ./architecture', '- Remaining scope → ./roadmap', '- Decisions → ./decisions', '- Operations → ./operations', '- Code-level context → ./codemap'],
      },
      {
        id: 'architecture', index: '02', title: 'ARCHITECTURE', responsibility: '구조 / 경계',
        summary: '현재 구현을 설명하고 질문에 따라 구조의 해상도를 나눈다.',
        why: '하나의 거대한 diagram이 시스템 흐름, domain relation, physical schema, 코드 영향을 모두 설명하지 않게 한다.',
        audience: ['개발자', '검토자', 'Coding agent'],
        boundary: '현재 구현 구조만 설명한다. 미래 범위는 Roadmap, 실제 상태는 직접 확인한 근거가 책임진다.',
        maintenance: '구성요소 경계, dependency, schema 또는 주요 데이터 흐름이 바뀌면 관련 view와 맥락을 함께 갱신한다.',
        evidence: [
          { label: 'CURRENT ONLY', statement: 'Architecture에는 현재 구현만 둔다. 남은 일과 확장 조건은 Roadmap으로 분리한다.' },
          { label: 'LEVELS OF DETAIL', statement: '질문에 따라 필요한 해상도가 다르다.', sequence: ['System Map', 'Domain ERD', 'Physical ERD'] },
          { label: 'ARCHITECTURE AS CODE', statement: 'LikeC4 source로 System Context, Container, component view를 version-controlled form으로 관리했다. application build / CI와는 별도 도구다.' },
          { label: 'GROUND TRUTH', statement: 'physical schema는 local mock이나 migration만으로 추정하지 않고 production snapshot의 columns, constraints, indexes를 다시 확인했다.' },
        ],
        excerpt: ['# Architecture', '', '## Current boundary', '- Context view → system relationship', '- Container view → runtime responsibility', '- Component view → API / frontend / worker / CLI', '', '## Evidence boundary', '- Physical schema → verified snapshot'],
      },
      {
        id: 'recovery', index: '03', title: 'RECOVERY', responsibility: '운영 위험 / 대응',
        summary: '명령의 위험도에 따라 발견 위치와 실행 전 확인 항목을 나눈다.',
        why: '복구 정보는 너무 쉽게 또는 너무 어렵게 발견돼도 위험할 수 있어, 위험도에 따른 발견 경로를 설계했다.',
        audience: ['운영자', '개발자', '장애 검토자'],
        boundary: '절차와 판단 조건을 설명할 뿐 backup / restore 자동 검증이나 recovery drill 완료를 의미하지 않는다.',
        maintenance: '복구 절차, 위험 분류, 환경 조건, dry-run 또는 rollback 영향이 변경될 때 갱신한다.',
        evidence: [
          { label: 'SAFE / ROUTINE', statement: 'read-only, idempotent, normal operational commands는 entry documentation에서 찾을 수 있다.' },
          { label: 'HIGH-RISK', statement: 'replay, reset, bulk backfill, destructive or expensive operations는 상세 runbook 뒤에 둔다.' },
          { label: 'BEFORE EXECUTION', statement: '실행 전에 environment, idempotency, cost, dry-run, rollback implication을 확인한다.' },
        ],
        excerpt: ['# Recovery', '', '## Before a high-risk command', '- confirm environment and scope', '- check idempotency and cost', '- use dry-run where supported', '- record rollback implications', '', '> A runbook is guidance, not proof of a completed drill.'],
      },
    ],
    libraryItems: [
      {
        id: 'data-pipeline', index: '04', title: 'DATA PIPELINE', responsibility: '데이터 책임', summary: '입력에서 검토 가능한 상태까지 데이터 책임을 따라간다.',
        why: '단계마다 데이터 해석과 변환 책임을 분리한다.', audience: ['개발자', '데이터 검토자'], boundary: '실제 record, storage identifier, live data는 포함하지 않는다.', maintenance: '입력 contract, transformation, 소유권이 바뀔 때 갱신한다.', evidence: [{ label: 'RESPONSIBILITY', statement: 'source, validation, transformation, review 경계를 분리한다.' }], excerpt: ['# Data Pipeline', '', 'source', '  → validate', '  → transform', '  → review', '  → confirmed state'],
      },
      {
        id: 'api-map', index: '05', title: 'API MAP', responsibility: '인터페이스 계약', summary: 'interface와 authorization boundary를 함께 찾는다.',
        why: 'route 이름과 접근 조건을 분리하지 않고 읽게 한다.', audience: ['개발자', '연동 담당자'], boundary: '실제 endpoint, domain, account identifier는 포함하지 않는다.', maintenance: 'route, request shape, authorization boundary가 바뀔 때 갱신한다.', evidence: [{ label: 'CONTRACT', statement: '인터페이스와 접근 조건을 한 맥락에서 유지한다.' }], excerpt: ['# Interface Map', '', '## Read contract', '- authenticated role required', '', '## Write contract', '- validate scope before mutation'],
      },
      {
        id: 'deployment', index: '06', title: 'DEPLOYMENT', responsibility: '배포 운영', summary: '반영 전제, 검증 순서, rollback 판단을 안내한다.',
        why: '배포 작업의 확인 순서를 기억에 의존하지 않게 한다.', audience: ['운영자', '배포 책임자'], boundary: '실제 성공은 health, focused smoke test, runtime evidence로 별도 확인한다.', maintenance: '배포 순서, 검증 관문, rollback 경로가 바뀔 때 갱신한다.', evidence: [{ label: 'VERIFY ELSEWHERE', statement: '절차와 관찰된 runtime 결과를 분리한다.' }], excerpt: ['# Deployment', '', '## Preconditions', '- confirm target and scope', '', '## After release', '1. inspect health evidence', '2. run focused smoke test'],
      },
      {
        id: 'current-state', index: '07', title: 'CURRENT-STATE', responsibility: '구현 상태', summary: '완료, 부분 완료, 임시 구현, 위험을 구분한다.',
        why: '현재 구현과 다음 계획을 같은 문장에 섞지 않는다.', audience: ['유지보수 담당자', '검토자'], boundary: '미구현 범위와 확장 조건은 Roadmap이 책임진다.', maintenance: '구현 상태 또는 확인된 위험이 달라질 때 갱신한다.', evidence: [{ label: 'STATUS', statement: 'Complete / Partial / Temporary / Risk를 명시적으로 구분한다.' }], excerpt: ['# Current State', '', '- Complete → verified current path', '- Partial → bounded implementation', '- Temporary → replacement condition recorded', '- Risk → unresolved boundary'],
      },
      {
        id: 'roadmap', index: '08', title: 'ROADMAP', responsibility: '향후 범위', summary: '아직 구현되지 않은 범위와 확장 조건을 둔다.',
        why: '향후 의도가 current architecture처럼 읽히지 않게 한다.', audience: ['유지보수 담당자', '기획자'], boundary: '계획은 구현 또는 배포 사실을 의미하지 않는다.', maintenance: '범위, 전제 조건, 우선순위가 바뀔 때 갱신한다.', evidence: [{ label: 'FUTURE', statement: '남은 범위와 활성화 조건을 current state에서 분리한다.' }], excerpt: ['# Roadmap', '', '## Remaining scope', '- condition before implementation', '- verification required before promotion'],
      },
      {
        id: 'adr', index: '09', title: 'ADR', responsibility: '결정 이력', summary: '선택 이유와 판단이 바뀐 관계를 보존한다.',
        why: '현재 결과만 남기지 않고 당시의 대안과 제약을 다시 찾게 한다.', audience: ['개발자', '검토자'], boundary: 'ADR은 현재 구현 상태를 대신하지 않는다.', maintenance: '결정이 대체되거나 후속 판단이 추가될 때 관계를 남긴다.', evidence: [{ label: 'HISTORY', statement: '바뀐 판단을 삭제하지 않고 대체·후속 관계로 연결한다.' }], excerpt: ['# Decision Record', '', 'Status: Superseded', 'Superseded by: follow-up decision', '', '## Context', '## Alternatives', '## Consequences'],
      },
      {
        id: 'codemap', index: '10', title: 'CODEMAP', responsibility: '코드 수준 맥락', summary: 'module에서 test, constraint, evidence까지 영향 문맥을 다시 찾는다.',
        why: '파일 위치뿐 아니라 entrypoint, 호출 관계, dependency와 검증 근거를 함께 찾게 한다.', audience: ['개발자', 'Coding agent'], boundary: 'Codemap은 Documentation System이 소유하는 현재 기준 artifact다. AI-native Engineering은 이를 workflow에서 사용하지만 별도 기준본을 소유하지 않으며, 날짜별 외부 snapshot은 특정 시점의 수동 backup이다.', maintenance: 'module, route, dependency, entrypoint 또는 fingerprint가 바뀔 때 재생성·확인한다.', evidence: [{ label: 'HTML', statement: '관계를 탐색하는 interactive map.' }, { label: 'JSON', statement: 'role, entrypoint, test, constraint, evidence를 담은 구조화 데이터.' }, { label: 'LOCK', statement: '생성 revision, timestamp, scan scope, module fingerprint 기록.' }], excerpt: ['# Codemap', '', 'HTML → interactive exploration', 'JSON → role / entrypoint / tests / constraints / evidence', 'LOCK → revision / generated at / scan scope / fingerprint'], href: '/how/documentation-system/artifacts/codemap',
      },
    ],
  },
  evolution: {
    eyebrow: '03 / EVOLUTION',
    headline: ["DOCUMENTATION WASN'T", 'DESIGNED ONCE.'],
    introduction: '한 번 설계한 문서 체계가 아니라, 제품 방향, 운영 위험, 탐색 깊이와 낡은 맥락이라는 압력을 받을 때마다 책임이 누적된 구조다.',
    takeaway: '시스템과 함께 구조가 확장됐고, 결국 문서 유지보수도 변경의 일부가 됐다.',
    scenes: [
      {
        id: 'initial-erd', index: '01', time: '2026.06', title: "ERD WAS ENOUGH — UNTIL IT WASN'T.", pressureLines: ['PRODUCT DIRECTION', 'STORAGE CHANGE'],
        takeaway: '첫 ERD는 한 시점의 시스템 상태를 설명했지만, 그 상태가 바뀐 뒤에도 충분할 수는 없었다.',
        change: '초기 data boundary를 외부화했지만, 방향과 저장 구조가 바뀌면서 ERD를 다시 수정 대상으로 표시했다.',
        evidence: { label: 'EVIDENCE', statement: 'human authoring / review와 PostgreSQL aggregation / query를 나눈 11-table ERD가 시작점이었다.' },
        boundary: 'ERD를 완성본으로 보지 않는다. 당시 data relation을 설명한 첫 snapshot이다.',
        accessibleVisualSummary: '초기 구조는 사람의 작성·검토와 PostgreSQL 집계·query의 두 경계 및 11-table ERD로 구성된다.',
        visual: { kind: 'boundary', artifact: '11-TABLE ERD', status: 'MARKED FOR REVISION', boundaries: [{ label: 'HUMAN', responsibility: 'AUTHORING / REVIEW' }, { label: 'POSTGRESQL', responsibility: 'AGGREGATION / QUERY' }] },
      },
      {
        id: 'taxonomy', index: '02', time: '2026.07.13', title: 'DIFFERENT QUESTIONS NEEDED DIFFERENT SOURCES.', pressureLines: ['CURRENT ≠ FUTURE', 'FUTURE ≠ DECISION'],
        takeaway: '하나의 만능 문서 대신 질문별로 책임을 분리했다.',
        change: 'overview, current-state, roadmap, architecture, ADR, deployment, recovery의 책임을 분리했다.',
        evidence: { label: 'DESIGN DECISION', statement: '현재 구현, 남은 범위, 선택 이유, 운영 절차가 서로를 대신하지 않도록 taxonomy를 만들었다.' },
        accessibleVisualSummary: 'Architecture는 현재 구현, Current-state는 완료·부분·임시·위험, Roadmap은 미래 범위, ADR은 선택 이유와 변경 관계를 책임진다.',
        visual: { kind: 'taxonomy', responsibilities: [{ label: 'ARCHITECTURE', answer: 'WHAT EXISTS NOW' }, { label: 'CURRENT-STATE', answer: 'COMPLETE / PARTIAL / TEMPORARY / RISK' }, { label: 'ROADMAP', answer: 'WHAT REMAINS' }, { label: 'ADR', answer: 'WHY / SUPERSEDED / FOLLOW-UP' }, { label: 'DEPLOYMENT', answer: 'HOW TO RELEASE' }, { label: 'RECOVERY', answer: 'HOW TO RESPOND' }] },
      },
      {
        id: 'levels-of-detail', index: '03', time: '2026.07.23–27', title: 'ONE MAP COULD NOT ANSWER EVERY QUESTION.', pressureLines: ['READABILITY', 'LEVEL OF DETAIL'],
        takeaway: '질문에 따라 필요한 해상도가 다르다.', change: 'database와 architecture 탐색을 각각 여러 해상도로 분리했다.',
        evidence: { label: 'EVIDENCE', statement: 'physical ERD 한 장은 relation 확인에는 유용했지만 system flow를 읽기에는 너무 복잡했다.' },
        boundary: '더 많은 diagram이 목적이 아니라 질문에 맞는 탐색 깊이가 목적이다.',
        accessibleVisualSummary: 'Database는 System Map, Domain ERD, Physical ERD로 깊어지고 Architecture는 LikeC4 system, container, component를 거쳐 Codemap의 code context로 이어진다.',
        visual: { kind: 'levels', tracks: [{ label: 'DATABASE', question: 'RELATION AT WHICH DEPTH?', levels: ['SYSTEM MAP', 'DOMAIN ERD', 'PHYSICAL ERD'] }, { label: 'ARCHITECTURE / CODE', question: 'BOUNDARY OR IMPLEMENTATION?', levels: ['LIKEC4 / SYSTEM', 'CONTAINER / COMPONENT', 'CODEMAP'] }] },
      },
      {
        id: 'operations', index: '04', time: '2026.07.31–08.11', title: 'DOCUMENTATION HAD TO SURVIVE OPERATIONS.', pressureLines: ['OPERATIONAL SAFETY', 'CODEBASE COMPLEXITY'],
        takeaway: '진입 경로, 위험 경계, ground truth와 코드 수준 맥락이 운영 요구사항이 됐다.',
        change: 'README, deployment, recovery, known issues, production schema snapshot, Codemap을 탐색 경로에 연결했다.',
        evidence: { label: 'GROUND TRUTH', statement: 'physical schema는 local assumption이 아니라 production snapshot의 columns, constraints, indexes로 다시 확인했다.' },
        boundary: 'runbook은 절차를 설명하지만 backup / restore 검증 또는 drill 완료를 뜻하지 않는다.',
        accessibleVisualSummary: 'README에서 상세 운영 문서로 들어가고, local assumption은 production schema snapshot으로 다시 확인하며, Codemap은 HTML, JSON, LOCK으로 코드 수준 맥락을 제공한다.',
        visual: { kind: 'operations', entryPath: ['README', 'DEPLOYMENT / RECOVERY', 'KNOWN ISSUES'], groundTruth: { from: 'LOCAL ASSUMPTION', to: 'PRODUCTION SNAPSHOT', checks: ['COLUMNS', 'CONSTRAINTS', 'INDEXES'] }, codemap: [{ label: 'HTML', responsibility: 'INTERACTIVE MAP' }, { label: 'JSON', responsibility: 'ROLE / ENTRYPOINT / TEST / CONSTRAINT / EVIDENCE' }, { label: 'LOCK', responsibility: 'REVISION / TIME / SCOPE / FINGERPRINT' }] },
      },
      {
        id: 'staleness', index: '05', time: '2026.08', title: 'THE PROBLEM BECAME STALENESS.', pressureLines: ['STALE', 'CONTEXT'],
        takeaway: '낡은 지도를 발견한 뒤 최신성 자체를 artifact 계약으로 만들었다.',
        change: '생성 revision, 시각, scan scope와 module fingerprint를 LOCK에 기록하고, 구조 변경과 관련 맥락 갱신을 같은 변경 단위로 묶었다.',
        evidence: { label: 'OBSERVED PATTERN', statement: '코드와 Codemap의 기준이 어긋나는 상태를 확인해, 내용뿐 아니라 생성 기준도 다시 검증해야 했다.' },
        boundary: '모든 문서를 매번 수정하는 것이 아니라 바뀐 책임과 연결된 authoritative context를 갱신한다.',
        accessibleVisualSummary: '낡은 코드 지도를 발견한 뒤 생성 revision, 시각, scan scope, module fingerprint를 LOCK 계약으로 묶고 구조 변경을 관련 문서와 Codemap 갱신으로 연결한다.',
        visual: { kind: 'staleness', backlog: ['CODE CHANGE', 'STALE MAP', 'FRESHNESS UNKNOWN'], triggers: ['BOUNDARY', 'DEPENDENCY', 'ROUTE', 'DB / SCHEMA', 'QUEUE', 'MAJOR DATA FLOW'], context: ['ARCHITECTURE', 'DOMAIN DOCS', 'CODEMAP + LOCK'] },
      },
    ],
    currentRule: {
      eyebrow: 'CURRENT RULE', title: 'SAME CHANGE.',
      statement: 'Boundary, route, dependency, schema, queue 또는 major data flow가 바뀌면 관련 기준 맥락을 같은 변경에서 갱신하고 검증한다.',
      flow: [
        { label: 'CHANGE', items: ['Boundary', 'Route', 'Dependency', 'Schema', 'Queue', 'Major data flow'] },
        { label: 'CONTEXT', items: ['Architecture', 'Domain docs', 'Codemap'] },
        { label: 'VERIFY', items: ['Current code', 'Relevant test', 'Actual system / schema state where applicable'] },
      ],
    },
  },
  principle: {
    statement: 'DOCUMENTATION IS CONTEXT, NOT PROOF.',
    boundary: ['Architecture는 의도한 현재 구조를 설명한다.', '실제 상태는 필요한 경우 code, production schema, test와 runtime evidence로 다시 확인한다.'],
    claimBoundary: '온보딩 시간이나 장애 해결 시간이 개선됐다는 측정 결과는 주장하지 않는다.',
    notVerified: ['문서 최신성 CI', '자동 schema drift 탐지', 'Production migration-as-code', 'Backup / restore drill'],
  },
  nextPage: {
    eyebrow: 'NEXT / 02', title: 'AI-NATIVE ENGINEERING', summary: '사람과 AI가 같은 프로젝트 상태에서 일할 수 있도록 충분한 맥락을 제공한다.', href: '/how/ai-native-engineering', available: true,
  },
} as const satisfies DocumentationSystemContent
