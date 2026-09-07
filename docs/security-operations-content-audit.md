# Security & Operations Content Audit

- Status: source-reviewed draft
- Reviewed: 2026-09-04
- Public rule: private sources are evidence only; every browser-facing sample is independently reconstructed.

## Page thesis

제품이 동작하는 것만으로는 충분하지 않았다. 누가 무엇을 바꿀 수 있는지, 변경을 어디에서
검증할지, 실패했을 때 자동화가 멈추고 사람이 판단해야 하는 지점까지 함께 설계했다.

이 페이지는 보안 도구나 클라우드 서비스의 목록이 아니라 다음 네 가지 판단을 보여준다.

`BOUNDARY → CHANGE → VERIFICATION → RECOVERY`

## Security audit

| 항목 | 상태 | 확인한 현재 범위 | 공개 표현의 경계 |
| --- | --- | --- | --- |
| authentication | CONFIRMED | 단일 조직 OIDC, 서버 측 불투명 세션, 변경 요청의 CSRF 검증, 제한된 복귀 경로가 코드와 현재 문서에 존재한다. | 외부 보안 감사나 조직 전체 SSO 성과를 뜻하지 않는다. 현재 cloud-console 설정은 이 페이지에서 재검증하지 않았다. |
| authorization | CONFIRMED | 로그인 신원과 업무 권한을 분리하고, 연결된 사용자의 `resource × action` 권한을 요청마다 운영 데이터에서 계산한다. | 로그인 성공을 업무 접근 성공으로 표현하지 않는다. |
| permission model | CONFIRMED | 역할 템플릿의 기본값에 개인별 허용·회수 예외를 합성한다. 비활성 사용자와 미연결 로그인은 업무 권한이 없다. | 역할 수나 권한 수를 보안 수준의 지표로 사용하지 않는다. |
| admin operation | CONFIRMED | 팀원 선택, 템플릿, 관리자 위임, 권한 매트릭스, 명시적 저장 흐름이 코드와 private UI evidence에 존재한다. | 실제 사람·직무·계정·권한 코드는 공개하지 않고 합성 UI로 재구성한다. |
| security boundary | CONFIRMED | 화면 노출뿐 아니라 서버에서 같은 권한을 확인한다. 위임자는 자신·상위 관리자·재위임 경계를 넘을 수 없고, 마지막 관리자 제거를 막는다. | 제품 단위 authorization 사례이며 전사 IAM 운영 책임으로 확장하지 않는다. |
| failure mode | CONFIRMED | 세션 저장소나 권한 조회 실패를 허용으로 바꾸지 않고 일반화된 오류로 닫는다. 미연결 사용자는 인증과 권한 없음 상태를 구분한다. | fail-closed가 모든 가용성 문제를 해결한다는 뜻은 아니다. |
| evolution | HISTORICAL → CONFIRMED | 공용 접근 제한 → 조직 로그인과 고정 역할 → 조직 로그인은 신원, 운영 DB는 실제 권한이라는 구조로 변화했다. | 과거 단계를 현재 구조와 섞지 않는다. |
| evidence | CONFIRMED | 현재 코드, 인증·관리자 문서, 관련 ADR, 보안·OIDC evolution chunk, private Admin 화면을 교차검토했다. | 원문·식별자·내부 topology는 공개하지 않는다. |
| remaining limitation | PARTIAL | cloud-console 현재 상태, 전체 권한 parity, 침투 테스트, 외부 보안 감사, Redis session/queue 결합 모니터링은 이 근거만으로 확정할 수 없다. | 완료된 보안 체계나 인증을 주장하지 않는다. |

## Operations audit

