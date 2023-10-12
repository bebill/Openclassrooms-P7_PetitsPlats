import { recipes } from "../../data/recipes.js";
import recipeTemplate from "../factories/recipe.js";

async function displayData(dataRecipes) {
    // display data recipe
    const recipesSection = document.getElementById("receipts");

    dataRecipes.forEach((recipe) => {
        const recipeModel = new recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });

    //count total recipes
    const listCardRecipes = document.querySelectorAll(".recipe-card");
    const totRecipes = document.getElementsByClassName("count-recipes")[0];
    let countRecipes = listCardRecipes.length;
    totRecipes.textContent = countRecipes + " recettes";
    //fade in recipe 
    let baseDelay = 0.4;
    for (let i = 0; i < countRecipes; i++) {
        listCardRecipes[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
        listCardRecipes[i].classList.add("fade-in-recipe");
    }




}
async function init() { 
    //get data from recipes
    displayData(recipes);
}
init();