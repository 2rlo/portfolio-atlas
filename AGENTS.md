# AGENTS.md

## Project

Personal Engineering Atlas / Portfolio Website

이 저장소는 개인 포트폴리오 웹사이트다.

실제 업무 경험을 기반으로 하지만 공개 사이트이므로

회사 내부 정보와 원본 업무 데이터를 직접 노출하지 않는다.



## Goal

보여주려는 것은 단순 기능 목록이 아니라:

- 어떤 문제를 발견했는가
- 왜 그렇게 설계했는가
- 어떤 대안을 검토했는가
- 무엇이 실패하거나 바뀌었는가
- 어떻게 제품과 운영으로 연결했는가



## Content Architecture

IA, Home, case study, artifact UI를 변경하기 전에
`docs/atlas-experience-strategy.md`를 읽는다.

이 문서는 두 트랙의 위계, HOW I BUILD 페이지 역할, cross-link,
progressive disclosure, interaction, public artifact 기준의 canonical decision이다.

모든 공개 페이지와 artifact의 문구 작성, 용어 선택, 번역 판단은
`docs/atlas-language-policy.md`를 따른다. 이 정책은 Documentation System에만
국한되지 않는다.

### WHAT I BUILT

실제 제품/기능 중심

- AI workflow / Reporting
- Feature Validation
- Context / RAG
- QA / Schedule
- Permissions

### HOW I BUILD

일하는 방식 / engineering system

- Documentation System
- AI-native Engineering
- Technical Writing
- AI Trust
- Security / Governance
- Operations / Reliability



## Repository Architecture

- `src/app/router.tsx`: React Router 설정의 단일 진입점. 라우터 인스턴스는 React 트리 밖에서 한 번만 생성한다.
- `src/routes/*Route.tsx`: URL 단위 페이지 컴포넌트. 현재 공개 route는 Home(`/`)과 Documentation System(`/how/documentation-system`)이다.
- `src/styles/tokens.css`: 색상, 타이포그래피, 레이아웃 토큰의 단일 원본. 컴포넌트 CSS에 새 brand color를 직접 추가하지 않는다.
- `src/content/content-types.ts`: 공개 콘텐츠와 fixture가 따라야 하는 타입 계약.
- `src/content/home.ts`: Home route가 렌더링하는 공개용·타입 검증 콘텐츠.
- `src/content/fixtures/`: 공개 가능한 synthetic fixture만 둔다. `LOCAL_SOURCES.md`나 private source를 import하지 않는다.

Route는 콘텐츠 파일을 직접 해석하지 않는다. `src/content`에서 공개용으로 정규화되고 타입 검증된 값만 사용한다.



## Public Safety — Non-negotiable

절대 공개하지 않는다:

- 실제 회사/고객/프로젝트/인물 식별정보
- 실제 이메일, 계정, tenant ID
- 실제 repo 이름, commit SHA, private source path
- 실제 Teams/Notion/QA/worklog/chat 원문
- 실제 endpoint/domain/IP/S3/DB identifier
- secret / token / credential
- 내부 topology를 그대로 재현한 구조

공개 예시는 synthetic / reconstructed / sanitized data만 사용한다.

실제 경험을 바탕으로 한 경우에도

원문의 명사만 바꾼 1:1 복사는 하지 않는다.



## Claim Rules

- 구현한 것과 계획한 것을 구분한다.
- production deployment와 adoption을 동일시하지 않는다.
- 측정하지 않은 생산성/정확도 향상을 주장하지 않는다.
- AI 생성 결과와 human-confirmed 결과를 구분한다.
- 모르면 추정하지 않고 unknown으로 둔다.



## Design Direction

- warm off-white
- deep jade
- editorial / asymmetric layout
- generous whitespace
- strong typography
- restrained cards
- no generic consulting-dashboard aesthetic
- product pages: UI / workflow 중심
- system pages: diagram / artifact / annotation / timeline 중심



## Working Rule

### Git naming — mandatory gate

코드나 문서를 수정하기 전에 `git branch --show-current`로 현재 브랜치를 확인한다.
`main`이 아닌 작업 브랜치는 반드시 `docs/git-conventions.md`를 따른다.

- 형식: `<type>/<kebab-case-description>`
- 허용 type: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`
- `feature/*`, `ops/*`, underscore가 포함된 이름은 사용하지 않는다.
- 현재 작업 범위가 branch type과 달라졌다면 계속 수정하기 전에 새 이름을 제안하거나 변경한다.
- PR 제목은 Conventional Commit 형식을 따른다.

완료 보고 전에 branch 이름과 PR 제목을 다시 확인한다. 상세 규칙과 예시는
`docs/git-conventions.md`가 canonical source다.

변경 전:

1. `docs/atlas-experience-strategy.md`의 accepted decision 확인
2. 관련 페이지/컴포넌트 확인
3. 기존 design token과 content pattern 확인
4. public-safety boundary 확인

변경 후:

1. typecheck
2. lint/test
3. build
4. responsive 확인
5. broken links 확인
6. 공개 금지 정보가 들어가지 않았는지 확인



## Private source material

If `LOCAL_SOURCES.md` exists, read it before evidence-based content work.

It contains local paths to private evidence and design references.

Rules:

- never commit `LOCAL_SOURCES.md`

- never expose its paths publicly

- never make the site depend on those files at runtime

- private sources are evidence only

- public content must be sanitized/reconstructed before entering src/content

- if the local source is unavailable, do not invent missing evidence
