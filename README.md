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
