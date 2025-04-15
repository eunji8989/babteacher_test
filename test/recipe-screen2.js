console.log("스크립트 실행됨!");

document.addEventListener("DOMContentLoaded", function () {
    const userProfile = document.getElementById("userProfile");
    const userMenu = document.getElementById("userMenu");
  
    if (userProfile && userMenu) {
      userProfile.addEventListener("click", function (event) {
        event.stopPropagation(); // 클릭 이벤트 전파 방지
        userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
      });
  
      // 바깥 클릭 시 드롭다운 닫기
      document.addEventListener("click", function (event) {
        if (!userProfile.contains(event.target)) {
          userMenu.style.display = "none";
        }
      });
    }
  });
  
  // 로그아웃 처리
  function logout() {
    const authButtons = document.getElementById("authButtons");
    const userProfile = document.getElementById("userProfile");
    const userMenu = document.getElementById("userMenu");
  
    if (authButtons && userProfile && userMenu) {
      authButtons.style.display = "flex";
      userProfile.style.display = "none";
      userMenu.style.display = "none";
    }
  
    alert("로그아웃 되었습니다.");
    window.location.href = "밥선생.html";
  }  
  
  function openVideoModal() {
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("videoFrame");
    iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    modal.style.display = "block";
  }
  
  function closeVideoModal() {
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("videoFrame");
    iframe.src = "";
    modal.style.display = "none";
  }
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
    }
  });
  
  
// 1. URL에서 쿼리 파라미터로 전달된 id값을 가져옴 (?id=0 이런 식)
const urlParams = new URLSearchParams(window.location.search);
const recipeId = parseInt(urlParams.get('id')); // 예: ?id=0

// 2. JSON 데이터 로드
fetch('./recipes.json')
  .then(response => {
    console.log('응답 상태:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('데이터:', data);
    if (Array.isArray(data) && data.length > recipeId) {
      const recipe = data[recipeId];
      
      // 메뉴 이름 설정
      document.getElementById('menuTitle').textContent = recipe.title;

      // 재료 설정
      document.getElementById('menuIngredients').textContent = `필요재료: ${recipe.ingredients}`;

      // 레시피 내용 업데이트
      const contentList = document.getElementById('menuContent');
      contentList.innerHTML = ''; // 기존 내용 비우기
      recipe.steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        contentList.appendChild(li);
      });

      // 동영상 링크 및 썸네일 업데이트
      document.getElementById('videoLink').href = recipe.video;
      document.getElementById('videoLink').textContent = '동영상보기';
      //document.getElementById('thumbnail').src = recipe.thumbnail;
        
    } else {
      document.getElementById('menuTitle').textContent = '레시피를 찾을 수 없습니다';
    }
  })
  .catch(error => {
    console.error('JSON 로드 실패:', error);
    document.getElementById('menuTitle').textContent = '오류 발생';
  });
