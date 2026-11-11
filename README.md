# 바른골프피팅 제품·작업 블로그

HTML/CSS/JavaScript 정적 사이트로 GitHub Pages에 배포합니다. 제품 탐색 → 상세 사진·사양 → 전화 문의(0507-1390-5980) 흐름입니다.

## 글과 사진 등록

1. 사진 파일을 `assets/`에 넣습니다. 영문 파일명(예: `driver-face.jpg`)을 권장합니다.
2. `content.js`의 `blogContent` 배열에서 글을 추가하거나 기존 예시를 수정합니다.
3. `sample: false`를 지정하고 실제 확인한 내용만 채웁니다. 사용하지 않는 예시는 배열에서 삭제합니다.

```javascript
{
  id: 'my-driver', // 고유 주소. 영문·숫자·하이픈 권장
  type: '신제품', // 신제품 / 제품정보 / 작업사례
  sample: false,
  title: '실제 제품명과 소개 제목',
  description: '목록에서 보여줄 짧은 소개',
  brand: '브랜드명',
  model: '모델명',
  date: '2026.11.11',
  specs: [['제품명', '실제 모델명'], ['주요 사양', '확인된 사양'], ['재고·가격', '전화 문의']],
  photos: [
    {src: 'assets/driver-face.jpg', alt: '제품 페이스 정면'},
    {src: 'assets/driver-sole.jpg', alt: '솔과 모델 표기'}
  ],
  body: '제품 또는 작업 소개 본문입니다.\n\n다음 문단입니다.'
}
```

사진 배열 순서대로 상세 갤러리에 표시하며 첫 사진을 목록 표지로 사용합니다. 홈페이지 대표 사진은 사진이 등록된 첫 글에서 가져옵니다. 사진을 누르면 확대되고 Esc 또는 닫기 버튼으로 닫습니다. 제품은 전체·정면·솔·모델 표기 등, 작업은 작업 전·과정·완성 사진을 추천합니다. 실사처럼 오해할 수 있는 대체 사진은 넣지 않았으며 현재 6개 글은 구성 예시입니다.

브랜드·모델·사양·본문으로 검색할 수 있습니다. 상담 버튼은 상단, 상세 하단, 소개 영역과 모바일 하단에 있으며 `tel:050713905980`으로 연결합니다. 전화번호 변경 시 `index.html`과 `app.js`를 함께 수정하세요. 실제 통화 연결은 방문자의 전화 앱에 따릅니다.

## 미리보기

`index.html`을 브라우저에서 열거나 CMD에서 아래를 실행합니다(Python 설치 필요).

```cmd
python -m http.server 8000
```

브라우저에서 http://localhost:8000 으로 접속합니다.

## GitHub Pages 배포

저장소 Settings → Pages → Source에서 GitHub Actions를 선택합니다. main에 push하면 자동 배포됩니다. 필요하면 Actions에서 Deploy blog to GitHub Pages를 수동 실행합니다.

CMD:

```cmd
cd /d C:\Users\yhjok\Documents\Codex\2026-11-11\qmf
git add index.html style.css app.js content.js assets README.md .github/workflows/pages.yml
git commit -m "Make blog photo-led with product details and phone inquiries"
git push -u origin main
```

기본 예상 주소는 https://brgolf.github.io/blog/ 이며 최종 주소는 GitHub Pages 설정에서 확인하세요. 기존 원격 커밋이 있으면 확인 후 병합하고 강제 push하지 마세요.

외부 글꼴을 불러오지 못하면 시스템 글꼴로 표시합니다. 별도 서버·로그인·댓글·관리자 편집 기능은 없습니다. 소스 수정과 push로 콘텐츠를 갱신합니다. 네이버 글은 복사하지 않았습니다.

## 상담 전환 기능과 매장 안내

- 고민별 탐색은 `content.js`의 `inquiryTopics`에서 관리합니다. `postIds`에 관련 글 ID를 넣습니다.
- 글별 문의 문구는 글 종류에 따라 달라집니다. 샤프트처럼 호환성 상담이 필요하면 글에 `inquiryType: 'compatibility'`를 지정합니다.
- 실제 작업 글에는 `process: [{title: '작업 전', text: '확인한 내용', photo: {src: 'assets/before.webp', alt: '작업 전 모습'}}]`처럼 단계별 기록을 넣습니다. 예시 단계는 sample 글에만 나타납니다.
- 매장 주소·시간·주차·예약·지도·네이버 링크는 `siteSettings`에서 관리합니다. 네이버 링크는 사용자가 제공한 매장 홈으로 연결하며 그곳에서 예약 정보를 확인합니다. 휴무일은 확인되지 않아 표시하지 않습니다.
- 사진 객체에 `thumbnail: 'assets/thumb.webp'`를 추가하면 목록에서는 작은 이미지를 사용하고 상세·확대 화면에서는 원본을 사용합니다. 사진은 업로드 전에 적절한 크기로 줄이고 WebP 등으로 압축하세요. 대표 사진은 우선 로딩, 나머지는 지연 로딩합니다. 자동 이미지 압축 기능은 포함하지 않습니다.

## 문의 클릭 측정 (선택)

현재 `siteSettings.analyticsId`가 비어 있어 외부 분석 스크립트를 불러오거나 방문 데이터를 전송하지 않습니다. GA4 계정의 실제 측정 ID(`G-...`)를 설정하면 `phone_click` 이벤트에 `post_id`(글 ID)와 `placement`(버튼 위치)를 전송합니다. 보고서에서 활용하려면 두 매개변수를 이벤트 범위 맞춤 측정기준으로 등록하세요. 클릭은 실제 통화 연결이나 상담 완료를 뜻하지 않습니다.

페이지뷰는 해시 화면 전환 시 직접 전송합니다. 중복 집계를 막으려면 GA4 데이터 스트림의 향상된 측정에서 브라우저 방문 기록 변경에 따른 자동 페이지뷰를 꺼야 합니다. 설정은 [Google 공식 안내](https://developers.google.com/analytics/devguides/collection/ga4/views)를 참고하세요. 분석 도구 연결 없이도 `phone-inquiry` CustomEvent를 발생시키므로 기존 분석 도구와 연결할 수 있습니다. 현재 방문자 전체를 집계하는 대시보드는 없습니다.
