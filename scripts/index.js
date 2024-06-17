import { recipes } from "./data/recipes.js";
import { recipeCard } from "./templates/card.js";
import { setContainerHeight } from "./templates/header.js";
import { dropdown } from "./logic/dropdown.js";
import { validSearchField } from "./logic/validSearch.js";
import { recipesFilterWithArrayMethods } from "./logic/recipesFilter.js";
import { store } from "./utils/store.js";

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

const searchbarInput = document.getElementById("main_search_bar_input");
const searchClose = document.getElementById("clear_main_search_bar");
const form = document.getElementById("main_search_bar");
const dropdownSearchInputs = document.getElementsByClassName('dropdown_search');

/**
 * Prevents the default form submission behavior for the main search bar form.
 * @param {Event} event - The submit event.
 */
form.addEventListener("submit", function (event) {
    event.preventDefault();
});
validSearchField(searchbarInput, recipes);

/**
 * Initializes the dropdown functionality for ingredients, appliances, and utensils filters.
 */
dropdown();


/**
 * Shows or hides the clear button in the main search bar based on input value.
 * Clears the main search bar input and triggers recipes filter on click.
 */
searchbarInput.addEventListener("input", function () {
    if (searchbarInput.value) {
        searchClose.style.display = "block";
    } else {
        searchClose.style.display = "none";
    }
});

searchClose.addEventListener("click", function () {
    searchbarInput.value = "";
    searchClose.style.display = "none";
    store.searchbarValue = "";
    recipesFilterWithArrayMethods();
});

/**
 * Sets the container height on DOM content load and window resize.
 * Clears the search inputs of dropdowns on page load.
 */
document.addEventListener('DOMContentLoaded', setContainerHeight);
window.addEventListener('resize', setContainerHeight);
window.addEventListener('load', function () {
    searchbarInput.value = "";
    for (let i = 0; i < dropdownSearchInputs.length; i++) {
        dropdownSearchInputs[i].value = "";
    }
});