# Portfolio Atlas

개인 엔지니어링 포트폴리오를 위한 React + Vite + TypeScript + React Router 프로젝트입니다.

## Requirements

- Node.js 20.19+ 또는 22.12+
- npm

## Commands

```bash
npm install
npm run start
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Structure

```text
src/
├── app/
│   └── router.tsx                    # route 등록 단일 진입점
├── components/
│   ├── home/                         # Home cover와 WHAT / HOW index
│   ├── product-case/                 # WHAT 페이지의 공통 inspection 문법
│   └── */                            # HOW / WHAT별 presentation component
├── content/
│   ├── content-types.ts              # 공개 콘텐츠 타입 계약
│   ├── home.ts                       # Home 공개 콘텐츠
│   ├── what-features.ts              # WHAT route index
│   └── fixtures/                     # runtime private source가 없는 공개 fixture
├── routes/
│   ├── HomeRoute.tsx                 # `/` Home route
│   └── *Route.tsx                    # URL 단위 HOW / WHAT route
├── styles/
│   ├── tokens.css                    # 디자인 토큰 단일 원본
│   └── *.css                         # 페이지별 스타일
├── App.tsx                            # 공통 레이아웃과 Outlet
├── App.css                            # 페이지 레이아웃 스타일
├── index.css                          # 전역 기본 스타일
└── main.tsx                           # React 진입점
```

실제 경력 근거를 콘텐츠로 추가하기 전에는 `AGENTS.md`와
`docs/public-safety.md`의 공개 안전 규칙을 먼저 확인합니다.

`npm run start`와 `npm run dev`는 모두 Vite 개발 서버를 실행합니다.

## Product decisions

- [`docs/atlas-experience-strategy.md`](docs/atlas-experience-strategy.md):
  WHAT I BUILT / HOW I BUILD 정보 구조, 페이지 역할, 상호 링크, Home 진입점의 기준
- [`docs/documentation-system-content-audit.md`](docs/documentation-system-content-audit.md):
  Documentation System 공개 콘텐츠의 근거·축약·공개 경계와 scrollytelling 장면 계약
- [`docs/technical-writing-content-audit.md`](docs/technical-writing-content-audit.md):
  Technical Writing의 독자·목적·행동·위험별 writing decision과 공개 경계
- [`docs/security-operations-content-audit.md`](docs/security-operations-content-audit.md):
  Security & Operations의 권한·배포·복구 decision과 확인된 운영 경계

## Git conventions

작업 브랜치와 PR 제목은 [`docs/git-conventions.md`](docs/git-conventions.md)를 따릅니다.
브랜치는 `<type>/<kebab-case-description>`, PR 제목은 Conventional Commit 형식을 사용하며
PR 생성 시 GitHub Actions가 두 규칙을 검사합니다.
