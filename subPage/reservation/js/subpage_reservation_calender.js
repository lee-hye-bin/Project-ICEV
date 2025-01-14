/*********** include Header 헤더를 로드하는 함수 ***********/
function loadHeader() {
  fetch('/subPage/reservation/html/subpage_reservation_header.html')
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

/* ********** 헤더 Search 함수 ********** */
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

// 안내 문구 수정
/*********** reservation_desc change ***********/
if(window.matchMedia("(min-width: 391px)").matches){
  /* 뷰포트 너비가 391 픽셀 이상 */
  document.querySelector('.reservation_desc>p').innerHTML = 
  `
    <em>인천광역시영어마을</em>의 다양한 교육을 직접 체험하세요!<br>
    최상의 환경과 준비된 강사와 함께하는 교육을 통해 여러분의 실력이 쑥쑥 자라납니다.<br>
    4박5일 프로그램, 방학캠프, 창의적 체험활동 등 다양한 프로그램이 준비되어 있어, <br>
    적성검사를 통해 본인에게 맞는 프로그램을 선택하고 공부할 수 있습니다.<br>
  `;
  console.log(`하...`)
}
else{
  /* 뷰포트 너비가 391 픽셀 미만 */
  document.querySelector('.reservation_desc>p').innerHTML = 
  `
    <em>인천광역시영어마을</em>의 다양한 교육을 직접 체험하세요!<br>
    적성검사를 통해 본인에게 맞는 프로그램을 선택하고 공부할 수 있습니다.<br>
  `;
}

/*********** calendar ***********/
const today = new Date(); //오늘 날짜
const currentYear = today.getFullYear(); //현재 년도
const currentMonth = today.getMonth(); //현재 월
const calendarBody = document.getElementById('calendarBody');
let startDate = null; //초기값
let endDate = null; //초기값

/* 동적 달력 생성 함수 */
function createCalendar(date){
  const year = date.getFullYear();
  const month = date.getMonth();
  const todayDate = new Date(); // 오늘 날짜
  const thisMonth = todayDate.getMonth();
  const thisYear = todayDate.getFullYear();

  let firstDay = new Date(year, month, 1).getDay(); //이번달의 첫째 날
  let lastDay = new Date(year, month+1, 0).getDate(); //이번달의 마지막 날
  let prevLastDate = new Date(year, month, 0).getDate(); //지난달의 마지막 날

  calendarBody.innerHTML = ''; //달력 내용 초기화
  let row = document.createElement('tr'); //첫 번째 행

  /* 현재 년도, 현재 달 동적 처리 */
  document.getElementById('calendarTitle').textContent = `${year}년 ${month+1}월`; //캘린더 제목
  document.getElementById('year').textContent = `${year}년`; //reservation 영역 년도
  document.getElementById('month').textContent = `${month+1}월`; //reservation 영역 월

  /* 달력 동적 처리 */
  //지난달 날짜를 받아서 채우기
  for(let i = 0; i < firstDay; i++){
    let cell = document.createElement('td'); //셀 생성
    cell.textContent = prevLastDate - firstDay + i + 1; //지난달의 날짜 계산해서 추가
    cell.classList.add('prev_month'); //지난달 날짜 스타일

    // 지난달 날짜는 클릭 불가능 처리
    if (year < thisYear || (year === thisYear && month < thisMonth)) cell.classList.add('impossible_day');

    row.appendChild(cell); //캘린더 행 업데이트
  }

  //이번달 채우기
  for(let day = 1; day <= lastDay; day++){
    if(row.children.length === 7){ 
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    } //열이 7개가 되면 새 행 생성

    const cell = document.createElement('td');
    cell.textContent = day;

    const cellDate = new Date(year, month, day);
    // 오늘 이전 날짜는 impossible_day 처리
    if (cellDate < todayDate) cell.classList.add('impossible_day');
    else cell.style.cursor = 'pointer';

    //예약 가능한 날짜는 커서 포인터 추가
    if(
      year >= today.getFullYear() &&
      month >= today.getMonth() &&
      day >= today.getDate()
    ){cell.style.cursor = 'pointer';}

    // 주말은 무조건 예약 불가
    const dateCell = new Date(year, month, day);
    if (dateCell.getDay() === 6 || dateCell.getDay() === 0) cell.style.cursor = 'default'; // 클릭 비활성화

    //지난달이면 무조건 예약 불가능 문제발생... 지난달 채우기가 활성화됨
    if(year <= today.getFullYear() && month < today.getMonth()) cell.classList.add('impossible_day');

    row.appendChild(cell); //캘린더 행 업데이트
  }

  // 다음 달 채우기
  let nextMonthDay = 1;
  while(row.children.length < 7){
    let cell = document.createElement('td');
    cell.textContent = nextMonthDay++; // 다음달 날짜
    cell.classList.add('next_month');
    
    // 채워진 다음 달 날짜에서 주말 클릭을 막기
    const nextMonthDate = new Date(year, month + 1, nextMonthDay - 1); // 다음 달 날짜 객체
    if (nextMonthDate.getDay() === 6 || nextMonthDate.getDay() === 0) cell.style.cursor = 'default';
    else cell.style.cursor = 'pointer';

    // 다음달 날짜가 이전 달 기준이라면 impossible_day 처리
    if (year < thisYear || (year === thisYear && month < thisMonth)) cell.classList.add('impossible_day');
    else cell.style.cursor = 'pointer';

    row.appendChild(cell); //캘린더 행 업데이트
  }
  calendarBody.appendChild(row); //캘린더 행 업데이트
}

// 기존 스타일 제거 후 새로운 스타일 추가
function clearClickedStyles() {
  document.querySelectorAll('#calendarBody td').forEach(cell => {
    cell.classList.remove('clicked');
  });
}

// 달력 날짜 클릭 이벤트
calendarBody.addEventListener('click', (e) => {
  if (
    e.target && 
    e.target.tagName === 'TD' && 
    !e.target.classList.contains('impossible_day') &&
    !e.target.classList.contains('prev_month') &&
    !e.target.classList.contains('next_month') &&
    e.target.textContent.trim() !== "" 
  ) {
    clearClickedStyles(); // 기존 스타일 제거

    const clickedDay = parseInt(e.target.textContent, 10);
    const clickedDate = new Date(today.getFullYear(), today.getMonth(), clickedDay);

    // 주의 월요일과 금요일 구하기
    const monday = new Date(clickedDate);
    monday.setDate(clickedDate.getDate() - clickedDate.getDay() + 1);
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    // 주 평일에 클릭된 스타일 추가
    document.querySelectorAll('#calendarBody td').forEach(cell => {
      const cellDay = parseInt(cell.textContent, 10);
      const cellDate = new Date(today.getFullYear(), today.getMonth(), cellDay);

      if(
          cellDate >= monday &&
          cellDate <= friday &&
          !cell.classList.contains("prev_month") &&
          !cell.classList.contains("next_month")
        ) {
        cell.classList.add('clicked');
      }
    });

    document.getElementById('start_date').textContent = `${monday.getFullYear()}-${monday.getMonth() + 1}-${monday.getDate()}`;
    document.getElementById('end_date').textContent = `${friday.getFullYear()}-${friday.getMonth() + 1}-${friday.getDate()}`;

    startDate = monday;
    endDate = friday;
    
    isReservate();
  }
});

// 해당 날짜의 월요일과 금요일 계산
function getWeekStartAndEnd(date){
  const selectedDate = new Date(date);
  const day = selectedDate.getDay();

  const monday = new Date(selectedDate);
  monday.setDate(selectedDate.getDate() - (day === 0 ? 6 : day - 1));

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  return {monday, friday};
}

// 이전/다음 달 이동 시 달력 갱신
document.getElementById('prevMonth').addEventListener('click', () => {
  today.setMonth(today.getMonth() - 1);
  createCalendar(today);
});
document.getElementById('nextMonth').addEventListener('click', () => {
  today.setMonth(today.getMonth() + 1);
  createCalendar(today);
});

/*********** reservation_btn, reservationM_message click event ***********/
const reservationBtn = document.getElementById('reservation_btn');
const reservationMessage = document.querySelector('.reservation_message');
const reservationCloseBtn = document.querySelector('.reservation_close_btn');
const reservationResult = document.querySelector('.resercation_result');
let reservationName = '';
let phoneNumber = '';

// 실시간으로 입력한 값을 받아옴
document.getElementById('name').addEventListener('keyup', (e)=>{
  reservationName  = e.target.value.trim();
  console.log('실시간 이름:', reservationName );
});
document.getElementById('phone').addEventListener('keyup', (e) => {
  phoneNumber = e.target.value.trim();
  console.log('실시간 전화번호:', phoneNumber);
});

// 예약 확인
function isReservate(){
  const moveTest = document.querySelector('.move_test');

  //초기화
  reservationResult.textContent = ''; 
  moveTest.classList.remove('visible');

  //누락 항목 확인
  let missingFields = []; //누락 항목 저장 배열
  if (!reservationName) missingFields.push("예약자 이름");
  if (!phoneNumber) missingFields.push("전화번호");
  if (!startDate) missingFields.push("시작 날짜");
  if (!endDate) missingFields.push("종료 날짜");

  if (missingFields.length > 0) {
    const missingMessage = `
      <p>다음 항목이 누락되었습니다.</p>
      <ul>
        ${missingFields.map(field => `<li>${field} </li>`).join(', \u00a0')}
      </ul>
      <p>값을 전부 입력해 주세요!</p>
    `; //빈 항목을 한 개씩 출력함
    reservationResult.innerHTML = missingMessage;
  }
  else {
    reservationResult.innerHTML = `
      <p>
        <b>예약자: </b>
        ${reservationName}
      </p>
      <p>
        <b>전화번호: </b>
        ${phoneNumber}
      </p>
      <p>
        <b>예약 기간: </b>
        ${startDate.getFullYear()}년 ${startDate.getMonth() + 1}월 ${startDate.getDate()}일 ~ ${endDate.getFullYear()}년 ${endDate.getMonth() + 1}월 ${endDate.getDate()}일
      </p>
    `;
    moveTest.classList.add('visible');
  }
}

// 메세지 창 닫기
function messageClose(){
  reservationCloseBtn.classList.add('click');
  reservationMessage.classList.remove('visible'); 

  reservationCloseBtn.addEventListener('animationend', () => {
    reservationCloseBtn.classList.remove('click'); // 상태 초기화
  }, { once: true });
}

// 버튼을 눌렀을 때 메세지 창 열기
reservationBtn.addEventListener('click', ()=>{
  const name = document.getElementById('name').value.trim();
  const phoneNumber = document.getElementById('phone').value.trim();

  reservationBtn.classList.add('click');   // 클래스 추가
  reservationMessage.classList.add('visible');

  reservationBtn.addEventListener('animationend', ()=>{   // 애니메이션이 끝난 후 클래스 제거
    reservationBtn.classList.remove('click');
  }, { once: true }); // 한 번만 동작하도록 제어함

  isReservate();
});

// 초기화
createCalendar(today);

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
fetch('/subPage/reservation/html/subpage_reservation_footer.html')
.then(response => response.text())
.then(data =>{
  document.querySelector('.footer_include').innerHTML = data;
})