| 항목 | 상태 | 확인한 현재 범위 | 공개 표현의 경계 |
| --- | --- | --- | --- |
| deployment | CONFIRMED | 변경 검증 뒤 비활성 API 대상을 먼저 build·기동하는 배포 흐름이 workflow와 운영 문서에 존재한다. | 무중단·고가용성 보장으로 표현하지 않는다. |
| readiness | CONFIRMED | 비활성 API가 DB query를 수행할 수 있는지 확인한다. | Redis, worker, 외부 연동, 권한, migration 완료는 증명하지 않는다. |
| traffic switch | CONFIRMED | readiness 뒤 proxy 대상을 새 API로 전환하고 설정 검증과 reload를 수행한다. | 단순 프로세스 기동을 트래픽 전환 성공으로 보지 않는다. |
| smoke verification | CONFIRMED | 공개 경로의 응답과 목표 대상을 함께 확인한다. | 데이터 변경 성공이나 전체 사용자 시나리오를 보장하지 않는다. |
| rollback | CONFIRMED | API 전환 실패는 이전 대상으로 되돌리고 새 대상을 멈추는 경로가 있다. worker 갱신 실패도 이전 이미지 복원을 시도한다. | DB schema·data·Redis가 같은 방식으로 되돌아간다고 말하지 않는다. |
| worker | CONFIRMED | API와 별도로 build·recreate하고 실행 상태와 재시작 변화를 확인한다. | blue-green 대상이 아니며 짧은 실행 공백 가능성이 남는다. |
| retry / replay | CONFIRMED | 수집 실패 payload를 격리하고 제한된 간격으로 재시도한다. 한도를 넘으면 terminal state에 두고 수동 replay로 넘긴다. | 실제 복구율, MTTR, 모든 background job의 통합 복구를 주장하지 않는다. |
| recovery | PARTIAL | 증거 보존 → 실패 분류 → 읽기 전용 확인 → 좁은 조치 → 구성요소별 검증 순서의 runbook이 있다. | runbook 존재를 full restore drill의 실행 증거로 사용하지 않는다. |
| data / DB boundary | CONFIRMED | 애플리케이션 전환과 DB schema/data 복구를 분리한다. 운영 migration은 배포 workflow가 자동 적용한다고 가정하지 않는다. | 자동 database rollback 또는 DR 완료를 주장하지 않는다. |
| AWS infrastructure | PARTIAL | 단일 compute 대상, 별도 운영 DB, private artifact storage, 배포 시점의 제한된 SSH 접근이 코드·workflow·최신 문서에 나타난다. | cloud credit 전략은 구축 증거로 사용하지 않는다. DNS/TLS/IAM의 현재 runtime 상태도 이 페이지가 보증하지 않는다. |
| evidence | CONFIRMED | 현재 workflow·Compose·health 코드, Architecture, Deployment, Recovery, Known Issues, ADR와 operations chunks를 교차검토했다. | 실제 내부 이름·주소·경로·secret·container identifier는 공개하지 않는다. |
| remaining limitation | PARTIAL | 자동 production migration, full backup/restore drill, automatic DR, 통합 heartbeat·lag·failure alert, 24/7 on-call 근거가 없다. | IaC, HA, SRE 운영 성숙도로 확장하지 않는다. |

## Evolution kept on the page

### Authorization

1. `SHARED GATE` — 서비스 앞단의 공용 접근 제한. 사람별 책임과 업무 권한을 표현하기 어려웠던 역사적 상태.
2. `IDENTITY + FIXED ROLE` — 조직 계정으로 사용자를 식별하고 고정 역할로 화면과 API를 나눈 단계.
3. `IDENTITY / AUTHORIZATION` — 인증은 신원 경계, 실제 행동 허용은 역할 템플릿과 개인 예외를 합성하는 현재 구조.

### Delivery

1. 서비스 재기동 중심 배포 — 실패 시 사람이 이전 버전을 찾아 복구하던 역사적 상태.
2. 개발·운영 환경 분리 — 검증 대상을 운영 사용자 흐름과 분리.
3. 비활성 API 검증 뒤 전환 — readiness, public target check, worker 별도 갱신, rollback을 같은 변경 흐름에 배치.

## Storyboard

### HERO / DARK

- Display: `SECURITY & OPERATIONS`
- Thesis: 제품의 행동 권한, 변경 관문, 자동 복구와 사람 판단의 경계를 한 문장으로 제시한다.
- Coordinates: `BOUNDARY / CHANGE / VERIFY / RECOVER`

