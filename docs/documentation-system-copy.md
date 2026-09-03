# Documentation System — Copy Inventory v2

현재 `/how/documentation-system` 페이지에 반영할 최종 카피다.

- `화면 문구`는 방문자가 읽는 문장이다.
- `접근성 문구`는 화면 읽기 도구와 조작 요소에 사용한다.
- 재구성 예시의 줄바꿈과 기호도 카피에 포함한다.
- 처리 표시는 편집 메모이며 실제 화면에는 넣지 않는다.
- URL, 내부 ID, 배치 좌표와 애니메이션 설정은 다루지 않는다.

---

## 0. Public disclosure

처리: KEEP

### 화면 문구

> 이 페이지의 구조와 문서 예시는 공개 목적에 맞게 독립적으로 재구성했습니다.

---

## 1. Hero

처리: REWRITE

### Eyebrow

> HOW I BUILD / 01

### Title

> DOCUMENTATION\
> SYSTEM

### Supporting label

> EXTERNALIZING PROJECT CONTEXT

### Thesis

> 코드 작성자만 알던 프로젝트 맥락을, 다시 찾아갈 수 있는 구조로 만들었다.

### Summary

> 현재 상태, 결정의 이유, 운영 절차, 코드 위치를 질문별로 나눴다. 실제 상태는 다시 확인하고, 구조가 바뀌면 설명도 함께 바꾼다.

### Scope

Label:

> SCOPE / DEVELOPMENT & OPERATIONS

Statement:

> 개발자와 운영자, 미래의 내가 시스템을 이해하고 변경·배포·복구할 때 쓰는 맥락.

Included artifacts:

- ERD
- Architecture
- Current-state
- Roadmap
- ADR
- README
- Runbook
- Schema snapshot
- LikeC4
- Codemap

Boundary:

> AI가 대화에 쓰는 런타임 지식과 기억은 별도 체계다.

---

## 2. Knowledge Structure

처리: REWRITE

### Section labels

> 01 / KNOWLEDGE STRUCTURE

> A MAP FOR FINDING CONTEXT

> CURRENT ≠ FUTURE ≠ DECISION

> ↓ CODE LEVEL

### Responsibility statement

- ARCHITECTURE — 지금 구현된 구조.
- CURRENT-STATE — 완료·부분 완료·임시·위험 상태.
- ROADMAP — 아직 만들지 않은 범위와 시작 조건.
- ADR — 선택한 이유, 대안, 바뀐 결정의 연결.

### Node annotation labels

- QUESTION
- AUTHORITY
- UPDATE WHEN

### 00 / PROJECT

Question:

> 어디서부터 읽어야 할까?

Authority:

> 질문에 맞는 문서와 다음 탐색 위치.

Update when:

> 문서가 추가되거나 진입 경로가 바뀔 때.

### 01 / CURRENT

Question:

> 현재 무엇이 완료됐고, 어디가 불안정한가?

Authority:

> 완료·부분 완료·임시·위험으로 나눈 현재 상태.

Update when:

> 구현 상태나 확인된 위험이 달라질 때.

### 02 / DECISIONS

Question:

> 왜 이 선택을 했을까? 이전 판단은 어떻게 달라졌나?

Authority:

> 대안, 당시 제약, 대체·후속 결정의 기록.

Update when:

> 결정이 바뀌거나 후속 판단이 생길 때.

### 01.1 / ARCHITECTURE

Question:

> 현재 시스템은 어떻게 나뉘어 있을까?

Authority:

> 현재 구현된 구조와 주요 경계. 미래 구조는 Roadmap에서 다룬다.

Update when:

> 구성요소·의존성·서비스 경계가 바뀔 때.

### 01.2 / DATA

Question:

> 이 데이터는 어디서 와서 어디로 가는가?

Authority:

> System Map → Domain ERD → Physical ERD로 깊이를 나눈 데이터 구조.

Update when:

> 저장 구조·스키마·변환·소유권이 바뀔 때.

### 01.3 / API

Question:

> 이 요청은 누가 사용할 수 있는가?

Authority:

> 인터페이스 계약과 접근 조건.

Update when:

