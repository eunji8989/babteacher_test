//모달들
const modalTerms = document.getElementById("modal-terms");
const modalForm = document.getElementById("modal-form");
const modalComplete = document.getElementById("modal-complete");
const modalLogin = document.getElementById("modal-login");
const modalFindPw = document.getElementById("modal-findpw");

//상단 버튼 이벤트
document.getElementById("openSignup").onclick = () => {
	closeAll();
	modalTerms.style.display = "block";
};
document.getElementById("openLogin").onclick = () => {
	closeAll();
	modalLogin.style.display = "block";
};

//약관 → 회원정보
document.getElementById("nextToForm").onclick = () => {
modalTerms.style.display = "none";
modalForm.style.display = "block";
};

//회원정보 → 약관
document.getElementById("backToTerms").onclick = () => {
modalForm.style.display = "none";
modalTerms.style.display = "block";
};

// a 태그 클릭 시 새로고침 방지 + 모달 열기
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
  
// 약관 전체 동의 기능
const agreeAll = document.getElementById("agreeAll");
const checks = document.querySelectorAll(".terms-check");
const nextBtn = document.getElementById("nextToForm");
  
// 전체 동의 → 모든 체크박스 변경
agreeAll.addEventListener("change", function () {
    checks.forEach(chk => chk.checked = this.checked);
    toggleNextButton();
});
  
// 개별 약관 변경 시 → 전체 동의 체크 자동 반영
checks.forEach(chk => {
    chk.addEventListener("change", () => {
      agreeAll.checked = [...checks].every(chk => chk.checked);
      toggleNextButton();
    });
});
  
// 모두 체크되었을 때만 다음 버튼 활성화
function toggleNextButton() {
    const allChecked = [...checks].every(chk => chk.checked);
    nextBtn.disabled = !allChecked;
};

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
      icon.src = 'eye icon 1.svg'; // 눈 뜬 이미지
    } else {
      input.type = 'password';
      icon.src = 'close eye icon.svg'; // 눈 감은 이미지
    }
}  

// 이메일 도메인 선택 + 직접 입력
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
  

// 회원가입 완료 처리
document.addEventListener("DOMContentLoaded", function () {
    const nextBtn = document.getElementById('nextBtn');
  
    nextBtn.addEventListener('click', function () {
      const username = document.getElementById('username').value.trim();
      const nickname = document.getElementById('nickname').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const emailId = document.getElementById('email-id').value.trim();
      const domain = document.getElementById('custom-domain').value.trim() || document.getElementById('email-domain').value;
  
      // 모두 입력되었는지 확인
      const allFilled = username && nickname && password && confirmPassword && emailId && domain;
      if (!allFilled) {
        alert('모든 항목을 입력해주세요.');
        return;
      }
  
      // 비밀번호 확인
      if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
  
      // 모달 전환
      document.getElementById('modal-form').style.display = 'none';
      document.getElementById('modal-complete').style.display = 'block';
    });
  });
  
  
// 중복확인 버튼 이벤트 방지 (폼 제출 막기)
document.querySelectorAll(".check-btn").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        alert("중복 확인 완료!"); // 실제 확인 로직은 필요 시 추가
    });
});

//완료 → 로그인
document.getElementById("goToLogin").onclick = () => {
modalComplete.style.display = "none";
modalLogin.style.display = "block";
};

//로그인 모달 안의 회원가입/비번찾기
document.getElementById("loginToSignup").onclick = () => {
modalLogin.style.display = "none";
modalTerms.style.display = "block";
};
document.getElementById("openFindPw").onclick = () => {
modalLogin.style.display = "none";
modalFindPw.style.display = "block";
};

//비밀번호 보내기
document.getElementById("sendPwBtn").onclick = () => {
const email = document.getElementById("findPwEmail").value;
if (!email) {
 alert("이메일을 입력하세요.");
 return;
}
document.getElementById("pwSentMsg").style.display = "block";
document.getElementById("resendPwBtn").style.display = "inline-block";
};

//닫기 함수
function closeAll() {
modalTerms.style.display = "none";
modalForm.style.display = "none";
modalComplete.style.display = "none";
modalLogin.style.display = "none";
modalFindPw.style.display = "none";
}

function closeModalWithAnimation(modal) {
    const content = modal.querySelector('.modal-content');
    content.style.animation = 'slideOutToLeft 0.4s ease forwards';
  
    setTimeout(() => {
      modal.style.display = 'none';
      content.style.animation = 'slideInFromRight 0.4s ease forwards';
    }, 400);
}
  
// 페이지 시작 시 호출
initModalButtons();