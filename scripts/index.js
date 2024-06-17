import { recipes } from "./data/recipes.js";
import { recipeCard } from "./templates/card.js";
import { setContainerHeight } from "./templates/header.js";
import { dropdown } from "./logic/dropdown.js";

let recipeObject = {};

const cardsContainer = document.getElementById("cards_container");

recipes.forEach((recipe) => {
    recipeObject = recipe;

    const card = new recipeCard(recipeObject);
    const recipeContent = card.getRecipeCardDOM();

    cardsContainer.appendChild(recipeContent);

});

dropdown();

document.addEventListener('DOMContentLoaded', setContainerHeight);
window.addEventListener('resize', setContainerHeight);
