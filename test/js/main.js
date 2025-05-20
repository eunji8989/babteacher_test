import { modalTerms, modalComplete } from './modalElements.js';
import { getUserData, isNewUser, kakaoLogout } from './userAuth.js';
import { initModalEventListeners } from './modalHandlers.js';
import { initAgreeAll, initCustomPlaceholders, initEmailDomainSelect } from './formUtils.js';
import { initSignup } from './signup.js';

window.addEventListener("DOMContentLoaded", () => {
  const userData = getUserData();
  if (userData && userData.user && userData.user.nickname) {
    document.getElementById("welcome").innerText = `${userData.user.nickname}님 환영합니다!`;

    if (isNewUser()) {
      modalComplete.style.display = "block";
      document.querySelector("#modal-complete h3").innerText = "회원가입 완료";
      document.querySelector("#modal-complete p").innerText = "카카오 회원가입이 완료되었습니다!";
    }
  }

  initModalEventListeners();
  initAgreeAll();
  initCustomPlaceholders();
  initEmailDomainSelect();
  initSignup();
});