> 라우트·요청 형식·인가 경계가 바뀔 때.

### 02.1 / ADR

Question:

> 어떤 대안과 제약을 거쳐 결정했을까?

Authority:

> 선택과 기각의 이유. 바뀐 결정도 지우지 않고 이어 둔다.

Update when:

> 결정이 대체되거나 후속 판단이 추가될 때.

### 01.4 / DEPLOYMENT

Question:

> 반영 전후에 무엇을 확인해야 할까?

Authority:

> 배포 순서, 검증 관문, rollback 기준.

Update when:

> 배포 구조·순서·검증 관문이 바뀔 때.

### 01.5 / RECOVERY

Question:

> 장애가 나면 무엇부터 확인하지?

Authority:

> 일상 점검과 고위험 복구를 나눈 실행 순서.

Update when:

> 복구 절차·위험도·dry-run·rollback 조건이 바뀔 때.

### 01.6 / KNOWN ISSUES

Question:

> 알려진 문제와 아직 열린 위험은?

Authority:

> 재현 조건, 영향 범위, 임시 대응, 다음 확인.

Update when:

> 문제가 해결되거나 영향 범위가 달라질 때.

### 03 / CODEMAP

Question:

> 어디서 호출되고, 무엇에 영향을 주며, 어떤 테스트로 확인할까?

Authority:

> Documentation System이 소유하는 HTML·JSON·LOCK 코드 지도.

Update when:

> 모듈 경계·라우트·의존성·진입점·fingerprint가 바뀔 때.

### 접근성 narrative

> Project에서 Current, Decisions, Codemap으로 갈라진다. Current 아래의 Architecture는 Data, API, Deployment, Recovery, Known Issues로 이어지고 Decisions는 ADR로 이어진다. Current-state는 지금, Roadmap은 다음, ADR은 선택 이유를 맡는다.

---

## 3. Artifact Shelf

처리: REWRITE

### Section copy

Eyebrow:

> 02 / ARTIFACTS

Title:

> 문서 아카이브

Introduction:

> 진입, 구조, 복구를 대표하는 세 문서로 역할의 차이를 보여준다.

Library labels:

- DOCUMENT LIBRARY
- 추가 문서 7개

Shared preview/detail labels:

- SELECTED EXCERPT
- RECONSTRUCTED / PUBLIC-SAFE
- WHY
- FOR
- BOUNDARY
- UPDATE
- RESPONSIBILITY / EVIDENCE
- SAMPLE / SANITIZED EXCERPT
- CLOSE ×

처리 메모:

- `AUDIENCE` → `FOR`
- `MAINTENANCE` → `UPDATE`
- `ARTIFACT NOTE` 제거
- `EDITORIAL NOTE / RECONSTRUCTED PUBLIC EXAMPLE` 제거

### 01 / PROJECT MAP

Responsibility:

> 탐색 안내 / 진입 경로

Summary:

> 질문에 맞는 문서로 들어가는 첫 경로.

Why:

> 저장소 전체를 역추적하기 전에, 어디서 읽을지 먼저 찾는다.

For:

- 유지보수 담당자
- 새 개발자
- 개발 에이전트
- 미래의 나

Boundary:

> 구현의 정본이 아니라, 정본으로 가는 색인.

Update:

> 기준 문서나 진입 경로가 바뀔 때.

Evidence:

- ENTRY PATH
  - README
  - Project Map
  - Domain docs
  - Architecture / Operations
  - Codemap
- SEPARATION
  - README에는 진입 정보
  - 위험한 작업은 Runbook

Sample:

```markdown
# Project Map

## Start here
- Current status → ./current-state
- System structure → ./architecture
- Next scope → ./roadmap
- Decisions → ./decisions
- Run / recover → ./operations
- Code impact → ./codemap
```

### 02 / ARCHITECTURE

Responsibility:

> 구조 / 경계

Summary:

> 현재 구현을 설명하고, 질문에 따라 보는 깊이를 나눈다.

Why:

> 시스템 흐름, 데이터 관계, 실제 스키마, 코드 영향을 한 장에 억지로 담지 않는다.

For:

- 개발자
- 검토자
- 개발 에이전트

Boundary:

