// 사진: assets/ 폴더에 파일을 넣고 photos에 경로와 설명을 추가하세요.
// 실제 제품/작업 확인 전까지 예시임을 표시합니다. 실제 글에는 sample: false를 지정하세요.
const blogContent = [
  {id:'new-driver',type:'신제품',sample:true,title:'신제품 드라이버를 소개하는 공간',description:'헤드의 전체 모습부터 어드레스 시 보이는 디테일까지, 사진으로 소개합니다.',brand:'',model:'',date:'',specs:[['제품명','실제 제품 등록 예정'],['주요 사양','제품 확인 후 안내'],['재고·가격','전화 문의']],photos:[],body:'제품의 전체 모습, 솔과 페이스, 어드레스 사진을 함께 소개할 예정입니다.\n\n관심 있는 제품의 모델명과 궁금한 점을 알려주시면 상담 시 확인할 수 있습니다.'},
  {id:'shaft',type:'제품정보',sample:true,title:'샤프트의 디테일을 살펴보세요',description:'모델 표기와 사양을 함께 확인할 수 있는 제품 소개 공간입니다.',brand:'',model:'',date:'',specs:[['브랜드·모델','실제 제품 등록 예정'],['중량·강도','제품 확인 후 안내'],['재고·가격','전화 문의']],photos:[],body:'실제 등록 시 브랜드, 모델명, 중량, 강도 등 확인된 정보를 기재합니다.\n\n샤프트의 외관과 모델 표기를 가까이 촬영한 사진을 함께 올릴 예정입니다.'},
  {id:'grip-work',type:'작업사례',sample:true,title:'그립 교체, 전후의 변화를 담다',description:'작업 전 상태부터 교체 과정, 완성 모습까지 차례로 보여드립니다.',brand:'',model:'',date:'',specs:[['작업 유형','그립 교체 소개 예시'],['사용 제품','실제 작업 등록 예정'],['작업 비용·일정','전화 문의']],photos:[],body:'실제 작업 전후의 사진과 사용한 제품을 함께 소개하는 공간입니다.\n\n현재 내용은 구성 예시이며 완료된 시공 사례가 아닙니다. 작업 가능 여부와 일정은 전화로 문의해 주세요.'},
  {id:'iron',type:'제품정보',sample:true,title:'아이언, 가까이 볼수록 다른 디테일',description:'백페이스와 솔, 페이스 사진으로 제품을 자세히 소개합니다.',brand:'',model:'',date:'',specs:[['브랜드·모델','실제 제품 등록 예정'],['세트 구성','제품 확인 후 안내'],['재고·가격','전화 문의']],photos:[],body:'제품을 살펴볼 때 궁금한 부분을 다양한 각도에서 촬영해 소개할 예정입니다.\n\n실제 제품 정보는 등록 후 확인하실 수 있습니다.'},
  {id:'assembly',type:'작업사례',sample:true,title:'조립 과정부터 완성까지, 한눈에',description:'평소 보기 어려운 작업 과정을 사진과 짧은 설명으로 기록합니다.',brand:'',model:'',date:'',specs:[['작업 유형','클럽 조립 소개 예시'],['작업 구성','실제 작업 등록 예정'],['상담·작업 일정','전화 문의']],photos:[],body:'클럽을 준비하고 작업을 진행하는 과정, 완성된 모습을 차례로 담을 예정입니다.\n\n현재는 작업 기록을 위한 예시이며 실제 작업 사진과 사양이 등록되면 함께 공개합니다.'},
  {id:'new-arrival',type:'신제품',sample:true,title:'새로 들어온 장비, 먼저 만나보세요',description:'입고 소식과 제품의 첫인상을 사진 중심으로 전합니다.',brand:'',model:'',date:'',specs:[['입고 제품','실제 제품 등록 예정'],['옵션','제품 확인 후 안내'],['구매 상담','전화 문의']],photos:[],body:'신제품 입고 소식과 실제 제품 사진을 소개하는 공간입니다.\n\n입고 여부와 선택 가능한 옵션은 전화로 문의해 주세요.'}
];

// 확인된 정보만 입력합니다. 빈 항목은 홈페이지에서 숨깁니다.
const siteSettings = {
  address: '부산광역시 동래구 사직북로 4 삼정자이언츠파크 2층(210호)',
  hours: '평일 11:00–20:00 / 주말 11:00–18:00',
  holidays: '',
  parking: '지하 2층·3층 무료주차',
  reservation: '예약제 운영 · 전화 또는 네이버 예약 필수',
  // 정확한 매장 지도 링크가 있으면 입력하세요. 없으면 매장명 검색으로 연결합니다.
  mapUrl: 'https://map.naver.com/p/entry/place/1759569518?placePath=%2Fhome',
  // Google Analytics 4 측정 ID. 비워두면 분석 스크립트와 데이터 전송이 실행되지 않습니다.
  bookingUrl: 'https://map.naver.com/p/entry/place/1759569518?placePath=%2Fhome',
  analyticsId: ''
};
const inquiryTopics = [
  {id:'direction',title:'드라이버 방향성이 고민이에요',description:'드라이버와 샤프트 관련 글 살펴보기',postIds:['new-driver','shaft']},
  {id:'shaft',title:'샤프트를 바꾸고 싶어요',description:'제품 정보와 조립 과정 살펴보기',postIds:['shaft','assembly']},
  {id:'grip',title:'그립 교체가 필요해요',description:'그립 교체 과정과 작업 정보 살펴보기',postIds:['grip-work']},
  {id:'new',title:'새로운 장비가 궁금해요',description:'신제품과 아이언 정보 살펴보기',postIds:['new-driver','iron','new-arrival']}
];
// 작업 글에 단계별 설명을 추가할 수 있습니다. 아래는 실제 작업이 아닌 작성 양식입니다.
for (const post of blogContent) {
  if (post.type === '작업사례' && post.sample && !post.process) post.process = [
    {title:'작업 전 · 어떤 고민이 있었나요?',text:'실제 상담 내용과 작업 전 상태를 기록할 예정입니다.'},
    {title:'작업 과정 · 무엇을 확인했나요?',text:'확인한 사항, 선택한 부품과 작업 이유를 사진과 함께 소개할 예정입니다.'},
    {title:'완료 후 · 어떻게 확인했나요?',text:'완성 상태와 확인 내용을 기록할 예정입니다. 측정값은 조건과 함께 기재합니다.'}
  ];
}
