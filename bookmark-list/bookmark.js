document.addEventListener("DOMContentLoaded", function () {
    const userProfile = document.getElementById("userProfile");
    const userMenu = document.getElementById("userMenu");
  
    if (userProfile && userMenu) {
      userProfile.addEventListener("click", function (event) {
        event.stopPropagation(); // 클릭 이벤트 전파 방지
        userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
      });
  
      // 바깥 클릭 시 드롭다운 닫기
      document.addEventListener("click", function (event) {
        if (!userProfile.contains(event.target)) {
          userMenu.style.display = "none";
        }
      });
    }
  });
  
  // 로그아웃 처리
  function logout() {
    const authButtons = document.getElementById("authButtons");
    const userProfile = document.getElementById("userProfile");
    const userMenu = document.getElementById("userMenu");
  
    if (authButtons && userProfile && userMenu) {
      authButtons.style.display = "flex";
      userProfile.style.display = "none";
      userMenu.style.display = "none";
    }
  
    alert("로그아웃 되었습니다.");
    window.location.href = "home.html";
  }  

    // 샘플 레시피 데이터 (이름, 이미지, 링크)
    const recipes = [];
    for (let i = 1; i <= 100; i++) { 
      recipes.push({
        name: `레시피 ${i}`,
        img: `https://via.placeholder.com/300x200.png?text=레시피+${i}`,
        link: `recipe screen.html`  // 사용자 HTML 페이지로 이동
      });
    }

    const cardContainer = document.getElementById('card-container');
    const pagination = document.getElementById('pagination');
    const itemsPerPage = 20; // 한 페이지에 20개만 표시
    let currentPage = 1;

    function displayCards(page) {
      cardContainer.innerHTML = '';
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const currentItems = recipes.slice(start, end);

      currentItems.forEach(recipe => {
        const card = document.createElement('a');
        card.href = recipe.link;  // HTML 페이지로 이동
        card.className = 'card';
        card.innerHTML = `
          <img src="${recipe.img}" alt="${recipe.name}">
          <div class="card-content">${recipe.name}</div>
        `;
        cardContainer.appendChild(card);
      });
    }

    function setupPagination() {
      pagination.innerHTML = '';
      const pageCount = Math.ceil(recipes.length / itemsPerPage);

      // 이전 버튼
      const prevButton = document.createElement('button');
      prevButton.textContent = '이전';
      prevButton.classList.add('prev');
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          displayCards(currentPage);
          setupPagination();
        }
      });
      pagination.appendChild(prevButton);

      // 페이지 번호
      for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === currentPage) btn.classList.add('active');
        btn.addEventListener('click', () => {
          currentPage = i;
          displayCards(currentPage);
          setupPagination();
        });
        pagination.appendChild(btn);
      }

      // 다음 버튼
      const nextButton = document.createElement('button');
      nextButton.textContent = '다음';
      nextButton.classList.add('next');
      nextButton.disabled = currentPage === pageCount;
      nextButton.addEventListener('click', () => {
        if (currentPage < pageCount) {
          currentPage++;
          displayCards(currentPage);
          setupPagination();
        }
      });
      pagination.appendChild(nextButton);
    }

    // 초기 표시
    displayCards(currentPage);
    setupPagination();
