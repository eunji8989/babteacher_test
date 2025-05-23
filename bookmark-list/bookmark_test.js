// bookmark2.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. 로그인한 사용자 정보 불러오기 (세션/쿠키 기반)
  fetch("http://localhost:5000/me", {
    credentials: "include" // 쿠키 포함
  })
    .then(res => {
      if (!res.ok) throw new Error("로그인 필요");
      return res.json();
    })
    .then(user => {
      const userId = user._id;

      // 2. 사용자 북마크 레시피 불러오기
      return fetch(`http://localhost:5000/user/${userId}/bookmarks`, {
        credentials: "include"
      });
    })
    .then(res => {
      if (!res.ok) throw new Error("북마크 레시피 불러오기 실패");
      return res.json();
    })
    .then(data => {
      // 3. 북마크된 레시피 데이터
      const rawRecipes = data.bookmarkedRecipes || [];

      // 4. 필요한 형태로 매핑
      window.recipes = rawRecipes.map(recipe => ({
        id: parseInt(recipe.id),
        name: recipe.title,
        img: recipe.thumbnail,
        description: "설명이 없습니다.", // 설명 없으면 기본값
        link: recipe.link
      }));

      // 5. DOM 요소 참조
      const cardContainer = document.getElementById('card-container');
      const pagination = document.getElementById('pagination');
      const recipeDetail = document.getElementById('recipe-detail');
      const recipeName = document.getElementById('recipe-name');
      const recipeImg = document.getElementById('recipe-img');
      const recipeDescription = document.getElementById('recipe-description');

      const itemsPerPage = 20;
      let currentPage = 1;

      // 6. 카드 표시 함수
      function displayCards(page) {
        cardContainer.innerHTML = '';
        recipeDetail.style.display = 'none';

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const currentItems = window.recipes.slice(start, end);

        currentItems.forEach(recipe => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <img src="${recipe.img}" alt="${recipe.name}">
            <div class="card-content">${recipe.name}</div>
          `;
          card.addEventListener("click", () => {
            window.location.href = recipe.link;
          });
          cardContainer.appendChild(card);
        });
      }

      // 7. 상세 정보 표시 함수
      function showRecipeDetail(recipe) {
        recipeName.textContent = recipe.name;
        recipeImg.src = recipe.img;
        recipeDescription.textContent = recipe.description;
        recipeDetail.style.display = 'block';
        recipeDetail.scrollIntoView({ behavior: 'smooth' });
      }

      // 8. 페이지네이션 함수
      function setupPagination() {
        pagination.innerHTML = '';
        const pageCount = Math.ceil(window.recipes.length / itemsPerPage);

        const prevButton = document.createElement('button');
        prevButton.textContent = '이전';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
          if (currentPage > 1) {
            currentPage--;
            displayCards(currentPage);
            setupPagination();
          }
        });
        pagination.appendChild(prevButton);

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

        const nextButton = document.createElement('button');
        nextButton.textContent = '다음';
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

      // 9. 초기 실행
      if (window.recipes.length === 0) {
        cardContainer.innerHTML = '<p>북마크한 레시피가 없습니다.</p>';
        pagination.innerHTML = '';
        recipeDetail.style.display = 'none';
      } else {
        displayCards(currentPage);
        setupPagination();
      }
    })
    .catch(err => {
      console.error("오류:", err);
      const container = document.getElementById("bookmark-container");
      if(container) container.innerHTML = `<p>오류 발생: ${err.message}</p>`;
    });
});