### 01 / AUTHORIZATION AS A PRODUCT / WARM IVORY

- Signature visual: private Admin hierarchy를 바탕으로 독립 재구성한 `Permission Composer`.
- Left: 합성 팀원 목록과 현재 선택 상태.
- Center: 역할 템플릿과 관리자 위임.
- Right: `resource × action` 매트릭스와 실제 권한 결과.
- Interaction: `TEMPLATE / OVERRIDE / EFFECTIVE / GUARD`를 keyboard, pointer, tap으로 선택하면 한 개의 editorial annotation이 바뀐다.
- Evolution rail: 공용 gate → 고정 역할 → identity와 authorization 분리.

### 02 / SECURITY BOUNDARIES / DEEP JADE

세 개의 `RISK → DECISION → BOUNDARY`만 남긴다.

1. 로그인 성공을 업무 권한으로 오해 → 신원과 행동 허용을 분리 → 미연결 사용자는 업무 권한 없음.
2. 메뉴 숨김을 보안으로 오해 → 서버가 같은 permission을 다시 확인 → 직접 요청도 같은 경계에서 거부.
3. 저장소 장애를 허용으로 대체 → 실패 시 닫힘 → 가용성 비용은 현재 limitation으로 유지.

### 03 / DEPLOY WITH A WAY BACK / DARK TECHNICAL CANVAS

- Main visual: 활성/비활성 API와 공용 구성요소를 함께 보여주는 `Controlled Handoff`.
- Flow: checks → inactive API → readiness → traffic switch → public target check → worker recreate → keep / rollback.
- Focus states: readiness, public target check, rollback이 각각 무엇을 확인하고 무엇은 확인하지 않는지 보여준다.
- Component boundary: API는 전환 대상, worker는 별도 recreate, DB/Redis는 공용이며 application rollback 범위 밖.

### 04 / FAILURE & RECOVERY / WARM IVORY

- Main flow: failure → bounded retry → terminal state → review → manual replay.
- 상태를 색만으로 구분하지 않고 `AUTOMATED / ASSISTED / MANUAL · NOT VERIFIED` label을 함께 쓴다.
- Known boundary: full restore drill, automatic DR, 통합 worker health·alert는 확인되지 않음.

### 05 / CURRENT BOUNDARY / DARK

- `BUILT`: 제품 권한 관리, request-time authorization, gated API cutover/rollback, worker 별도 갱신, bounded retry와 수동 replay, recovery runbook.
- `NOT CLAIMED`: full IaC, HA/automatic DR, 검증된 full DB restore drill, 24/7 SRE/on-call, formal security certification.
- Next: 실제 route가 있는 Documentation System으로 연결해 운영 경계를 어떻게 기록하고 갱신하는지 이어서 본다.

## Visual plan

- Palette: existing `cover-black`, `cover-jade`, `cover-cream`, `paper`, `sage`, `line` only.
- Type: `cover-monumental` for the title, `body` for Korean explanation, `utility` for state and evidence labels.
- Layout: 얇은 control line이 페이지를 관통하고, 각 섹션에서 permission, request, deployment, recovery gate로 역할을 바꾼다.
- Signature: permission을 카드 모음이 아니라 `template + exception = effective action`으로 조합하는 editorial control surface.
- Restraint: cloud logo grid, checklist, fake monitoring dashboard, metric chart, terminal decoration는 사용하지 않는다.

## Copy and disclosure boundaries

- `RECONSTRUCTED PRODUCT VIEW / PUBLIC-SAFE`는 대표 artifact에서 한 번만 강하게 표시한다.
- 실제 조직·인물·계정·역할명·permission code·endpoint·domain·repo·SHA·cloud identifier는 쓰지 않는다.
- 실제 운영 수치와 보안 효과, onboarding 감소, 장애 감소, MTTR, zero downtime을 주장하지 않는다.
- AI는 이 페이지의 주인공이 아니며, 문서 작성 보조 여부도 별도 claim으로 만들지 않는다.
