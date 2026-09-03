# Documentation System Language Policy

- Status: Accepted
- Decided: 2026-09-03
- Scope: `HOW I BUILD → Documentation System`
- Primary audience: 한국 채용 담당자와 실무 면접관
- Canonical for: Documentation System 페이지의 문구 작성과 번역 판단

이 페이지는 한국어를 기본 설명 언어로 사용한다. 영어는 국제화된 전체 문장을
유지하기 위한 기본값이 아니라, editorial identity와 실제 engineering artifact의
성격을 보존하는 제한된 시각 언어로 사용한다.

## 1. Core rule

> 한국어가 의미 전달을 맡고, 영어는 대형 그래픽 타이포그래피와 기술 고유어,
> 실제 artifact 표현을 맡는다.

현재는 한·영 토글을 추가하지 않는다. 동일한 긴 콘텐츠를 두 벌로 운영하기보다
한국어 독자의 읽기 피로를 먼저 줄이고, 실제 영문 독자 동선이 필요해질 때 사이트
전체 locale 정책으로 확장한다.

## 2. Keep in English

- 대형 display headline: `DOCUMENTATION SYSTEM`, evolution scene title,
  `DOCUMENTATION IS CONTEXT, NOT PROOF.`
- 체계를 식별하는 짧은 고유 명칭: `CURRENT`, `DECISIONS`, `CODEMAP`,
  `PROJECT MAP`, `ARCHITECTURE`, `RECOVERY`
- 기술 고유어와 표준 약어: ERD, ADR, API, README, PostgreSQL, LikeC4, HTML,
  JSON, LOCK
- reconstructed artifact의 문서 제목, 경로, code-like excerpt
- 그래픽 내부의 짧은 utility label과 시각적 좌표 역할을 하는 영문 label

영문 대형 제목은 번역 가능한 본문이 아니라 현재 layout과 typography를 구성하는
그래픽 요소다. 한글을 같은 CSS에 단순 치환하지 않는다.

## 3. Write in Korean

- thesis, summary, scope와 boundary 설명
- Knowledge Map의 question, authority, update rule
- artifact의 소개, 요약, 필요 이유, 독자, boundary, maintenance
- artifact responsibility 명칭
- evolution의 takeaway, change, evidence, boundary
- current rule의 설명
- principle 아래의 설명, claim boundary, 미검증 항목
- 다음 페이지의 소개와 현재 상태

한국어 문장 안의 불필요한 영어 명사는 자연스러운 한국어로 바꾼다. 단, 기술적으로
고유한 이름이나 의미 경계를 더 정확하게 만드는 용어는 유지한다.

## 4. Artifact naming rule

- artifact 고유 제목은 영어를 유지한다: `PROJECT MAP`, `ARCHITECTURE`,
  `RECOVERY`, `DATA PIPELINE`, `API MAP`, `CODEMAP`.
- artifact responsibility는 한국어로 쓴다: `탐색 안내 / 진입 경로`,
  `구조 / 경계`, `운영 위험 / 대응`.
- 섹션 display title은 `문서 아카이브`를 사용한다.
- reconstructed excerpt는 실제 문서 형식을 보여주는 표본이므로 영어와 code-like
  표현을 유지한다.

## 5. Do not

- 같은 의미를 한국어와 영어 문장으로 나란히 반복하지 않는다.
- 한 문장 안에서 번역 가능한 일반 명사를 습관적으로 영어로 섞지 않는다.
- 모바일 공간에 맞추기 위해 한글 본문을 과도하게 축약하지 않는다.
- 대형 영문 제목을 기존 display style 그대로 한글로 치환하지 않는다.
- 페이지 단위 임시 토글을 만들지 않는다. 향후 다국어 지원은 URL, `html lang`,
  metadata, 접근성 label을 포함하는 사이트 전체 locale 기능으로 설계한다.

## 6. QA contract

문구 변경 후 1440px, 768px, 390px에서 다음을 확인한다.

- 대형 영문 headline의 줄바꿈과 비대칭 구도가 유지되는가
- 한글 설명이 잘리거나 지나치게 긴 행으로 남지 않는가
- artifact responsibility가 index와 library row에서 충돌하지 않는가
- Knowledge Map의 고정 node 위치와 label 폭이 유지되는가
- 페이지 전체에 가로 overflow가 생기지 않는가
- 공개 금지 정보나 검증되지 않은 효과 주장이 추가되지 않았는가
