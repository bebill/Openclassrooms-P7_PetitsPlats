import { recipes } from "../../data/recipes.js";
import { normalizedText } from "./standardizedInput.js";

const iconRecipeTag = document.querySelectorAll(".recipes-filter__header i");
const searchTag = document.getElementsByClassName("search-tag");
const controlTextRecipeTag = document.getElementsByClassName("search-tag__input");
const optionsTag = document.getElementsByClassName("list-options-tag");
const headerRecipeTag = document.getElementsByClassName("recipes-filter__header");
const headerRecipeArray = Array.from(headerRecipeTag);

const listCardRecipes = document.getElementsByClassName("recipe-card");
const totalRecipes = document.getElementsByClassName("count-recipes")[0];
const filterRecipesTag = document.getElementsByClassName("recipes-filter__tag")[0];
const controlInputTagSearch = document.querySelectorAll(".search-tag__input");
const tagOptions = document.getElementsByClassName("list-options-tag");
const tagOptionsArray = Array.from(tagOptions);
const tagOptionsList = document.querySelectorAll(".list-options-tag span");
const noRecipeFound = document.getElementsByClassName("no-recipe-found")[0];

let tagArray = [];


    //event display tag menu
    headerRecipeArray.forEach((header, index) => header.addEventListener("click", () => {
        displayHideOptionsOfTag(index)
    }));
    //event display the options available based on user input from tag search bar
    controlInputTagSearch.forEach((text, index) => text.addEventListener("input", () => {
        displayOptions(index);
    }));
    //event select one option in the tag menu
    tagOptionsList.forEach((option) => option.addEventListener("click", (event) => {

        const tagIndex = tagOptionsArray.indexOf(option.parentElement);
        const valueOption = event.target.textContent;
        let countTag = 0;

        if (tagArray.length === 0) {
            createTag(valueOption);
            tagArray.push(valueOption);
            displayRecipesFromTag();
            displayHideOptionsOfTag(tagIndex);
        }
        else {
            //if user try to choose again a tag who is already in list 
            for (let tag of tagArray) {
                if (tag === valueOption) {
                    countTag += 1;
                }
            }
            if (countTag === 0) {
                createTag(valueOption);
                tagArray.push(valueOption);
                displayRecipesFromTag();
                displayHideOptionsOfTag(tagIndex);
            }
        }
    }));

    
//display or hide list of options 
function displayHideOptionsOfTag(index) {
    //hide
    if (searchTag[index].style.display === "block" && optionsTag[index].style.display === "flex") {
        searchTag[index].style.display = "none";
        optionsTag[index].style.display = "none";
        iconRecipeTag[index].classList.remove("fa-rotate-180");
        controlTextRecipeTag[index].value = "";
        for (let option of optionsTag[index].childNodes) {
            option.style.display = "block";
        }
    }
    //display
    else {
        searchTag[index].style.display = "block";
        controlTextRecipeTag[index].focus();
        optionsTag[index].style.display = "flex";
        iconRecipeTag[index].classList.add("fa-rotate-180");
        controlTextRecipeTag[index].value = "";
        for (let option of optionsTag[index].childNodes) {
            option.style.display = "block";
        }
    }
}

//display options by search bar of tag 
function displayOptions(index) {

    let textSearchUser = normalizedText(controlInputTagSearch[index].value);
    let regexSearch = new RegExp(textSearchUser);
    let resultSearch = [];
    let optionTag;

    //match search of user with list of options
    for (let option of tagOptions[index].childNodes) {

        optionTag = normalizedText(option.textContent);

        if (optionTag.match(regexSearch) !== null) {
            resultSearch.push(option);
        }

    }
    //display list option by search of user
    for (let option of tagOptions[index].childNodes) {
        option.style.display = "none";
        for (let result of resultSearch) {
            if (option === result) {
                option.style.display = "block";
            }
        }
    }

}

//display of selected tag
function createTag(value) {
    if (value !== undefined) {
        //create tag 
        const divTagOption = document.createElement('div');
        divTagOption.className = "recipes-filter__tag__option";
        const iconClose = document.createElement('i');
        iconClose.className = "fa-solid fa-xmark";
        const tagOption = document.createElement('span');
        tagOption.textContent = value;
        filterRecipesTag.appendChild(divTagOption);
        divTagOption.appendChild(tagOption);
        divTagOption.appendChild(iconClose);

        //remove tag
        iconClose.addEventListener("click", () => {
            iconClose.parentElement.remove();
            let valueOptionOfIcon = normalizedText(iconClose.parentElement.querySelector('.recipes-filter__tag__option span').textContent);
            tagArray = tagArray.filter((tag) => normalizedText(tag) !== valueOptionOfIcon);
            displayRecipesFromTag();
        });
    }
}

//return all results of tag search bar/tag selection
function resultSearchByTag() {
    let resultTags = [];

    for (let indexRecipe = 0; indexRecipe < recipes.length; indexRecipe++) {
        let countTag = 0;

        const listIngredientsRecipe = recipes[indexRecipe]["ingredients"];
        const applianceRecipe = normalizedText(recipes[indexRecipe].appliance);
        const listUstensilsRecipe = recipes[indexRecipe].ustensils;

        for (let tag of tagArray) {
            //check if ingredient recipe is in array tag
            for (let ingredient of listIngredientsRecipe) {
                let ingredientRecipe = normalizedText(ingredient["ingredient"]);
                if (ingredientRecipe === normalizedText(tag)) {
                    countTag += 1;
                }
            }

            //check if appliance recipe is in array tag
            if (applianceRecipe === normalizedText(tag)) {
                countTag += 1;
            }

            //check if ustensil recipe is in array tag
            for (let ustensil of listUstensilsRecipe) {
                let ustensilRecipe = normalizedText(ustensil);
                if (ustensilRecipe === normalizedText(tag)) {
                    countTag += 1;
                }
            }
        }

        //if recipe has all tags of search user
        if (countTag === tagArray.length && tagArray.length !== 0) {
            resultTags.push(listCardRecipes[indexRecipe]);
        }
    }
    //copy the resultTags array
    let resultGlobal = resultTags.slice();

    return { resultTags, resultGlobal };
}

//display result search
function displayRecipesFromTag() {

    let countRecipes = new Number();
    const baseDelay = 0.4;

    if (tagArray.length !== 0) {
        let resultGlobal = [...new Set(resultSearchByTag().resultGlobal)];


        for (let recipe of listCardRecipes) {
            recipe.style.display = "none";
            recipe.classList.remove("fade-in-recipe");

            for (let i = 0; i < resultGlobal.length; i++) {
                if (recipe === resultGlobal[i]) {
                    recipe.style.display = "block";
                    resultGlobal[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
                    recipe.offsetWidth; //trigger a DOM reflow by requesting the element width
                    recipe.classList.add("fade-in-recipe");
                }
            }
        }
        countRecipes = [...new Set(resultGlobal)].length;
    }
    else {
        for (let i = 0; i < listCardRecipes.length; i++) {
            listCardRecipes[i].style.display = "block";
            listCardRecipes[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
            listCardRecipes[i].offsetWidth;
            listCardRecipes[i].classList.add("fade-in-recipe");
        }
        countRecipes = listCardRecipes.length;
    }
    totalRecipes.textContent = countRecipes + " recettes";

    //if no recipe found, display a error message
    if (countRecipes === 0) {
        noRecipeFound.style.display = "block";
    }
    else {
        noRecipeFound.style.display = "none";
    }

}