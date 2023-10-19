export default class recipeTemplate {
    constructor(data) {
        const { id, image, name, ingredients, time, description } = data;
        this.id = id;
        this.image = image;
        this.name = name;
        this.ingredients = ingredients;
        this.time = time;
        this.description = description
        this.picture = image ? `./assets/images/${image}` : null;
    }

    getRecipeCardDOM() {
        //recipe section
        const recipesSection = document.getElementsByClassName("container-recipes")[0];

        const containerRecipe = document.createElement('article');
        containerRecipe.className = "recipe-card";
        containerRecipe.id = this.id;
        //time 
        const timeRecipe = document.createElement('span');
        timeRecipe.className = "recipe-card__time";
        timeRecipe.textContent = this.time + "min";
        //image
        const imgRecipe = document.createElement('img');
        imgRecipe.className = "recipe-card__image";
        imgRecipe.setAttribute("src", this.picture);
        imgRecipe.setAttribute("alt", this.name);
        //content
        const contentCardRecipe = document.createElement('div');
        contentCardRecipe.className = "recipe-card__content";
        const titleRecipe = document.createElement("h2");
        titleRecipe.textContent = this.name;

        const titleDescriptionRecipe = document.createElement("h3");
        titleDescriptionRecipe.textContent = "Recette";
        const contentDescriptionRecipe = document.createElement('div');
        contentDescriptionRecipe.className = "recipe-card__content__description";
        contentDescriptionRecipe.textContent = this.description;

        const titleIngredientsRecipe = document.createElement('h3');
        titleIngredientsRecipe.textContent = "Ingrédients";
        const contentIngredientsRecipe = document.createElement('div');
        contentIngredientsRecipe.className = "recipe-card__content__ingredients";

        let listIngredientsRecipe = this.ingredients;
        for (let ingredient of listIngredientsRecipe) {
            const divIngredient = document.createElement('div');
            divIngredient.className = "recipe-card__content__ingredients__ingredient";

            const titleIngredient = document.createElement('h4');
            if (ingredient["ingredient"] !== undefined) {
                titleIngredient.textContent = ingredient["ingredient"];
            }

            const quantityIngredient = document.createElement('span');
            if (ingredient["quantity"] !== undefined) {
                quantityIngredient.textContent += ingredient["quantity"];
            }
            if (ingredient["unit"] !== undefined) {
                quantityIngredient.textContent += ingredient["unit"];
            }

            contentIngredientsRecipe.appendChild(divIngredient);
            divIngredient.appendChild(titleIngredient);
            divIngredient.appendChild(quantityIngredient);
        }

        recipesSection.appendChild(containerRecipe);
        containerRecipe.appendChild(timeRecipe);
        containerRecipe.appendChild(imgRecipe);
        containerRecipe.appendChild(contentCardRecipe);
        contentCardRecipe.appendChild(titleRecipe);
        contentCardRecipe.appendChild(titleDescriptionRecipe);
        contentCardRecipe.appendChild(contentDescriptionRecipe);
        contentCardRecipe.appendChild(titleIngredientsRecipe);
        contentCardRecipe.appendChild(contentIngredientsRecipe);

        return (recipesSection);
    }
}