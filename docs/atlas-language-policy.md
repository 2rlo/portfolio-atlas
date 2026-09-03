# Portfolio Atlas Language Policy

- Status: Accepted
- Decided: 2026-09-03
- Scope: Portfolio Atlas의 모든 공개 route, page, case study, artifact UI, 상태 화면, metadata와 접근성 문구
- Primary audience: 한국 채용 담당자와 실무 면접관
- Canonical for: 프로젝트 전체의 문구 작성, 용어 선택과 번역 판단

Portfolio Atlas는 한국어를 기본 설명 언어로 사용한다. 영어는 국제화된 전체 문장을
유지하기 위한 기본값이 아니라, editorial identity와 실제 engineering artifact의
성격을 보존하는 제한된 시각 언어로 사용한다.

## 1. Core rule

> 한국어가 의미 전달을 맡고, 영어는 대형 그래픽 타이포그래피와 기술 고유어,
> 실제 artifact 표현을 맡는다.

현재는 한·영 토글을 추가하지 않는다. 동일한 긴 콘텐츠를 두 벌로 운영하기보다
한국어 독자의 읽기 피로를 먼저 줄이고, 실제 영문 독자 동선이 필요해질 때 사이트
전체 locale 기능으로 확장한다.

## 2. Project-wide scope

이 정책은 Documentation System 한 페이지에만 적용하지 않는다. 다음 영역에서 새 문구를
작성하거나 기존 문구를 고칠 때 모두 따른다.

- Home의 navigation, index와 interaction guidance
- WHAT I BUILT의 제품 설명, workflow, 상태, 운영과 case study
- HOW I BUILD의 thesis, system explanation, evolution과 maintenance rule
- artifact shelf, detail page, reconstructed excerpt와 boundary metadata
- Work in Progress, empty state, unavailable route와 다음 탐색 안내
- 전역 navigation, button, link, dialog, form과 상태 문구
- page title, description 등 공개 metadata
- screen reader narrative, `aria-label`, 대체 텍스트와 기타 접근성 문구

Home의 giant `WHAT / HOW` cover처럼 canonical visual decision이 English-first인 영역은
예외다. 이 예외가 Home 아래의 설명문이나 다른 페이지 전체를 영어 우선으로 만들지는
않는다.

## 3. Korean prose rhythm

한국어 본문은 보고서식 일괄 `~다` 문체를 사용하지 않는다. 설명의 기능에 따라 짧은
평서문, 명사형, 질문형을 섞어 읽기 리듬을 만든다.

- 핵심 판단과 결과는 짧은 평서문으로 쓴다.
- label, pressure, responsibility, 상태와 단계명은 명사형으로 압축할 수 있다.
- 독자가 다음 맥락을 찾거나 구조를 탐색해야 할 때는 질문형을 사용한다.
- boundary와 claim 제한은 모호한 명사 나열보다 완결된 문장으로 분명하게 쓴다.
- 인접한 설명문이 같은 길이와 같은 종결형을 반복하지 않게 조정한다.
- 모든 문장을 억지로 명사형으로 바꾸거나 질문형을 장식적으로 사용하지 않는다.

문체 혼합은 내용을 가볍게 보이게 하기 위한 장식이 아니다. 질문은 탐색을 열고,
명사형은 구조를 빠르게 식별하며, 평서문은 판단과 경계를 닫는 역할을 맡는다.

## 4. Keep in English

- 대형 display headline과 visual lockup: `WHAT I BUILT`, `HOW I BUILD`,
  `DOCUMENTATION SYSTEM`, `DOCUMENTATION IS CONTEXT, NOT PROOF.`
- 체계를 식별하는 짧은 고유 명칭: `CURRENT`, `DECISIONS`, `CODEMAP`,
  `PROJECT MAP`, `ARCHITECTURE`, `RECOVERY`
- 기술 고유어와 표준 약어: ERD, ADR, API, README, PostgreSQL, LikeC4, HTML,
  JSON, LOCK
- reconstructed artifact의 문서 제목, 경로와 code-like excerpt
- diagram과 interaction 내부에서 시각적 좌표 역할을 하는 짧은 utility label
- 제품이나 도구의 공식 고유명

