// modalHandlers.js
import { modalTerms, modalForm, modalComplete, modalLogin, modalFindPw, closeAll, closeModalWithAnimation } from './modalElements.js';

export function initModalEventListeners() {
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

  document.getElementById("nextToForm").onclick = () => {
    modalTerms.style.display = "none";
    modalForm.style.display = "block";
  };

  document.getElementById("backToTerms").onclick = () => {
    modalForm.style.display = "none";
    modalTerms.style.display = "block";
  };

  // ... 이하 생략 (나머지 버튼 이벤트도 여기에)

  document.getElementById("goToLogin").addEventListener('click', () => {
    modalComplete.style.display = 'none';
    modalLogin.style.display = 'block';
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
}
