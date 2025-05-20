// loginUser.js
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

export function toggleUserMenu() {
  const menu = document.getElementById("userMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

export function setupUserMenuOutsideClick() {
  document.addEventListener("click", function (e) {
    const profile = document.getElementById("userProfile");
    const menu = document.getElementById("userMenu");
    if (!profile.contains(e.target)) {
      menu.style.display = "none";
    }
  });
}
