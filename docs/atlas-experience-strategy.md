# Atlas Experience Strategy

- Status: Accepted
- Decided: 2026-09-02
- Scope: 전체 정보 구조, HOW I BUILD 경험 설계, Home 진입점
- Canonical for: 포트폴리오 IA와 페이지 역할에 관한 이후 구현 판단

이 문서는 웹 아틀라스가 무엇을 보여주고, 무엇을 보여주지 않으며, 각 페이지가 어떤 질문에 답해야 하는지를 고정한다. 이후 에이전트는 IA, Home, case study, artifact UI를 변경하기 전에 이 문서를 읽는다.

## 1. Why this atlas exists

PDF 포트폴리오는 선택된 결과와 핵심 근거를 빠르게 전달한다. 웹 아틀라스는 PDF에서 축약될 수밖에 없는 다음 연결을 더 깊게 탐색하게 한다.

- 문제를 어떻게 발견했는가
- 어떤 대안과 제약을 검토했는가
- 왜 그 설계를 선택했는가
- 무엇이 실패하거나 바뀌었는가
- 구현이 제품과 운영에 어떻게 연결되었는가
- 현재 확인 가능한 경계는 어디까지인가

웹의 목적은 모든 문서를 쌓아두는 것이 아니다. 한 결론에서 판단, 근거, 시행착오, artifact로 내려갈 수 있는 **progressive disclosure**를 제공하는 것이다.

## 2. Core decision

아틀라스는 제품과 제작 시스템을 두 개의 동등한 진입점으로 나눈다.

```text
HOME
├── WHAT I BUILT
│   └── product behavior / workflow / state / operation
└── HOW I BUILD
    └── EXTERNALIZED CONTEXT SYSTEM
        ├── Documentation System
        ├── AI-native Engineering
        └── Technical Writing Library
```

`WHAT I BUILT`를 먼저 모두 보여준 뒤 `HOW I BUILD`를 아래에 묻지 않는다. 두 트랙은 첫 화면과 전역 탐색에서 함께 보여야 한다. 이것은 위아래의 우선순위가 아니라 서로를 설명하는 두 관점이다.

Security / Governance와 Operations / Reliability는 근거와 사례가 충분해질 때 HOW I BUILD 내부의 별도 grouping으로 확장할 수 있다. 초기에는 모든 주제를 같은 깊이의 여섯 개 페이지로 만들지 않는다.

## 3. Unifying philosophy

> 복잡해질수록, 맥락은 사람의 기억 밖에 있어야 한다.

문서, AI 개발환경, 기술 글쓰기는 독립된 기술 자랑이 아니다. 사람과 AI가 같은 맥락을 다시 찾고, 검증하고, 갱신할 수 있게 만드는 하나의 시스템이다.

- Documentation System: 프로젝트 맥락을 구조화한다.
- AI-native Engineering: 그 맥락을 실제 개발 workflow가 사용하게 한다.
- Technical Writing: 독자와 목적에 맞는 해상도로 맥락을 전달한다.

`Externalized Context System`은 HOW I BUILD 세 영역을 묶는 설명용 umbrella다. 개별 도구 이름보다 이 시스템과 검증 방식이 앞에 온다.

## 4. Reading depths

각 페이지는 아래 세 속도를 모두 지원한다.

1. 약 2초: 이 페이지가 제품인지 제작 시스템인지 구분한다.
2. 약 30초: 문제, 핵심 판단, 결과 또는 현재 경계를 파악한다.
3. 심층 탐색: evolution, incident, artifact, 근거를 선택적으로 연다.

콘텐츠가 많다는 이유로 첫 화면에 모두 노출하지 않는다. 핵심 결론과 한 개의 signature visual을 먼저 두고, 상세 artifact는 다음 깊이로 보낸다.

## 5. Cross-link rule

두 트랙은 항상 양방향으로 연결한다.

