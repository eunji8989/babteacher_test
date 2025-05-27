// 모든 toggle-switch 요소에 클릭 이벤트 추가
  document.querySelectorAll('.toggle-switch').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
    });
  });

  const modal = document.getElementById('modal');
  const openBtn = document.getElementById('openModalBtn');
  const cancelBtn = document.querySelector('.cancel-btn');
  const confirmBtn = document.querySelector('.confirm-btn');
  const fileInput = document.getElementById('fileInput');
  const previewImg = document.getElementById('previewImg');
  const mainProfileImg = document.getElementById('mainProfileImg');

  openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    previewImg.src = mainProfileImg.src;
  });

  cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    fileInput.value = '';
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        previewImg.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  confirmBtn.addEventListener('click', () => {
    modal.style.display = 'none';

    if (fileInput.files[0]) {
      mainProfileImg.src = previewImg.src;
      console.log('이미지 변경 완료');
    }
  });

  function confirmProfileChange() {
    alert("프로필이 변경되었습니다.");
    closeProfileModal();
}

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function(){
    const img = document.querySelector('.profile-modal img');
    img.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

  const usernameModal = document.getElementById('usernameModal');
  const openBtn2 = document.getElementById('openUsernameModalBtn');
  const cancelBtn2 = document.querySelector('.cancel-btn');
  const confirmBtn2 = document.getElementById('confirmUsernameBtn');
  const alertBox = document.getElementById('usernameChangeAlert');

  openBtn2.addEventListener('click', () => {
    usernameModal.style.display = 'flex';
  });

  cancelBtn2.addEventListener('click', () => {
    usernameModal.style.display = 'none';
  });

  confirmBtn2.addEventListener('click', () => {
    usernameModal.style.display = 'none';

    // 알림 띄우기
    alertBox.style.display = 'block';
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 2000);
  });

  // 중복확인 버튼 클릭 시
  document.getElementById('checkDuplicateBtn').addEventListener('click', () => {
    const newUsername = document.getElementById('newUsername').value;
    alert(`"${newUsername}" 중복 확인 완료 (예시)`);
  });

  const emailModal = document.getElementById('emailModal');
  const openBtn3 = document.getElementById('openEmailModalBtn');
  const cancelBtn3 = document.querySelector('.cancel-btn');
  const confirmBtn3 = document.getElementById('confirmEmailBtn');
  const alertBox2 = document.getElementById('emailChangeAlert');

  openBtn3.addEventListener('click', () => {
    emailModal.style.display = 'flex';
  });

  cancelBtn3.addEventListener('click', () => {
    emailModal.style.display = 'none';
  });

  confirmBtn3.addEventListener('click', () => {
    emailModal.style.display = 'none';

    // 알림 띄우기
    alertBox2.style.display = 'block';
    setTimeout(() => {
      alertBox2.style.display = 'none';
    }, 2000);
  });

  // 중복확인 버튼 클릭 시
  document.getElementById('checkDuplicateBtn2').addEventListener('click', () => {
    const newEmail = document.getElementById('newEmail').value;
    alert(`"${newEmail}" 중복 확인 완료 (예시)`);
  });