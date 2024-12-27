/*********** include Header 헤더를 로드하는 함수 ***********/
function loadHeader() {
  fetch('/html/header.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('.header_include').innerHTML = data;
      initializeHeaderEvents(); // 헤더 로드 후 이벤트 초기화
      searchHeader();
      responsiveclickSearchBtn();
      clickHamburger();
      responsiveNavigation();
    })
    .catch(error => console.error('Error loading header:', error));
}

/*********** 헤더 Search 함수 ***********/
function searchHeader(){
  //변수설정
  let searchBtn = document.getElementById('search_btn');
  let searchCloseBtn = document.getElementById('search_close_btn');
  let headerNav = document.getElementById('header_nav');
  let headerSearch = document.getElementById('header_search');

  let Header = document.getElementById('header');
  //돋보기(.header_icon의 #search_btn) 클릭시
  /* 
  .header_icon의 #search_btn이 display: none;
  .header_icon의 #search_close_btn이 display: block;
  */
  /* 
  #header_nav display: none;
  #header_search display: block;
  */
  searchBtn.addEventListener('click',()=>{
    searchBtn.style.display = 'none';
    searchCloseBtn.style.display = 'block';
    headerNav.style.display = 'none';
    headerSearch.style.display = 'block';
  })
  
  //X창(.header_icon의 #search_close_btn) 클릭시
  /* 
  .header_icon의 #search_btn이 display: block;
  .header_icon의 #search_close_btn이 display: none;
  */
  /* 
  #header_nav display: block;
  #header_search display: none;
  */
  searchCloseBtn.addEventListener('click',()=>{
    searchCloseBtn.style.display = 'none';
    searchBtn.style.display = 'block';
    headerNav.style.display = 'block';
    headerSearch.style.display = 'none';
  })
  headerOut();
}
/*********** 헤더에서 마우스 leave시 적용되는 함수 ***********/
function headerOut(){
  let searchBtn = document.getElementById('search_btn');
  let searchCloseBtn = document.getElementById('search_close_btn');
  let headerNav = document.getElementById('header_nav');
  let headerSearch = document.getElementById('header_search');

  let Header = document.getElementById('header');

  Header.addEventListener('mouseleave', ()=>{
    searchCloseBtn.style.display = 'none';
    searchBtn.style.display = 'block';
    headerNav.style.display = 'block';
    headerSearch.style.display = 'none';
  })
}

/*********** 헤더 서브메뉴 함수 ***********/
// 서브메뉴 열림/닫힘 이벤트를 초기화
function initializeHeaderEvents() {
  document.querySelectorAll('.nav_list').forEach(navItem => {
    const dropdown = navItem.querySelector('.dropdown');

    if (dropdown) {
      // 마우스 오버 시 서브메뉴 열기
      navItem.addEventListener('mouseenter', () => {
        dropdown.classList.add('active');
        dropdown.style.maxHeight = dropdown.scrollHeight + 'px'; // 높이를 내부 콘텐츠에 맞춤
      });

      // 마우스 아웃 시 서브메뉴 닫기
      navItem.addEventListener('mouseleave', () => {
        dropdown.classList.remove('active');
        dropdown.style.maxHeight = null; // 높이 초기화
      });
    }
  });
}

/*********** 반응형 헤더 search 버튼 함수  ***********/
function responsiveclickSearchBtn(){
  let responsiveSearchBtn = document.getElementById('responsive_search_btn');
  let responsiveCloseBtn = document.getElementById('responsive_close_btn');
  let responsiveSearch = document.getElementById('responsive_search');

  responsiveSearchBtn.addEventListener('click',()=>{
    responsiveCloseBtn.style.display = 'block';
    responsiveSearchBtn.style.display = 'none'
    responsiveSearch.style.display = 'block'
  })

  responsiveCloseBtn.addEventListener('click',()=>{
    responsiveCloseBtn.style.display = 'none';
    responsiveSearchBtn.style.display = 'block';
    responsiveSearch.style.display = 'none'
  })
}

