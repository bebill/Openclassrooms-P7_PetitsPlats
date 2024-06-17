import { recipes } from "../data/recipes.js";
import { store } from "../utils/store.js";
import { recipeCard } from "../templates/card.js";
import { dropdown } from "./dropdown.js";

export function recipesFilter() {
  const cardsContainer = document.getElementById("cards_container");

  const searchbarValue = store.searchbarValue;
  const selectedIngredients = store.selectedIngredients;
  const selectedAppliances = store.selectedAppliances;
  const selectedUstensils = store.selectedUstensils;

  const filteredRecipes = recipes.filter((recipe) => {
    const hasSearchbarValue = searchbarValue.length >= 3;
    const hasIngredients = selectedIngredients.length > 0;
    const hasAppliances = selectedAppliances.length > 0;
    const hasUstensils = selectedUstensils.length > 0;

    const searchbarValueCondition = hasSearchbarValue
      ? recipe.name
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase()
        .includes(searchbarValue.toLocaleLowerCase()) ||
      recipe.description
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase()
        .includes(searchbarValue.toLocaleLowerCase()) ||
      recipe.ingredients.some((c) => c.ingredient.normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchbarValue))
      : true;

    const ingredientCondition = hasIngredients
      ? selectedIngredients.every((ingredient) =>
        recipe.ingredients.map((c) => c.ingredient).includes(ingredient)
      )
      : true;

    const applianceCondition = hasAppliances
      ? selectedAppliances.every((appliance) =>
        recipe.appliance.includes(appliance)
      )
      : true;

    const utensilCondition = hasUstensils
      ? selectedUstensils.every((ustensil) =>
        recipe.ustensils.includes(ustensil)
      )
      : true;

    return (
      searchbarValueCondition &&
      ingredientCondition &&
      applianceCondition &&
      utensilCondition
    );
  });

  cardsContainer.innerHTML = "";

  if (filteredRecipes.length < 1) {
    cardsContainer.innerHTML = `<div class="alert" role="alert">
    Aucune recette ne contient "${searchbarValue}", vous pouvez chercher «
    tarte aux pommes », « poisson », etc.</span>
  </div>`;
  }

  store.addRecipesStore(filteredRecipes);

  store.recipesStore.forEach((recipe) => {
    const card = new recipeCard(recipe);
    const recipeContent = card.getRecipeCardDOM();

    cardsContainer.appendChild(recipeContent);
    dropdown();
  });

  updateRecipesCount();
}

function updateRecipesCount() {
  const recipeCountElement = document.getElementById("total_recipes_number");
  const numberOfRecipes = store.recipesStore.length;
  let recipeText;

  if (numberOfRecipes === 0) {
    recipeText = 'Aucune recette';
  } else {
    recipeText = numberOfRecipes === 1 ? 'recette' : 'recettes';
  }
  recipeCountElement.textContent = numberOfRecipes === 0 ? recipeText : `${numberOfRecipes} ${recipeText}`;
}