- WHAT 사례: `System behind this`를 통해 적용된 문서·AI·운영 시스템으로 이동한다.
- HOW 페이지: `Applied in`을 통해 이 시스템이 사용된 제품 사례로 이동한다.

교차 링크는 단순 관련 글 추천이 아니다. “이 결과를 어떤 시스템이 가능하게 했는가”와 “이 시스템이 어디에서 실제로 쓰였는가”를 증명하는 문맥 링크다.

## 6. Shared HOW page contract

HOW I BUILD의 심층 페이지는 최소한 다음 계약을 따른다.

1. 한 문장의 thesis
2. 시스템 전체를 설명하는 visual 한 개
3. 적용 맥락 또는 사례
4. 실패, 변화, evolution 중 하나
5. 핵심 artifact 최대 세 개
6. 현재의 boundary와 maintenance rule

나머지 artifact는 library 또는 appendix로 보낸다. 세 페이지 모두 같은 템플릿처럼 보이게 만들지 말고, 각 주제에 맞는 signature interaction을 하나만 선택한다.

## 7. Documentation System

첫 화면은 Markdown 파일 목록이 아니라 정보 구조를 보여준다.

Knowledge map은 현재 프로젝트 information map의 계층을 보존하되, 중요한 노드마다
`QUESTION / AUTHORITY / UPDATE WHEN`을 함께 제공한다. 이 세 항목이 폴더명보다 먼저
“어떤 질문을 어디서 다시 찾고, 무엇이 바뀌면 갱신하는가”를 설명해야 한다.

```text
What is true now?       → CURRENT
Why was it decided?     → DECISIONS
How do we run/recover?  → OPERATIONS
Where is it in code?    → CODEMAP
```

노드 사이의 선은 장식이 아니라 관계를 표현한다. 가능한 edge semantics는 `canonical`, `derived from`, `evidence for`, `update trigger`다. 현재 공개 map의
Deployment / Recovery / Known Issues는 Architecture 아래의 기존 관계를 유지한다.
OPERATIONS라는 새 상위 분류로 map을 전면 재작성하기보다 각 노드 annotation에서
operational authority를 명시하는 것을 우선한다.

Artifact shelf의 각 항목은 다음 metadata를 가진다.

- WHY: 왜 필요한가
- AUDIENCE: 누가 읽는가
- BOUNDARY: 무엇의 authoritative source인가
- MAINTENANCE: 언제 갱신하는가
- SAMPLE: 독립적으로 재구성한 public-safe excerpt

대표 artifact는 정확히 세 개를 우선한다.

- Project Map: orientation / navigation
- Architecture: structure / boundary
- Recovery: failure / response

Data Pipeline, API Map, Deployment 등은 `DOCUMENT LIBRARY`의 secondary index로 보낸다.
문서 수가 아니라 서로 다른 documentation responsibility가 primary shelf의 선택 기준이다.

Documentation Evolution은 동일한 크기의 timeline item을 반복하지 않는다. 하나의
information structure가 압력에 따라 확장되는 `growing structure`로 보여준다.
각 단계는 다음 순서로 읽혀야 한다.

`Pressure → Change → Trade-off → Current rule`

예: 시스템 확장, 운영 문제, 코드 복잡도, stale context 같은 압력이 문서 구조와 갱신 규칙을 어떻게 바꾸었는지 설명한다. “처음부터 완벽했다”는 서사를 만들지 않는다.
공개 가능한 구체 signal은 확인된 evidence가 있을 때만 추가하고, 근거가 없으면 pressure
label만 유지한다.

`SAME CHANGE.`는 다섯 번째 evolution 단계가 아니라 `CURRENT RULE`이다. 실행 문법은
`CHANGE → CONTEXT → VERIFY`이며, boundary / route / dependency / schema / major data
flow가 바뀌면 Architecture / domain docs / Codemap 중 해당 authoritative context를 같은
변경에서 갱신하고 code / test / current state로 확인한다. 이어지는
`DOCUMENTATION IS CONTEXT, NOT PROOF.`가 문서와 구현 evidence의 경계를 고정한다.