/*********** 반응형 헤더 hamburger 버튼 함수  ***********/
function clickHamburger(){
  let responsiveHamburgerBtn = document.getElementById('responsive_hamburger_btn');

  let responsiveInnerBottom = document.getElementById('responsive_inner_bottom');

  responsiveHamburgerBtn.addEventListener('click',()=>{
    responsiveHamburgerBtn.classList.toggle('active');

    if(responsiveInnerBottom.style.display === 'block'){
      responsiveInnerBottom.style.display = 'none';
      document.body.classList.remove('scrollLock');
    }else{
      responsiveInnerBottom.style.display = 'block';
      document.body.classList.add('scrollLock');
    }
    //responsiveHeaderInnerBottom.style.display = 'block' ? 'none' : 'block';
  })
}

/*********** 반응형 헤더 navigation accordion 함수  ***********/
function responsiveNavigation() {
  let responsiveNav = document.querySelectorAll('.responsive_nav_wrap');
  
  responsiveNav.forEach((navi, index) => {
    let title = navi.querySelector('.responsive_title');
    let submenu = navi.querySelector('.responsive_submenu');

    if (title && submenu) {
      title.addEventListener('click', function (e) {
        e.preventDefault();

        let currentMaxHeight = getComputedStyle(submenu).maxHeight;

        // 모든 메뉴 접기 & 모든 title에서 active 제거
        responsiveNav.forEach((e, subIndex) => {
          let otherSubmenu = e.querySelector('.responsive_submenu');
          let otherTitle = e.querySelector('.responsive_title'); // 다른 메뉴의 title
          if (otherSubmenu) {
            otherSubmenu.style.maxHeight = '0';
          }
          if (otherTitle) {
            otherTitle.classList.remove('active'); // 다른 메뉴의 active 제거
          }
        });

        // 현재 클릭한 메뉴 펼치기 / 접기
        if (currentMaxHeight === '0px') {
          submenu.style.maxHeight = submenu.scrollHeight + 'px';
          submenu.style.transition = '0.5s';
          title.classList.add('active');
        } else {
          submenu.style.maxHeight = '0';
          title.classList.remove('active');
        }
      });
    } else {
      console.warn(`메뉴 ${index + 1}에 title 또는 submenu가 없음`);
    }
  });
}
loadHeader();


/*********** Side_Menu 함수 ***********/
let sideMenuCharacter = document.getElementById('sideMenuCharacter');
let sideMenu = document.getElementById('sideMenu');

function sideMenuClick(){
  sideMenuCharacter.addEventListener('click', ()=>{
    sideMenu.classList.toggle('active');
  })
}
sideMenuClick()

/*********** responsive_Side_Menu 함수 ***********/
let responsiveSideMenuImg = document.getElementById('RessideMenuCharacter');
let responsiveSideMenuClosebtn = document.getElementById('responsiveSideMenuClosebtn');
let responsiveSideMenuContent = document.getElementById('responsiveSideMenu');
function responsiveSideMenuClick(){
  responsiveSideMenuImg.addEventListener('click',()=>{
    responsiveSideMenuContent.classList.add('active');
  })
  responsiveSideMenuClosebtn.addEventListener('click',()=>{
    responsiveSideMenuContent.classList.remove('active');
  })
}
responsiveSideMenuClick();


/*********** section ICEV Program 슬라이드 ***********/
const slidewrap = document.querySelector(".program_swiper");
const slidescnt = document.querySelectorAll(".program_slide").length;
const slideContainer = document.getElementsByClassName("program_swiperWrap");
const slideWidth = slidewrap.offsetWidth;
const slideWidthGap = 20;
let currentSlide = 0;
let slideToShow = 3;

// MatchMedia 설정
const mediaQuery = window.matchMedia('(max-width: 540px)');

// 슬라이드 이동 함수
function goToSlide(index) {
    currentSlide = index;

    // 반응형 계산식 적용
    const calculateSlide = mediaQuery.matches
        ? (slideWidth) * (currentSlide ) // 540px 이하
        : (slideWidth + slideWidthGap) * (currentSlide) / 3; // 540px 초과

    slideContainer[0].style.transition = 'transform 0.5s ease';
    slideContainer[0].style.transform = `translateX(-${calculateSlide}px)`;

    // 페이지네이션 업데이트
    const pagination = document.querySelectorAll(".pagination li a");
    pagination.forEach((p, i) => p.classList.toggle('act', i === index));
}