영문 대형 제목은 번역 가능한 본문이 아니라 현재 layout과 typography를 구성하는
그래픽 요소다. 한글을 같은 CSS에 단순 치환하지 않는다.

## 5. Write in Korean

- thesis, summary, scope와 boundary 설명
- 제품이 해결하는 문제, 사용자 흐름, 상태와 운영 설명
- case study의 문제, 판단, 대안, 변화, 결과와 현재 경계
- system map의 question, authority와 update rule
- artifact의 소개, 요약, 필요 이유, 독자, responsibility, boundary와 maintenance
- evolution의 pressure 설명, takeaway, change, evidence와 boundary
- current rule과 principle 아래의 설명
- 미검증 항목, WIP 상태와 다음 탐색 안내
- interaction instruction, 접근성 문구와 공개 metadata의 설명

한국어 문장 안의 불필요한 영어 일반 명사는 자연스러운 한국어로 바꾼다. 단, 기술적으로
고유한 이름이나 의미 경계를 더 정확하게 만드는 용어는 유지한다.

## 6. Artifact naming rule

- artifact 고유 제목은 영어를 유지할 수 있다: `PROJECT MAP`, `ARCHITECTURE`,
  `RECOVERY`, `DATA PIPELINE`, `API MAP`, `CODEMAP`.
- artifact responsibility는 한국어로 쓴다: `탐색 안내 / 진입 경로`,
  `구조 / 경계`, `운영 위험 / 대응`.
- reconstructed excerpt는 실제 문서 형식을 보여주는 표본이므로 영어와 code-like
  표현을 유지할 수 있다.
- 실제 원문을 연상시키는 명칭은 번역 여부와 관계없이 사용하지 않는다. 공개 artifact는
  독립적으로 재구성한다.

## 7. Terminology and claim discipline

- 같은 개념은 페이지가 달라져도 같은 이름을 사용한다.
- implementation, deployment, runtime, use, adoption을 하나의 성과 표현으로 합치지 않는다.
- AI candidate, human-confirmed와 canonical 상태를 구분한다.
- 측정하지 않은 개선 수치나 사용자 효과는 자연스러운 문장으로 보이더라도 추가하지 않는다.
- `unknown`, `planned`, `partial`, `temporary`, `risk` 같은 상태 경계는 번역 때문에
  약해지지 않게 한다.

## 8. Do not

- 같은 의미를 한국어와 영어 문장으로 나란히 반복하지 않는다.
- 한 문장 안에서 번역 가능한 일반 명사를 습관적으로 영어로 섞지 않는다.
- 모든 한국어 본문을 동일한 길이, 동일한 구조와 `~다` 종결형으로 정렬하지 않는다.
- 명사형을 이어 붙여 책임 주체나 인과관계를 숨기지 않는다.
- 질문형을 답이 필요 없는 장식용 headline으로 남발하지 않는다.
- 모바일 공간에 맞추기 위해 한글 본문의 의미 경계를 과도하게 축약하지 않는다.
- 대형 영문 제목을 기존 display style 그대로 한글로 치환하지 않는다.
- 페이지 단위 임시 언어 토글을 만들지 않는다.

향후 다국어 지원은 URL, `html lang`, metadata, 접근성 label을 포함하는 사이트 전체
locale 기능으로 설계한다.

## 9. QA contract

문구 변경 후 해당 route를 1440px, 768px, 390px에서 확인한다.

- 대형 영문 headline의 줄바꿈과 비대칭 구도가 유지되는가
- 한국어 본문이 같은 종결형을 기계적으로 반복하지 않는가
- 평서문, 명사형, 질문형이 각 설명의 기능과 맞는가
- 한글 설명이 잘리거나 지나치게 긴 행으로 남지 않는가
- navigation, button, status와 accessibility label의 용어가 일치하는가
- artifact responsibility가 index와 library row에서 충돌하지 않는가
- diagram과 map의 고정 node 위치가 문구 길이 때문에 무너지지 않는가
- 페이지 전체에 가로 overflow가 생기지 않는가
- 공개 금지 정보나 검증되지 않은 효과 주장이 추가되지 않았는가
