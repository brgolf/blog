const posts=blogContent;
const phone='050713905980';
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeImage(src){return typeof src==='string'&&/^(assets\/[\w./-]+|https:\/\/[^\s"<>]+)$/.test(src)?src:'';}
function photos(p){return (p.photos||[]).filter(photo=>safeImage(photo.src));}
function placeholder(p,extra=''){return `<div class="photo-placeholder ${extra}"><span class="placeholder-icon" aria-hidden="true">＋</span><span>${esc(p.type)} 사진 등록 예정</span><small>실제 제품·작업 사진을 준비하고 있습니다</small></div>`;}
function imageMarkup(photo,extra=''){return `<img class="${extra}" src="${esc(safeImage(photo.src))}" alt="${esc(photo.alt)}" loading="lazy">`;}
function cover(p){const list=photos(p);return `<div class="photo-cover">${list.length?imageMarkup(list[0]):placeholder(p)}<span class="photo-badge">${list.length?`${list.length} PHOTOS`:'사진 준비 중'}</span></div>`;}
let category='전체';
const categories=['전체','신제품','제품정보','작업사례'];
const filters=document.querySelector('#filters'),search=document.querySelector('#search');
function render(){
  filters.innerHTML=categories.map(c=>`<button type="button" class="${category===c?'active':''}" aria-pressed="${category===c}" data-category="${c}">${c}</button>`).join('');
  const query=search.value.trim().toLocaleLowerCase();
  const results=posts.filter(p=>(category==='전체'||p.type===category)&&[p.title,p.description,p.brand,p.model,p.body,...p.specs.flat()].join(' ').toLocaleLowerCase().includes(query));
  document.querySelector('#result-count').textContent=`${results.length}개의 제품·작업 글${results.some(p=>p.sample)?' · 예시 포함':''}`;
  document.querySelector('#posts').innerHTML=results.length?results.map(p=>`<a class="post" href="#post/${encodeURIComponent(p.id)}">${cover(p)}<div class="post-meta"><span class="category">${esc(p.type)}${p.sample?' · 예시':''}</span>${p.date?`<time>${esc(p.date)}</time>`:''}</div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><span class="read-time">사진과 상세정보 보기 ↗</span></a>`).join(''):'<p class="empty">검색 결과가 없습니다. 제품명이나 작업 내용으로 다시 검색해보세요.</p>';
}
function inquiry(p){return `<aside class="inquiry"><p class="eyebrow">ASK BAREUN</p><h2>이 ${p.type==='작업사례'?'작업':'제품'}이 궁금하신가요?</h2><p>전화하실 때 “${esc(p.title)}” 글을 보고 문의한다고 말씀해 주세요.</p><a class="hero-link" href="tel:${phone}">전화 문의 0507-1390-5980 <span>↗</span></a><small>제품 사양·재고·가격 및 작업 가능 여부는 상담 시 확인해 주세요.</small></aside>`;}
function route(){
  let id=null;
  if(location.hash.startsWith('#post/')){try{id=decodeURIComponent(location.hash.slice(6));}catch{id='';}}
  const isArticle=id!==null,post=posts.find(p=>p.id===id),article=document.querySelector('#article');
  document.querySelector('#home').hidden=isArticle;article.hidden=!isArticle;
  if(isArticle){
    if(post){const list=photos(post);article.innerHTML=`<a class="back" href="#journal">← 제품·작업 목록</a><p class="eyebrow">${esc(post.type)} ${esc(post.date)}</p><h1>${esc(post.title)}</h1><p class="detail-intro">${esc(post.description)}</p>${post.sample?'<p class="sample-note">구성을 보여주는 예시입니다. 실제 제품 정보와 작업 사진은 등록 예정입니다.</p>':''}<div class="photo-gallery">${list.length?list.map((photo,i)=>`<figure><button class="gallery-open" type="button" data-photo="${i}" aria-label="${esc(photo.alt||'사진')} 크게 보기">${imageMarkup(photo)}<span>크게 보기 ↗</span></button><figcaption>${esc(photo.alt)}</figcaption></figure>`).join(''):placeholder(post,'detail-placeholder')}</div><h2 class="info-heading">${post.type==='작업사례'?'작업 정보':'제품 정보'}</h2><dl class="specs">${post.specs.map(([key,value])=>`<div><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl><div class="body"></div>${inquiry(post)}`;article.querySelector('.body').textContent=post.body;
      article.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{const photo=list[Number(button.dataset.photo)];const img=document.querySelector('#lightbox-image');img.src=safeImage(photo.src);img.alt=photo.alt||'';document.querySelector('#lightbox-caption').textContent=photo.alt||'';document.querySelector('#lightbox').showModal();}));
      document.title=`${post.title} | 바른골프피팅`;
    }else{article.innerHTML='<h1>글을 찾을 수 없습니다.</h1><a class="text-link" href="#journal">제품·작업 목록으로</a>';document.title='글을 찾을 수 없습니다 | 바른골프피팅';}
    window.scrollTo(0,0);
  }else{
    document.title='바른골프피팅 | 제품과 작업 이야기';
    if(location.hash==='#products')category='제품정보';
    if(location.hash==='#work')category='작업사례';
    render();
    const target=['#products','#work'].includes(location.hash)?'journal':location.hash.slice(1);
    if(target)requestAnimationFrame(()=>document.getElementById(target)?.scrollIntoView());else window.scrollTo(0,0);
  }
}
filters.addEventListener('click',e=>{const button=e.target.closest('button');if(button){category=button.dataset.category;render();}});
search.addEventListener('input',render);
// 네트워크 실패 시 깨진 이미지 대신 안내를 표시합니다.
 document.addEventListener('error',e=>{if(e.target.tagName==='IMG'&&e.target.id!=='lightbox-image'){const note=document.createElement('div');note.className='photo-placeholder';note.textContent='사진을 불러오지 못했습니다';e.target.replaceWith(note);}},true);
const dialog=document.querySelector('#lightbox');
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
const first=posts.find(p=>photos(p).length);
document.querySelector('#hero-visual').innerHTML=first?`<a href="#post/${encodeURIComponent(first.id)}">${imageMarkup(photos(first)[0])}<span class="hero-photo-caption">${esc(first.title)} ↗</span></a>`:`${placeholder({type:'제품·작업'})}<span class="hero-photo-caption">PRODUCT / DETAIL / PROCESS</span>`;
document.querySelector('#year').textContent=new Date().getFullYear();
window.addEventListener('hashchange',route);route();