> 현재 구현만 설명한다. LikeC4는 버전 관리하지만 자동 최신성 검증은 없다. 코드, 실제 상태, Codemap의 revision·fingerprint와 다시 대조한다.

Update:

> 경계·의존성·스키마·주요 데이터 흐름이 바뀔 때.

Evidence:

- CURRENT ONLY
  - Architecture에는 현재 구현만 둔다.
- LEVELS OF DETAIL
  - System Map
  - Domain ERD
  - Physical ERD
- VERSIONED VIEW
  - LikeC4: System Context → Container → Component
- PRODUCTION CHECK
  - 실제 스키마는 운영 스냅샷으로 다시 확인.

Sample:

```markdown
# Architecture

## Current view
- Context → system relationships
- Container → runtime responsibilities
- Component → code boundaries

## Verify
- Schema → observed snapshot
```

### 03 / RECOVERY

Responsibility:

> 운영 위험 / 대응

Summary:

> 안전한 점검과 고위험 복구를 다른 깊이에 둔다.

Why:

> 찾기 쉬워야 하지만, 바로 복사해 실행하기 쉬워서는 안 된다.

For:

- 운영자
- 개발자
- 장애 검토자

Boundary:

> 절차를 기록했지만 백업·복구 훈련 완료나 자동 복구를 뜻하지 않는다.

Update:

> 절차·위험도·환경·dry-run·rollback 조건이 바뀔 때.

Evidence:

- ROUTINE
  - 읽기 전용·멱등 명령은 입구에.
- HIGH RISK
  - replay·reset·대량 backfill은 경고가 있는 Runbook에.
- BEFORE RUN
  - 환경·범위·비용·dry-run·rollback 확인.

Sample:

```markdown
# Recovery

## Before a high-risk command
- confirm environment and scope
- check idempotency and cost
- use dry-run where supported
- record rollback impact

> A runbook is guidance, not a completed drill.
```

### 04 / DATA PIPELINE

- Responsibility: 데이터 흐름 / 신뢰 경계
- Summary: 입력부터 검토·확정 상태까지 책임을 따라간다.
- Why: 원본, 변환 결과, AI 후보, 확정 데이터를 섞지 않는다.
- For: 개발자 / 데이터 검토자
- Boundary: 실제 레코드·저장소 식별자·운영 데이터는 포함하지 않는다.
- Update: 입력 계약·변환·소유권이 바뀔 때.
- Evidence: STATE BOUNDARY — Source → Validate → Transform → Review → Confirmed

Sample:

```markdown
# Data Pipeline

source
  → validate
  → transform
  → review
  → confirmed
```

### 05 / API MAP

- Responsibility: 인터페이스 계약
- Summary: 인터페이스와 인가 조건을 함께 찾는다.
- Why: 요청 형식만 알고 실행 권한을 놓치지 않게 한다.
- For: 개발자 / 연동 담당자
- Boundary: 실제 엔드포인트·도메인·계정 식별자는 포함하지 않는다.
- Update: 라우트·요청 형식·인가 경계가 바뀔 때.
- Evidence: CONTRACT — Request + access condition

Sample:

```markdown
# Interface Map

## Read
- authenticated role required

## Write
- validate scope before mutation
```

### 06 / DEPLOYMENT

- Responsibility: 배포 운영
- Summary: 반영 전제, 검증 순서, rollback 기준.
- Why: 배포 순서를 기억이 아닌 Runbook에 둔다.
- For: 운영자 / 배포 담당자
- Boundary: 문서가 성공을 증명하지 않는다. readiness·smoke test·실행 상태로 확인한다.
- Update: 배포 순서·검증 관문·rollback 경로가 바뀔 때.
- Evidence: SEQUENCE — Readiness → Switch → Public smoke → Keep / Rollback

Sample:

```markdown
# Deployment

## Before switch
- confirm target and scope
- check readiness

## After switch
- run focused smoke test
- keep or rollback
```

### 07 / CURRENT-STATE

