export default class RecipeCardFactory {
    constructor(recipe, index) {
        this.recipe = recipe;
        this.index = index;
    }

    createCard() {
        const card = document.createElement('div');
        card.classList.add('recipe-container');
        card.id = `recipe-container-${this.index + 1}`;

        const article = document.createElement('article');
        article.classList.add('recipes-card');

        const image = this.createImage();
        const recipeTime = this.createRecipeTime();
        const containerCardText = this.createContainerCardText();

        article.appendChild(image);
        article.appendChild(recipeTime);
        article.appendChild(containerCardText);
        card.appendChild(article);

        return card;
    }

    createImage() {
        const image = document.createElement('img');
        image.src = `./images/recettes/${this.recipe.image}`;
        image.alt = this.recipe.name;
        image.classList.add('recipe-image');
        return image;
    }

    createRecipeTime() {
        const recipeTime = document.createElement('div');
        recipeTime.classList.add('recipe-time');
        recipeTime.textContent = `${this.recipe.time}min`;
        return recipeTime;
    }

    createContainerCardText() {
        const containerCardText = document.createElement('div');
        containerCardText.classList.add('container-card-text');

        containerCardText.appendChild(this.createRecipeName());
        containerCardText.appendChild(this.createHeading('Recette'));
        containerCardText.appendChild(this.createDescription());
        containerCardText.appendChild(this.createHeading('Ingrédients'));
        containerCardText.appendChild(this.createIngredients());

        return containerCardText;
    }

    createRecipeName() {
        const recipeName = document.createElement('h1');
        recipeName.textContent = this.recipe.name;
        return recipeName;
    }

    createHeading(text) {
        const heading = document.createElement('h2');
        heading.textContent = text;
        return heading;
    }

    createDescription() {
        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('description-container');

        const recipeDescription = document.createElement('div');
        recipeDescription.classList.add('recipe-description');
        recipeDescription.textContent = this.recipe.description;

        descriptionContainer.appendChild(recipeDescription);

        return descriptionContainer;
    }

    createIngredients() {
        const recipeIngredients = document.createElement('div');
        recipeIngredients.classList.add('recipe-ingredients');

        this.recipe.ingredients.forEach((ingredient, i) => {
            const ingredientDiv = document.createElement('div');
            ingredientDiv.classList.add(`ingredient${i + 1}`);

            const ingredientName = document.createElement('p');
            ingredientName.classList.add('ingredient-name');
            ingredientName.textContent = ingredient.ingredient;

            const ingredientQuantity = document.createElement('p');
            ingredientQuantity.classList.add('ingredient-quantity');
            ingredientQuantity.textContent = `${ingredient.quantity !== undefined ? ingredient.quantity : '-'} ${ingredient.unit !== undefined ? ingredient.unit : ''}`;

            ingredientDiv.appendChild(ingredientName);
            ingredientDiv.appendChild(ingredientQuantity);
            recipeIngredients.appendChild(ingredientDiv);
        });

        return recipeIngredients;
    }
}
