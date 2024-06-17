import { recipes } from "../data/recipes.js";
import { store } from "../utils/store.js";
import { recipeCard } from "../templates/card.js";
import { dropdown } from "./dropdown.js";

/**
 * Filters recipes based on search criteria and selected filters, then updates the displayed recipe cards.
 */
export function recipesFilterWithLoops() {
  const cardsContainer = document.getElementById("cards_container");

  const searchbarValue = store.searchbarValue;
  const selectedIngredients = store.selectedIngredients;
  const selectedAppliances = store.selectedAppliances;
  const selectedUstensils = store.selectedUstensils;

  const filteredRecipes = [];
  const hasSearchbarValue = searchbarValue.length >= 3;

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let searchbarValueCondition = true;

    if (hasSearchbarValue) {
      const normalizedSearchValue = searchbarValue
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase();
      const recipeName = recipe.name
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase();
      const recipeDescription = recipe.description
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase();

      let ingredientFound = false;
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j].ingredient
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase();
        if (ingredient.includes(normalizedSearchValue)) {
          ingredientFound = true;
          break;
        }
      }

      searchbarValueCondition = recipeName.includes(normalizedSearchValue) ||
        recipeDescription.includes(normalizedSearchValue) ||
        ingredientFound;
    }

    let ingredientCondition = true;
    if (selectedIngredients.length > 0) {
      for (let j = 0; j < selectedIngredients.length; j++) {
        const ingredient = selectedIngredients[j];
        if (!recipe.ingredients.some((c) => c.ingredient === ingredient)) {
          ingredientCondition = false;
          break;
        }
      }
    }

    let applianceCondition = true;
    if (selectedAppliances.length > 0) {
      for (let j = 0; j < selectedAppliances.length; j++) {
        const appliance = selectedAppliances[j];
        if (!recipe.appliance.includes(appliance)) {
          applianceCondition = false;
          break;
        }
      }
    }

    let utensilCondition = true;
    if (selectedUstensils.length > 0) {
      for (let j = 0; j < selectedUstensils.length; j++) {
        const utensil = selectedUstensils[j];
        if (!recipe.ustensils.includes(utensil)) {
          utensilCondition = false;
          break;
        }
      }
    }

    if (searchbarValueCondition && ingredientCondition && applianceCondition && utensilCondition) {
      filteredRecipes.push(recipe);
    }
  }

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
  for (let i = 0; i < store.recipesStore.length; i++) {
    const card = new recipeCard(store.recipesStore[i]);
    const recipeContent = card.getRecipeCardDOM();
    cardsContainer.appendChild(recipeContent);
    dropdown();
  }

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