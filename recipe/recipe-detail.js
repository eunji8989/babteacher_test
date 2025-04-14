document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  const recipes = [
    {
      id: 1,
      name: "된장찌개",
      ingredients: "된장, 양파, 바나나",
      instructions: [
        "멸치 육수를 먼저 끓여주세요.",
        "된장을 풀고 두부와 애호박을 넣습니다.",
        "보글보글 끓으면 마무리!"
      ],
      videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      img: "https://via.placeholder.com/200x150"
    },
    {
      id: 2,
      name: "김치찌개",
      ingredients: "김치, 돼지고기, 두부",
      instructions: [
        "고기를 볶고 김치를 넣습니다.",
        "물과 양념을 넣고 끓입니다.",
        "두부를 넣고 한소끔 끓여 마무리!"
      ],
      videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      img: "https://via.placeholder.com/200x150"
    }
    // 추가적인 레시피들을 여기에 삽입할 수 있습니다.
  ];

  const recipe = recipes.find(r => r.id == recipeId);
  const recipeName = document.getElementById("recipe-name");
  const recipeDetailContainer = document.getElementById("recipe-detail");

  if (recipe) {
    recipeName.textContent = recipe.name;

    recipeDetailContainer.innerHTML = `
      <img src="${recipe.img}" alt="${recipe.name}" />
      <div class="recipe-ingredients">필요 재료: ${recipe.ingredients}</div>
      <div class="recipe-instructions">
        <h3>레시피:</h3>
        <ul>
          ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
        </ul>
      </div>
      <a href="${recipe.videoLink}" target="_blank" class="video-link">동영상 보기</a>
    `;
  } else {
    recipeDetailContainer.innerHTML = "<p>레시피를 찾을 수 없습니다.</p>";
  }
});
