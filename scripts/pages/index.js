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
    const listCardRecipes = document.getElementsByClassName("recipe-card");
    const totRecipes = document.getElementsByClassName("count-recipes")[0];
    const countRecipes = listCardRecipes.length;
    totRecipes.textContent = countRecipes + " recettes";
    //fade in recipe 
    const baseDelay = 0.4;
    for (let i = 0; i < countRecipes; i++) {
        listCardRecipes[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
        listCardRecipes[i].classList.add("fade-in-recipe");
    }
}

async function displayTagOptions(dataRecipes) {
    //add list of options by ingredient-appliance-ustensils 
    const optionsTagList = document.getElementsByClassName("list-options-tag");
    for (let optionTag of optionsTagList) {
        if (optionTag.parentElement.id === "ingredients-tag") {
            //tag ingredients 
            let ingredientOptionsList = new Array();

            for (let recipe of dataRecipes) {
                const ingredientsRecipeList = recipe["ingredients"];
                for (let ingredient of ingredientsRecipeList) {
                    ingredientOptionsList.push(ingredient["ingredient"]);
                }
            }
            // remove all duplicate of array 
            let uniqueIngredientOptions = [...new Set(ingredientOptionsList)];
            uniqueIngredientOptions.sort();
            //add option
            for (let uniqueOption of uniqueIngredientOptions) {
                const spanOption = document.createElement('span');
                spanOption.textContent = uniqueOption;
                optionTag.appendChild(spanOption);
            }
        }
        else if (optionTag.parentElement.id === "appliance-tag") {
            //tag appliance 
            let applianceOptionsList = new Array();

            for (let recipe of dataRecipes) {
                const applianceRecipeList = recipe["appliance"];
                applianceOptionsList.push(applianceRecipeList);
            }
            let uniqueApplianceOptions = [...new Set(applianceOptionsList)];
            uniqueApplianceOptions.sort();

            for (let uniqueOption of uniqueApplianceOptions) {
                const spanOption = document.createElement('span');
                spanOption.textContent = uniqueOption;
                optionTag.appendChild(spanOption);
            }
        }
        else if (optionTag.parentElement.id === "ustensils-tag") {
            //tag ustensils 
            let ustensilsOptionsList = new Array();

            for (let recipe of dataRecipes) {
                const ustensilsRecipeList = recipe["ustensils"];
                for (let ustensil of ustensilsRecipeList) {
                    ustensilsOptionsList.push(ustensil);
                }
            }
            let uniqueUstensilsOptions = [...new Set(ustensilsOptionsList)];
            uniqueUstensilsOptions.sort();

            for (let uniqueOption of uniqueUstensilsOptions) {
                const spanOption = document.createElement('span');
                spanOption.textContent = uniqueOption;
                optionTag.appendChild(spanOption);
            }
        }
    }
}


async function init() {
    displayData(recipes);
    displayTagOptions(recipes);
}
init();