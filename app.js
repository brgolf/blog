// 예시 글입니다. 실제 게시글은 이 배열에서 추가하거나 수정하세요.
const posts = [
  {id:'start',category:'피팅 노트',title:'나에게 맞는 클럽, 어디서부터 시작할까?',description:'장비를 바꾸기 전, 먼저 살펴보면 좋은 나의 골프 이야기.',date:'2026.11.11',word:'Your fit.',cover:'one',body:'새로운 클럽을 고민할 때 가장 먼저 떠오르는 것은 브랜드나 디자인일지도 모릅니다. 하지만 출발점을 나의 경험에 두면 선택의 기준이 조금 더 선명해집니다.\n\n최근 라운드에서 어떤 샷이 편했고, 어떤 순간이 어려웠는지 적어보세요. 현재 사용하는 장비와 자주 느끼는 불편함을 함께 정리하면 상담에서 나누고 싶은 이야기를 구체적으로 만들 수 있습니다.\n\n이 공간에는 앞으로 바른골프피팅의 실제 상담과 피팅 이야기를 담을 예정입니다.'},
  {id:'bag',category:'장비 이야기',title:'골프백 속, 나만의 기준을 만드는 시간',description:'익숙한 장비를 다시 들여다보는 작은 기록 습관.',date:'2026.11.10',word:'In the bag.',cover:'two',body:'지금 골프백에 어떤 클럽이 들어 있나요? 자주 손이 가는 클럽과 망설이게 되는 클럽을 구분해 적어보는 것만으로도 자신의 플레이를 돌아볼 수 있습니다.\n\n이름과 스펙을 나열하기보다 어떤 상황에서 사용하는지, 어떤 느낌이 드는지를 자신의 말로 기록해보세요. 기록이 쌓이면 다음 장비를 선택할 때 던질 질문도 생깁니다.'},
  {id:'routine',category:'골프 일상',title:'다음 라운드를 기다리는 우리의 방식',description:'스코어 그 너머, 골프를 오래 즐기기 위한 작은 루틴.',date:'2026.11.09',word:'Slow golf.',cover:'three',body:'라운드를 마친 뒤 기억에 남는 것은 숫자만이 아닙니다. 기분 좋게 맞았던 한 번의 샷, 함께 걸었던 사람들, 잠깐 멈춰 바라본 풍경도 남습니다.\n\n그날의 좋은 장면 하나와 다음에 시도하고 싶은 것 하나를 적어두세요. 다음 라운드를 기대하게 만드는 나만의 기록이 됩니다.'},
  {id:'questions',category:'피팅 노트',title:'피팅 상담 전에 적어두면 좋은 질문들',description:'평소의 고민을 구체적인 대화로 바꾸어 보세요.',date:'2026.11.08',word:'Ask first.',cover:'four',body:'상담에서 무엇을 이야기해야 할지 막막하다면 평소 궁금했던 것을 먼저 메모해보세요.\n\n현재 장비에서 가장 편한 점은 무엇인가요? 어떤 상황에서 불편함을 느끼나요? 앞으로 어떤 골프를 즐기고 싶나요?\n\n정해진 답을 찾기보다는 나의 경험을 충분히 나누는 시간으로 준비해보세요.'},
  {id:'grip',category:'장비 이야기',title:'장비를 살펴보는, 라운드 후의 10분',description:'다음 만남을 위해 골프백을 천천히 정리하는 시간.',date:'2026.11.07',word:'Small care.',cover:'five',body:'라운드를 마치고 장비를 정리하는 시간도 골프의 일부입니다. 클럽의 상태를 확인하고 사용 중 느꼈던 점을 짧게 남겨보세요.\n\n제품별 관리 방법은 제조사의 안내를 확인하고, 손상이나 이상이 보인다면 사용 전에 전문가에게 점검을 요청하세요.\n\n작은 관찰이 다음 라운드를 준비하는 계기가 됩니다.'},
  {id:'welcome',category:'골프 일상',title:'바른골프피팅 저널을 시작합니다',description:'골퍼를 생각하는 마음과 일상의 이야기를 담을 공간.',date:'2026.11.06',word:'Hello, golf.',cover:'six',body:'바른골프피팅의 새로운 저널에 오신 것을 환영합니다.\n\n클럽과 골프에 관한 궁금증, 피팅 현장의 이야기, 일상에서 발견한 골프의 즐거움을 이곳에 담아가려고 합니다.\n\n현재 글들은 사이트 구성을 보여주는 예시 콘텐츠입니다. 실제 소식과 기존 게시글은 네이버 블로그에서 확인해주세요.'}
];
let category='전체';
const categories=['전체',...new Set(posts.map(p=>p.category))];
const filters=document.querySelector('#filters'), search=document.querySelector('#search');
function cover(p){return `<div class="cover cover-${p.cover}"><span class="cover-word">${p.word}</span><span class="cover-label">BAREUN GOLF JOURNAL</span></div>`;}
function render(){
  filters.innerHTML=categories.map(c=>`<button type="button" class="${category===c?'active':''}" aria-pressed="${category===c}" data-category="${c}">${c}</button>`).join('');
  const query=search.value.trim().toLocaleLowerCase();
  const results=posts.filter(p=>(category==='전체'||p.category===category)&&`${p.title} ${p.description} ${p.body}`.toLocaleLowerCase().includes(query));
  document.querySelector('#result-count').textContent=`${results.length}개의 이야기 · 예시 콘텐츠`;
  document.querySelector('#posts').innerHTML=results.length?results.map(p=>`<a class="post" href="#post/${p.id}">${cover(p)}<div class="post-meta"><span class="category">${p.category}</span><time>${p.date}</time></div><h3>${p.title}</h3><p>${p.description}</p><span class="read-time">이야기 읽기 ↗</span></a>`).join(''):'<p class="empty">검색 결과가 없습니다. 다른 검색어나 분류를 선택해보세요.</p>';
}
filters.addEventListener('click',e=>{const button=e.target.closest('button');if(button){category=button.dataset.category;render();}});
search.addEventListener('input',render);
function route(){
  const id=location.hash.startsWith('#post/')?location.hash.slice(6):null;
  const post=posts.find(p=>p.id===id), article=document.querySelector('#article');
  document.querySelector('#home').hidden=Boolean(id);article.hidden=!id;
  if(id){
    if(post){article.innerHTML=`<a class="back" href="#journal">← 전체 이야기로 돌아가기</a><p class="eyebrow">${post.category} · ${post.date}</p><h1>${post.title}</h1>${cover(post)}<div class="body"></div><p class="sample-note">사이트 구성을 위한 예시 글입니다. 실제 피팅 사례와 소식은 <a class="text-link" href="https://blog.naver.com/yhjo0720" target="_blank" rel="noopener noreferrer">네이버 블로그 ↗</a>에서 확인하세요.</p>`;article.querySelector('.body').textContent=post.body;document.title=`${post.title} | 바른골프피팅`;}
    else{article.innerHTML='<h1>글을 찾을 수 없습니다.</h1><a class="text-link" href="#journal">전체 이야기로 돌아가기</a>';document.title='글을 찾을 수 없습니다 | 바른골프피팅';}
    window.scrollTo(0,0);
  }else{document.title='바른골프피팅 | 골프를 바르게, 나답게';if(location.hash){requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());}}
}
document.querySelector('#year').textContent=new Date().getFullYear();
window.addEventListener('hashchange',route);render();route();
