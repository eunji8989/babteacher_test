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
  
