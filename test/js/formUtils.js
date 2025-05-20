// formUtils.js
export function initAgreeAll() {
  const agreeAll = document.getElementById("agreeAll");
  const checks = document.querySelectorAll(".terms-check");
  const nextBtn = document.getElementById("nextToForm");

  agreeAll.addEventListener("change", function () {
    checks.forEach(chk => chk.checked = this.checked);
    toggleNextButton();
  });

  checks.forEach(chk => {
    chk.addEventListener("change", () => {
      agreeAll.checked = [...checks].every(chk => chk.checked);
      toggleNextButton();
    });
  });

  function toggleNextButton() {
    const allChecked = [...checks].every(chk => chk.checked);
    nextBtn.disabled = !allChecked;
  }
}

export function initCustomPlaceholders() {
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
}

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

export function initEmailDomainSelect() {
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
}
