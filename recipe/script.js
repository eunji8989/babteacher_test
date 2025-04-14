fetch('recipes.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('recipe-container');

    data.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';

      card.innerHTML = `
        <img src="${recipe.thumbnail}" alt="${recipe.title}" class="thumbnail" />
        <h2>${recipe.title}</h2>
        <p><strong>재료:</strong> ${recipe.ingredients}</p>
        <p><strong>카테고리:</strong> ${recipe.category}</p>
        <p><strong>업로드일자:</strong> ${recipe.upload_date}</p>
        <p><strong>조회수:</strong> ${recipe.views}</p>
        <ol>
          ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
        <a href="${recipe.video}" target="_blank">🎥 동영상 보기</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('❌ JSON 불러오기 실패:', error);
  });
