import { recipes } from "../data/recipes.js";
import { store } from "../utils/store.js";
import { recipeCard } from "../templates/card.js";
import { dropdown } from "./dropdown.js";

/**
 * Filters recipes based on selected filters, then updates the displayed recipe cards.
 */
export function recipesFilter() {
  const cardsContainer = document.getElementById("cards_container");

  const selectedIngredients = store.selectedIngredients;
  const selectedAppliances = store.selectedAppliances;
  const selectedUstensils = store.selectedUstensils;

  // Filtering recipes based on selected filters
  const filteredRecipes = recipes.filter((recipe) => {
    const hasIngredients = selectedIngredients.length > 0;
    const hasAppliances = selectedAppliances.length > 0;
    const hasUstensils = selectedUstensils.length > 0;


    //Check if the recipe contains all selected ingredients, appliances and ustensils
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

  // Render filtered recipe cards
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