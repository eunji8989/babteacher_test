// passwordToggle.js
export function togglePassword(inputId, icon) {
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
