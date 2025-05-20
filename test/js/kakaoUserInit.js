// kakaoUserInit.js
import { modalComplete } from './modalElements.js';

export function initKakaoUser() {
  window.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("kakaoUser"));
    const isNewUser = localStorage.getItem("isNewUser") === "true";

    if (userData && userData.user && userData.user.nickname) {
      document.getElementById("welcome").innerText = `${userData.user.nickname}님 환영합니다!`;

      if (isNewUser) {
        modalComplete.style.display = "block";
        document.querySelector("#modal-complete h3").innerText = "회원가입 완료";
        document.querySelector("#modal-complete p").innerText = "카카오 회원가입이 완료되었습니다!";
      }
    }
  });
}

export function kakaoLogout() {
  localStorage.removeItem("kakaoUser");
  location.reload();
}
