# Public Safety

Portfolio Atlas의 브라우저 번들과 공개 저장소에는 synthetic,
reconstructed, sanitized 콘텐츠만 둔다.

## Exclude

- 실제 회사·고객·프로젝트·인물 식별정보
- 이메일, 계정, tenant ID, 내부 repository 이름과 commit SHA
- 실제 endpoint, domain, IP, storage·database identifier
- secret, token, credential, private local path
- 내부 대화·업무 데이터·문서 원문의 1:1 치환본

## Claim boundary

- 구현, 배포, runtime 동작, 반복 사용, adoption을 각각 구분한다.
- 측정하지 않은 생산성·정확도·시간 단축을 주장하지 않는다.
- 확인되지 않은 운영 성숙도와 자동화를 암시하지 않는다.
- 근거가 부족하면 public fixture에 추가하지 않고 TODO 또는 unknown으로 둔다.

## Publishing rule

`LOCAL_SOURCES.md`와 그 안의 경로는 사실 확인에만 사용한다. 애플리케이션은
해당 파일을 import하거나 runtime에 읽지 않는다. 공개 콘텐츠를 추가한 뒤에는
식별자·경로·원문 잔존 여부를 별도로 검사한다.
