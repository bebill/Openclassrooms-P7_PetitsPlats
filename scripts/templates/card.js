/**
 * Represents a recipe card with details about a specific recipe.
 * @class
 * @param {Object} recipeObject - The object containing recipe details.
 * @param {string} recipeObject.name - The name of the recipe.
 * @param {Array} recipeObject.ingredients - The list of ingredients for the recipe.
 * @param {number} recipeObject.servings - The number of servings the recipe yields.
 * @param {string} recipeObject.image - The path to the image associated with the recipe.
 * @param {string} recipeObject.id - The unique identifier of the recipe.
 * @param {number} recipeObject.time - The time required to prepare the recipe in minutes.
 * @param {string} recipeObject.description - The description or instructions for the recipe.
 */
export class recipeCard {
    constructor(recipeObject) {
        const { name, ingredients, servings, image, id, time, description } =
            recipeObject;
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.servings = servings;
        this.image = image;
        this.time = time;
        this.description = description;
    }

    /**
     * Generates and returns the DOM structure representing the recipe card.
     * @returns {HTMLDivElement} - The HTML structure representing the recipe card.
     */
    getRecipeCardDOM() {
        const card = document.createElement('div');
        card.classList.add('recipe_container');

        const article = document.createElement('article');
        article.classList.add('recipes_card');

        const image = document.createElement('img');
        image.src = `./images/recettes/${this.image}`;
        image.alt = this.name;
        image.classList.add('recipe_image');

        const recipeTime = document.createElement('div');
        recipeTime.classList.add('recipe_time');
        recipeTime.textContent = `${this.time}min`;
        const containerCardText = document.createElement('div');
        containerCardText.classList.add('container_card_text');
        const recipeName = document.createElement('h1');
        recipeName.textContent = `${this.name}`;
        const recetteHeading = document.createElement('h2');
        recetteHeading.textContent = 'Recette';
        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('description_container');
        const recipeDescription = document.createElement('div');
        recipeDescription.classList.add('recipe_description');
        recipeDescription.textContent = `${this.description}`;
        const ingredientsHeading = document.createElement('h2');
        ingredientsHeading.textContent = 'Ingrédients';
        const recipeIngredients = document.createElement('div');
        recipeIngredients.classList.add('recipe_ingredients');

        this.ingredients.forEach((ingredient, i) => {
            const ingredientDiv = document.createElement('div');
            ingredientDiv.classList.add(`ingredient${i + 1}`);

            const ingredientName = document.createElement('p');
            ingredientName.classList.add('ingredient_name');
            ingredientName.textContent = ingredient.ingredient;

            const ingredientQuantity = document.createElement('p');
            ingredientQuantity.classList.add('ingredient_quantity');
            ingredientQuantity.textContent = `${ingredient.quantity !== undefined ? ingredient.quantity : '-'} ${ingredient.unit !== undefined ? ingredient.unit : ''}`;

            ingredientDiv.appendChild(ingredientName);
            ingredientDiv.appendChild(ingredientQuantity);
            recipeIngredients.appendChild(ingredientDiv);
        });

        descriptionContainer.appendChild(recipeDescription);
        containerCardText.appendChild(recipeName);
        containerCardText.appendChild(recetteHeading);
        containerCardText.appendChild(descriptionContainer);
        containerCardText.appendChild(ingredientsHeading);
        containerCardText.appendChild(recipeIngredients);
        article.appendChild(image);
        article.appendChild(recipeTime);
        article.appendChild(containerCardText);
        card.appendChild(article);

        return card;
    }
}