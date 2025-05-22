// 모달 요소만 유지
const modalTerms = document.getElementById("modal-terms");
const modalForm = document.getElementById("modal-form");
const modalComplete = document.getElementById("modal-complete");
const modalLogin = document.getElementById("modal-login");
const modalFindPw = document.getElementById("modal-findpw");

// 모달 열기 버튼 이벤트 (기능 제거, 모달만 표시)
document.getElementById("openSignup").onclick = (e) => {
  e.preventDefault();
  closeAll();
  modalTerms.style.display = "block";
};

document.getElementById("openLogin").onclick = (e) => {
  e.preventDefault();
  closeAll();
  modalLogin.style.display = "block";
};

// 모달 간 이동만 유지
document.getElementById("nextToForm").onclick = () => {
  modalTerms.style.display = "none";
  modalForm.style.display = "block";
};

document.getElementById("backToTerms").onclick = () => {
  modalForm.style.display = "none";
  modalTerms.style.display = "block";
};

document.getElementById("goToLogin").addEventListener("click", () => {
  modalComplete.style.display = "none";
  modalLogin.style.display = "block";
});

document.getElementById("loginToSignup").onclick = () => {
  modalLogin.style.display = "none";
  modalTerms.style.display = "block";
};

document.getElementById("openFindPw").onclick = () => {
  modalLogin.style.display = "none";
  modalFindPw.style.display = "block";
};

// 비밀번호 찾기 기능 제거 후 알림만 표시
document.getElementById("sendPwBtn").onclick = () => {
  alert("기능이 비활성화되어 있습니다.");
};

// 모든 모달 닫기
function closeAll() {
  modalTerms.style.display = "none";
  modalForm.style.display = "none";
  modalComplete.style.display = "none";
  modalLogin.style.display = "none";
  modalFindPw.style.display = "none";
}

// 슬라이드 애니메이션 닫기
function closeModalWithAnimation(modal) {
  const content = modal.querySelector('.modal-content');
  content.style.animation = 'slideOutToLeft 0.4s ease forwards';
  setTimeout(() => {
    modal.style.display = 'none';
    content.style.animation = 'slideInFromRight 0.4s ease forwards';
  }, 400);
}

// 초기화 함수 (필요 시 확장 가능)
function initModalButtons() {}
initModalButtons();
