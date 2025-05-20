// modalElements.js
export const modalTerms = document.getElementById("modal-terms");
export const modalForm = document.getElementById("modal-form");
export const modalComplete = document.getElementById("modal-complete");
export const modalLogin = document.getElementById("modal-login");
export const modalFindPw = document.getElementById("modal-findpw");

export function closeAll() {
  modalTerms.style.display = "none";
  modalForm.style.display = "none";
  modalComplete.style.display = "none";
  modalLogin.style.display = "none";
  modalFindPw.style.display = "none";
}

export function closeModalWithAnimation(modal) {
  const content = modal.querySelector('.modal-content');
  content.style.animation = 'slideOutToLeft 0.4s ease forwards';
  setTimeout(() => {
    modal.style.display = 'none';
    content.style.animation = 'slideInFromRight 0.4s ease forwards';
  }, 400);
}
