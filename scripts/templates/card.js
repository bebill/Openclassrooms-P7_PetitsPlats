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