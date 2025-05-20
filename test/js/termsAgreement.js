// termsAgreement.js
const agreeAll = document.getElementById("agreeAll");
const checks = document.querySelectorAll(".terms-check");
const nextBtn = document.getElementById("nextToForm");

export function initTermsAgreement() {
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
