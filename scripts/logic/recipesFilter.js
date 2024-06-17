import { recipes } from "../data/recipes.js";
import { store } from "../utils/store.js";
import { recipeCard } from "../templates/card.js";
import { dropdown } from "./dropdown.js";

/**
 * Filters recipes based on search criteria and selected filters, then updates the displayed recipe cards.
 */
export function recipesFilterWithArrayMethods() {
  const cardsContainer = document.getElementById("cards_container");

  const searchbarValue = store.searchbarValue;
  const selectedIngredients = store.selectedIngredients;
  const selectedAppliances = store.selectedAppliances;
  const selectedUstensils = store.selectedUstensils;

  const hasSearchbarValue = searchbarValue.length >= 3;
  const normalizedSearchValue = searchbarValue
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    const searchbarValueCondition = hasSearchbarValue
      ? recipe.name
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase()
        .includes(normalizedSearchValue) ||
      recipe.description
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase()
        .includes(normalizedSearchValue) ||
      recipe.ingredients.some((c) => c.ingredient
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase()
        .includes(normalizedSearchValue))
      : true;

    const ingredientCondition = selectedIngredients.length > 0
      ? selectedIngredients.every((ingredient) =>
        recipe.ingredients.some((c) => c.ingredient === ingredient)
      )
      : true;

    const applianceCondition = selectedAppliances.length > 0
      ? selectedAppliances.every((appliance) =>
        recipe.appliance.includes(appliance)
      )
      : true;

    const utensilCondition = selectedUstensils.length > 0
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

  // Update the store with filtered recipes
  store.addRecipesStore(filteredRecipes);

  // Render filtered recipe cards using Array.prototype.forEach
  store.recipesStore.forEach((recipe) => {
    const card = new recipeCard(recipe);
    const recipeContent = card.getRecipeCardDOM();
    cardsContainer.appendChild(recipeContent);
    dropdown();
  });

  updateRecipesCount();
}

/**
 * Updates the displayed count of recipes based on the current filter settings.
 */
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




