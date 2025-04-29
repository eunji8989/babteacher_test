// bookmark2.js

// 1. 북마크된 레시피 객체 불러오기
const bookmarkedRecipes = JSON.parse(localStorage.getItem("bookmarkedRecipes")) || [];

// 2. 북마크된 레시피만 추출 (필요한 형태로 매핑)
const recipes = bookmarkedRecipes.map(recipe => ({
  id: parseInt(recipe.id),
  name: recipe.title,
  img: recipe.thumbnail,
  description: "설명이 없습니다.", // 필요 시 localStorage에 설명도 추가
  link: recipe.link
}));

// 3. DOM 요소 참조
const cardContainer = document.getElementById('card-container');
const pagination = document.getElementById('pagination');
const recipeDetail = document.getElementById('recipe-detail');
const recipeName = document.getElementById('recipe-name');
const recipeImg = document.getElementById('recipe-img');
const recipeDescription = document.getElementById('recipe-description');

const itemsPerPage = 20;
let currentPage = 1;

// 4. 카드 표시 함수
function displayCards(page) {
  cardContainer.innerHTML = '';
  recipeDetail.style.display = 'none'; // 상세 영역 숨김

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

    // 카드 클릭 시 레시피 화면 이동
    card.addEventListener("click", () => {
    window.location.href = item.link;
    });

    cardContainer.appendChild(card);
  });
}

// 5. 상세 정보 표시 함수
function showRecipeDetail(recipe) {
  recipeName.textContent = recipe.name;
  recipeImg.src = recipe.img;
  recipeDescription.textContent = recipe.description;
  recipeDetail.style.display = 'block';
  recipeDetail.scrollIntoView({ behavior: 'smooth' });
}

// 6. 페이지네이션 함수
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

// 7. 초기 실행
if (recipes.length === 0) {
  cardContainer.innerHTML = '<p>북마크한 레시피가 없습니다.</p>';
  pagination.innerHTML = '';
  recipeDetail.style.display = 'none';
} else {
  displayCards(currentPage);
  setupPagination();
}