- Responsibility: 구현 상태
- Summary: 완료·부분 완료·임시·위험을 나눈 현재 상태.
- Why: 지금과 다음을 한 문장에 섞지 않는다.
- For: 유지보수 담당자 / 검토자
- Boundary: 남은 범위와 시작 조건은 Roadmap에서 다룬다.
- Update: 구현 상태나 확인된 위험이 달라질 때.
- Evidence: STATUS — Complete / Partial / Temporary / Risk

Sample:

```markdown
# Current State

- Complete → verified current path
- Partial → implemented scope + remaining scope
- Temporary → replacement condition
- Risk → unresolved boundary
```

### 08 / ROADMAP

- Responsibility: 향후 범위
- Summary: 남은 범위와 시작 조건.
- Why: 계획을 이미 있는 구조처럼 보이지 않게 한다.
- For: 유지보수 담당자 / 기획자
- Boundary: 계획은 구현이나 배포 사실이 아니다.
- Update: 범위·전제·우선순위가 바뀔 때.
- Evidence: FUTURE — Remaining scope + activation condition

Sample:

```markdown
# Roadmap

## Remaining scope
- condition before implementation
- verification before promotion
```

### 09 / ADR

- Responsibility: 결정 이력
- Summary: 선택 이유와 바뀐 판단의 연결.
- Why: 현재 결과만 남기지 않고 당시 대안과 제약을 보존한다.
- For: 개발자 / 검토자
- Boundary: 결정 기록은 현재 구현 상태를 대신하지 않는다.
- Update: 결정이 대체되거나 후속 판단이 생길 때.
- Evidence: HISTORY — Decision → Superseded → Follow-up

Sample:

```markdown
# Decision Record

Status: Superseded
Superseded by: follow-up decision

## Context
## Alternatives
## Consequences
```

### 10 / CODEMAP

- Responsibility: 코드 수준 맥락
- Summary: 호출자, 영향, 테스트, 제약, 근거를 코드 위치와 함께 찾는다.
- Why: 파일을 열기 전에 변경의 영향 범위를 묻는다.
- For: 개발자 / 개발 에이전트
- Boundary: HTML·JSON·LOCK으로 구성한 저장소 Codemap이 정본. 날짜별 외부 사본은 백업이고, AI-native Engineering은 이 지도를 사용한다.
- Update: 모듈·라우트·의존성·진입점·fingerprint가 바뀔 때.
- Evidence: HTML — 관계 탐색
- Evidence: JSON — role / entrypoint / tests / constraints / evidence
- Evidence: LOCK — revision / generated time / scan scope / fingerprint

Sample:

```markdown
# Codemap

HTML → explore relationships
JSON → role / entrypoint / tests / constraints / evidence
LOCK → revision / generated time / scan scope / fingerprint
```

---

## 4. Evolution

처리: REWRITE / MERGE

### Section copy

Eyebrow:

> 03 / EVOLUTION

Headline:

> DOCUMENTATION WASN'T\
> DESIGNED ONCE.

Introduction:

> 시스템이 바뀔 때마다, 문서가 답해야 할 질문도 달라졌다.

Takeaway:

> ERD 하나에서 시작해 현재·결정·운영·코드와 갱신 규칙까지 확장됐다.

### Shared map/UI labels

- PROGRESSIVE ARCHITECTURE MAP
- EVOLUTION TRACE
- CURRENT ACTIVE STRUCTURE
- PRESSURE
- STATIC KEYFRAME
- ORIGIN
- PERSIST
- ADDED
- TO HISTORY
- HISTORY
- STAGE 01 / 05 through STAGE 05 / 05
- STRUCTURE CHANGE
- BOUNDARY
- 06.18 / INITIAL ERD
- 07.13 / DOC TAXONOMY
- 07.23 / MULTI-LEVEL DB MAP

Static transition summaries:

- Stage 1 — Initial ERD
- Stage 2 — Responsibility separation
- Stage 3 — Multiple levels of detail
- Stage 4 — Operations + code level
- Stage 5 — Same-change rule

처리 메모:

- 노드 수 집계 문구는 제거한다.
- 기존 `Structure change`, `Design decision`, `Observed pattern`, `Ground truth` 설명은 각 장면의 Takeaway·Evidence·Boundary에 합친다.

### Stage 1 / 2026.06

Title:

> INITIAL ERD