function Createpagination() {
  // MatchMedia 설정
  //const mediaQuery = window.matchMedia('(max-width: 540px)');

  // HTML Tag 생성
  slidewrap.innerHTML += `<div class="pagination"></div>`;
  const pagination = document.querySelector(".pagination");

  for (let i = 0; i <= slidescnt - 1; i++) {
      // 화면 크기에 따라 첫 활성화 슬라이드 조건 변경
      if (mediaQuery.matches ? i === 0 : i === 1) {
          pagination.innerHTML += `<li><a class="act"></a></li>`;
      } else {
          pagination.innerHTML += `<li><a></a></li>`;
      }
  }

  // 페이지네이션 이벤트 생성
  const paginationlink = document.querySelectorAll(".pagination li a");
  paginationlink.forEach((link, index) => {
      link.addEventListener('click', (event) => {
          event.preventDefault(); // 기본 앵커 링크 동작을 막습니다.
          goToSlide(index);
      });
  });

  // MatchMedia 이벤트 리스너 추가 (540px 이하로 변경 시 동적 업데이트)
  mediaQuery.addEventListener('change', () => {
      // 페이지네이션 재생성
      pagination.innerHTML = ""; // 기존 페이지네이션 초기화
      Createpagination(); // 재호출로 페이지네이션 업데이트
  });
}

let Autoslideactive = null ; // 슬라이드 자동 이동 호출을 변수화

// 슬라이드 자동 이동
function autoslide() {
  // 화면 크기에 따라 다른 조건 적용
  const index = mediaQuery.matches
      ? (currentSlide < slidescnt - 1 ? currentSlide + 1 : 0) // 540px 이하
      : (currentSlide < slidescnt - 2 ? currentSlide + 1 : 1); // 540px 초과

  currentSlide = index; // 현재 슬라이드 상태 업데이트
  goToSlide(index);
}

// 페이지 리사이즈 이벤트로 계산식 동기화
mediaQuery.addEventListener('change', () => goToSlide(currentSlide));

/*  마우스 감지 시 슬라이드 자동 멈추기 */
function Createmousedetector(){
    //마우스가 슬라이드에 올라왔을 때
    slideContainer[0].addEventListener("mouseover",(event)=>{
        clearInterval(Autoslideactive);
    })
    //마우스가 슬라이드에서 나온 경우 다시 실행
    slideContainer[0].addEventListener("mouseout",(event)=>{
        Autoslideactive = setInterval(autoslide,3000);
    })
}
Createpagination();
Autoslideactive = setInterval(autoslide, 3000);
Createmousedetector();

/*********** section ICEV Program 슬라이드 안 클릭 함수 ***********/
function programClick() {
  // 모든 .item 요소 선택
  let slides = document.querySelectorAll(".program_slide");

  // 각 item에 대해 클릭 이벤트 등록
  slides.forEach(function (item) {
    // 각 item 내의 character, image 요소 선택
    let slideFront = item.querySelector(".program_character");
    let slideBack = item.querySelector(".program_image");

    // 초기 상태 플래그
    let isFlipped = false;

    // character 클릭 이벤트
    slideFront.addEventListener("click", () => {
      if (!isFlipped) {
        // 애니메이션 실행
        slideFront.classList.remove("active_animation2");
        slideBack.classList.remove("active_animation1");

        slideFront.offsetWidth = slideFront.offsetWidth; // Reflow
        slideBack.offsetWidth = slideBack.offsetWidth;

        slideFront.classList.add("active_animation1");
        slideBack.classList.add("active_animation2");

        // z-index 변경
        slideFront.style.zIndex = "0";
        slideBack.style.zIndex = "5";

        isFlipped = true;
      }
    });

    // image 클릭 이벤트
    slideBack.addEventListener("click", () => {
      if (isFlipped) {
        // 애니메이션 실행
        slideFront.classList.remove("active_animation1");
        slideBack.classList.remove("active_animation2");

        slideFront.offsetWidth = slideFront.offsetWidth; // Reflow
        slideBack.offsetWidth = slideBack.offsetWidth;

        slideFront.classList.add("active_animation2");
        slideBack.classList.add("active_animation1");

        // z-index 변경
        slideFront.style.zIndex = "5";
        slideBack.style.zIndex = "0";

        isFlipped = false;
      }
    });
  });
}
// 프로그램 시작
programClick();

