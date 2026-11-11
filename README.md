# 바른골프피팅 블로그

HTML, CSS, JavaScript로 만든 반응형 블로그입니다. Sites를 사용하지 않으며 별도 빌드나 패키지 설치가 필요하지 않습니다.

## GitHub Pages 배포

1. 이 소스를 `https://github.com/brgolf/blog` 저장소의 `main` 브랜치로 push합니다.
2. GitHub 저장소의 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택합니다.
3. **Actions → Deploy blog to GitHub Pages → Run workflow**를 실행합니다. 이후에는 main에 push할 때 자동 배포됩니다.
4. 배포 완료 후 Actions 실행 결과 또는 Settings → Pages에 표시되는 URL을 엽니다. 기본 예상 주소는 `https://brgolf.github.io/blog/`이며 실제 주소는 GitHub 설정에 따릅니다.

```powershell
git add index.html style.css app.js README.md .gitignore .github/workflows/pages.yml
git commit -m "Add Bareun Golf blog with GitHub Pages deployment"
git branch -M main
git push -u origin main
```

기존 원격 저장소에 커밋이 있으면 먼저 내용을 확인하고 병합하세요. 강제 push는 필요하지 않습니다.

## 미리보기

`index.html`을 브라우저에서 열거나, Python 설치 환경에서 `python -m http.server 8000` 실행 후 `http://localhost:8000`에 접속하세요.

## 글 수정

`app.js`의 `posts` 배열에서 글을 추가·수정합니다. `id`는 중복 없이 영문과 하이픈으로 작성하세요. `category`, `title`, `description`, `date`, `body`가 분류·제목·설명·표시 날짜·본문입니다. 본문 문단은 `\n\n`으로 구분합니다. `cover`는 one부터 six까지, `word`는 표지의 영문 문구입니다. 현재 템플릿 문자열로 출력되는 제목·설명 등은 신뢰할 수 있는 작성자만 편집해야 합니다. 방문자 입력이나 외부 API 데이터를 바로 넣지 마세요.

현재 글 6개와 날짜는 모두 레이아웃 확인용 예시입니다. 네이버 원문을 복제한 콘텐츠가 아닙니다. 실제 게시 전 예시 글과 예시 안내를 수정하세요. 네이버 원문 링크는 제공된 주소를 사용했습니다.

`index.html`에서 소개와 네이버 링크를, `style.css`의 `:root`에서 주요 색상을 수정할 수 있습니다. Google Fonts를 사용하며 불러오지 못하면 시스템 글꼴로 표시됩니다. 일러스트는 CSS로 구현해 외부 이미지가 필요하지 않습니다.

## 범위

글 목록, 검색, 카테고리 필터, 해시 URL 기반 상세 화면을 제공합니다. 글 작성 관리자, 댓글, 로그인, 서버 저장 기능은 포함하지 않습니다. 글 편집은 소스 수정 후 push로 반영합니다.
