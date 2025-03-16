
import { recipes } from "./recipes.mjs";

function getRandomListEntry(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join("");
}

function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    
    for (let i = 1; i <= 5; i++) {
        html += i <= rating 
            ? `<span aria-hidden="true" class="icon-star">⭐</span>` 
            : `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
    
    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    return `<figure class="recipe">
        <img src="${recipe.image}" alt="image of ${recipe.name}" />
        <figcaption>
            <ul class="recipe__tags">
                ${tagsTemplate(recipe.tags)}
            </ul>
            <h2><a href="#">${recipe.name}</a></h2>
            <p class="recipe__ratings">
                ${ratingTemplate(recipe.rating)}
            </p>
            <p class="recipe__description">
                ${recipe.description}
            </p>
        </figcaption>
    </figure>`;
}

function renderRecipes(recipeList) {
    const outputElement = document.querySelector("#recipes-container");
    outputElement.innerHTML = recipeList.map(recipeTemplate).join("");
}

function filterRecipes(query) {
    return recipes
        .filter(recipe => 
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
            recipe.ingredients.find(ingredient => ingredient.toLowerCase().includes(query))
        )
        .sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(event) {
    event.preventDefault();
    const query = document.querySelector("#search-input").value.trim().toLowerCase();
    const results = query ? filterRecipes(query) : recipes;
    renderRecipes(results);
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);

    document.querySelector("#search-button").addEventListener("click", searchHandler);
}

init();