/*********** section ICEV Program 배경 애니메이션 ***********/


//console.log(Header, programBgImg, leftImg, rightImg)
function programBgAnimation(){
  //변수 설정
  let Header = document.getElementById('header');
  //let scrollInfo = document.getElementById('scroll-info')
  let leftImg = document.querySelectorAll('.left_img');
  let leftImglength = leftImg.length;
  let rightImg = document.querySelectorAll('.right_img');
  let rightImglength = rightImg.length;
  
  //스크롤 시 이벤트 발생
  document.addEventListener('scroll',()=>{
    let scrollPosition = document.documentElement.scrollTop;

    //scrollInfo.textContent = '현재 스크롤 위치 : ' + scrollPosition;
    //300이상 1200미만에서 이벤트 발생
    if(scrollPosition >= 300 && scrollPosition < 1200){
      for(let x = 0; x < leftImglength; x++){
        leftImg[x].style.display = 'block';
      }
      for(let y = 0; y < rightImglength; y++){
        rightImg[y].style.display = 'block';
      }
    }else{
      for(let x = 0; x < leftImglength; x++){
        leftImg[x].style.display = 'none';
      }
      for(let y = 0; y < rightImglength; y++){
        rightImg[y].style.display = 'none';
      }
    }
  })
}
programBgAnimation();


/************************************* about_ICEV about_tab *************************************/
let aboutTargetLink = document.querySelectorAll('.about_tab_head a'); //링크선택
let aboutTabContent = document.querySelectorAll('#about_tab_content > .tab'); //탭콘텐츠
let aboutHightlights = document.querySelectorAll('.hightlights');

for(let i= 0; i < aboutTargetLink.length; i++){
  aboutTargetLink[i].addEventListener('click', function(e){
    e.preventDefault(); //a의 기본속성 삭제 페이지 이동 방지

    let aboutOrgTarget = e.target.getAttribute('href'); //클릭된 링크의  href속성에서 id값을 추출

    let aboutTabTarget = aboutOrgTarget.replace('#',''); //초기화
    for (let j = 0; j < aboutTabContent.length; j++){
      aboutTabContent[j].style.display= 'none';
    }
    document.getElementById(aboutTabTarget).style.display = 'block';
     //클릭된 탭에 해당하는 콘텐츠만 보이게함

    for(let k = 0; k<aboutTargetLink.length; k++){
			aboutTargetLink[k].classList.remove('active'); //모든클래스 삭제
			e.target.classList.add('active'); //클릭한 요소만 active
		}
    
  });//메뉴를 클릭하면 할일
}
//첫번째 탭 콘텐츠를 기본적으로 보이게설정
document.getElementById('about_tab_1').style.display = 'block';

/************************************* about_ICEV responsive tab -> swiper *************************************/
var aboutMobileswiper = new Swiper(".about_mobile_Swiper", {
  loop: true,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
  },
});

/************************************* swiper story_slide *************************************/
var storyBannerSwiper = new Swiper(".story_slide", {
  loop: true,
});

/************************************* ivev_story notice_tab *************************************/
function storyNoticeTabChange(){
  let noticeBtn = document.querySelector('.prev_btn');
  let qnaBtn = document.querySelector('.next_btn');

  let noticeTab = document.getElementById('notice_tab_1'); //공지사항 탭
  let qnaTab = document.getElementById('notice_tab_2'); //QnA탭

  // 초기화
  noticeTab.classList.remove('active');
  qnaTab.classList.remove('active');

  noticeBtn.addEventListener('click', ()=>{
    qnaTab.classList.remove('active');
    noticeTab.classList.add('active');
    document.querySelector('.icev_story_notice_head h2').textContent = '인천영어마을 새소식';
  });

  qnaBtn.addEventListener('click', ()=>{
    qnaTab.classList.add('active');
    noticeTab.classList.remove('active');
    document.querySelector('.icev_story_notice_head h2').textContent = '인천영어마을 QnA';
  });

  // 초기상태
  noticeTab.classList.add('active');
}
storyNoticeTabChange();

