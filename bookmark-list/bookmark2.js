// bookmark2.js

// 1. 북마크된 인덱스를 불러오기
const bookmarkedIndexes = JSON.parse(localStorage.getItem("bookmarkedRecipes")) || [];

// 2. 전체 레시피 데이터 생성
const allRecipes = [];
for (let i = 1; i <= 100; i++) {
  allRecipes.push({
    id: i,
    name: `레시피 ${i}`,
    img: `https://via.placeholder.com/300x200.png?text=레시피+${i}`,
    description: `이것은 레시피 ${i}의 설명입니다.`,
    link: `../recipe-screen/recipe-screen2.html?id=${i}`
  });
}

// 3. 북마크된 레시피만 추출
const recipes = bookmarkedIndexes.map(idx => allRecipes[idx - 1]).filter(Boolean);

// 4. DOM 요소 참조
const cardContainer = document.getElementById('card-container');
const pagination = document.getElementById('pagination');
const recipeDetail = document.getElementById('recipe-detail');
const recipeName = document.getElementById('recipe-name');
const recipeImg = document.getElementById('recipe-img');
const recipeDescription = document.getElementById('recipe-description');

const itemsPerPage = 20;
let currentPage = 1;

// 5. 카드 표시
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

    // 카드 클릭 시 상세 표시
    card.addEventListener('click', () => {
      showRecipeDetail(recipe);
    });

    cardContainer.appendChild(card);
  });
}

// 6. 상세 정보 표시 함수
function showRecipeDetail(recipe) {
  recipeName.textContent = recipe.name;
  recipeImg.src = recipe.img;
  recipeDescription.textContent = recipe.description;
  recipeDetail.style.display = 'block';
  recipeDetail.scrollIntoView({ behavior: 'smooth' });
}

// 7. 페이지네이션 세팅
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

// 8. 초기 실행
if (recipes.length === 0) {
  cardContainer.innerHTML = '<p>북마크한 레시피가 없습니다.</p>';
  pagination.innerHTML = '';
  recipeDetail.style.display = 'none';
} else {
  displayCards(currentPage);
  setupPagination();
}
