import { recipes } from "./data/recipes.js";
import { recipeCard } from "./templates/card.js";
import { setContainerHeight } from "./templates/header.js";
import { dropdown } from "./logic/dropdown.js";
import { validSearchField } from "./logic/validSearch.js";
import { recipesFilter } from "./logic/recipesFilter.js";
import { store } from "./utils/store.js";

let recipeObject = {};

const cardsContainer = document.getElementById("cards_container");

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

form.addEventListener("submit", function (event) {
    event.preventDefault();
});
validSearchField(searchbarInput, recipes);

dropdown();


// reset the main search bar input 
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
    recipesFilter();
});

document.addEventListener('DOMContentLoaded', setContainerHeight);
window.addEventListener('resize', setContainerHeight);
window.addEventListener('load', function () {
    searchbarInput.value = "";
    for (let i = 0; i < dropdownSearchInputs.length; i++) {
        dropdownSearchInputs[i].value = "";
    }
});