/************************************* Footer Slide Banner *************************************/
document.addEventListener('DOMContentLoaded', ()=>{
  const slideWrap = document.querySelector('.footer_slide'); //슬라이드 컨테이너
  const slides = document.querySelectorAll('.footer_slide_item'); //각각 슬라이드
  const prevBtn = document.querySelector('.footer_slide_prev_button'); //이전 버튼
  const nextBtn = document.querySelector('.footer_slide_next_button'); //다음 버튼

  const slideWidth = slides[0].offsetWidth + 20; // 슬라이드 너비 + 간격
  let currentIndex = 0; // 현재 슬라이드 위치
  //let autoPlayInterval;

  console.log(slideWrap, slides, prevBtn, nextBtn, slideWidth)

  // 슬라이드 복제 (무한 루프 구현)
  function cloneSlides() {
    for (let i = 0; i < slides.length; i++) {
      const clone = slides[i].cloneNode(true); // 각 슬라이드 복제
      slideWrap.appendChild(clone); // 복제본을 맨 뒤에 추가
    }
  }

  // 초기 위치 설정
  function setInitialPosition() {
    slideWrap.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
  }

  // 슬라이드 이동 함수
  function moveSlide(direction) {
    if (direction === 'next') {
      currentIndex++;
      slideWrap.style.transition = 'transform 0.3s ease-in-out';
      slideWrap.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

      // 끝까지 이동하면 다시 초기 위치로
      if (currentIndex >= slides.length) {
        setTimeout(() => {
          slideWrap.style.transition = 'none';
          currentIndex = 0;
          slideWrap.style.transform = `translateX(0px)`;
        }, 300); // 애니메이션 시간 이후 위치 초기화
      }
    } else if (direction === 'prev') {
      if (currentIndex <= 0) {
        currentIndex = slides.length;
        slideWrap.style.transition = 'none';
        slideWrap.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
      }
      currentIndex--;
      slideWrap.style.transition = 'transform 0.3s ease-in-out';
      slideWrap.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
    }
  }

  /*  각 슬라이드에 호버시 슬라이드 자동 멈추기 */
  function Createmousedetector(){
    slides.forEach(function(e){
      e.addEventListener('mouseover',()=>{
        stopAutoPlay();
      })
      e.addEventListener('mouseout',()=>{
        startAutoPlay();
      })
    })
  }

  // 자동 재생 함수
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => moveSlide('next'), 3000); // 3초마다 이동
  }

  // 자동 재생 중단
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // 새로운 아이템 동적으로 추가
  function addNewSlide(content) {
    const newSlide = document.createElement('div');
    newSlide.classList.add('footer_slide_item');
    newSlide.innerHTML = content; // 새로운 콘텐츠 삽입
    slideWrap.appendChild(newSlide);
  }

  // 버튼 클릭 이벤트
  prevBtn.addEventListener('click', () => {
    stopAutoPlay();
    moveSlide('prev');
    startAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    stopAutoPlay();
    moveSlide('next');
    startAutoPlay();
  });

  // 초기화 실행
  cloneSlides(); // 슬라이드 복제
  setInitialPosition(); // 초기 위치
  startAutoPlay(); // 자동 재생 시작
  Createmousedetector(); //슬라이드 자동 멈추기
});

/* top btn */
let topBtn = document.getElementById('topBtn');
let doc = document.documentElement;  //전체 윈도우
let scrollAmount;  //스크롤 양 저장하는 변수

function goToTop(){
    topBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
} //top 버튼 누르면 부드럽게 올라가게 제어

function topBtnScrollEvent(){
  window.addEventListener('scroll', ()=>{
    scrollAmount = doc.scrollTop; //scrollTop: 수직 스크롤 값을 계산해줌
    if(scrollAmount > 1000) topBtn.classList.add('visible');
    else topBtn.classList.remove('visible')
  });
} //윈도우 height 값 계산해서 일정 높이 이상 스크롤했을 때 visible

goToTop();
topBtnScrollEvent();

/*********** include Footer 푸터를 로드하는 함수 ***********/
fetch('/html/footer.html')
.then(response => response.text())
.then(data =>{
  document.querySelector('.footer_include').innerHTML = data;
})