Pressure:

- PRODUCT DIRECTION
- STORAGE CHANGE

Takeaway:

> 첫 ERD는 이후 구조 안에서, 당시 데이터 경계를 설명하는 지도로 남았다.

Evidence:

> 11 TABLES · HUMAN AUTHORING / REVIEW ↔ POSTGRESQL AGGREGATION / QUERY

Boundary:

> 완성본이 아니라, 당시 데이터 경계를 담은 첫 스냅샷.

Map copy:

- HUMAN AUTHORING / REVIEW
- POSTGRESQL / AGGREGATION / QUERY
- INITIAL ERD / 11 TABLES
- FIRST SNAPSHOT
- DIRECTION + STORAGE CHANGE

접근성 narrative:

> 첫 ERD는 사람의 작성·검토와 PostgreSQL 집계·조회를 나눈 11개 테이블의 관계를 보여준다. 이후 제품 방향과 저장 구조가 바뀌며 과거 상태가 된다.

### Stage 2 / 2026.07.13

Title:

> RESPONSIBILITY SEPARATION

Pressure:

- CURRENT ≠ FUTURE
- FUTURE ≠ DECISION

Takeaway:

> 현재, 미래, 결정 기록을 서로 다른 문서 책임으로 나눴다.

Evidence:

> CURRENT ≠ FUTURE ≠ DECISION

Map copy:

- PROJECT — DOCUMENTATION MAP
- CURRENT — COMPLETE / PARTIAL / TEMPORARY / RISK
- WHAT IS TRUE NOW
- ARCHITECTURE — CURRENT ONLY
- ROADMAP — REMAINING SCOPE
- DECISIONS — WHY
- ADR — DECISION / SUPERSEDED / FOLLOW-UP
- RESPONSIBILITY SEPARATION
- CURRENT ≠ FUTURE ≠ DECISION
- INITIAL ERD — HISTORY

접근성 narrative:

> Architecture는 현재 구현, Current-state는 상태, Roadmap은 남은 범위, ADR은 선택 이유와 바뀐 결정을 맡는다.

### Stage 3 / 2026.07.23–27

Title:

> MULTIPLE LEVELS OF DETAIL

Pressure:

- READABILITY
- LEVEL OF DETAIL

Takeaway:

> 하나의 지도로 모든 질문에 답하려 하지 않았다.

Evidence:

> System Map → Domain ERD → Physical ERD

Boundary:

> 물리 ERD 한 장은 관계 확인에는 유용했지만, 흐름을 읽기엔 너무 복잡했다.

Map copy:

- PROJECT — DOCUMENTATION MAP
- CURRENT — COMPLETE / PARTIAL / TEMPORARY / RISK
- ARCHITECTURE — CURRENT ONLY
- EXPLORATION DEPTH
- ROADMAP — REMAINING SCOPE
- DECISIONS — WHY
- ADR — DECISION / SUPERSEDED / FOLLOW-UP
- SYSTEM MAP — SYSTEM FLOW
- DOMAIN ERD — DOMAIN RELATIONS
- PHYSICAL ERD — COLUMNS / CONSTRAINTS / INDEXES
- LIKEC4 — SYSTEM / CONTAINER / COMPONENT
- MULTIPLE LEVELS OF DETAIL
- ONE MAP ≠ EVERY QUESTION
- TAXONOMY PERSISTS
- RESOLUTION

접근성 narrative:

> 기존 책임 구조 아래에 System Map, Domain ERD, Physical ERD의 세 탐색 깊이가 생긴다. LikeC4는 system, container, component 관점을 맡는다.

### Stage 4 / 2026.07.31–08.11

Title:

> OPERATIONS + CODE LEVEL

Pressure:

- OPERATIONAL SAFETY
- CODEBASE COMPLEXITY

Takeaway:

> 이해하는 것만으로는 부족했다. 배포·복구 절차를 찾고, 실제 코드를 추적할 수 있어야 했다.

Evidence:

> README / RUNBOOK / PRODUCTION SNAPSHOT / CODEMAP

Boundary:

> Runbook은 절차이지, 완료된 복구 훈련의 증거가 아니다.

Map copy:

