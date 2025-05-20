// modalControls.js
import { modalTerms, modalForm, modalComplete, modalLogin, modalFindPw } from './modalElements.js';

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

export function openSignupModal() {
  closeAll();
  modalTerms.style.display = "block";
}

export function openLoginModal() {
  closeAll();
  modalLogin.style.display = "block";
}
