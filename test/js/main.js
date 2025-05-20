// main.js
import { modalTerms, modalForm } from './modalElements.js';
import { openSignupModal, openLoginModal } from './modalControls.js';
import { addEventListeners } from './eventListeners.js';
import { initTermsAgreement } from './termsAgreement.js';
import { initCustomPlaceholder } from './customPlaceholder.js';
import { initEmailDomainSelect } from './emailDomainSelect.js';
import { setupUserMenuOutsideClick } from './loginUser.js';
import { initKakaoUser } from './kakaoUserInit.js';

function init() {
  addEventListeners();
  initTermsAgreement();
  initCustomPlaceholder();
  initEmailDomainSelect();
  setupUserMenuOutsideClick();
  initKakaoUser();
}

init();
