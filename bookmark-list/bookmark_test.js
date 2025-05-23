<!-- HTML에서 불러올 요소들 -->
<!--
<div id="card-container"></div>
<div id="pagination"></div>
<div id="recipe-detail" style="display:none;">
  <h2 id="recipe-name"></h2>
  <img id="recipe-img" />
  <p id="recipe-description"></p>
</div>
-->

<script>
const userId = "664e5e123abc..."; // 실제 로그인된 사용자 ID
const cardContainer = document.getElementById('card-container');
const pagination = document.getElementById('pagination');
const recipeDetail = document.getElementById('recipe-detail');
const recipeName = document.getElementById('recipe-name');
const recipeImg = document.getElementById('recipe-img');
const recipeDescription = document.getElementById('recipe-description');

const itemsPerPage = 20;
let currentPage = 1;
let recipes = []; // ✅ 전역에 선언

// 1. 북마크된 레시피 fetch
fetch(`http://localhost:5000/user/${userId}/bookmarks`)
  .then((response) => response.json())
  .then((data) => {
    const bookmarkedRecipes = data.bookmarkedRecipes || [];

    // 2. 필요한 형태로 매핑
    recipes = bookmarkedRecipes.map(recipe => ({
      id: parseInt(recipe.id || "0"), // null이면 0
      name: recipe.title || "제목 없음",
      img: recipe.thumbnail || "no-image.png",
      description: recipe.description || "설명이 없습니다.",
      link: recipe.link || "#"
    }));

    // 3. 초기 렌더링
    if (recipes.length === 0) {
      cardContainer.innerHTML = '<p>북마크한 레시피가 없습니다.</p>';
      pagination.innerHTML = '';
      recipeDetail.style.display = 'none';
    } else {
      displayCards(currentPage);
      setupPagination();
    }
  })
  .catch((err) => {
    console.error("API 오류:", err);
    cardContainer.innerHTML = '<p>레시피를 불러오는 데 실패했습니다.</p>';
  });

// 4. 카드 출력 함수
function displayCards(page) {
  cardContainer.innerHTML = '';
  recipeDetail.style.display = 'none';

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = recipes.slice(start, end);

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

// 5. 상세 보기 함수 (미사용이지만 참고)
function showRecipeDetail(recipe) {
  recipeName.textContent = recipe.name;
  recipeImg.src = recipe.img;
  recipeDescription.textContent = recipe.description;
  recipeDetail.style.display = 'block';
  recipeDetail.scrollIntoView({ behavior: 'smooth' });
}

// 6. 페이지네이션
function setupPagination() {
  pagination.innerHTML = '';
  const pageCount = Math.ceil(recipes.length / itemsPerPage);

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
</script>
