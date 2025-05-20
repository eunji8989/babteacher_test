// userAuth.js
export function getUserData() {
  return JSON.parse(localStorage.getItem("kakaoUser"));
}

export function isNewUser() {
  return localStorage.getItem("isNewUser") === "true";
}

export function kakaoLogout() {
  localStorage.removeItem("kakaoUser");
  location.reload();
}

export function loginSuccess(nickname, profileUrl) {
  document.getElementById('authMenu').style.display = 'none';
  document.getElementById('userProfile').style.display = 'flex';
  document.querySelector('.nickname').textContent = nickname;
  document.querySelector('.profile-img').src = profileUrl;
}

export function logout() {
  document.getElementById("authButtons").style.display = "flex";
  document.getElementById("userProfile").style.display = "none";
  document.getElementById("userMenu").style.display = "none";
  localStorage.removeItem("kakaoUser");
  alert("로그아웃 되었습니다.");
}
