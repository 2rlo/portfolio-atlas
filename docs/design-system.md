# Design System

Portfolio Atlas는 black, deep jade, warm cream의 큰 color field와 oversized
grotesk typography를 중심으로 하는 editorial system을 사용한다.

## Canonical tokens

색상, font family, page gutter와 최대 폭은 `src/styles/tokens.css`가 단일
원본이다. 새 brand color를 page CSS에 임의로 추가하지 않는다.

## Page grammar

- Home: full-viewport seam composition, T3 layout + T2 display typography
- Product pages: UI, workflow, state transition 중심
- System pages: diagram, artifact, annotation, timeline 중심
- Metadata: 작은 uppercase mono
- Structure: thin rules, asymmetric grid, generous negative space
- Motion: native scroll을 유지하고 opacity·small translate·rule growth만 절제해 사용

Rounded card grid, dashboard, glassmorphism, gradient, neon, terminal aesthetic,
decorative icon 중심의 구성을 피한다. `prefers-reduced-motion`에서도 같은 정보와
읽기 순서를 유지한다.
