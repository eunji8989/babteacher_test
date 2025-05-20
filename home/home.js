
  // 모달들
  const modalTerms = document.getElementById("modal-terms");
  const modalForm = document.getElementById("modal-form");
  const modalComplete = document.getElementById("modal-complete");
  const modalLogin = document.getElementById("modal-login");
  const modalFindPw = document.getElementById("modal-findpw");

  window.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("kakaoUser"));
    const isNewUser = localStorage.getItem("isNewUser") === "true";
    const isOriginUser = localStorage.getItem("isOriginUser") === "false";

    if (userData && userData.user && userData.user.nickname) {
      document.getElementById("welcome").innerText = `${userData.user.nickname}님 환영합니다!`;

      if (isNewUser) {
        // ✅ 신규 회원인 경우 모달 띄우기
        document.getElementById("modal-complete").style.display = "block";

        // ✅ 메시지 커스터마이징
        document.querySelector("#modal-complete h3").innerText = "회원가입 완료";
        document.querySelector("#modal-complete p").innerText = "카카오 회원가입이 완료되었습니다!";
      }

      if (isOriginUSer) {
        // 기존회원 모달띄우기
        document.getElementById("modal-complete").style.display = "block";
        
        // 메시지 커스터마이징
        document.querySelector("#modal-complete h3").innerText = "로그인 완료";
        document.querySelector("#modal-complete p").innerText = "카카오 로그인이 완료되었습니다!";
    } 
  });

  // Kakao 로그아웃
  function kakaoLogout() {
    localStorage.removeItem("kakaoUser");
    location.reload();
  }


  // 상단 버튼 이벤트
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

  // 약관 → 회원정보
  document.getElementById("nextToForm").onclick = () => {
    modalTerms.style.display = "none";
    modalForm.style.display = "block";
  };

  // 회원정보 → 약관
  document.getElementById("backToTerms").onclick = () => {
    modalForm.style.display = "none";
    modalTerms.style.display = "block";
  };

  // 약관 전체 동의 기능
  const agreeAll = document.getElementById("agreeAll");
  const checks = document.querySelectorAll(".terms-check");
  const nextBtn = document.getElementById("nextToForm");

  agreeAll.addEventListener("change", function () {
    checks.forEach(chk => chk.checked = this.checked);
    toggleNextButton();
  });

  checks.forEach(chk => {
    chk.addEventListener("change", () => {
      agreeAll.checked = [...checks].every(chk => chk.checked);
      toggleNextButton();
    });
  });

  function toggleNextButton() {
    const allChecked = [...checks].every(chk => chk.checked);
    nextBtn.disabled = !allChecked;
  }

  // 커스텀 플레이스홀더
  document.querySelectorAll('.input-group').forEach(group => {
    const input = group.querySelector('input');
    const placeholder = group.querySelector('.custom-placeholder');
    if (!input || !placeholder) return;

    function togglePlaceholder() {
      placeholder.style.opacity = input.value.trim() === '' ? '1' : '0';
    }

    input.addEventListener('focus', () => placeholder.style.opacity = '0');
    input.addEventListener('blur', togglePlaceholder);
    input.addEventListener('input', togglePlaceholder);
    togglePlaceholder();
  });

  // 비밀번호 보기
  function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (!input) {
      console.error(`입력창 ${inputId}를 찾을 수 없습니다.`);
      return;
    }

    if (input.type === 'password') {
      input.type = 'text';
      icon.src = 'eye icon.svg';
    } else {
      input.type = 'password';
      icon.src = 'close eye icon.svg';
    }
  }

  // 이메일 도메인 선택
  const domainSelect = document.getElementById("email-domain");
  const customDomain = document.getElementById("custom-domain");

  domainSelect.addEventListener("change", () => {
    if (domainSelect.value === "") {
      customDomain.style.display = "inline-block";
      customDomain.value = "";
      customDomain.focus();
    } else {
      customDomain.value = domainSelect.value;
      customDomain.style.display = "inline-block";
    }
  });

  // 회원가입 완료로 전환
  document.getElementById("nextBtn").addEventListener("click", function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const nickname = document.getElementById('nickname').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const emailId = document.getElementById('email-id').value.trim();
    const domain = document.getElementById('custom-domain').value.trim() || document.getElementById('email-domain').value;

    const allFilled = username && nickname && password && confirmPassword && emailId && domain;
    if (!allFilled) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    modalForm.style.display = 'none';
    modalComplete.style.display = 'block';
  });

  // 중복확인 버튼
  document.querySelectorAll(".check-btn").forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      alert("중복 확인 완료!");
    });
  });

  // 회원가입 완료 → 로그인 화면
  document.getElementById("goToLogin").addEventListener('click', function () {
    modalComplete.style.display = 'none';
    modalLogin.style.display = 'block';
  });

  // 로그인 성공 처리
  function goToLogin() {
    document.getElementById("userProfile").style.display = "flex";
    document.getElementById("loginButton").style.display = "none";

    const loginModal = document.getElementById("loginModal");
    if (loginModal) loginModal.style.display = "none";
  }

  function loginSuccess(nickname, profileUrl) {
    document.getElementById('authMenu').style.display = 'none';
    document.getElementById('userProfile').style.display = 'flex';
    document.querySelector('.nickname').textContent = nickname;
    document.querySelector('.profile-img').src = profileUrl;
  }

  // 로그아웃 처리
  function logout() {
    document.getElementById("authButtons").style.display = "flex";
    document.getElementById("userProfile").style.display = "none";
    document.getElementById("userMenu").style.display = "none";
    localStorage.removeItem("kakaoUser");
    alert("로그아웃 되었습니다.");
  }

  function openLoginModal() {
    document.getElementById("loginModal").style.display = "block";
  }

  function openSignupModal() {
    document.getElementById("signupModal").style.display = "block";
  }

  function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
  }

  function handleLogin() {
    const nickname = "닉네임"; // 예시
    document.querySelector(".nickname").textContent = nickname;
    document.getElementById("authButtons").style.display = "none";
    document.getElementById("userProfile").style.display = "flex";

    closeModalWithAnimation(modalLogin);
    modalTerms.style.display = "none";
  }

  function toggleUserMenu() {
    const menu = document.getElementById("userMenu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
  }

  // 외부 클릭 시 드롭다운 닫기
  document.addEventListener("click", function (e) {
    const profile = document.getElementById("userProfile");
    const menu = document.getElementById("userMenu");
    if (!profile.contains(e.target)) {
      menu.style.display = "none";
    }
  });

  // 로그인 모달 내에서 회원가입/비번찾기 이동
  document.getElementById("loginToSignup").onclick = () => {
    modalLogin.style.display = "none";
    modalTerms.style.display = "block";
  };

  document.getElementById("openFindPw").onclick = () => {
    modalLogin.style.display = "none";
    modalFindPw.style.display = "block";
  };

  // 비밀번호 보내기 버튼
  document.getElementById("sendPwBtn").onclick = () => {
    const email = document.getElementById("findPwEmail").value;
    if (!email) {
      alert("이메일을 입력하세요.");
      return;
    }
    document.getElementById("pwSentMsg").style.display = "block";
    document.getElementById("resendPwBtn").style.display = "inline-block";
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

  // 초기화 함수 호출
  function initModalButtons() {
    // 여기에 초기화 관련 함수들 필요 시 작성
  }
  initModalButtons();
