const bookmarkedIndexes = JSON.parse(localStorage.getItem("bookmarkedRecipes")) || [];

const allRecipes = [];
for (let i = 1; i <= 100; i++) {
  allRecipes.push({
    name: `레시피 ${i}`,
    img: `https://via.placeholder.com/300x200.png?text=레시피+${i}`,
    link: ..\recipe-screen2.html?id=${i}`
  });
}

const recipes = bookmarkedIndexes.map(idx => allRecipes[idx]).filter(Boolean);

const cardContainer = document.getElementById('card-container');
const pagination = document.getElementById('pagination');
const itemsPerPage = 20;
let currentPage = 1;

function displayCards(page) {
  cardContainer.innerHTML = '';
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = recipes.slice(start, end);

  currentItems.forEach(recipe => {
    const card = document.createElement('a');
    card.href = recipe.link;
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

if (recipes.length === 0) {
  cardContainer.innerHTML = '<p>북마크한 레시피가 없습니다.</p>';
  pagination.innerHTML = '';
} else {
  displayCards(currentPage);
  setupPagination();
}

const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    // 레시피 데이터 (id, 이름, 설명, 이미지)
    const allRecipes = [];
    for (let i = 1; i <= 100; i++) {
      allRecipes.push({
        id: i,
        name: `레시피 ${i}`,
        img: `https://via.placeholder.com/300x200.png?text=레시피+${i}`,
        description: `이것은 레시피 ${i}의 설명입니다.`
      });
    }

    // 해당 레시피 찾기
    const recipe = allRecipes.find(r => r.id === parseInt(recipeId));

    if (recipe) {
      document.getElementById('recipe-name').textContent = recipe.name;
      document.getElementById('recipe-img').src = recipe.img;
      document.getElementById('recipe-description').textContent = recipe.description;
    } else {
      document.getElementById('recipe-detail').innerHTML = '<p>레시피를 찾을 수 없습니다.</p>';
    }
