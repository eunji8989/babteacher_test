// emailDomainSelect.js
const domainSelect = document.getElementById("email-domain");
const customDomain = document.getElementById("custom-domain");

export function initEmailDomainSelect() {
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