## 8. AI-native Engineering

도구 로고 모음이 아니라 AI가 일할 환경과 검증 구조를 보여준다.

```text
CONTEXT
→ SCOPE
→ ISOLATE
→ BUILD
→ VERIFY
→ HUMAN DECISION
→ CANONICALIZE
```

- CONTEXT: AI가 다시 찾아야 할 프로젝트 맥락
- SCOPE: 작업 범위, 제약, known issue
- ISOLATE: 변경과 환경의 경계
- BUILD: 구현 후보 생성
- VERIFY: test, code, data, runtime 근거 확인
- HUMAN DECISION: 채택, 수정, 보류 판단
- CANONICALIZE: 확인된 변경을 문서와 codemap에 반영

항상 `AI candidate`, `human-confirmed`, `canonical` 상태를 구분한다.

Incident는 다음 구조로 설명한다.

`Symptom → Competing hypotheses → Evidence → Decision → Rule added`

가장 중요한 질문은 “AI를 어떤 도구로 썼는가”가 아니라 “AI나 초기 가설이 틀렸을 때 어떻게 알아차렸는가”다.

## 9. Technical Writing Library

Technical Writing은 긴 case study보다 문서 자체가 주인공인 gallery로 만든다.

기본 유형:

- Architecture: explain a system
- API Map: explain a contract
- Deployment Runbook: guide an operation
- Recovery Guide: guide a failure
- Decision Record: explain why

문서 상세는 Audience, Purpose, Design decision, reconstructed excerpt, Maintenance rule을 보여준다. fake Notion 또는 fake IDE 프레임을 만들지 않는다. 좋은 typography의 raw Markdown rendering을 우선한다.

최소 한 번은 `same system, different audience` 비교를 제공한다. 같은 내용을 개발자, 운영자, 의사결정자에게 어떻게 다른 해상도로 전달했는지 보여주는 것이 글쓰기 능력의 더 강한 증거다.

## 10. Interaction and routing

- 페이지마다 signature interaction은 하나만 둔다.
- scroll-jacking을 사용하지 않는다.
- hover-only 정보 전달을 금지한다. hover에는 focus/click 대응이 있어야 한다.
- `prefers-reduced-motion`에서 의미 손실 없이 동작해야 한다.
- 복잡한 map은 모바일에서 선형 목록 또는 단계형 disclosure로 전환한다.
- drawer는 빠른 preview에만 사용한다.
- 공유하거나 다시 찾을 가치가 있는 artifact는 고유 URL의 상세 페이지를 가진다.
- 모바일에서는 상세 artifact를 drawer보다 전체 페이지로 연다.
- 아직 존재하지 않는 route를 가리키는 가짜 CTA를 만들지 않는다.

## 11. Visual language

전체 사이트는 warm off-white, deep jade, editorial typography를 공유한다.

- Product pages: UI, workflow, state transition이 주인공
- System pages: diagram, artifact, annotation, timeline이 주인공
- Home: 두 시각 언어를 한 화면에서 대비하고 연결

제한된 카드, 충분한 여백, 명확한 선과 위계를 사용한다. generic consulting dashboard, 과도한 badge, 장식용 그래프를 피한다.

## 12. Artifact and claim safety

공개 artifact는 원문을 가린 결과가 아니라 공개 목적에 맞게 **독립적으로 재구성한 예시**여야 한다.

- 실제 조직, 고객, 인물, 저장소, commit, endpoint, infrastructure identifier를 사용하지 않는다.
- 내부 topology를 그대로 복원하지 않는다.
- 원문의 명사만 치환한 1:1 사본을 만들지 않는다.
- 구현, 배포, runtime, 반복 사용, adoption을 서로 다른 claim으로 유지한다.
- 측정하지 않은 효율, 정확도, 생산성 향상을 주장하지 않는다.
- evidence가 없으면 unknown 또는 planned로 표시한다.
- AI 생성과 human-confirmed 결과를 구분한다.

