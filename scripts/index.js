import { recipes } from "./data/recipes.js";
import { recipeCard } from "./templates/card.js";
import { setContainerHeight } from "./templates/header.js";
import { dropdown } from "./logic/dropdown.js";

let recipeObject = {};

const cardsContainer = document.getElementById("cards_container");

/**
 * Iterates through recipes data and renders recipe cards in the DOM.
 * @param {Array<Object>} recipes - Array of recipe objects.
 */
recipes.forEach((recipe) => {
    recipeObject = recipe;

    const card = new recipeCard(recipeObject);
    const recipeContent = card.getRecipeCardDOM();

    cardsContainer.appendChild(recipeContent);

});

/**
 * Initializes the dropdown functionality for ingredients, appliances, and utensils filters.
 */
dropdown();

/**
 * Sets the container height on DOM content load and window resize.
 */
document.addEventListener('DOMContentLoaded', setContainerHeight);
window.addEventListener('resize', setContainerHeight);
