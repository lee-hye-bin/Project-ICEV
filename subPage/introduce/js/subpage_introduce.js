/*********** include Header 헤더를 로드하는 함수 ***********/
function loadHeader() {
  fetch('/subPage/introduce/html/subpage_introduce_header.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('.header_include').innerHTML = data;
      initializeHeaderEvents(); // 헤더 로드 후 이벤트 초기화
      searchHeader();
      responsiveclickSearchBtn();
      clickHamburger();
      responsiveNavigation();
      //responsiveNav();
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


/* let responsiveTitle = document.querySelectorAll('.responsive_title');

function responsiveNav(){
  responsiveTitle.forEach((navi)=>{
    navi.addEventListener('click',()=>{
      const navItem = navi.parentNode;
      const isActive = navItem.classList.contains('active');

      removeActiveClass();

      if(!isActive){
        navItem.classList.add('active');
      }
    })
  })
}
function removeActiveClass() {
  responsiveTitle.forEach((nav) => {
    nav.parentNode.classList.remove('active')
  });
} */
/* let responsiveNavWrap = document.querySelectorAll('.responsive_nav_wrap')
function responsiveNav(){
  responsiveNavWrap.forEach((navi)=>{
    let resTitle = navi.querySelector('.responsive_title');
    let resSubmenu = navi.querySelector('.responsive_submenu');

    navi.resTitle.addEventListener('click',()=>{
      if(resSubmenu.style.maxHeight === '0px'){
        responsiveNavWrap.forEach((i)=>{
          i.resSubmenu.style.maxHeight = 0;
        })
        resSubmenu.style.maxHeight = resSubmenu.scrollHeight + 'px';
      }else{
        resSubmenu.style.maxHeight = '0'
      }
    })
  })
} */
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

// 큰탭
let TapMenu = document.querySelectorAll('.tap_menu li a');
let TapContent = document.querySelectorAll('#tap_content > div');
function mainTap(){
  for(let i = 0; i < TapMenu.length; i++){
    TapMenu[i].addEventListener('click',function(e){
      e.preventDefault();

      //클릭된 링크의 href속성에서 id값을 추출
      let orgTarget = e.target.getAttribute('href');
      //초기화 시키고
      let tabTarget = orgTarget.replace('#','');
      for(let x = 0; x < TapContent.length; x++){
        TapContent[x].style.display = 'none';
      }
      //클릭된 탭에 해당하는 콘텐츠만 보이게함
      document.getElementById(tabTarget).style.display = 'block';

      //탭 글자색 변경
      for(let j = 0; j < TapMenu.length; j++){
      TapMenu[j].classList.remove('active'); //모든 클래스 삭제
      e.target.classList.add('active'); //클릭한 요소만 클래스 추가
      }

      // 도로 그림 탭1에서만 보이게
      if(i === 0) document.querySelector('.town_bg').style.display = 'block';
      else document.querySelector('.town_bg').style.display = 'none';
    })
  }
}
mainTap();

/*********** introduce_town_item2 tab ***********/
function townItem2Tab(){
  let targetLink = document.querySelectorAll('.item2_tab_menu a');
  let tabContent = document.querySelectorAll('#item2_tab_content .introduce_town_item2_tab');
  

  console.log(targetLink, tabContent)
  for(let i= 0; i<targetLink.length; i++){
    targetLink[i].addEventListener('click', function(e){
      e.preventDefault();
      
      let orgTarget = e.target.getAttribute('href');
      let tabTarget = orgTarget.replace('#','');
      for (let j = 0; j < tabContent.length; j++){
        tabContent[j].style.display= 'none';
      }
      document.getElementById(tabTarget).style.display = 'block';
      
      for(let k = 0; k < targetLink.length; k++){
        targetLink[k].classList.remove('active');
        e.target.classList.add('active');
      }
    });
  }
}
townItem2Tab();

/*********** introduce_town_item3 tab slide ***********/
// tab
function townItem3Tab(){
  let targetLink = document.querySelectorAll('.item3_tab_menu a');
  let tabContent = document.querySelectorAll('#item3_tab_content > div');

  for(let i= 0; i<targetLink.length; i++){
    targetLink[i].addEventListener('click', function(e){
      e.preventDefault();
      
      let orgTarget = e.target.getAttribute('href');
      let tabTarget = orgTarget.replace('#','');
      for (let j = 0; j < tabContent.length; j++){
        tabContent[j].style.display= 'none';
      }
      document.getElementById(tabTarget).style.display = 'block';

      for(let k = 0; k<targetLink.length; k++){
        targetLink[k].classList.remove('active');
        e.target.classList.add('active');
      }
    });
  }
}
townItem3Tab();
// swiper
var swiperintroduceTabSwiper = new Swiper(".introduce_tab_Swiper", {
  loop: true,
});

// history 작은탭
let historyTapMenu = document.querySelectorAll('.history_tap_menu li a');
let historyTapContent = document.querySelectorAll('#history_tap_content > div');

console.log(historyTapMenu, historyTapContent)
function historyTap(){
  for(let i = 0; i < historyTapMenu.length; i++){
    historyTapMenu[i].addEventListener('click',function(e){
      e.preventDefault();

      //클릭된 링크의 href속성에서 id값을 추출
      let orgTarget = e.target.getAttribute('href');
      //초기화 시키고
      let tabTarget = orgTarget.replace('#','');
      for(let x = 0; x < historyTapContent.length; x++){
        historyTapContent[x].style.display = 'none';
      }
      //클릭된 탭에 해당하는 콘텐츠만 보이게함
      document.getElementById(tabTarget).style.display = 'block';

      //탭 글자색 변경
      for(let j = 0; j < historyTapMenu.length; j++){
      historyTapMenu[j].classList.remove('active'); //모든 클래스 삭제
      e.target.classList.add('active'); //클릭한 요소만 클래스 추가
      }
    })
  }
}
historyTap();





// 작은탭
console.log(historyTapMenu, historyTapContent)
function historyTap(){
  for(let i = 0; i < historyTapMenu.length; i++){
    historyTapMenu[i].addEventListener('click',function(e){
      e.preventDefault();

      //클릭된 링크의 href속성에서 id값을 추출
      let orgTarget = e.target.getAttribute('href');
      //초기화 시키고
      let tabTarget = orgTarget.replace('#','');
      for(let x = 0; x < historyTapContent.length; x++){
        historyTapContent[x].style.display = 'none';
      }
      //클릭된 탭에 해당하는 콘텐츠만 보이게함
      document.getElementById(tabTarget).style.display = 'block';

      //탭 글자색 변경
      for(let j = 0; j < historyTapMenu.length; j++){
      historyTapMenu[j].classList.remove('active'); //모든 클래스 삭제
      e.target.classList.add('active'); //클릭한 요소만 클래스 추가
      }
    })
  }
}
historyTap();


/*for(let i = 0; i < Tab.length; i++){
  Tab[i].addEventListener('click',function(t){
    t.preventDefault(); //a의 기본속성 없애기 //클릭했을 때 페이지 이동 방지
    
    //클릭된 링크의 href속성에서 id값을 추출
    let orgTarget = t.target.getAttribute('href');
    //초기화 시키고
    let tabTarget = orgTarget.replace('#','');
    for(let x = 0; x < tabContent.length; x++){
      tabContent[x].style.display = 'none';
    }
    //클릭된 탭에 해당하는 콘텐츠만 보이게함
    document.getElementById(tabTarget).style.display = 'block';
    
    //탭 이동시 말주머니 모양
    for(let j = 0; j < Tab.length; j++){
      Tab[j].classList.remove('active'); //모든 클래스 삭제
      t.target.classList.add('active'); //클릭한 요소만 클래스 추가

    }
  });//메뉴를 클릭하면 할 일
}
 */

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

/*********** include Footer 푸터를 로드하는 함수 ***********/
fetch('/subPage/introduce/html/subpage_introduce_footer.html')
.then(response => response.text())
.then(data =>{
  document.querySelector('.footer_include').innerHTML = data;
})

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