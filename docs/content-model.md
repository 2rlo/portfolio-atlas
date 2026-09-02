# Content Model

공개 콘텐츠의 타입 계약은 `src/content/content-types.ts`에 둔다. Route와 UI는
private source를 해석하지 않고, `src/content`에서 정규화되고 타입 검증된 값만
렌더링한다.

## Layers

1. `content-types.ts`: Home, public fixture, Documentation System의 계약
2. `home.ts`: Home의 두 track과 공개 navigation 데이터
3. `fixtures/`: 독립 작성한 synthetic 또는 reconstructed public-safe 콘텐츠
4. `routes/`와 `components/`: 콘텐츠의 표현과 interaction

## Documentation System

Knowledge Map은 question, authority, update trigger를 분리한다. Artifact는 why,
audience, boundary, maintenance, evidence, excerpt를 가진다. Evolution scene은
pressure, structure change, concrete evidence, boundary와 접근 가능한 visual
summary를 함께 가진다.

콘텐츠를 확장할 때는 타입을 먼저 갱신하고, private source runtime dependency가
생기지 않았는지 확인한다.
