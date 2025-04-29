// 모달 열기/닫기 핸들링
const openSignupBtn = document.getElementById('openSignup');
const openLoginBtn = document.getElementById('openLogin');
const loginToSignup = document.getElementById('loginToSignup');
const openFindPwBtn = document.getElementById('openFindPw');
const goToLogin = document.getElementById('goToLogin');
const backToTerms = document.getElementById('backToTerms');

const modalTerms = document.getElementById('modal-terms');
const modalForm = document.getElementById('modal-form');
const modalComplete = document.getElementById('modal-complete');
const modalLogin = document.getElementById('modal-login');
const modalFindPw = document.getElementById('modal-findpw');

openSignupBtn.onclick = () => {
  modalTerms.style.display = 'block';
};

openLoginBtn.onclick = () => {
  modalLogin.style.display = 'block';
};

loginToSignup.onclick = () => {
  modalLogin.style.display = 'none';
  modalTerms.style.display = 'block';
};

goToLogin.onclick = () => {
  modalComplete.style.display = 'none';
  modalLogin.style.display = 'block';
};

openFindPwBtn.onclick = () => {
  modalLogin.style.display = 'none';
  modalFindPw.style.display = 'block';
};

backToTerms.onclick = () => {
  modalForm.style.display = 'none';
  modalTerms.style.display = 'block';
};

// 약관 전체 동의
const agreeAll = document.getElementById('agreeAll');
const termsChecks = document.querySelectorAll('.terms-check');
const nextToForm = document.getElementById('nextToForm');

agreeAll.addEventListener('change', () => {
  termsChecks.forEach(chk => chk.checked = agreeAll.checked);
  nextToForm.disabled = !agreeAll.checked;
});

termsChecks.forEach(chk => {
  chk.addEventListener('change', () => {
    const allChecked = [...termsChecks].every(chk => chk.checked);
    agreeAll.checked = allChecked;
    nextToForm.disabled = !allChecked;
  });
});

nextToForm.onclick = () => {
  modalTerms.style.display = 'none';
  modalForm.style.display = 'block';
};

// 이메일 도메인 선택 핸들링
const emailDomain = document.getElementById('email-domain');
const customDomain = document.getElementById('custom-domain');

emailDomain.addEventListener('change', () => {
  if (emailDomain.value === '') {
    customDomain.style.display = 'inline-block';
  } else {
    customDomain.style.display = 'none';
  }
});

// 비밀번호 보기 토글
function togglePassword(fieldId, icon) {
  const input = document.getElementById(fieldId);
  if (input.type === 'password') {
    input.type = 'text';
    icon.src = 'open eye icon.svg';
  } else {
    input.type = 'password';
    icon.src = 'close eye icon.svg';
  }
}

// 회원가입 완료 후 화면
const nextBtn = document.getElementById('nextBtn');
nextBtn.onclick = () => {
  modalForm.style.display = 'none';
  modalComplete.style.display = 'block';
};

// 로그인 후 처리
function loginSuccess(nickname, profileImage) {
  document.getElementById('authMenu').style.display = 'none';
  const userProfile = document.getElementById('userProfile');
  userProfile.style.display = 'flex';
  userProfile.querySelector('.nickname').textContent = nickname;
  userProfile.querySelector('.profile-img').src = profileImage;
  modalLogin.style.display = 'none';
}

// 로그아웃
function logout() {
  document.getElementById('authMenu').style.display = 'flex';
  document.getElementById('userProfile').style.display = 'none';
}

function toggleUserMenu() {
  const userMenu = document.getElementById('userMenu');
  userMenu.style.display = userMenu.style.display === 'none' ? 'block' : 'none';
}

// 비밀번호 찾기
const sendPwBtn = document.getElementById('sendPwBtn');
const pwSentMsg = document.getElementById('pwSentMsg');
const resendPwBtn = document.getElementById('resendPwBtn');

sendPwBtn.onclick = () => {
  pwSentMsg.style.display = 'block';
  resendPwBtn.style.display = 'inline-block';
};

resendPwBtn.onclick = () => {
  alert('임시 비밀번호가 다시 전송되었습니다.');
}
