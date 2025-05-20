// eventListeners.js
import { modalTerms, modalForm, modalComplete, modalLogin, modalFindPw } from './modalElements.js';
import { openSignupModal, openLoginModal, closeAll } from './modalControls.js';

export function addEventListeners() {
  document.getElementById('openSignup').addEventListener('click', e => {
    e.preventDefault();
    openSignupModal();
  });

  document.getElementById('openLogin').addEventListener('click', e => {
    e.preventDefault();
    openLoginModal();
  });

  document.getElementById("nextToForm").onclick = () => {
    modalTerms.style.display = "none";
    modalForm.style.display = "block";
  };

  document.getElementById("backToTerms").onclick = () => {
    modalForm.style.display = "none";
    modalTerms.style.display = "block";
  };

  document.getElementById("nextBtn").addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const nickname = document.getElementById('nickname').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const emailId = document.getElementById('email-id').value.trim();
    const domain = document.getElementById('custom-domain').value.trim() || document.getElementById('email-domain').value;

    if (!username || !nickname || !password || !confirmPassword || !emailId || !domain) {
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

  document.querySelectorAll(".check-btn").forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      alert("중복 확인 완료!");
    });
  });

  document.getElementById("goToLogin").addEventListener('click', function () {
    modalComplete.style.display = 'none';
    modalLogin.style.display = 'block';
  });

  document.getElementById("loginToSignup").onclick = () => {
    modalLogin.style.display = "none";
    modalTerms.style.display = "block";
  };

  document.getElementById("openFindPw").onclick = () => {
    modalLogin.style.display = "none";
    modalFindPw.style.display = "block";
  };

  document.getElementById("sendPwBtn").onclick = () => {
    const email = document.getElementById("findPwEmail").value;
    if (!email) {
      alert("이메일을 입력하세요.");
      return;
    }
    document.getElementById("pwSentMsg").style.display = "block";
    document.getElementById("resendPwBtn").style.display = "inline-block";
  };
}
