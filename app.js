const posts=blogContent;
const phone='050713905980';
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeImage(src){return typeof src==='string'&&/^(assets\/[\w./-]+|https:\/\/[^\s"<>]+)$/.test(src)?src:'';}
function photos(p){return (p.photos||[]).filter(photo=>safeImage(photo.src));}
function placeholder(p,extra=''){return `<div class="photo-placeholder ${extra}"><span class="placeholder-icon" aria-hidden="true">＋</span><span>${esc(p.photoLabel||p.type+' 사진 등록 예정')}</span><small>${esc(p.photoHint||'실제 제품·작업 사진을 준비하고 있습니다')}</small></div>`;}
function imageMarkup(photo,extra='',priority=false){const src=safeImage(photo.src),thumb=safeImage(photo.thumbnail);return `<img class="${extra}" src="${esc(thumb||src)}" ${thumb?`data-full="${esc(src)}"`:''} alt="${esc(photo.alt)}" ${priority?'loading="eager" fetchpriority="high"':'loading="lazy"'} decoding="async">`;}
function cover(p){const list=photos(p);return `<div class="photo-cover">${list.length?imageMarkup(list[0]):placeholder(p)}<span class="photo-badge">${list.length?`${list.length} PHOTOS`:'사진 준비 중'}</span></div>`;}
function inquiryLabel(p){if(p.inquiryType==='consultation')return '피팅 상담·방문 예약 문의';if(p.type==='작업사례')return '같은 작업 비용·일정 문의';if(p.id==='shaft'||p.inquiryType==='compatibility')return '내 클럽에 장착 가능한지 문의';return '이 모델 재고·가격 문의';}
function callLink(p,placement,css=''){return `<a class="${css}" href="tel:${phone}" data-placement="${placement}" data-post-id="${esc(p.id)}">${inquiryLabel(p)} <span aria-hidden="true">↗</span></a>`;}
let category='전체',topicId='';
const categories=['전체','신제품','제품정보','작업사례',...new Set(posts.map(p=>p.type).filter(t=>!['신제품','제품정보','작업사례'].includes(t)))];
const filters=document.querySelector('#filters'),search=document.querySelector('#search');
function render(){
  filters.innerHTML=categories.map(c=>`<button type="button" class="${category===c?'active':''}" aria-pressed="${category===c}" data-category="${c}">${c}</button>`).join('');
  document.querySelector('#topics').innerHTML=inquiryTopics.map((t,i)=>`<button type="button" class="topic ${topicId===t.id?'selected':''}" aria-pressed="${topicId===t.id}" data-topic="${t.id}"><span class="topic-index">0${i+1} ↗</span><strong>${esc(t.title)}</strong><small>${esc(t.description)}</small></button>`).join('');
  const query=search.value.trim().toLocaleLowerCase(),topic=inquiryTopics.find(t=>t.id===topicId);
  const results=posts.filter(p=>(category==='전체'||p.type===category)&&(!topic||topic.postIds.includes(p.id))&&[p.title,p.description,p.brand,p.model,p.body,...p.specs.flat()].join(' ').toLocaleLowerCase().includes(query));
  document.querySelector('#result-count').textContent=`${topic?topic.title+' · ':''}${results.length}개의 제품·작업 글${results.some(p=>p.sample)?' · 예시 포함':''}`;
  document.querySelector('#reset-filters').hidden=!(topicId||category!=='전체'||query);
  document.querySelector('#posts').innerHTML=results.length?results.map(p=>`<article class="post"><a class="post-main" href="#post/${encodeURIComponent(p.id)}">${cover(p)}<div class="post-meta"><span class="category">${esc(p.type)}${p.sample?' · 예시':''}</span>${p===posts[0]&&!p.sample?'<span class="latest-badge">최신글</span>':''}${p.date?`<time>${esc(p.date)}</time>`:''}</div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><span class="read-time">사진과 상세정보 보기 ↗</span></a>${callLink(p,'card','card-call')}</article>`).join(''):'<div class="empty"><p>조건에 맞는 글이 없습니다. 다른 분류를 선택하거나 전체 글을 살펴보세요.</p><a class="text-link" href="tel:050713905980" data-placement="empty">찾는 제품·작업 전화 문의 ↗</a></div>';
}
function inquiry(p){return `<aside class="inquiry"><p class="eyebrow">ASK BAREUN</p><h2>${p.inquiryType==='consultation'?'나에게 맞는 피팅을 상담해 보세요.':`이 ${p.type==='작업사례'?'작업':'제품'}이 궁금하신가요?`}</h2><p>전화하실 때 “${esc(p.title)}” 글을 보고 문의한다고 말씀해 주세요.</p>${callLink(p,'detail-bottom','hero-link')}<p class="inquiry-number">0507-1390-5980</p><small>제품 사양·재고·가격 및 작업 가능 여부는 상담 시 확인해 주세요.<br>방문은 예약제로 운영합니다. 전화 또는 네이버 예약 후 방문해 주세요.</small></aside>`;}
function processMarkup(p){return p.type==='작업사례'&&p.process?.length?`<section class="work-story" aria-label="작업 과정"><h2>작업 전부터 완성까지</h2>${p.sample?'<p class="muted">아래 내용은 실제 작업이 아닌 사례 작성 예시입니다.</p>':''}<ol>${p.process.map(step=>`<li><h3>${esc(step.title)}</h3><p>${esc(step.text)}</p>${step.photo&&safeImage(step.photo.src)?`<button class="gallery-open" type="button" data-step-src="${esc(step.photo.src)}" data-step-alt="${esc(step.photo.alt||step.title)}">${imageMarkup(step.photo)}<span>크게 보기 ↗</span></button>`:''}</li>`).join('')}</ol></section>`:'';}
function galleryMarkup(p){
  const list=photos(p),slots=p.photoSlots||[],count=Math.max(list.length,slots.length);
  if(!count)return placeholder(p,'detail-placeholder');
  return Array.from({length:count},(_,i)=>{const photo=list[i],slot=slots[i];
    if(photo)return `<figure><button class="gallery-open" type="button" data-photo="${i}" aria-label="${esc(photo.alt||'사진')} 크게 보기">${imageMarkup({...photo,thumbnail:null})}<span>크게 보기 ↗</span></button><figcaption>${esc(photo.alt)}</figcaption></figure>`;
    return `<figure class="planned-photo">${placeholder({photoLabel:slot.title,photoHint:'사진 등록 예정'},'planned-placeholder')}<figcaption>${esc(slot.caption)}</figcaption></figure>`;
  }).join('');
}
function sourceMarkup(p){return /^https:\/\/blog\.naver\.com\//.test(p.sourceUrl||'')?`<p class="related-source"><a class="text-link" href="${esc(p.sourceUrl)}" target="_blank" rel="noopener noreferrer">함께 보기 · 네이버 블로그 글 ↗</a></p>`:'';}
function openPhoto(photo){const img=document.querySelector('#lightbox-image');img.src=safeImage(photo.src);img.alt=photo.alt||'';document.querySelector('#lightbox-caption').textContent=photo.alt||'';document.querySelector('#lightbox').showModal();}
function updateMobile(p){const link=document.querySelector('.mobile-call');link.dataset.postId=p?.id||'';link.dataset.placement='mobile';link.querySelector('span').textContent=p?'이 글 보고 상담하기':'전화·네이버 예약 후 방문';link.querySelector('strong').textContent=p?inquiryLabel(p)+' ↗':'전화 예약·문의 ↗';}
function trackPage(){if(typeof window.gtag==='function')window.gtag('event','page_view',{page_title:document.title,page_location:location.href});}
function route(){
  let id=null;
  if(location.hash.startsWith('#post/')){try{id=decodeURIComponent(location.hash.slice(6));}catch{id='';}}
  const isArticle=id!==null,post=posts.find(p=>p.id===id),article=document.querySelector('#article');
  document.querySelector('#home').hidden=isArticle;article.hidden=!isArticle;updateMobile(post);
  if(isArticle){
    if(post){const list=photos(post);article.innerHTML=`<a class="back" href="#journal">← 제품·작업 목록</a><p class="eyebrow">${esc(post.type)} ${esc(post.date)}</p><h1>${esc(post.title)}</h1><p class="detail-intro">${esc(post.description)}</p><div class="detail-action">${callLink(post,'detail-top','text-link')}<span>0507-1390-5980</span></div>${post.sample?'<p class="sample-note">구성을 보여주는 예시입니다. 실제 제품 정보와 작업 사진은 등록 예정입니다.</p>':''}<div class="photo-gallery">${galleryMarkup(post)}</div><h2 class="info-heading">${post.type==='작업사례'?'작업 정보':post.type==='매장소식'?'상담·방문 안내':'제품 정보'}</h2><dl class="specs">${post.specs.map(([key,value])=>`<div><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl><div class="body"></div>${processMarkup(post)}${sourceMarkup(post)}${inquiry(post)}<a class="text-link" href="#visit">주소·영업시간·주차 안내 보기 ↗</a>`;article.querySelector('.body').textContent=post.body;
      article.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>openPhoto(list[Number(button.dataset.photo)])));
      article.querySelectorAll('[data-step-src]').forEach(button=>button.addEventListener('click',()=>openPhoto({src:button.dataset.stepSrc,alt:button.dataset.stepAlt})));
      document.title=`${post.title} | 바른골프피팅센터 동래점`;
    }else{article.innerHTML='<h1>글을 찾을 수 없습니다.</h1><a class="text-link" href="#journal">제품·작업 목록으로</a>';document.title='글을 찾을 수 없습니다 | 바른골프피팅센터 동래점';}
    window.scrollTo(0,0);
  }else{
    document.title='바른골프피팅센터 동래점 | 맞춤클럽제작·분석·수리';
    if(['#products','#work'].includes(location.hash)){category=location.hash==='#products'?'제품정보':'작업사례';topicId='';search.value='';}
    render();
    const target=['#products','#work'].includes(location.hash)?'journal':location.hash.slice(1);
    if(target)requestAnimationFrame(()=>document.getElementById(target)?.scrollIntoView());else window.scrollTo(0,0);
  }
  trackPage();
}
filters.addEventListener('click',e=>{const button=e.target.closest('button');if(button){category=button.dataset.category;render();filters.querySelector(`[data-category="${category}"]`)?.focus();}});
search.addEventListener('input',render);
document.querySelector('#topics').addEventListener('click',e=>{const button=e.target.closest('[data-topic]');if(button){topicId=button.dataset.topic;category='전체';search.value='';render();if(location.hash!=='#journal')location.hash='journal';else document.querySelector('#journal').scrollIntoView();}});
document.querySelector('#reset-filters').addEventListener('click',()=>{category='전체';topicId='';search.value='';render();search.focus();});
document.addEventListener('error',e=>{if(e.target.tagName==='IMG'){if(e.target.id==='lightbox-image'){document.querySelector('#lightbox-caption').textContent='사진을 불러오지 못했습니다. 닫고 다른 사진을 확인해 주세요.';return;}const note=document.createElement('div');note.className='photo-placeholder';note.textContent='사진을 불러오지 못했습니다';e.target.replaceWith(note);}},true);
const dialog=document.querySelector('#lightbox');
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
// 메인 첫 화면은 다섯 가지 서비스 안내를 우선합니다. 사진은 글 목록과 상세에서 보여줍니다.
const facts=[['주소',siteSettings.address],['영업시간',siteSettings.hours],['휴무일',siteSettings.holidays],['주차',siteSettings.parking],['예약',siteSettings.reservation]];
document.querySelector('#visit-facts').innerHTML=`<dl class="visit-facts">${facts.filter(([,value])=>value).map(([key,value])=>`<div><dt>${key}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>`;
if(siteSettings.mapUrl?.startsWith('https://')){const map=document.querySelector('#map-link');map.href=siteSettings.mapUrl;}
if(siteSettings.bookingUrl?.startsWith('https://')){const link=document.createElement('a');link.className='text-link';link.href=siteSettings.bookingUrl;link.target='_blank';link.rel='noopener noreferrer';link.textContent='네이버 매장·예약 안내 ↗';document.querySelector('.visit-links').append(link);}
// GA4는 매장 소유자의 측정 ID를 설정한 경우에만 사용합니다. 클릭은 실제 통화를 의미하지 않습니다.
if(/^G-[A-Z0-9]+$/.test(siteSettings.analyticsId||'')){
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  window.gtag('js',new Date());window.gtag('config',siteSettings.analyticsId,{send_page_view:false});
  const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(siteSettings.analyticsId);document.head.append(script);
}
document.addEventListener('click',e=>{const link=e.target.closest?.('a[href^="tel:"]');if(!link)return;const detail={post_id:link.dataset.postId||'',placement:link.dataset.placement||'general',service:link.dataset.service||''};document.dispatchEvent(new CustomEvent('phone-inquiry',{detail}));if(typeof window.gtag==='function')window.gtag('event','phone_click',detail);});
document.querySelector('#year').textContent=new Date().getFullYear();
window.addEventListener('hashchange',route);route();