- README — START HERE
- OPERATIONS — RUN / RECOVER / RESPOND
- DEPLOYMENT
- RECOVERY
- KNOWN ISSUES
- PRODUCTION SNAPSHOT — CHECK ACTUAL SCHEMA
- CODE LEVEL — WHERE IS IT?
- CODEMAP — CALLER / IMPACT / TEST
- HTML / JSON / LOCK
- OPERATIONS + CODE

접근성 narrative:

> README에서 운영 문서로 들어가고, 실제 스키마는 운영 스냅샷으로 다시 확인한다. Codemap은 호출 관계, 영향 범위, 테스트를 HTML·JSON·LOCK으로 연결한다.

### Stage 5 / 2026.08

Title:

> THE PROBLEM BECAME STALENESS.

Pressure:

> STALE CONTEXT

Takeaway:

> 문서를 더 만드는 것보다, 낡지 않게 유지하는 일이 다음 문제가 됐다.

Evidence:

> 코드와 지도가 어긋난 뒤, LOCK에 revision·생성 시각·스캔 범위·모듈 fingerprint를 남겼다.

Boundary:

> 같은 변경에서 갱신한다는 규칙은 생겼지만, 최신성 CI와 스키마 변경 자동 탐지는 아직 없다.

Map copy:

- CHANGE — BOUNDARY / ROUTE / DEPENDENCY / SCHEMA / QUEUE / DATA FLOW
- TRIGGER
- CONTEXT — ARCHITECTURE / DOMAIN DOCS / CODEMAP
- UPDATE
- VERIFY — CODE / TEST / ACTUAL STATE
- GROUND TRUTH
- LOCK — REVISION / GENERATED TIME / SCAN SCOPE / FINGERPRINT
- STALE CONTEXT

접근성 narrative:

> 기존 문서 구조 위에 Change, Context, Verify 흐름이 더해진다. 구조 변경은 관련 Architecture·Domain docs·Codemap 갱신과 코드·테스트·실제 상태 확인으로 이어진다.

---

## 5. Current Rule

처리: REWRITE

Eyebrow:

> CURRENT RULE

Title:

> SAME CHANGE.

Statement:

> 경계, 라우트, 의존성, 스키마, 큐, 주요 데이터 흐름이 바뀌면 관련 맥락도 같은 변경에서 갱신하고 검증한다.

Flow:

### CHANGE

- Boundary
- Route
- Dependency
- Schema
- Queue
- Major data flow

### CONTEXT

- Architecture
- Domain docs
- Codemap

### VERIFY

- Code
- Test
- Actual system / schema

---

## 6. Boundary / Current Practice

처리: REWRITE

Eyebrow:

> BOUNDARY / CURRENT PRACTICE

Statement:

> DOCUMENTATION IS CONTEXT, NOT PROOF.

Boundary:

> 문서는 현재 구조를 설명한다.\
> 실제 상태는 코드, 스키마, 테스트, 실행 근거로 다시 확인한다.

Claim boundary:

> 온보딩 시간과 장애 해결 시간은 측정하지 않았다.

Disclosure label:

> 아직 자동화·검증되지 않은 범위

Items:

- 문서 최신성 CI
- 스키마 변경 자동 탐지
- Production migration-as-code
- 백업·복구 훈련

---

## 7. Next Page

처리: REWRITE

Eyebrow:

> NEXT / 02

Title:

> AI-NATIVE ENGINEERING

Summary:

> 프로젝트 맥락을 개발 흐름이 어떻게 읽고, 검증하고, 다시 정본에 반영하는지.

Availability label:

> 페이지 열기 →

Fallback availability label:

> 페이지 준비 중

---

## 8. Accessibility and control labels

처리: REWRITE

- 문서 체계 범위
- 프로젝트 맥락 지도
- 선택한 맥락 설명
- 프로젝트 맥락 계층
- 대표 문서
- 추가 문서
- 문서 상세 닫기
- `{ARTIFACT TITLE}의 공개용 재구성 예시`
- `{EVIDENCE LABEL} 흐름`
- 문서 체계가 확장된 과정
- 같은 변경에서 맥락을 갱신하고 검증하는 흐름