각 public artifact에는 가능하면 작은 boundary metadata를 둔다: reconstructed 여부, 설명 범위, authoritative하지 않은 대상, 마지막 검토 상태.

## 13. Home entry decision

Home은 다음 한 가지 일을 한다.

> 방문자가 첫 화면에서 제품 결과와 제작 시스템을 구분하고, 원하는 깊이로 들어가게 한다.

Home cover의 현재 visual decision:

- Home cover는 English-first다. 전체 case study의 언어 정책을 고정하지 않는다.
- desktop 첫 화면은 near-black과 deep jade가 정확히 50:50으로 만나는 하나의 full-viewport poster다.
- giant `WHAT | HOW` lockup이 primary identity이며, 두 단어는 중앙 seam을 향한다.
- display type은 T2 / Roboto Flex를 단어별로 optical tuning한 설정을 기본으로 사용한다.
- `01 / WHAT I BUILT`와 `02 / HOW I BUILD`는 작은 utility metadata로만 남긴다.
- 설명문, CTA, connector, `CASE ↔ SYSTEM` badge, cross-relation graph를 Home cover에 두지 않는다.
- hover/focus는 선택한 면을 55:45까지만 이동시키고 해당 index만 공개한다. 반대쪽 giant word와 label은 context로 유지한다.
- narrow portrait mobile에서는 한 viewport 안에 WHAT과 HOW를 함께 유지하되,
  near-black top-left와 deep jade bottom-right를 비대칭 diagonal seam으로 나눈다.
  typography는 회전하거나 잘리지 않는 별도 content layer에 수평으로 배치한다.
- mobile tap 또는 keyboard activation은 선택한 field를 약 60~65%까지 확장하고
  해당 index만 공개한다. 같은 field를 다시 선택하면 50:50 default로 돌아간다.
  충분히 넓은 화면과 landscape에서는 desktop vertical seam을 유지한다.
- 실제 route가 있는 `Documentation System`만 연결한다. 아직 존재하지 않는 나머지 index는 visual prototype으로 남긴다.
- 현재는 Home cover 목업이며 실제 사례, 성과, adoption을 암시하지 않는다.

Typography study와 선택안 snapshot은 `docs/mockups/README.md`에서 관리한다.

## 14. Non-goals

- 내부 문서를 그대로 공개하는 문서 저장소
- 도구 사용 목록 중심의 AI 페이지
- 모든 HOW 주제를 같은 깊이로 양산하는 구조
- 제품 기능을 engineering practice처럼, 또는 practice를 fake product UI처럼 보이게 하는 것
- 검증되지 않은 성과 지표를 채우는 것
- 웹의 넓은 공간을 이유로 설명을 무제한 노출하는 것

## 15. Future-agent checklist

IA 또는 페이지를 추가·변경하기 전에 확인한다.

1. 이 콘텐츠는 WHAT과 HOW 중 어디에 속하는가?
2. 2초, 30초, 심층 탐색의 정보 위계가 있는가?
3. 이 페이지의 signature visual과 interaction은 정확히 무엇인가?
4. 반대 트랙으로 돌아가는 근거 있는 cross-link가 있는가?
5. artifact가 독립적으로 재구성되었는가?
6. 구현·배포·runtime·사용·adoption claim을 구분했는가?
7. AI candidate와 human-confirmed 결과를 구분했는가?
8. 모바일, keyboard, reduced motion에서 같은 의미를 얻을 수 있는가?
9. 공유할 artifact에 고유 route가 필요한가?
10. 이 변경이 이 문서의 accepted decision과 충돌한다면 문서부터 갱신했는가?
