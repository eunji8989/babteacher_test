// signup.js
export function initSignup() {
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

    // 가입 완료 모달 띄우기
    document.getElementById('modal-form').style.display = 'none';
    document.getElementById('modal-complete').style.display = 'block';
  });

  document.querySelectorAll(".check-btn").forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      alert("중복 확인 완료!");
    });
  });
}
