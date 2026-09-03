# Git Branch and Pull Request Conventions

- Status: Accepted
- Decided: 2026-09-03
- Canonical for: branch names, pull request titles, merged-branch cleanup

이 저장소의 Git 이름은 작업 성격과 변경 범위를 히스토리에서 바로 식별할 수 있어야 한다.

## Branch name

```text
<type>/<kebab-case-description>
```

허용 type:

- `feat`: 사용자가 보거나 탐색할 수 있는 기능
- `fix`: 잘못된 동작 수정
- `docs`: 문서만 변경
- `chore`: 제품 동작을 바꾸지 않는 저장소 유지보수
- `refactor`: 외부 동작을 유지하는 코드 구조 변경
- `test`: 테스트만 변경
- `ci`: GitHub Actions, 배포 자동화 등 CI/CD 변경

규칙:

- description은 영문 소문자, 숫자와 hyphen만 사용한다.
- underscore, 공백, 대문자를 사용하지 않는다.
- `feature/*`, `ops/*`처럼 허용 목록 밖의 alias를 만들지 않는다.
- 작업 범위가 바뀌어 type이 더 이상 맞지 않으면 PR 전에 브랜치 이름을 바꾼다.
- 하나의 브랜치가 서로 다른 type의 독립 작업을 함께 소유하지 않게 한다.

예시:

```text
feat/documentation-system-codemap
fix/mobile-navigation-focus
docs/public-safety-boundary
ci/github-pages-deployment
```

## Pull request title

```text
<type>(optional-scope): imperative summary
```

예시:

```text
feat(codemap): add public dependency explorer
fix(home): preserve mobile keyboard focus
docs: define public artifact boundary
ci: configure GitHub Pages deployment
```

PR title의 type은 브랜치 type과 같은 의미를 사용한다. scope는 선택 사항이며 소문자
kebab-case로 작성한다.

## Base and cleanup

- 기본 PR base는 `main`이다.
- merge된 작업 브랜치는 후속 작업에 재사용하지 않는다.
- merge와 배포 상태를 확인한 뒤 원격 작업 브랜치를 삭제한다.
- 과거 PR의 branch 이름은 역사적 사실이므로 rewrite하지 않는다.

## Enforcement

`.github/workflows/conventions.yml`이 PR의 head branch와 제목을 검사한다. 문서의 규칙과
workflow가 어긋나면 이 문서를 먼저 갱신하고 같은 변경에서 workflow를 맞춘다.
